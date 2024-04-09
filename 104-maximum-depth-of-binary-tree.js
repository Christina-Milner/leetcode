/* Given the root of a binary tree, return its maximum depth.
 The maximum depth is the number of nodes along the longest path fromt he root to the farthest leaf. */

/*
- If both of the root's children are null, the result is 1. This feels like the base case for a recursive operation.
- Otherwise, call the function on both children, including an accumulator or something to store the 1. 
- Keep a variable for the max depth somewhere outside the recursive function so it can be updated whenever a 
    recursive call finds a higher number

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
function maxDepth(root, acc = 0) {
    if (!root) {return acc}
    acc++
    return Math.max(maxDepth(root.left, acc), maxDepth(root.right, acc))
};

function maxDepth(root) {
    const recursiveHelper = (root, acc = 0) => {
        if (!root) {return acc}
        acc++
        return Math.max(recursiveHelper(root.left, acc), recursiveHelper(root.right, acc))
    }
    return recursiveHelper(root)
};

/* So! Told ya I get recursion when an accumulator is involved. 
    Realised I didn't need a temp solution variable if I just returned the max of the two possible branches,
    which in turn meant I didn't need a helper function at all.
    For some reason, the version with the helper appears to be consistently performing a bit better on runtime, 
    so including it here ¯\_(ツ)_/¯ . 
    Oh, and since I have to check whether root is null before attempting to access its properties, it quickly
    dawned on me the base case was root is null, rather than root children are null.
    Time complexity of this thing should be O(n).
    Space complexity I'm not actually sure about. I'm not creating any new data structures, so no auxiliary space used,
    but what about all those pending operations while Math.max waits for the results of the recursive calls?
    */