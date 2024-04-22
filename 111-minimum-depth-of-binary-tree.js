/* Given a binary tree, find its minimum depth aka the number of nodes along the shortest path from the root to the nearest leaf. */

/*
- This is a BFS, right? It's like, literally the definition of it. Whether I know what to do with this information is a different question.
- If the root is null, the answer is 0, right? No path, no nodes.
- If it is not, we check both its children. If either turns out to be a leaf, the answer is 1, otherwise, we move on to their children, and so on.
- So not recursion like DFS but a queue, right? Except instead of necessarily keeping going until the queue is empty, we break as soon as we find a leaf.
*/



/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
function minDepth(root) {
    let shortestPath = 0
    let current = root
    let nextChildren = []

    const isLeaf = root => root && !root.left && !root.right

    if (!root) { return shortestPath }

    while (true) {
        shortestPath++
        if (isLeaf(current)) {
            return shortestPath
        }
        let children = []
        if (!nextChildren.length) {
            children = [current.left, current.right]
        }
        else {
            for (let node of nextChildren) {
                if (node) { children.push(node.left, node.right)}
            }
        }
        for (let node of children) {
            if (isLeaf(node)) {
                return shortestPath + 1
            }
        }
        nextChildren = children
    }
};
