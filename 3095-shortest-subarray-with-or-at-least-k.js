/* Given an array of non-negative integers and an integer, return the length of the shortest non-empty subarray where the bitwise OR of its elements is at least k.
Return -1 if no such thing exists. */

/*
- I barely know what bitwise or means. Is that where you take the numbers as binary and every digit where at least one has a 1 gets a 1?
- Hint says the constraints are small and brute forcing will work. Ok?
- JS has an operator for this, |
- Worth noting a subarray is a continuous sequence, otherwise the [2, 1, 8] and k = 10 example would result in [2, 8], not [2, 1, 8]
- Wait hang on we don't have to return the subarray, just the length
- If any element in the array is bigger than or equal to k, that is it, no? Answer is 1.
- Otherwise ... check for each element how long the subarray starting there would have to be to get it?
*/



/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minimumSubarrayLength = function(nums, k) {
    let solution = -1
    for (let i = 0; i < nums.length; i++) {
        const cur = nums[i]
        if (cur >= k) {
            return 1
        }
        let tempSum = 0
        for (let j = i; j < nums.length; j++) {
            if ((tempSum | nums[j]) >= k && (solution < 0 || j - i < solution)) {
                solution = j - i + 1
            }
            tempSum = tempSum | nums[j]
        }
    }
    return solution
};

