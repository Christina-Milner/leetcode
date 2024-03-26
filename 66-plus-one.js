/* Given an array of numbers representing the digits of a large number, increment it by one.
Example: [9] -> [1, 0].
*/


/*
- This is vaguely reminiscent of the Codewars about doing long-form maths to preserve numbers bigger than what JS can display accurately
- So, we index into the last element and increment it by one
- If it is a 9, it becomes a 0 instead and we have a "carry"
- The carry gets added to the next element or unshifted into the array if there aren't any more

*/



/**
 * @param {number[]} digits
 * @return {number[]}
 */
const plusOne = function(digits) {
    let carry = 0
    let pos = digits.length - 1
    do {
        if (pos < 0 && carry) {
            digits.unshift(carry)
            break
        }
        let inc = pos == digits.length - 1 ? digits[pos] + 1 : digits[pos] + carry
        carry = Math.floor(inc / 10)
        inc = inc % 10
        digits[pos] = inc
        pos--
    }
    while (carry)
    return digits
};


