module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/lib/reel-bst.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Reel type and BST node definition for predictive video reel viewer
__turbopack_context__.s({
    "ReelBST": (()=>ReelBST),
    "ReelNode": (()=>ReelNode)
});
class ReelNode {
    reel;
    left = null;
    right = null;
    parent = null;
    constructor(reel){
        this.reel = reel;
    }
}
class ReelBST {
    root = null;
    // Insert a reel into the BST using a scoring function
    insert(reel, scoreFn) {
        const node = new ReelNode(reel);
        if (!this.root) {
            this.root = node;
            return node;
        }
        let curr = this.root;
        while(true){
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
    inOrder() {
        const res = [];
        function traverse(node) {
            if (!node) return;
            traverse(node.left);
            res.push(node.reel);
            traverse(node.right);
        }
        traverse(this.root);
        return res;
    }
    // Find a node by ID
    findNodeById(id) {
        function search(node) {
            if (!node) return null;
            if (node.reel.id === id) return node;
            return search(node.left) || search(node.right);
        }
        return search(this.root);
    }
    // Predictive reordering: sort the right subtree of the current node
    sortRightSubtreeOfNode(node, scoreFn) {
        if (!node || !node.right) return;
        // Collect all nodes in the right subtree
        const rightSubtreeNodes = [];
        function collectNodes(n) {
            if (!n) return;
            collectNodes(n.left);
            rightSubtreeNodes.push(new ReelNode(n.reel));
            collectNodes(n.right);
        }
        collectNodes(node.right);
        // Sort nodes
        rightSubtreeNodes.sort((a, b)=>scoreFn(a.reel, b.reel));
        // Build new balanced BST
        const newRight = ReelBST.buildBalancedBST(rightSubtreeNodes);
        node.right = newRight;
        if (newRight) newRight.parent = node;
    }
    // Helper: build a balanced BST from sorted ReelNodes
    static buildBalancedBST(nodes) {
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
    getNextNode(node) {
        if (node.right) {
            let curr = node.right;
            while(curr.left)curr = curr.left;
            return curr;
        }
        let curr = node;
        while(curr.parent && curr === curr.parent.right){
            curr = curr.parent;
        }
        return curr.parent;
    }
}
}}),
"[project]/src/components/ReelPlayer.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ReelPlayer": (()=>ReelPlayer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const ReelPlayer = ({ reel, onLike, onDislike })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center h-full w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                src: reel.videoUrl,
                controls: true,
                autoPlay: true,
                loop: true,
                className: "w-full max-h-[70vh] rounded-lg shadow-lg"
            }, void 0, false, {
                fileName: "[project]/src/components/ReelPlayer.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-bold text-lg mb-2",
                        children: reel.description
                    }, void 0, false, {
                        fileName: "[project]/src/components/ReelPlayer.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-500 mb-2",
                        children: reel.keywords.join(", ")
                    }, void 0, false, {
                        fileName: "[project]/src/components/ReelPlayer.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 justify-center",
                        children: [
                            onDislike && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-gray-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition order-1",
                                onClick: ()=>onDislike(reel.id),
                                children: "👎 Dislike"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ReelPlayer.tsx",
                                lineNumber: 27,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-600 transition order-2",
                                onClick: ()=>onLike(reel.id),
                                children: [
                                    "❤️ Like (",
                                    reel.likes,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ReelPlayer.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ReelPlayer.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ReelPlayer.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ReelPlayer.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
};
}}),
"[project]/src/data/reels.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("[{\"id\":\"1\",\"videoUrl\":\"/videos/video1.mp4\",\"keywords\":[\"nature\",\"relaxing\"],\"description\":\"Relaxing nature scene\",\"likes\":0},{\"id\":\"2\",\"videoUrl\":\"/videos/video2.mp4\",\"keywords\":[\"sports\",\"action\"],\"description\":\"Exciting sports moment\",\"likes\":0},{\"id\":\"3\",\"videoUrl\":\"/videos/video3.mp4\",\"keywords\":[\"music\",\"concert\"],\"description\":\"Live concert performance\",\"likes\":0},{\"id\":\"4\",\"videoUrl\":\"/videos/video4.mp4\",\"keywords\":[\"travel\",\"adventure\"],\"description\":\"Adventurous travel vlog\",\"likes\":0},{\"id\":\"5\",\"videoUrl\":\"/videos/video5.mp4\",\"keywords\":[\"food\",\"cooking\"],\"description\":\"Delicious cooking tutorial\",\"likes\":0},{\"id\":\"6\",\"videoUrl\":\"/videos/video6.mp4\",\"keywords\":[\"pets\",\"funny\"],\"description\":\"Funny pet moments\",\"likes\":0},{\"id\":\"7\",\"videoUrl\":\"/videos/video7.mp4\",\"keywords\":[\"technology\",\"review\"],\"description\":\"Latest tech review\",\"likes\":0},{\"id\":\"8\",\"videoUrl\":\"/videos/video8.mp4\",\"keywords\":[\"fashion\",\"style\"],\"description\":\"Fashion tips and tricks\",\"likes\":0},{\"id\":\"9\",\"videoUrl\":\"/videos/video9.mp4\",\"keywords\":[\"fitness\",\"workout\"],\"description\":\"Intense workout routine\",\"likes\":0},{\"id\":\"10\",\"videoUrl\":\"/videos/video10.mp4\",\"keywords\":[\"art\",\"painting\"],\"description\":\"Speed painting session\",\"likes\":0},{\"id\":\"11\",\"videoUrl\":\"/videos/video11.mp4\",\"keywords\":[\"gaming\",\"esports\"],\"description\":\"Epic gaming highlights\",\"likes\":0},{\"id\":\"12\",\"videoUrl\":\"/videos/video12.mp4\",\"keywords\":[\"science\",\"experiment\"],\"description\":\"Cool science experiment\",\"likes\":0},{\"id\":\"13\",\"videoUrl\":\"/videos/video13.mp4\",\"keywords\":[\"history\",\"documentary\"],\"description\":\"Historical documentary clip\",\"likes\":0},{\"id\":\"14\",\"videoUrl\":\"/videos/video14.mp4\",\"keywords\":[\"comedy\",\"sketch\"],\"description\":\"Comedy sketch show\",\"likes\":0},{\"id\":\"15\",\"videoUrl\":\"/videos/video15.mp4\",\"keywords\":[\"education\",\"tutorial\"],\"description\":\"Educational tutorial\",\"likes\":0},{\"id\":\"16\",\"videoUrl\":\"/videos/video16.mp4\",\"keywords\":[\"news\",\"update\"],\"description\":\"Latest news update\",\"likes\":0},{\"id\":\"17\",\"videoUrl\":\"/videos/video17.mp4\",\"keywords\":[\"cars\",\"review\"],\"description\":\"Car review and test drive\",\"likes\":0},{\"id\":\"18\",\"videoUrl\":\"/videos/video18.mp4\",\"keywords\":[\"animals\",\"wildlife\"],\"description\":\"Wildlife in action\",\"likes\":0},{\"id\":\"19\",\"videoUrl\":\"/videos/video19.mp4\",\"keywords\":[\"makeup\",\"beauty\"],\"description\":\"Makeup transformation\",\"likes\":0},{\"id\":\"20\",\"videoUrl\":\"/videos/video20.mp4\",\"keywords\":[\"diy\",\"crafts\"],\"description\":\"DIY crafts project\",\"likes\":0},{\"id\":\"21\",\"videoUrl\":\"/videos/video21.mp4\",\"keywords\":[\"nature\",\"wildlife\"],\"description\":\"Breathtaking wildlife footage\",\"likes\":0},{\"id\":\"22\",\"videoUrl\":\"/videos/video22.mp4\",\"keywords\":[\"sports\",\"highlights\"],\"description\":\"Sports highlights compilation\",\"likes\":0},{\"id\":\"23\",\"videoUrl\":\"/videos/video23.mp4\",\"keywords\":[\"music\",\"cover\"],\"description\":\"Popular song cover\",\"likes\":0},{\"id\":\"24\",\"videoUrl\":\"/videos/video24.mp4\",\"keywords\":[\"travel\",\"food\"],\"description\":\"Culinary travel experience\",\"likes\":0},{\"id\":\"25\",\"videoUrl\":\"/videos/video25.mp4\",\"keywords\":[\"pets\",\"cute\"],\"description\":\"Cute pet compilation\",\"likes\":0},{\"id\":\"26\",\"videoUrl\":\"/videos/video26.mp4\",\"keywords\":[\"technology\",\"unboxing\"],\"description\":\"Tech unboxing and first look\",\"likes\":0},{\"id\":\"27\",\"videoUrl\":\"/videos/video27.mp4\",\"keywords\":[\"fashion\",\"haul\"],\"description\":\"Clothing haul and try-on\",\"likes\":0},{\"id\":\"28\",\"videoUrl\":\"/videos/video28.mp4\",\"keywords\":[\"fitness\",\"challenge\"],\"description\":\"30-day fitness challenge\",\"likes\":0},{\"id\":\"29\",\"videoUrl\":\"/videos/video29.mp4\",\"keywords\":[\"art\",\"tutorial\"],\"description\":\"Art tutorial for beginners\",\"likes\":0},{\"id\":\"30\",\"videoUrl\":\"/videos/video30.mp4\",\"keywords\":[\"gaming\",\"walkthrough\"],\"description\":\"Game walkthrough and tips\",\"likes\":0},{\"id\":\"31\",\"videoUrl\":\"/videos/video31.mp4\",\"keywords\":[\"science\",\"documentary\"],\"description\":\"Science documentary short\",\"likes\":0},{\"id\":\"32\",\"videoUrl\":\"/videos/video32.mp4\",\"keywords\":[\"history\",\"lecture\"],\"description\":\"Historical lecture series\",\"likes\":0},{\"id\":\"33\",\"videoUrl\":\"/videos/video33.mp4\",\"keywords\":[\"comedy\",\"stand-up\"],\"description\":\"Stand-up comedy special\",\"likes\":0},{\"id\":\"34\",\"videoUrl\":\"/videos/video34.mp4\",\"keywords\":[\"education\",\"science\"],\"description\":\"Educational science video\",\"likes\":0},{\"id\":\"35\",\"videoUrl\":\"/videos/video35.mp4\",\"keywords\":[\"news\",\"report\"],\"description\":\"In-depth news report\",\"likes\":0},{\"id\":\"36\",\"videoUrl\":\"/videos/video36.mp4\",\"keywords\":[\"cars\",\"modification\"],\"description\":\"Car modification showcase\",\"likes\":0},{\"id\":\"37\",\"videoUrl\":\"/videos/video37.mp4\",\"keywords\":[\"animals\",\"pets\"],\"description\":\"Pets being adorable\",\"likes\":0},{\"id\":\"38\",\"videoUrl\":\"/videos/video38.mp4\",\"keywords\":[\"makeup\",\"tutorial\"],\"description\":\"Makeup application tutorial\",\"likes\":0},{\"id\":\"39\",\"videoUrl\":\"/videos/video39.mp4\",\"keywords\":[\"diy\",\"home improvement\"],\"description\":\"Home improvement DIYs\",\"likes\":0},{\"id\":\"40\",\"videoUrl\":\"/videos/video40.mp4\",\"keywords\":[\"nature\",\"documentary\"],\"description\":\"Nature documentary short\",\"likes\":0},{\"id\":\"41\",\"videoUrl\":\"/videos/video41.mp4\",\"keywords\":[\"sports\",\"training\"],\"description\":\"Athlete training routine\",\"likes\":0},{\"id\":\"42\",\"videoUrl\":\"/videos/video42.mp4\",\"keywords\":[\"music\",\"instrumental\"],\"description\":\"Relaxing instrumental music\",\"likes\":0},{\"id\":\"43\",\"videoUrl\":\"/videos/video43.mp4\",\"keywords\":[\"travel\",\"tips\"],\"description\":\"Travel tips and hacks\",\"likes\":0},{\"id\":\"44\",\"videoUrl\":\"/videos/video44.mp4\",\"keywords\":[\"food\",\"recipe\"],\"description\":\"Easy recipe tutorial\",\"likes\":0},{\"id\":\"45\",\"videoUrl\":\"/videos/video45.mp4\",\"keywords\":[\"pets\",\"training\"],\"description\":\"Pet training tips\",\"likes\":0},{\"id\":\"46\",\"videoUrl\":\"/videos/video46.mp4\",\"keywords\":[\"technology\",\"gadgets\"],\"description\":\"Latest gadgets review\",\"likes\":0},{\"id\":\"47\",\"videoUrl\":\"/videos/video47.mp4\",\"keywords\":[\"fashion\",\"outfits\"],\"description\":\"Outfit ideas and lookbook\",\"likes\":0},{\"id\":\"48\",\"videoUrl\":\"/videos/video48.mp4\",\"keywords\":[\"fitness\",\"nutrition\"],\"description\":\"Nutrition tips for fitness\",\"likes\":0},{\"id\":\"49\",\"videoUrl\":\"/videos/video49.mp4\",\"keywords\":[\"art\",\"exhibition\"],\"description\":\"Art exhibition walkthrough\",\"likes\":0},{\"id\":\"50\",\"videoUrl\":\"/videos/video50.mp4\",\"keywords\":[\"gaming\",\"review\"],\"description\":\"Game review and gameplay\",\"likes\":0},{\"id\":\"51\",\"videoUrl\":\"/videos/video51.mp4\",\"keywords\":[\"science\",\"innovation\"],\"description\":\"Innovative science projects\",\"likes\":0},{\"id\":\"52\",\"videoUrl\":\"/videos/video52.mp4\",\"keywords\":[\"history\",\"reenactment\"],\"description\":\"Historical reenactment video\",\"likes\":0},{\"id\":\"53\",\"videoUrl\":\"/videos/video53.mp4\",\"keywords\":[\"comedy\",\"improv\"],\"description\":\"Improv comedy performance\",\"likes\":0},{\"id\":\"54\",\"videoUrl\":\"/videos/video54.mp4\",\"keywords\":[\"education\",\"math\"],\"description\":\"Math tutorial and tips\",\"likes\":0},{\"id\":\"55\",\"videoUrl\":\"/videos/video55.mp4\",\"keywords\":[\"news\",\"analysis\"],\"description\":\"News analysis and opinion\",\"likes\":0},{\"id\":\"56\",\"videoUrl\":\"/videos/video56.mp4\",\"keywords\":[\"cars\",\"restoration\"],\"description\":\"Car restoration project\",\"likes\":0},{\"id\":\"57\",\"videoUrl\":\"/videos/video57.mp4\",\"keywords\":[\"animals\",\"shelter\"],\"description\":\"Animal shelter rescue stories\",\"likes\":0},{\"id\":\"58\",\"videoUrl\":\"/videos/video58.mp4\",\"keywords\":[\"makeup\",\"review\"],\"description\":\"Makeup product review\",\"likes\":0},{\"id\":\"59\",\"videoUrl\":\"/videos/video59.mp4\",\"keywords\":[\"diy\",\"upcycle\"],\"description\":\"Upcycling old items\",\"likes\":0},{\"id\":\"60\",\"videoUrl\":\"/videos/video60.mp4\",\"keywords\":[\"nature\",\"relaxation\"],\"description\":\"Relaxing nature sounds\",\"likes\":0},{\"id\":\"61\",\"videoUrl\":\"/videos/video61.mp4\",\"keywords\":[\"sports\",\"motorsports\"],\"description\":\"Motorsports action highlights\",\"likes\":0},{\"id\":\"62\",\"videoUrl\":\"/videos/video62.mp4\",\"keywords\":[\"music\",\"playlist\"],\"description\":\"Chill music playlist\",\"likes\":0},{\"id\":\"63\",\"videoUrl\":\"/videos/video63.mp4\",\"keywords\":[\"travel\",\"culture\"],\"description\":\"Cultural travel experiences\",\"likes\":0},{\"id\":\"64\",\"videoUrl\":\"/videos/video64.mp4\",\"keywords\":[\"food\",\"street\"],\"description\":\"Street food tour\",\"likes\":0},{\"id\":\"65\",\"videoUrl\":\"/videos/video65.mp4\",\"keywords\":[\"pets\",\"adoption\"],\"description\":\"Pet adoption stories\",\"likes\":0},{\"id\":\"66\",\"videoUrl\":\"/videos/video66.mp4\",\"keywords\":[\"technology\",\"future\"],\"description\":\"Future tech concepts\",\"likes\":0},{\"id\":\"67\",\"videoUrl\":\"/videos/video67.mp4\",\"keywords\":[\"fashion\",\"accessories\"],\"description\":\"Fashion accessories guide\",\"likes\":0},{\"id\":\"68\",\"videoUrl\":\"/videos/video68.mp4\",\"keywords\":[\"fitness\",\"yoga\"],\"description\":\"Yoga for beginners\",\"likes\":0},{\"id\":\"69\",\"videoUrl\":\"/videos/video69.mp4\",\"keywords\":[\"art\",\"sculpture\"],\"description\":\"Sculpture making process\",\"likes\":0},{\"id\":\"70\",\"videoUrl\":\"/videos/video70.mp4\",\"keywords\":[\"gaming\",\"streaming\"],\"description\":\"Live gaming stream highlights\",\"likes\":0},{\"id\":\"71\",\"videoUrl\":\"/videos/video71.mp4\",\"keywords\":[\"science\",\"space\"],\"description\":\"Space exploration documentary\",\"likes\":0},{\"id\":\"72\",\"videoUrl\":\"/videos/video72.mp4\",\"keywords\":[\"history\",\"documentary\"],\"description\":\"Documentary on ancient civilizations\",\"likes\":0},{\"id\":\"73\",\"videoUrl\":\"/videos/video73.mp4\",\"keywords\":[\"comedy\",\"parody\"],\"description\":\"Funny parody video\",\"likes\":0},{\"id\":\"74\",\"videoUrl\":\"/videos/video74.mp4\",\"keywords\":[\"education\",\"language\"],\"description\":\"Learn a new language\",\"likes\":0},{\"id\":\"75\",\"videoUrl\":\"/videos/video75.mp4\",\"keywords\":[\"news\",\"breaking\"],\"description\":\"Breaking news coverage\",\"likes\":0},{\"id\":\"76\",\"videoUrl\":\"/videos/video76.mp4\",\"keywords\":[\"cars\",\"racing\"],\"description\":\"Car racing highlights\",\"likes\":0},{\"id\":\"77\",\"videoUrl\":\"/videos/video77.mp4\",\"keywords\":[\"animals\",\"funny\"],\"description\":\"Funny animal videos\",\"likes\":0},{\"id\":\"78\",\"videoUrl\":\"/videos/video78.mp4\",\"keywords\":[\"makeup\",\"skincare\"],\"description\":\"Skincare routine and tips\",\"likes\":0},{\"id\":\"79\",\"videoUrl\":\"/videos/video79.mp4\",\"keywords\":[\"diy\",\"home decor\"],\"description\":\"Home decor DIY projects\",\"likes\":0},{\"id\":\"80\",\"videoUrl\":\"/videos/video80.mp4\",\"keywords\":[\"nature\",\"time-lapse\"],\"description\":\"Time-lapse of nature scenes\",\"likes\":0},{\"id\":\"81\",\"videoUrl\":\"/videos/video81.mp4\",\"keywords\":[\"sports\",\"fitness\"],\"description\":\"Fitness tips from athletes\",\"likes\":0},{\"id\":\"82\",\"videoUrl\":\"/videos/video82.mp4\",\"keywords\":[\"music\",\"live\"],\"description\":\"Live music performance\",\"likes\":0},{\"id\":\"83\",\"videoUrl\":\"/videos/video83.mp4\",\"keywords\":[\"travel\",\"adventure\"],\"description\":\"Adventure travel guide\",\"likes\":0},{\"id\":\"84\",\"videoUrl\":\"/videos/video84.mp4\",\"keywords\":[\"food\",\"cooking\"],\"description\":\"Cooking tips and tricks\",\"likes\":0},{\"id\":\"85\",\"videoUrl\":\"/videos/video85.mp4\",\"keywords\":[\"pets\",\"fun\"],\"description\":\"Fun moments with pets\",\"likes\":0},{\"id\":\"86\",\"videoUrl\":\"/videos/video86.mp4\",\"keywords\":[\"technology\",\"innovation\"],\"description\":\"Innovative tech gadgets\",\"likes\":0},{\"id\":\"87\",\"videoUrl\":\"/videos/video87.mp4\",\"keywords\":[\"fashion\",\"trends\"],\"description\":\"Latest fashion trends\",\"likes\":0},{\"id\":\"88\",\"videoUrl\":\"/videos/video88.mp4\",\"keywords\":[\"fitness\",\"exercise\"],\"description\":\"Home workout routine\",\"likes\":0},{\"id\":\"89\",\"videoUrl\":\"/videos/video89.mp4\",\"keywords\":[\"art\",\"drawing\"],\"description\":\"Drawing tutorial for beginners\",\"likes\":0},{\"id\":\"90\",\"videoUrl\":\"/videos/video90.mp4\",\"keywords\":[\"gaming\",\"let's play\"],\"description\":\"Let's play series\",\"likes\":0},{\"id\":\"91\",\"videoUrl\":\"/videos/video91.mp4\",\"keywords\":[\"science\",\"biology\"],\"description\":\"Biology concepts explained\",\"likes\":0},{\"id\":\"92\",\"videoUrl\":\"/videos/video92.mp4\",\"keywords\":[\"history\",\"facts\"],\"description\":\"Interesting historical facts\",\"likes\":0},{\"id\":\"93\",\"videoUrl\":\"/videos/video93.mp4\",\"keywords\":[\"comedy\",\"skits\"],\"description\":\"Funny skits and sketches\",\"likes\":0},{\"id\":\"94\",\"videoUrl\":\"/videos/video94.mp4\",\"keywords\":[\"education\",\"science\"],\"description\":\"Science experiments for kids\",\"likes\":0},{\"id\":\"95\",\"videoUrl\":\"/videos/video95.mp4\",\"keywords\":[\"news\",\"current events\"],\"description\":\"Current events summary\",\"likes\":0},{\"id\":\"96\",\"videoUrl\":\"/videos/video96.mp4\",\"keywords\":[\"cars\",\"technology\"],\"description\":\"Future cars and technology\",\"likes\":0},{\"id\":\"97\",\"videoUrl\":\"/videos/video97.mp4\",\"keywords\":[\"animals\",\"documentary\"],\"description\":\"Documentary on endangered species\",\"likes\":0},{\"id\":\"98\",\"videoUrl\":\"/videos/video98.mp4\",\"keywords\":[\"makeup\",\"tutorial\"],\"description\":\"Makeup tutorial for beginners\",\"likes\":0},{\"id\":\"99\",\"videoUrl\":\"/videos/video99.mp4\",\"keywords\":[\"diy\",\"crafting\"],\"description\":\"Crafting ideas and tutorials\",\"likes\":0},{\"id\":\"100\",\"videoUrl\":\"/videos/video100.mp4\",\"keywords\":[\"nature\",\"exploration\"],\"description\":\"Exploring natural wonders\",\"likes\":0},{\"id\":\"101\",\"videoUrl\":\"/videos/video101.mp4\",\"keywords\":[\"sports\",\"workout\"],\"description\":\"Workout tips from professionals\",\"likes\":0},{\"id\":\"102\",\"videoUrl\":\"/videos/video102.mp4\",\"keywords\":[\"music\",\"performance\"],\"description\":\"Musical performance video\",\"likes\":0},{\"id\":\"103\",\"videoUrl\":\"/videos/video103.mp4\",\"keywords\":[\"travel\",\"exploration\"],\"description\":\"Exploring new travel destinations\",\"likes\":0},{\"id\":\"104\",\"videoUrl\":\"/videos/video104.mp4\",\"keywords\":[\"food\",\"baking\"],\"description\":\"Baking delicious treats\",\"likes\":0},{\"id\":\"105\",\"videoUrl\":\"/videos/video105.mp4\",\"keywords\":[\"pets\",\"care\"],\"description\":\"Caring for your pets\",\"likes\":0},{\"id\":\"106\",\"videoUrl\":\"/videos/video106.mp4\",\"keywords\":[\"technology\",\"reviews\"],\"description\":\"In-depth tech reviews\",\"likes\":0},{\"id\":\"107\",\"videoUrl\":\"/videos/video107.mp4\",\"keywords\":[\"fashion\",\"makeup\"],\"description\":\"Fashion and makeup tips\",\"likes\":0},{\"id\":\"108\",\"videoUrl\":\"/videos/video108.mp4\",\"keywords\":[\"fitness\",\"wellness\"],\"description\":\"Wellness tips for a healthy life\",\"likes\":0},{\"id\":\"109\",\"videoUrl\":\"/videos/video109.mp4\",\"keywords\":[\"art\",\"gallery\"],\"description\":\"Virtual art gallery tour\",\"likes\":0},{\"id\":\"110\",\"videoUrl\":\"/videos/video110.mp4\",\"keywords\":[\"gaming\",\"esports\"],\"description\":\"Esports tournament highlights\",\"likes\":0},{\"id\":\"111\",\"videoUrl\":\"/videos/video111.mp4\",\"keywords\":[\"science\",\"chemistry\"],\"description\":\"Chemistry experiments and demos\",\"likes\":0},{\"id\":\"112\",\"videoUrl\":\"/videos/video112.mp4\",\"keywords\":[\"history\",\"biography\"],\"description\":\"Biography of historical figures\",\"likes\":0},{\"id\":\"113\",\"videoUrl\":\"/videos/video113.mp4\",\"keywords\":[\"comedy\",\"sketch\"],\"description\":\"Sketch comedy compilation\",\"likes\":0},{\"id\":\"114\",\"videoUrl\":\"/videos/video114.mp4\",\"keywords\":[\"education\",\"technology\"],\"description\":\"Tech education and tutorials\",\"likes\":0},{\"id\":\"115\",\"videoUrl\":\"/videos/video115.mp4\",\"keywords\":[\"news\",\"investigation\"],\"description\":\"Investigative news report\",\"likes\":0},{\"id\":\"116\",\"videoUrl\":\"/videos/video116.mp4\",\"keywords\":[\"cars\",\"technology\"],\"description\":\"The technology of cars\",\"likes\":0},{\"id\":\"117\",\"videoUrl\":\"/videos/video117.mp4\",\"keywords\":[\"animals\",\"rescue\"],\"description\":\"Animal rescue operations\",\"likes\":0},{\"id\":\"118\",\"videoUrl\":\"/videos/video118.mp4\",\"keywords\":[\"makeup\",\"fashion\"],\"description\":\"Fashionable makeup looks\",\"likes\":0},{\"id\":\"119\",\"videoUrl\":\"/videos/video119.mp4\",\"keywords\":[\"diy\",\"home improvement\"],\"description\":\"Home improvement ideas\",\"likes\":0},{\"id\":\"120\",\"videoUrl\":\"/videos/video120.mp4\",\"keywords\":[\"nature\",\"wildlife\"],\"description\":\"Wildlife conservation efforts\",\"likes\":0},{\"id\":\"121\",\"videoUrl\":\"/videos/video121.mp4\",\"keywords\":[\"sports\",\"fitness\"],\"description\":\"Fitness challenges and tips\",\"likes\":0},{\"id\":\"122\",\"videoUrl\":\"/videos/video122.mp4\",\"keywords\":[\"music\",\"dance\"],\"description\":\"Dance performances to popular music\",\"likes\":0},{\"id\":\"123\",\"videoUrl\":\"/videos/video123.mp4\",\"keywords\":[\"travel\",\"food\"],\"description\":\"Exploring global cuisines\",\"likes\":0},{\"id\":\"124\",\"videoUrl\":\"/videos/video124.mp4\",\"keywords\":[\"food\",\"snack\"],\"description\":\"Tasty snack ideas\",\"likes\":0},{\"id\":\"125\",\"videoUrl\":\"/videos/video125.mp4\",\"keywords\":[\"pets\",\"funny\"],\"description\":\"Funny moments with pets\",\"likes\":0},{\"id\":\"126\",\"videoUrl\":\"/videos/video126.mp4\",\"keywords\":[\"technology\",\"future\"],\"description\":\"The future of technology\",\"likes\":0},{\"id\":\"127\",\"videoUrl\":\"/videos/video127.mp4\",\"keywords\":[\"fashion\",\"style\"],\"description\":\"Fashion styles through the decades\",\"likes\":0},{\"id\":\"128\",\"videoUrl\":\"/videos/video128.mp4\",\"keywords\":[\"fitness\",\"health\"],\"description\":\"Health and fitness tips\",\"likes\":0},{\"id\":\"129\",\"videoUrl\":\"/videos/video129.mp4\",\"keywords\":[\"art\",\"technique\"],\"description\":\"Art techniques for beginners\",\"likes\":0},{\"id\":\"130\",\"videoUrl\":\"/videos/video130.mp4\",\"keywords\":[\"gaming\",\"review\"],\"description\":\"In-depth game reviews\",\"likes\":0},{\"id\":\"131\",\"videoUrl\":\"/videos/video131.mp4\",\"keywords\":[\"science\",\"physics\"],\"description\":\"Physics experiments and concepts\",\"likes\":0},{\"id\":\"132\",\"videoUrl\":\"/videos/video132.mp4\",\"keywords\":[\"history\",\"documentary\"],\"description\":\"Documentary on world history\",\"likes\":0},{\"id\":\"133\",\"videoUrl\":\"/videos/video133.mp4\",\"keywords\":[\"comedy\",\"stand-up\"],\"description\":\"Stand-up comedy performances\",\"likes\":0},{\"id\":\"134\",\"videoUrl\":\"/videos/video134.mp4\",\"keywords\":[\"education\",\"online learning\"],\"description\":\"Online learning resources and tips\",\"likes\":0},{\"id\":\"135\",\"videoUrl\":\"/videos/video135.mp4\",\"keywords\":[\"news\",\"reporting\"],\"description\":\"News reporting techniques\",\"likes\":0},{\"id\":\"136\",\"videoUrl\":\"/videos/video136.mp4\",\"keywords\":[\"cars\",\"technology\"],\"description\":\"The tech behind modern cars\",\"likes\":0},{\"id\":\"137\",\"videoUrl\":\"/videos/video137.mp4\",\"keywords\":[\"animals\",\"wildlife\"],\"description\":\"Wildlife in their natural habitat\",\"likes\":0},{\"id\":\"138\",\"videoUrl\":\"/videos/video138.mp4\",\"keywords\":[\"makeup\",\"beauty\"],\"description\":\"Beauty tips and makeup tutorials\",\"likes\":0},{\"id\":\"139\",\"videoUrl\":\"/videos/video139.mp4\",\"keywords\":[\"diy\",\"renovation\"],\"description\":\"Home renovation DIY projects\",\"likes\":0},{\"id\":\"140\",\"videoUrl\":\"/videos/video140.mp4\",\"keywords\":[\"nature\",\"photography\"],\"description\":\"Photography tips for nature\",\"likes\":0},{\"id\":\"141\",\"videoUrl\":\"/videos/video141.mp4\",\"keywords\":[\"sports\",\"skills\"],\"description\":\"Developing sports skills\",\"likes\":0},{\"id\":\"142\",\"videoUrl\":\"/videos/video142.mp4\",\"keywords\":[\"music\",\"instrument\"],\"description\":\"Learning a musical instrument\",\"likes\":0},{\"id\":\"143\",\"videoUrl\":\"/videos/video143.mp4\",\"keywords\":[\"travel\",\"photography\"],\"description\":\"Travel photography tips\",\"likes\":0},{\"id\":\"144\",\"videoUrl\":\"/videos/video144.mp4\",\"keywords\":[\"food\",\"cooking\"],\"description\":\"Cooking delicious meals\",\"likes\":0},{\"id\":\"145\",\"videoUrl\":\"/videos/video145.mp4\",\"keywords\":[\"pets\",\"health\"],\"description\":\"Keeping pets healthy\",\"likes\":0},{\"id\":\"146\",\"videoUrl\":\"/videos/video146.mp4\",\"keywords\":[\"technology\",\"gadgets\"],\"description\":\"Gadgets that make life easier\",\"likes\":0},{\"id\":\"147\",\"videoUrl\":\"/videos/video147.mp4\",\"keywords\":[\"fashion\",\"design\"],\"description\":\"Fashion design process\",\"likes\":0},{\"id\":\"148\",\"videoUrl\":\"/videos/video148.mp4\",\"keywords\":[\"fitness\",\"wellbeing\"],\"description\":\"Wellbeing and fitness advice\",\"likes\":0},{\"id\":\"149\",\"videoUrl\":\"/videos/video149.mp4\",\"keywords\":[\"art\",\"exhibition\"],\"description\":\"Visiting an art exhibition\",\"likes\":0},{\"id\":\"150\",\"videoUrl\":\"/videos/video150.mp4\",\"keywords\":[\"gaming\",\"let's play\"],\"description\":\"Let's play and game reviews\",\"likes\":0},{\"id\":\"151\",\"videoUrl\":\"/videos/video151.mp4\",\"keywords\":[\"science\",\"experiments\"],\"description\":\"Fun science experiments\",\"likes\":0},{\"id\":\"152\",\"videoUrl\":\"/videos/video152.mp4\",\"keywords\":[\"history\",\"events\"],\"description\":\"Historical events overview\",\"likes\":0},{\"id\":\"153\",\"videoUrl\":\"/videos/video153.mp4\",\"keywords\":[\"comedy\",\"funny\"],\"description\":\"Funny comedy moments\",\"likes\":0},{\"id\":\"154\",\"videoUrl\":\"/videos/video154.mp4\",\"keywords\":[\"education\",\"learning\"],\"description\":\"Learning new skills\",\"likes\":0},{\"id\":\"155\",\"videoUrl\":\"/videos/video155.mp4\",\"keywords\":[\"news\",\"updates\"],\"description\":\"Latest updates and news\",\"likes\":0},{\"id\":\"156\",\"videoUrl\":\"/videos/video156.mp4\",\"keywords\":[\"cars\",\"features\"],\"description\":\"Car features and technology\",\"likes\":0},{\"id\":\"157\",\"videoUrl\":\"/videos/video157.mp4\",\"keywords\":[\"animals\",\"fun\"],\"description\":\"Fun and cute animal videos\",\"likes\":0},{\"id\":\"158\",\"videoUrl\":\"/videos/video158.mp4\",\"keywords\":[\"makeup\",\"looks\"],\"description\":\"Different makeup looks\",\"likes\":0},{\"id\":\"159\",\"videoUrl\":\"/videos/video159.mp4\",\"keywords\":[\"diy\",\"crafts\"],\"description\":\"Creative DIY crafts\",\"likes\":0},{\"id\":\"160\",\"videoUrl\":\"/videos/video160.mp4\",\"keywords\":[\"nature\",\"documentary\"],\"description\":\"Documentary on natural habitats\",\"likes\":0},{\"id\":\"161\",\"videoUrl\":\"/videos/video161.mp4\",\"keywords\":[\"sports\",\"training\"],\"description\":\"Training tips from sports coaches\",\"likes\":0},{\"id\":\"162\",\"videoUrl\":\"/videos/video162.mp4\",\"keywords\":[\"music\",\"cover\"],\"description\":\"Cover songs by various artists\",\"likes\":0},{\"id\":\"163\",\"videoUrl\":\"/videos/video163.mp4\",\"keywords\":[\"travel\",\"vlog\"],\"description\":\"Vlog from a travel enthusiast\",\"likes\":0},{\"id\":\"164\",\"videoUrl\":\"/videos/video164.mp4\",\"keywords\":[\"food\",\"cooking\"],\"description\":\"Cooking with fresh ingredients\",\"likes\":0},{\"id\":\"165\",\"videoUrl\":\"/videos/video165.mp4\",\"keywords\":[\"pets\",\"training\"],\"description\":\"Training your pets\",\"likes\":0},{\"id\":\"166\",\"videoUrl\":\"/videos/video166.mp4\",\"keywords\":[\"technology\",\"reviews\"],\"description\":\"Latest tech product reviews\",\"likes\":0},{\"id\":\"167\",\"videoUrl\":\"/videos/video167.mp4\",\"keywords\":[\"fashion\",\"tips\"],\"description\":\"Fashion tips and advice\",\"likes\":0},{\"id\":\"168\",\"videoUrl\":\"/videos/video168.mp4\",\"keywords\":[\"fitness\",\"workout\"],\"description\":\"Effective workout routines\",\"likes\":0},{\"id\":\"169\",\"videoUrl\":\"/videos/video169.mp4\",\"keywords\":[\"art\",\"techniques\"],\"description\":\"Techniques for painting and drawing\",\"likes\":0},{\"id\":\"170\",\"videoUrl\":\"/videos/video170.mp4\",\"keywords\":[\"gaming\",\"highlights\"],\"description\":\"Highlights from popular games\",\"likes\":0},{\"id\":\"171\",\"videoUrl\":\"/videos/video171.mp4\",\"keywords\":[\"science\",\"experiments\"],\"description\":\"Exciting science experiments\",\"likes\":0},{\"id\":\"172\",\"videoUrl\":\"/videos/video172.mp4\",\"keywords\":[\"history\",\"documentary\"],\"description\":\"Documentary on historical events\",\"likes\":0},{\"id\":\"173\",\"videoUrl\":\"/videos/video173.mp4\",\"keywords\":[\"comedy\",\"sketches\"],\"description\":\"Sketches from a comedy show\",\"likes\":0},{\"id\":\"174\",\"videoUrl\":\"/videos/video174.mp4\",\"keywords\":[\"education\",\"tutorials\"],\"description\":\"Tutorials on various subjects\",\"likes\":0},{\"id\":\"175\",\"videoUrl\":\"/videos/video175.mp4\",\"keywords\":[\"news\",\"coverage\"],\"description\":\"In-depth news coverage\",\"likes\":0},{\"id\":\"176\",\"videoUrl\":\"/videos/video176.mp4\",\"keywords\":[\"cars\",\"reviews\"],\"description\":\"Reviews of the latest cars\",\"likes\":0},{\"id\":\"177\",\"videoUrl\":\"/videos/video177.mp4\",\"keywords\":[\"animals\",\"documentary\"],\"description\":\"Documentary on animal behavior\",\"likes\":0},{\"id\":\"178\",\"videoUrl\":\"/videos/video178.mp4\",\"keywords\":[\"makeup\",\"tutorials\"],\"description\":\"Makeup tutorials for all occasions\",\"likes\":0},{\"id\":\"179\",\"videoUrl\":\"/videos/video179.mp4\",\"keywords\":[\"diy\",\"home projects\"],\"description\":\"Home improvement projects\",\"likes\":0},{\"id\":\"180\",\"videoUrl\":\"/videos/video180.mp4\",\"keywords\":[\"nature\",\"relaxation\"],\"description\":\"Relaxing nature video\",\"likes\":0},{\"id\":\"181\",\"videoUrl\":\"/videos/video181.mp4\",\"keywords\":[\"sports\",\"highlights\"],\"description\":\"Highlights from the sports world\",\"likes\":0},{\"id\":\"182\",\"videoUrl\":\"/videos/video182.mp4\",\"keywords\":[\"music\",\"performance\"],\"description\":\"Live performance by musicians\",\"likes\":0},{\"id\":\"183\",\"videoUrl\":\"/videos/video183.mp4\",\"keywords\":[\"travel\",\"adventure\"],\"description\":\"Adventurous travel experiences\",\"likes\":0},{\"id\":\"184\",\"videoUrl\":\"/videos/video184.mp4\",\"keywords\":[\"food\",\"recipe\"],\"description\":\"Recipe for a delicious dish\",\"likes\":0},{\"id\":\"185\",\"videoUrl\":\"/videos/video185.mp4\",\"keywords\":[\"pets\",\"funny\"],\"description\":\"Funny and cute pet moments\",\"likes\":0},{\"id\":\"186\",\"videoUrl\":\"/videos/video186.mp4\",\"keywords\":[\"technology\",\"gadgets\"],\"description\":\"Latest gadgets and tech\",\"likes\":0},{\"id\":\"187\",\"videoUrl\":\"/videos/video187.mp4\",\"keywords\":[\"fashion\",\"style\"],\"description\":\"Fashion and style tips\",\"likes\":0},{\"id\":\"188\",\"videoUrl\":\"/videos/video188.mp4\",\"keywords\":[\"fitness\",\"health\"],\"description\":\"Health and fitness routines\",\"likes\":0},{\"id\":\"189\",\"videoUrl\":\"/videos/video189.mp4\",\"keywords\":[\"art\",\"exhibition\"],\"description\":\"Exhibition of contemporary art\",\"likes\":0},{\"id\":\"190\",\"videoUrl\":\"/videos/video190.mp4\",\"keywords\":[\"gaming\",\"let's play\"],\"description\":\"Let's play and game highlights\",\"likes\":0},{\"id\":\"191\",\"videoUrl\":\"/videos/video191.mp4\",\"keywords\":[\"science\",\"biology\"],\"description\":\"Biology experiments and fun facts\",\"likes\":0},{\"id\":\"192\",\"videoUrl\":\"/videos/video192.mp4\",\"keywords\":[\"history\",\"documentary\"],\"description\":\"Documentary on historical figures\",\"likes\":0},{\"id\":\"193\",\"videoUrl\":\"/videos/video193.mp4\",\"keywords\":[\"comedy\",\"skits\"],\"description\":\"Comedy skits and performances\",\"likes\":0},{\"id\":\"194\",\"videoUrl\":\"/videos/video194.mp4\",\"keywords\":[\"education\",\"tutorial\"],\"description\":\"Tutorials on educational topics\",\"likes\":0},{\"id\":\"195\",\"videoUrl\":\"/videos/video195.mp4\",\"keywords\":[\"news\",\"report\"],\"description\":\"News report and analysis\",\"likes\":0},{\"id\":\"196\",\"videoUrl\":\"/videos/video196.mp4\",\"keywords\":[\"cars\",\"performance\"],\"description\":\"Car performance reviews\",\"likes\":0},{\"id\":\"197\",\"videoUrl\":\"/videos/video197.mp4\",\"keywords\":[\"animals\",\"wildlife\"],\"description\":\"Wildlife documentaries\",\"likes\":0},{\"id\":\"198\",\"videoUrl\":\"/videos/video198.mp4\",\"keywords\":[\"makeup\",\"beauty\"],\"description\":\"Beauty and makeup tutorials\",\"likes\":0},{\"id\":\"199\",\"videoUrl\":\"/videos/video199.mp4\",\"keywords\":[\"diy\",\"crafts\"],\"description\":\"DIY and crafting tutorials\",\"likes\":0},{\"id\":\"200\",\"videoUrl\":\"/videos/video200.mp4\",\"keywords\":[\"nature\",\"exploration\"],\"description\":\"Exploring nature's beauty\",\"likes\":0},{\"id\":\"201\",\"videoUrl\":\"/videos/video201.mp4\",\"keywords\":[\"sports\",\"training\"],\"description\":\"Training tips from athletes\",\"likes\":0},{\"id\":\"202\",\"videoUrl\":\"/videos/video202.mp4\",\"keywords\":[\"music\",\"dance\"],\"description\":\"Dance performances and music\",\"likes\":0},{\"id\":\"203\",\"videoUrl\":\"/videos/video203.mp4\",\"keywords\":[\"random\",\"misc\"],\"description\":\"Random fun video\",\"likes\":0}]"));}}),
"[project]/src/components/UploadVideo.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "UploadVideo": (()=>UploadVideo)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const UploadVideo = ({ onUpload })=>{
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleFileChange = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        setError(null);
        try {
            await onUpload(file);
        } catch (err) {
            setError(err.message || "Upload failed");
        } finally{
            setUploading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center my-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "file",
                accept: "video/*",
                ref: fileInputRef,
                onChange: handleFileChange,
                className: "hidden"
            }, void 0, false, {
                fileName: "[project]/src/components/UploadVideo.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition",
                onClick: ()=>fileInputRef.current?.click(),
                disabled: uploading,
                children: uploading ? "Uploading..." : "Upload New Video"
            }, void 0, false, {
                fileName: "[project]/src/components/UploadVideo.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-red-500 mt-2 text-sm",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/components/UploadVideo.tsx",
                lineNumber: 42,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/UploadVideo.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
};
}}),
"[project]/src/app/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reel$2d$bst$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/reel-bst.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ReelPlayer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ReelPlayer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$reels$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/data/reels.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UploadVideo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/UploadVideo.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
// Helper: flatten any tree to a right-linear chain (robust, always in predicted order)
function flattenToRightChain(nodes) {
    if (nodes.length === 0) return null;
    let head = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reel$2d$bst$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReelNode"](nodes[0]);
    let curr = head;
    for(let i = 1; i < nodes.length; ++i){
        const next = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reel$2d$bst$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReelNode"](nodes[i]);
        curr.right = next;
        next.parent = curr;
        curr = next;
    }
    return head;
}
// Helper: always get the current in-order array (robust for any tree shape)
function getInOrderArray(bst) {
    const arr = [];
    function traverse(node) {
        if (!node) return;
        traverse(node.left);
        arr.push(node.reel);
        traverse(node.right);
    }
    if (bst && bst.root) traverse(bst.root);
    return arr;
}
// Scoring function for prediction
function scoreReel(userLikes, userDislikes, a, b) {
    const likeWeight = 10;
    const dislikeWeight = -20;
    const normalize = (arr)=>arr.map((item)=>item.toLowerCase());
    const likes = normalize(userLikes);
    const dislikes = normalize(userDislikes);
    const aKeywords = normalize(a.keywords);
    const bKeywords = normalize(b.keywords);
    const aScore = aKeywords.reduce((score, k)=>{
        if (likes.includes(k)) return score + likeWeight;
        if (dislikes.includes(k)) return score + dislikeWeight;
        return score;
    }, 0);
    const bScore = bKeywords.reduce((score, k)=>{
        if (likes.includes(k)) return score + likeWeight;
        if (dislikes.includes(k)) return score + dislikeWeight;
        return score;
    }, 0);
    if (bScore !== aScore) return bScore - aScore;
    return parseInt(a.id) - parseInt(b.id);
}
function Home() {
    // BST state
    const [bst, setBST] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentNode, setCurrentNode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userLikes, setUserLikes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [userDislikes, setUserDislikes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [viewedIds, setViewedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [direction, setDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [autoAdvance, setAutoAdvance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingAdvance, setPendingAdvance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const autoAdvanceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(autoAdvance);
    // Build initial BST on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initialBST = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reel$2d$bst$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReelBST"]();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$reels$2e$json__$28$json$29$__["default"].forEach((reel)=>initialBST.insert(reel, (a, b)=>scoreReel([], [], a, b)));
        // Start at the leftmost (first in-order) node
        let curr = initialBST.root;
        while(curr && curr.left)curr = curr.left;
        setBST(initialBST);
        setCurrentNode(curr || null);
    }, []);
    // Track viewed reels
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (currentNode) {
            setViewedIds((prev)=>new Set([
                    ...prev,
                    currentNode.reel.id
                ]));
        }
    }, [
        currentNode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        autoAdvanceRef.current = autoAdvance;
    }, [
        autoAdvance
    ]);
    // Navigation helpers
    const goToNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!currentNode) return;
        // Traverse right-linear chain for stitched tree
        const next = currentNode.right;
        if (next) {
            setDirection(1);
            setCurrentNode(next);
        }
    }, [
        currentNode
    ]);
    const goToPrev = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!bst || !currentNode) return;
        // Traverse from root to find previous in right-linear chain
        let prev = null;
        let node = bst.root;
        while(node && node !== currentNode){
            prev = node;
            node = node.right;
        }
        if (prev) {
            setDirection(-1);
            setCurrentNode(prev);
        }
    }, [
        bst,
        currentNode
    ]);
    // Like/dislike logic
    const handleLike = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!currentNode) return;
        const id = currentNode.reel.id;
        if (userLikes.includes(id) || userDislikes.includes(id)) return;
        const likedKeywords = currentNode.reel.keywords.map((k)=>k.toLowerCase());
        const newUserLikes = [
            ...userLikes,
            ...likedKeywords,
            id
        ];
        setUserLikes(newUserLikes);
        // Split reels into viewed/current and unviewed
        const allReels = getInOrderArray(bst).length ? getInOrderArray(bst) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$reels$2e$json__$28$json$29$__["default"];
        const currentIdx = allReels.findIndex((r)=>r.id === id);
        const viewed = allReels.slice(0, currentIdx + 1); // includes current
        const unviewed = allReels.slice(currentIdx + 1);
        // Predictive sort for unviewed
        const sortedUnviewed = [
            ...unviewed
        ].sort((a, b)=>scoreReel(newUserLikes, userDislikes, a, b));
        // Combine and flatten to right-linear chain
        const stitched = [
            ...viewed,
            ...sortedUnviewed
        ];
        const newRoot = flattenToRightChain(stitched);
        // Find the new current node by ID
        let newCurrentNode = newRoot;
        while(newCurrentNode && newCurrentNode.reel.id !== id){
            newCurrentNode = newCurrentNode.right;
        }
        setBST({
            root: newRoot
        });
        setCurrentNode(newCurrentNode);
        if (autoAdvanceRef.current) setPendingAdvance(true);
    }, [
        currentNode,
        userLikes,
        userDislikes,
        bst
    ]);
    const handleDislike = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!currentNode) return;
        const id = currentNode.reel.id;
        if (userLikes.includes(id) || userDislikes.includes(id)) return;
        const dislikedKeywords = currentNode.reel.keywords.map((k)=>k.toLowerCase());
        const newUserDislikes = [
            ...userDislikes,
            ...dislikedKeywords,
            id
        ];
        setUserDislikes(newUserDislikes);
        // Split reels into viewed/current and unviewed
        const allReels = getInOrderArray(bst).length ? getInOrderArray(bst) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$reels$2e$json__$28$json$29$__["default"];
        const currentIdx = allReels.findIndex((r)=>r.id === id);
        const viewed = allReels.slice(0, currentIdx + 1); // includes current
        const unviewed = allReels.slice(currentIdx + 1);
        // Predictive sort for unviewed
        const sortedUnviewed = [
            ...unviewed
        ].sort((a, b)=>scoreReel(userLikes, newUserDislikes, a, b));
        // Combine and flatten to right-linear chain
        const stitched = [
            ...viewed,
            ...sortedUnviewed
        ];
        const newRoot = flattenToRightChain(stitched);
        // Find the new current node by ID
        let newCurrentNode = newRoot;
        while(newCurrentNode && newCurrentNode.reel.id !== id){
            newCurrentNode = newCurrentNode.right;
        }
        setBST({
            root: newRoot
        });
        setCurrentNode(newCurrentNode);
        if (autoAdvanceRef.current) setPendingAdvance(true);
    }, [
        currentNode,
        userLikes,
        userDislikes,
        bst
    ]);
    // Auto-advance after feedback
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (pendingAdvance) {
            setPendingAdvance(false);
            goToNext();
        }
    }, [
        pendingAdvance,
        goToNext
    ]);
    // Keyboard navigation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handler = (e)=>{
            if (e.key === "ArrowUp") goToPrev();
            if (e.key === "ArrowDown") goToNext();
        };
        window.addEventListener("keydown", handler);
        return ()=>window.removeEventListener("keydown", handler);
    }, [
        goToPrev,
        goToNext
    ]);
    // Touch swipe navigation
    const touchStartY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleTouchStart = (e)=>{
            touchStartY.current = e.touches[0].clientY;
        };
        const handleTouchEnd = (e)=>{
            if (touchStartY.current === null) return;
            const deltaY = e.changedTouches[0].clientY - touchStartY.current;
            if (deltaY < -50) goToNext();
            if (deltaY > 50) goToPrev();
            touchStartY.current = null;
        };
        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchend", handleTouchEnd);
        return ()=>{
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [
        goToNext,
        goToPrev
    ]);
    // Animation variants
    const variants = {
        enter: (direction)=>({
                y: direction > 0 ? "100%" : "-100%",
                opacity: 0
            }),
        center: {
            zIndex: 1,
            y: 0,
            opacity: 1
        },
        exit: (direction)=>({
                zIndex: 0,
                y: direction < 0 ? "100%" : "-100%",
                opacity: 0
            })
    };
    // Memoized in-order traversal for UI context
    const inOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>getInOrderArray(bst), [
        bst
    ]);
    const currentIdx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>inOrder.findIndex((r)=>currentNode && r.id === currentNode.reel.id), [
        inOrder,
        currentNode
    ]);
    // Only allow one like/dislike per reel
    const feedbackGiven = currentNode ? userLikes.includes(currentNode.reel.id) || userDislikes.includes(currentNode.reel.id) : false;
    // Accessibility: focus management (must be before any return)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        cardRef.current?.focus?.();
    }, [
        currentNode
    ]);
    // Add upload handler
    const handleUpload = async (file)=>{
        // This is a placeholder. In a real app, you would POST to an API endpoint.
        // For now, just show an alert.
        alert(`Uploaded: ${file.name}\n(Backend should call add_watermark.py after upload)`);
    // Example: await fetch('/api/upload', { method: 'POST', body: formData });
    };
    // Loading and error states
    if (!currentNode) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center min-h-screen bg-black text-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-lg",
                children: "Loading reels..."
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 257,
                columnNumber: 3
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 256,
            columnNumber: 4
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UploadVideo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UploadVideo"], {
                onUpload: handleUpload
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 264,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-md h-[80vh] flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-row items-center w-full h-full justify-center relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 h-full flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full max-w-[400px] h-[70vh]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    initial: false,
                                    custom: direction,
                                    children: currentNode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        ref: cardRef,
                                        custom: direction,
                                        variants: variants,
                                        initial: "enter",
                                        animate: "center",
                                        exit: "exit",
                                        transition: {
                                            y: {
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 30
                                            },
                                            opacity: {
                                                duration: 0.2
                                            }
                                        },
                                        drag: "y",
                                        dragConstraints: {
                                            top: 0,
                                            bottom: 0
                                        },
                                        dragElastic: 1,
                                        onDragEnd: (e, { offset })=>{
                                            const height = cardRef.current?.offsetHeight || 1;
                                            const threshold = 0.5 * height;
                                            if (offset.y < -threshold && currentIdx < inOrder.length - 1) goToNext();
                                            else if (offset.y > threshold && currentIdx > 0) goToPrev();
                                        },
                                        className: "absolute w-full h-full flex items-center justify-center outline-none",
                                        tabIndex: 0,
                                        "aria-label": `Reel ${currentIdx + 1} of ${inOrder.length}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ReelPlayer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReelPlayer"], {
                                            reel: currentNode.reel,
                                            onLike: feedbackGiven ? ()=>{} : handleLike,
                                            onDislike: feedbackGiven ? ()=>{} : handleDislike
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 296,
                                            columnNumber: 6
                                        }, this)
                                    }, currentNode.reel.id, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 271,
                                        columnNumber: 7
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 269,
                                    columnNumber: 6
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 268,
                                columnNumber: 4
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 267,
                            columnNumber: 5
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2 ml-4 justify-center w-[56px] min-w-[56px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: `bg-gray-800 bg-opacity-80 hover:bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition ${currentIdx <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`,
                                            onClick: currentIdx > 0 ? goToPrev : undefined,
                                            "aria-label": "Previous Reel",
                                            tabIndex: currentIdx > 0 ? 0 : -1,
                                            disabled: currentIdx <= 0,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl",
                                                children: "▲"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 315,
                                                columnNumber: 5
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 308,
                                            columnNumber: 6
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded invisible group-hover:visible whitespace-nowrap",
                                            children: "Previous"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 317,
                                            columnNumber: 6
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 307,
                                    columnNumber: 4
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: `bg-gray-800 bg-opacity-80 hover:bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition ${currentIdx >= inOrder.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`,
                                            onClick: currentIdx < inOrder.length - 1 ? goToNext : undefined,
                                            "aria-label": "Next Reel",
                                            tabIndex: currentIdx < inOrder.length - 1 ? 0 : -1,
                                            disabled: currentIdx >= inOrder.length - 1,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl",
                                                children: "▼"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 329,
                                                columnNumber: 5
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 322,
                                            columnNumber: 6
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded invisible group-hover:visible whitespace-nowrap",
                                            children: "Next"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 331,
                                            columnNumber: 6
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 321,
                                    columnNumber: 4
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 flex items-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center cursor-pointer select-none text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: autoAdvance,
                                                onChange: (e)=>setAutoAdvance(e.target.checked),
                                                className: "form-checkbox h-4 w-4 text-pink-500 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 337,
                                                columnNumber: 5
                                            }, this),
                                            "Auto-Advance"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 336,
                                        columnNumber: 6
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 335,
                                    columnNumber: 4
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 306,
                            columnNumber: 5
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 266,
                    columnNumber: 3
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 265,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 text-xs text-gray-400",
                children: [
                    "Reel ",
                    currentIdx + 1,
                    " of ",
                    inOrder.length
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 349,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 263,
        columnNumber: 2
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__5f523000._.js.map