/* Given the root of a binary tree and an integer, return a boolean indicating whether it has a root-to-leaf path with values that add up to the desired sum. */


/*
- If the original root is null, we need to return false. 
- If the original root's children are null (i.e. it is a leaf), we only return true if its value equals the target sum, otherwise false
- Otherwise, we recursively call it as an OR on its two children, passing in the current sum
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
 * @param {number} targetSum
 * @return {boolean}
 */
function hasPathSum(root, targetSum, currentSum = 0) {

    const isLeaf = root => root && !root.left && !root.right

    if (!root) { return false }
    const current = currentSum + root.val
    if (current === targetSum && isLeaf(root)) { return true }
    return hasPathSum(root.left, targetSum, current) || hasPathSum(root.right, targetSum, current)
};