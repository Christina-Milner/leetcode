/* Given the root of a binary tree, return the inorder traversal of its nodes' values. */


/* At the bottom it says "recursive solution is trivial". That's a pretty bold statement to make, considering I just learned that "inorder" written as one word
is apparently in fact a word, or at least for developers it is. So it looks like it basically means "from left to right", although compared to the drawing here
https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/ the 1 and 3 in the example shouldn't be on a line.*/



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
 * @return {number[]}
 */
const inorderTraversal = function(root) {
    let solution = []
    const recursiveHelper = root => {
        if (root) {
        recursiveHelper(root.left, solution)
        solution.push(root.val)
        recursiveHelper(root.right, solution)
        }
    }
    recursiveHelper(root, solution)
    return solution
};
/* ^Looked this solution up as I genuinely didn't know how to do this.
    I struggle with recursion when it's not done in such a way that it accumulates the result and spits it out at the end.
*/


const inorderTraversal2 = function(root) {

    let solution = []
    if (!root) {
        console.log("No root")
        return solution
    }
    let current = root.left
    let toVisit = []
    while (current) {
        toVisit.push(current)
        current = current.left
        console.log("End of pushing left in ", toVisit.map(e => e.val))
    }
    while (toVisit.length) {
        let now = toVisit.pop()
        console.log("Now: ", now.val)
            solution.push(now.val)
            if (now.right) {solution.push(now.right.val)}
            console.log("Added to solution ", solution)
    }
    solution.push(root.val)
    current = root.right
    console.log("Switched to right ", current)
    let temp = true
    while (current) {
        toVisit.push(current)
        current = current.left
        console.log("Done pushing stuff in ", toVisit.map(e => e.val))
    }
    while (toVisit.length) {
        let now = toVisit.pop()
        if (temp) {
            solution.push(now.val)
            if (now.right) {solution.push(now.right.val)}
            temp = false
            console.log("First round B", solution)
        }
        else {
            if (now.right) {solution.push(now.right.val)}
            solution.push(now.val)
            console.log("Later rounds B", solution)
        }
    }
    return solution
};
```
            3
       2        null
    null  4
        1   
```
/* I tried making an iterative solution but am calling it quits here as I'm clearly doing it wrong. */

function inorderTraversal(root) {
    let toDo = []
    let solution = []
    let temp = root
    while (true) {
        if (temp) {
            toDo.push(temp)
            temp = temp.left
        }
        else {
            if (!toDo.length) {
                break
            }
            temp = toDo.pop()
            solution.push(temp.val)
            temp = temp.right
        }
    }
    return solution
}

/* ^Adapted from a Java solution. 
    So it goes all the way down the left branch like I was thinking, but then just does the right ones
    on the fly.*/