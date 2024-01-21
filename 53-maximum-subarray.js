/* Given an integer array, find the subarray with the largest sum and return the sum.

Example:

nums = [-2,1,-3,4,-1,2,1,-5,4]
Solution: 6
[4,-1,2,1] has the largest sum.
*/

//P: An array of numbers
//R: A number

/*
- This feels weirdly familiar but I don't seem to have any submissions for it so...
- So, unlike with longest common subsequence, it appears that here the "subarray" has to be CONSECUTIVE elements
- There is a "follow-up" of "If you have figured out the O(n) solution, try coding another solution using divide and concquer". How the heck do you do this in O(n)??
- It HAS to be two pointers. It's always two pointers.
- I am pretty sure I have tried this before and followed a sort of "for each negative number, check if the numbers behind it are worth including it" sort of approach but that evidently didn't work
- So ... sum up the whole array, then put a pointer at the start and a pointer at the end and see how the sum changes when we move those?
- Let's see if I can manage the brute force solution at least: a nested loop (O(n**2)) where for each element, we check what the maximum possible sum is for a subarray with it as the starting element
    - max variable outside for loop
    - for number of array:
        - Initialise a current sum of just this number, and another "current max"
        - Iterate over remaining array to the right of this number and add these elements, updating current max as appropriate
        - Update total max after loop as appropriate
- I've peeked in the "discussions" and apparently the O(n) solution is something called Kadane's algorithm. Will have a look at that after, but chances I figure that out on my own are pretty low.
*/

function maxSubArray(nums) {
    let totalMax = nums.length ? nums[0] : 0;
    for (let i = 0; i < nums.length; i++) {
        let currentMax = nums[i];
        let tempTotalMax = nums[i];
        for (let j = i + 1; j < nums.length; j++) {
            currentMax += nums[j];
            tempTotalMax = Math.max(currentMax, tempTotalMax);
        }
        totalMax = Math.max(totalMax, tempTotalMax);
    }
    return totalMax;
}

/* That gets to 204 out of 210 test cases and then times out as apparently no O(n**2) solutions allowed. I'm looking up what Kadane's algorithm is.
With help from GeeksForGeeks pseudocode https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/ (top Google result from Simplilearn is bad):
*/

function maxSubArray(nums) {
    let maxSoFar = -Infinity;
    let maxEndingHere = 0;
    for (let i = 0; i < nums.length; i++) {
        const cur = nums[i];
        maxEndingHere += cur;
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
        maxEndingHere = maxEndingHere < 0 ? 0 : maxEndingHere;
    }
    return maxSoFar;
}

/* Divide and conquer looks like a merge sort sort of deal that's a lot more code and isn't even faster (O(n logn)), so... why? */