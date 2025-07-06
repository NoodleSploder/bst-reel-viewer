"use client";

import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { Reel, ReelBST, ReelNode } from "../lib/reel-bst";
import { ReelPlayer } from "../components/ReelPlayer";
import reelsData from "../data/reels.json";
import { motion, AnimatePresence } from "framer-motion";
import "./animations.css";
import { UploadVideo } from "../components/UploadVideo";

// Helper: flatten any tree to a right-linear chain (robust, always in predicted order)
function flattenToRightChain(nodes: Reel[]): ReelNode | null {
  if (nodes.length === 0) return null;
  let head = new ReelNode(nodes[0]);
  let curr = head;
  for (let i = 1; i < nodes.length; ++i) {
	const next = new ReelNode(nodes[i]);
	curr.right = next;
	next.parent = curr;
	curr = next;
  }
  return head;
}

// Helper: always get the current in-order array (robust for any tree shape)
function getInOrderArray(bst: { root: ReelNode | null } | null): Reel[] {
  const arr: Reel[] = [];
  function traverse(node: ReelNode | null) {
	if (!node) return;
	traverse(node.left as ReelNode | null);
	arr.push(node.reel);
	traverse(node.right as ReelNode | null);
  }
  if (bst && bst.root) traverse(bst.root);
  return arr;
}

// Scoring function for prediction
function scoreReel(userLikes: string[], userDislikes: string[], a: Reel, b: Reel) {
  const likeWeight = 10;
  const dislikeWeight = -20;
  const normalize = (arr: string[]) => arr.map((item) => item.toLowerCase());
  const likes = normalize(userLikes);
  const dislikes = normalize(userDislikes);
  const aKeywords = normalize(a.keywords);
  const bKeywords = normalize(b.keywords);

  const aScore = aKeywords.reduce((score, k) => {
	if (likes.includes(k)) return score + likeWeight;
	if (dislikes.includes(k)) return score + dislikeWeight;
	return score;
  }, 0);
  const bScore = bKeywords.reduce((score, k) => {
	if (likes.includes(k)) return score + likeWeight;
	if (dislikes.includes(k)) return score + dislikeWeight;
	return score;
  }, 0);
  if (bScore !== aScore) return bScore - aScore;
  return parseInt(a.id) - parseInt(b.id);
}

export default function Home() {
  // BST state
  const [bst, setBST] = useState<ReelBST | null>(null);
  const [currentNode, setCurrentNode] = useState<ReelNode | null>(null);
  const [userLikes, setUserLikes] = useState<string[]>([]);
  const [userDislikes, setUserDislikes] = useState<string[]>([]);
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());
  const [direction, setDirection] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [pendingAdvance, setPendingAdvance] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const autoAdvanceRef = useRef(autoAdvance);

  // Build initial BST on mount
  useEffect(() => {
	const initialBST = new ReelBST();
	reelsData.forEach((reel) => initialBST.insert(reel, (a, b) => scoreReel([], [], a, b)));
	// Start at the leftmost (first in-order) node
	let curr = initialBST.root;
	while (curr && curr.left) curr = curr.left;
	setBST(initialBST);
	setCurrentNode(curr || null);
  }, []);

  // Track viewed reels
  useEffect(() => {
	if (currentNode) {
	  setViewedIds((prev) => new Set([...prev, currentNode.reel.id]));
	}
  }, [currentNode]);

  useEffect(() => { autoAdvanceRef.current = autoAdvance; }, [autoAdvance]);

  // Navigation helpers
  const goToNext = useCallback(() => {
	if (!currentNode) return;
	// Traverse right-linear chain for stitched tree
	const next = currentNode.right as ReelNode | null;
	if (next) {
	  setDirection(1);
	  setCurrentNode(next);
	}
  }, [currentNode]);

  const goToPrev = useCallback(() => {
	if (!bst || !currentNode) return;
	// Traverse from root to find previous in right-linear chain
	let prev: ReelNode | null = null;
	let node: ReelNode | null = bst.root as ReelNode | null;
	while (node && node !== currentNode) {
	  prev = node;
	  node = node.right as ReelNode | null;
	}
	if (prev) {
	  setDirection(-1);
	  setCurrentNode(prev);
	}
  }, [bst, currentNode]);

  // Like/dislike logic
  const handleLike = useCallback(() => {
	if (!currentNode) return;
	const id = currentNode.reel.id;
	if (userLikes.includes(id) || userDislikes.includes(id)) return;
	const likedKeywords = currentNode.reel.keywords.map((k) => k.toLowerCase());
	const newUserLikes = [...userLikes, ...likedKeywords, id];
	setUserLikes(newUserLikes);
	// Split reels into viewed/current and unviewed
	const allReels = getInOrderArray(bst).length ? getInOrderArray(bst) : reelsData;
	const currentIdx = allReels.findIndex(r => r.id === id);
	const viewed = allReels.slice(0, currentIdx + 1); // includes current
	const unviewed = allReels.slice(currentIdx + 1);
	// Predictive sort for unviewed
	const sortedUnviewed = [...unviewed].sort((a, b) => scoreReel(newUserLikes, userDislikes, a, b));
	// Combine and flatten to right-linear chain
	const stitched = [...viewed, ...sortedUnviewed];
	const newRoot = flattenToRightChain(stitched);
	// Find the new current node by ID
	let newCurrentNode = newRoot;
	while (newCurrentNode && newCurrentNode.reel.id !== id) {
	  newCurrentNode = newCurrentNode.right;
	}
	setBST({ root: newRoot } as ReelBST);
	setCurrentNode(newCurrentNode);
	if (autoAdvanceRef.current) setPendingAdvance(true);
  }, [currentNode, userLikes, userDislikes, bst]);

  const handleDislike = useCallback(() => {
	if (!currentNode) return;
	const id = currentNode.reel.id;
	if (userLikes.includes(id) || userDislikes.includes(id)) return;
	const dislikedKeywords = currentNode.reel.keywords.map((k) => k.toLowerCase());
	const newUserDislikes = [...userDislikes, ...dislikedKeywords, id];
	setUserDislikes(newUserDislikes);
	// Split reels into viewed/current and unviewed
	const allReels = getInOrderArray(bst).length ? getInOrderArray(bst) : reelsData;
	const currentIdx = allReels.findIndex(r => r.id === id);
	const viewed = allReels.slice(0, currentIdx + 1); // includes current
	const unviewed = allReels.slice(currentIdx + 1);
	// Predictive sort for unviewed
	const sortedUnviewed = [...unviewed].sort((a, b) => scoreReel(userLikes, newUserDislikes, a, b));
	// Combine and flatten to right-linear chain
	const stitched = [...viewed, ...sortedUnviewed];
	const newRoot = flattenToRightChain(stitched);
	// Find the new current node by ID
	let newCurrentNode = newRoot;
	while (newCurrentNode && newCurrentNode.reel.id !== id) {
	  newCurrentNode = newCurrentNode.right;
	}
	setBST({ root: newRoot } as ReelBST);
	setCurrentNode(newCurrentNode);
	if (autoAdvanceRef.current) setPendingAdvance(true);
  }, [currentNode, userLikes, userDislikes, bst]);

  // Auto-advance after feedback
  useEffect(() => {
	if (pendingAdvance) {
	  setPendingAdvance(false);
	  goToNext();
	}
  }, [pendingAdvance, goToNext]);

  // Keyboard navigation
  useEffect(() => {
	const handler = (e: KeyboardEvent) => {
	  if (e.key === "ArrowUp") goToPrev();
	  if (e.key === "ArrowDown") goToNext();
	};
	window.addEventListener("keydown", handler);
	return () => window.removeEventListener("keydown", handler);
  }, [goToPrev, goToNext]);

  // Touch swipe navigation
  const touchStartY = useRef<number | null>(null);
  useEffect(() => {
	const handleTouchStart = (e: TouchEvent) => {
	  touchStartY.current = e.touches[0].clientY;
	};
	const handleTouchEnd = (e: TouchEvent) => {
	  if (touchStartY.current === null) return;
	  const deltaY = e.changedTouches[0].clientY - touchStartY.current;
	  if (deltaY < -50) goToNext();
	  if (deltaY > 50) goToPrev();
	  touchStartY.current = null;
	};
	window.addEventListener("touchstart", handleTouchStart);
	window.addEventListener("touchend", handleTouchEnd);
	return () => {
	  window.removeEventListener("touchstart", handleTouchStart);
	  window.removeEventListener("touchend", handleTouchEnd);
	};
  }, [goToNext, goToPrev]);

  // Animation variants
  const variants = {
	enter: (direction: number) => ({
	  y: direction > 0 ? "100%" : "-100%",
	  opacity: 0,
	}),
	center: {
	  zIndex: 1,
	  y: 0,
	  opacity: 1,
	},
	exit: (direction: number) => ({
	  zIndex: 0,
	  y: direction < 0 ? "100%" : "-100%",
	  opacity: 0,
	}),
  };

  // Memoized in-order traversal for UI context
  const inOrder = useMemo(() => getInOrderArray(bst), [bst]);
  const currentIdx = useMemo(() => inOrder.findIndex((r) => currentNode && r.id === currentNode.reel.id), [inOrder, currentNode]);

  // Only allow one like/dislike per reel
  const feedbackGiven = currentNode ? (userLikes.includes(currentNode.reel.id) || userDislikes.includes(currentNode.reel.id)) : false;

  // Accessibility: focus management (must be before any return)
  useEffect(() => {
	cardRef.current?.focus?.();
  }, [currentNode]);

  // Add upload handler
  const handleUpload = async (file: File) => {
    // This is a placeholder. In a real app, you would POST to an API endpoint.
    // For now, just show an alert.
    alert(`Uploaded: ${file.name}\n(Backend should call add_watermark.py after upload)`);
    // Example: await fetch('/api/upload', { method: 'POST', body: formData });
  };

  // Loading and error states
  if (!currentNode) {
	return (
	  <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
		<div className="text-lg">Loading reels...</div>
	  </div>
	);
  }

  return (
	<div className="flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
	  <UploadVideo onUpload={handleUpload} />
	  <div className="w-full max-w-md h-[80vh] flex items-center justify-center">
		<div className="flex flex-row items-center w-full h-full justify-center relative">
		  <div className="flex-1 h-full flex items-center justify-center">
			<div className="relative w-full max-w-[400px] h-[70vh]">
			  <AnimatePresence initial={false} custom={direction}>
				{currentNode && (
				  <motion.div
					ref={cardRef}
					key={currentNode.reel.id}
					custom={direction}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{
					  y: { type: "spring", stiffness: 300, damping: 30 },
					  opacity: { duration: 0.2 },
					}}
					drag="y"
					dragConstraints={{ top: 0, bottom: 0 }}
					dragElastic={1}
					onDragEnd={(e, { offset }) => {
					  const height = cardRef.current?.offsetHeight || 1;
					  const threshold = 0.5 * height;
					  if (offset.y < -threshold && currentIdx < inOrder.length - 1) goToNext();
					  else if (offset.y > threshold && currentIdx > 0) goToPrev();
					}}
					className="absolute w-full h-full flex items-center justify-center outline-none"
					tabIndex={0}
					aria-label={`Reel ${currentIdx + 1} of ${inOrder.length}`}
				  >
					<ReelPlayer
					  reel={currentNode.reel}
					  onLike={feedbackGiven ? (() => {}) : handleLike as any}
					  onDislike={feedbackGiven ? (() => {}) : handleDislike as any}
					/>
				  </motion.div>
				)}
			  </AnimatePresence>
			</div>
		  </div>
		  <div className="flex flex-col gap-2 ml-4 justify-center w-[56px] min-w-[56px]">
			<div className="relative group">
			  <button
				className={`bg-gray-800 bg-opacity-80 hover:bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition ${currentIdx <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
				onClick={currentIdx > 0 ? goToPrev : undefined}
				aria-label="Previous Reel"
				tabIndex={currentIdx > 0 ? 0 : -1}
				disabled={currentIdx <= 0}
			  >
				<span className="text-2xl">▲</span>
			  </button>
			  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded invisible group-hover:visible whitespace-nowrap">
				Previous
			  </div>
			</div>
			<div className="relative group">
			  <button
				className={`bg-gray-800 bg-opacity-80 hover:bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition ${currentIdx >= inOrder.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
				onClick={currentIdx < inOrder.length - 1 ? goToNext : undefined}
				aria-label="Next Reel"
				tabIndex={currentIdx < inOrder.length - 1 ? 0 : -1}
				disabled={currentIdx >= inOrder.length - 1}
			  >
				<span className="text-2xl">▼</span>
			  </button>
			  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded invisible group-hover:visible whitespace-nowrap">
				Next
			  </div>
			</div>
			<div className="mt-4 flex items-center">
			  <label className="flex items-center cursor-pointer select-none text-sm">
				<input
				  type="checkbox"
				  checked={autoAdvance}
				  onChange={e => setAutoAdvance(e.target.checked)}
				  className="form-checkbox h-4 w-4 text-pink-500 mr-2"
				/>
				Auto-Advance
			  </label>
			</div>
		  </div>
		</div>
	  </div>
	  <div className="mt-4 text-xs text-gray-400">
		Reel {currentIdx + 1} of {inOrder.length}
	  </div>
	</div>
  );
}
