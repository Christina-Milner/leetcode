/* Given two roots of binary trees, write a function to check if they are the same (structurally identical and the same values). */

/* 
- So... do 2 nulls count as 2 identical trees? I guess so?
- Otherwise, if only one root is not null or their values aren't the same, it's false
- If that passes, recursively call on the lefts and rights? But without a return, like just call it?
- Then have a return true after the recursive calls? Will that work?
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
const isSameTree = function(p, q) {
    if (!p && q || p && !q || p && q && p.val !== q.val) {
        return false
    }
    else if (p && q) {
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)        
    }
    return true
};

/* Right, trial and error made me realise I did need a return on the recursive call, otherwise it was hitting return true when it wasn't supposed to,
    which logically only leaves doing an AND of the two options. */