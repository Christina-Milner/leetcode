/* Given an array nums sorted in ascending order, convert it to a height-balanced binary search tree.
Example:
Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: [0,-10,5,null,-3,null,9] is also accepted
*/ 
/*
- Find the element in the middle and make that the root
- Recursively call on left half to find left child and right half to find right child

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
 * @param {number[]} nums
 * @return {TreeNode}
 */
function sortedArrayToBST(arr) { 
    if (!arr.length) {
        return null
    }
    if (arr.length === 1) {
        return new TreeNode(arr[0], null, null)
    }
    let half = Math.floor(arr.length / 2)
    return new TreeNode(arr[half], sortedArrayToBST(arr.slice(0, half)), sortedArrayToBST(arr.slice(half + 1)))

};