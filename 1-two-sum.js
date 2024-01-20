/* Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. 
Each input has exactly one solution and you can't use the same element twice. Order of solution elements does not matter. */

/* Example: 

nums = [3, 2, 4], target = 6
solution: [1, 2]

*/

//P: An array of numbers and a number
//R: An array of numbers

/* Full disclosure I just spotted that I actually solved this problem in Python 2 years ago and the solution looks fine to me,
so I'll just port it to JS and move on*/

function twoSum(nums, target) {
    let numMap = {};
    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i];
        if (complement in numMap) {
            return [i, numMap[complement]];
        }
        numMap[nums[i]] = i;
    }
}

/* Time and space complexity both O(n), it would stand to reason. */