
// Reel type and BST node definition for predictive video reel viewer
export type Reel = {
  id: string;
  videoUrl: string;
  keywords: string[];
  description: string;
  likes: number;
};

export class ReelNode {
  reel: Reel;
  left: ReelNode | null = null;
  right: ReelNode | null = null;
  parent: ReelNode | null = null;

  constructor(reel: Reel) {
    this.reel = reel;
  }
}

export class ReelBST {
  root: ReelNode | null = null;

  // Insert a reel into the BST using a scoring function
  insert(reel: Reel, scoreFn: (a: Reel, b: Reel) => number) {
    const node = new ReelNode(reel);
    if (!this.root) {
      this.root = node;
      return node;
    }
    let curr = this.root;
    while (true) {
      if (scoreFn(reel, curr.reel) < 0) {
        if (!curr.left) {
          curr.left = node;
          node.parent = curr;
          break;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = node;
          node.parent = curr;
          break;
        }
        curr = curr.right;
      }
    }
    return node;
  }

  // In-order traversal to get sorted reels
  inOrder(): Reel[] {
    const res: Reel[] = [];
    function traverse(node: ReelNode | null) {
      if (!node) return;
      traverse(node.left);
      res.push(node.reel);
      traverse(node.right);
    }
    traverse(this.root);
    return res;
  }

  // Find a node by ID
  findNodeById(id: string): ReelNode | null {
    function search(node: ReelNode | null): ReelNode | null {
      if (!node) return null;
      if (node.reel.id === id) return node;
      return search(node.left) || search(node.right);
    }
    return search(this.root);
  }

  // Predictive reordering: sort the right subtree of the current node
  sortRightSubtreeOfNode(node: ReelNode, scoreFn: (a: Reel, b: Reel) => number): void {
    if (!node || !node.right) return;
    // Collect all nodes in the right subtree
    const rightSubtreeNodes: ReelNode[] = [];
    function collectNodes(n: ReelNode | null) {
      if (!n) return;
      collectNodes(n.left);
      rightSubtreeNodes.push(new ReelNode(n.reel));
      collectNodes(n.right);
    }
    collectNodes(node.right);
    // Sort nodes
    rightSubtreeNodes.sort((a, b) => scoreFn(a.reel, b.reel));
    // Build new balanced BST
    const newRight = ReelBST.buildBalancedBST(rightSubtreeNodes);
    node.right = newRight;
    if (newRight) newRight.parent = node;
  }

  // Helper: build a balanced BST from sorted ReelNodes
  static buildBalancedBST(nodes: ReelNode[]): ReelNode | null {
    if (!nodes.length) return null;
    const mid = Math.floor(nodes.length / 2);
    const root = new ReelNode(nodes[mid].reel);
    root.left = ReelBST.buildBalancedBST(nodes.slice(0, mid));
    if (root.left) root.left.parent = root;
    root.right = ReelBST.buildBalancedBST(nodes.slice(mid + 1));
    if (root.right) root.right.parent = root;
    return root;
  }

  // Get the next node in in-order traversal
  getNextNode(node: ReelNode): ReelNode | null {
    if (node.right) {
      let curr = node.right;
      while (curr.left) curr = curr.left;
      return curr;
    }
    let curr: ReelNode | null = node;
    while (curr.parent && curr === curr.parent.right) {
      curr = curr.parent;
    }
    return curr.parent;
  }
}
