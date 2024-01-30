/* Doing the problems from biweekly contest 122 just to see how hard the contests are and whether I could take part. */

// Problem 1: Divide an Array into Subarrays with minimum Cost I

/* Given an array of integers of length n, divide it into 3 disjoint contiguous subarrays such that their total cost (as determined by the first element) is minimised. */

//P: An array of numbers
//R: A number

/* 
- I SMELL POINTERS, three in this case
- Put one on the first element, one on the second and one on the last
- Save these values, though first won't change as we have to use first element.
- Move the second and third pointer towards each other and update value when lower one than previous is found
- Stop when they are next to each other
*/

const minimumCost = function(nums) {
    let min1=100, min2=100;
    for (let i=1; i < nums.length; i++){
        if(nums[i] < min1){
            min2 = min1;
            min1 = nums[i];
        } else if (nums[i] < min2){
            min2 = nums[i];
        }
    }        
    return nums[0] + min1 + min2;
};

// (Figured out myself I didn't actually need to move pointers, just keep two values and update them as I find lower ones, but had to peek to get the details right)

// Problem 2: 3011 Find if Array Can Be Sorted

/* Return whether a given array of positive integers can be sorted if the only valid operation to sort it is swapping two adjacent elements with the same number of set bits. */

//P: An array of numbers
//R: A boolean

/*  - This is labeled Medium but sounds easier than the previous one... just have to go through and check whether there are any adjacent elements that are the wrong way around in terms of value
    and have differing numbers of set bits, no?
    - I suspect it's not that easy, but let's see

*/

const canSortArray = function(nums) {
    const setBits = num => num.toString(2).split('').filter(e => e == "1").length;
    const bits = nums.map(e => setBits(e));
    const sorted = nums.slice().sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
        const cur = nums[i];
        const idx = sorted.indexOf(cur);
        if (i == idx) {continue;}
        let slice = idx > i ? bits.slice(i, idx) : bits.slice(idx, i);
        if (slice.filter(e => e != setBits(cur)).length) {
            return false;
        }
    }
    return true;
};

// Not quite as easy as I thought it was, but I did figure it out! And without having to actually do the sort, dear God.
// That is enough for today, I suspect 4 of these in a row would be too much and I would not manage them in 1:30.