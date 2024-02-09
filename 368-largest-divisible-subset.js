/* Given an array of unique integers, return the largest subset where the two numbers of all pairs are divisible by another (answer[i] % answer[j] = 0 or answer[j] % answer[i] = 0). With multiple options, any of them will do.*/

//P: An array of numbers
//R: An array of numbers


/* 
- This feels like it should be DP again, but I'm not sure how that works when the return is an array rather than a number? 
- Or rather, this feels like the problem the other day where I ended up doing, I think tabulation it was, without even knowing what that is
- Like if the array has 1 element, the answer is just that
- If the array has 2 elements, the answer is the original array if they're divisible by one another and either of the elements if they're not
- Beyond that, just do permutations like I did with whatever that other thing was? So:
    - Create new array
    - Iterate over old array
    - For each element of old array, add it to new array as an array by itself as well as to any subarrays that fulfill the condition
    - Although actually - if it fit into any of the existing arrays, no need to open a new one, this is not like sliding window
    - At the end, return longest subarray 
- Sounds like quadratic runtime, but maybe this is one of the problems where that's okay
 */



/**
 * @param {number[]} nums
 * @return {number[]}
 */
const largestDivisibleSubset = function(nums) {
    let solutions = [];
    for (let i = 0; i < nums.length; i++) {
        const cur = nums[i];
        let added = false;
        let newCombos = [];
        for (let subArr of solutions) {
            if (subArr.every(num => Math.max(num, cur) % Math.min(num, cur) == 0)) {
                newCombos.push(subArr.concat(cur));
            }
        }
        if (newCombos.length) {
            solutions = solutions.concat(newCombos);
        } else {
            solutions.push([cur]);
        }
    }
    return solutions.reduce((acc, cur) => cur.length > acc.length ? cur : acc, []);
};


const largestDivisibleSubset2 = function(nums) {
    let copy = nums.slice().sort((a, b) => a - b);
    let max = [];
    for (let i = copy.length - 1; i >= 0; i--) {
        const cur = copy[i];
        let temp = [cur];
        for (let j = i - 1; j >= 0; j--) {
            if (cur % copy[j] == 0) {
                temp.push(copy[j])
            }
        }
        if (temp.length > max.length) {
            max = temp;
        }
    }
    return max;

};
const largestDivisibleSubset3 = function(nums) {
    const n = nums.length;
    
    // Edge case: if there are less than or equal to one element, return the input array
    if (n <= 1) {
        return nums;
    }

    // Sort the input array in ascending order
    nums.sort((a, b) => a - b);
    
    // Initialize arrays to store the length of the largest divisible subset ending at each index,
    // as well as the previous index of each element in the largest divisible subset
    const dp = new Array(n).fill(1);
    const prev = new Array(n).fill(-1);
    
    // Initialize a variable to keep track of the index of the element with the largest divisible subset
    let maxIndex = 0;

    // Loop through each element in the input array
    for (let i = 1; i < n; ++i) {
        // Loop through each element before the current element
        for (let j = 0; j < i; ++j) {
            // Check if the current element is divisible by the previous element
            // and if adding the current element to the subset would result in a larger subset
            if (nums[i] % nums[j] === 0 && dp[i] < dp[j] + 1) {
                // Update the length of the largest divisible subset ending at the current index
                dp[i] = dp[j] + 1;
                // Update the previous index of the current element in the largest divisible subset
                prev[i] = j;
            }
        }

        // Update the index of the element with the largest divisible subset if necessary
        if (dp[i] > dp[maxIndex]) {
            maxIndex = i;
        }
    }

    // Reconstruct the largest divisible subset using the previous indices
    const result = [];
    while (maxIndex !== -1) {
        result.push(nums[maxIndex]);
        maxIndex = prev[maxIndex];
    }

    // Return the largest divisible subset in reversed order
    return result.reverse();
};