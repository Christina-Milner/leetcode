/* Given a non-negative integer, return its square root rounded down to the nearest integer. Do not use any inbuilt exponent functions or operators. */

/*
- Math.sqrt() isn't technically an exponent function/operator, but it stands to reason it's out, too
- So we basically iterate over some numbers until we either get one that produces the input when multiplied with itself, or we overshoot and
    know we have to go one lower
- Just need to watch efficiency, x goes up to 2 ** 31 - 1
- We certainly don't need to go higher than half the input (apart from x = 1), but can we reduce it further?
- What about a binary search type approach? Where we try x / 2, if it overshoots (which it will unless x is 4), we halve it, and so on?
*/



/**
 * @param {number} x
 * @return {number}
 */
const mySqrt = function(x) {
    if (x == 1) {return 1}
    let root = Math.floor(x / 2)
    let prev = Math.floor(x / 2)
    if (root * root < x) {
        return root
    }
    while (root * root !== x) {
        const squared = root * root
        const temp = root
        if (squared > x) {
            if ((root - 1) * (root - 1) < x) {
                return root - 1
            }
            if (prev >= root) {
                root = Math.floor(root / 2)
            }
            else {
                root = prev + Math.floor((root - prev) / 2)
            }
        }
        else if (squared < x) {
            if (prev == root) {
                root++
            }
            else if (prev >= root) {
                root += Math.floor((prev - root) / 2)
            }
            else {
                root += Math.floor((root - prev) / 2)
            }
        }
        prev = temp
    }
    return root
};