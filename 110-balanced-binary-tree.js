/* Given a binary tree, determine if it is height-balanced (depth of the subtrees of each node does not vary by more than one). 
Examples:
        3
    9       20
          15  7
=> true

        1
    2       2
  3   3
4   4
=> false
*/

/*
- This is going to be one of those thing where the main function call just is something like absolute value of number of child levels left minus absolute value of number of child levels right 
    is smaller than or equal to one
- And those calls cascade down until they get to the leaves where it's 0 and then propagate back up
- So something like, if both right and left are null, return 0, otherwise, return recursive call on child + 1

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
function isBalanced(root) {
    const numberOfSubtrees = (root, acc = 0) => {
        if (!root) {return acc}
        if (root.left !== null && root.right !== null) {
            return Math.max(numberOfSubtrees(root.left, acc + 1), numberOfSubtrees(root.right, acc + 1))
        }
        else if (root.left !== null) { return numberOfSubtrees(root.left, acc + 1)}
        else { return numberOfSubtrees(root.right, acc + 1)}
    }
    if (!root) { return true }
    if (Math.abs(numberOfSubtrees(root.left) - numberOfSubtrees(root.right)) > 1) {
        return false
    }
    return isBalanced(root.left) && isBalanced(root.right)
};