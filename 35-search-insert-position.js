/* Given a sorted array of distinct integers and a target value, return the index where this value is found or where it would go if inserted in order.
The algorithm must have a time complexity of O(log n). */


/* 
- I'm kind of annoyed at the log n requirement because I felt good about myself for spotting that this is a binary search... for all of one second, then I realised that
    requirement makes it blatantly obvious.
- So, check input array at halfway mark (rounding down if odd length I guess). 
- If not desired element, halve the index if too big and add half if too small
- In the [1, 3, 5, 6] example - we start at idx 2. If target is 2, that is too big. So we check index 1. Still too big, so we check index 0 (half rounded down I guess). 
    That's too small, so we know we insert at 1. 
- If we're not finding the element, we know we have found the place to put it if:
    - We're at index 0 and still too big
    - We're at index length - 1 and still too small
    - We've checked two adjacent indices and they're bigger and smaller
- The way we throw away half the array on each pass does kind of suggest using a recursive function, but that would make keeping track of the actual index we're currently at
    more of a pain than it needs to be, so let's not
*/



/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchInsert = function(nums, target) {
    let idxToCheck = Math.floor(nums.length / 2)
    let prevIndex = null
    while (true) {
        let dist = prevIndex === null ? 0 : Math.max(Math.floor(Math.abs(prevIndex - idxToCheck) / 2), 1)
        const cur = nums[idxToCheck]
        if (cur === target) {
            return idxToCheck
        }
        else if (cur > target) {
            if (idxToCheck === 0 || prevIndex == idxToCheck - 1) {
                return idxToCheck
            }
            [prevIndex, idxToCheck] = [idxToCheck, idxToCheck - dist]
        }
        else {
            if (idxToCheck === nums.length - 1) {
                return idxToCheck + 1
            }
            if (prevIndex == idxToCheck + 1) {
                return prevIndex
            }
            [prevIndex, idxToCheck] = [idxToCheck, idxToCheck + dist]
        }
    }
};

/* There we go. The logic to properly update the index took longer than I would like to admit because math is hard, but we got there. */