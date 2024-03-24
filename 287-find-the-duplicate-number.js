/* (Daily challenge)
Given an array of n + 1 integers in the range [1, n] inclusive, find the one repeated number and return it.
Can't modify the array and must use constant extra space. */

/*
- Right, no modifying means can't sort it (and constant space means no making a copy to do so)
- Constant space also means no hashmap
- So it has to be a maths hack of some sort
- I was about to say sum up array and check difference between that and the sum of numbers from 1 to n, but that only works if a number is 
    only repeated once
- Which is not the case, one of the examples is [3, 3, 3, 3, 3]
- So, looking at the examples (1 to 4 with an extra 2, an extra 3, or made up entirely of 3s) - 
    - The sum of the numbers from 1 to 4 is 10, the product is 24
    - The sums of the example arrays are 12, 13 and 15
    - The products of the example arrays are 48, 72 and 243
- Hm, not seeing it. The brute force approach would be to iterate over the numbers from 1 to n and check for each one whether we can find it more than once,
    so let's see if we can get away with that and take it from there
- We cannot get away with that :>
- Did some more literal brute forcing (like, in an Excel sheet). The sum ranges from len x 1 to len x (len - 1), going up in 1/len increments.
- Nope, going to have to give up. It'll be something really annoying like the cube root of whatever.

*/


/**
 * @param {number[]} nums
 * @return {number}
 */

// My solution that works, but is too inefficient to pass
const findDuplicate = function(nums) {
    for (let n = 1; n < nums.length; n++) {
        let seen = false
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] === n && !seen) {
                seen = true
            }
            else if (nums[i] === n && seen) {
                return n
            }
        }
    }
};

// Looking at solutions, I'm realising I even did the brute force approach wrong. I could've just done a nested nums[i] == nums[j] check. It's because I was mentally
// trying to replicate hashmap functionality.
// Actual solution appears to be this, "hare and tortoise":

const findDuplicate2 = function(nums) {
    let slow = nums[0];
    let fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);
    
    fast = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return fast;
};

/* Ok, so we are treating the array as a linked list with the index being the node and the value being the next node. In a linked list, a fast and slow pointer
will eventually meet if there is a cycle, and we are using that to find the duplicate. After identifying the meeting point, you reset the slow (or fast, apparently)
pointer back to the start and move them at the same pace until they meet again. The meeting point is the duplicate. I don't really understand why the extra round is necessary. */

//  Another alternative would be this binary search approach (search not on the array, which isn't sorted, but on the range of possible numbers), which is slower (n log n), but more intuitive to me:

function findDuplicate(nums) {
    let left = 1;
    let right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor(left + (right - left) / 2);
        let count = 0;

        // Count the numbers less than or equal to mid
        for (let num of nums) {
            if (num <= mid) {
                count++;
            }
        }

        // If count is greater than mid, the duplicate lies in the left half
        if (count > mid) {
            right = mid;
        } else { // Otherwise, it lies in the right half
            left = mid + 1;
        }
    }

    return left;
}

