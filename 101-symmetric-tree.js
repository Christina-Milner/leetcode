/* Given the root of a binary tree, check whether it is symmetric around its center. */

/*
- I thought I could simply recycle "is same tree", but I clearly don't understand how mirror images work
- Hee hee, but if I swap the left and rights, it does!

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
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if (!root) { return true }
    const isSameTree = function(p, q) {
        if (!p && q || p && !q || p && q && p.val !== q.val) {
            return false
        }
        else if (p && q) {
            return isSameTree(p.left, q.right) && isSameTree(p.right, q.left)        
        }
        return true
    };
    return isSameTree(root.left, root.right)
};