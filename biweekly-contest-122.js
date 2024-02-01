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

// 3012 Minimize Length of Array Using Operations

/* Given an array of positive integers, you are allowed to do this operation any number of times: select 2 indices of nonzero elements, insert the modulo of the two at the end of the array, delete the original elements
 from it. 
 Return the minimum length of nums.
 Example: [1, 4, 3, 1] => [1, 4, 3, 1, 3] => [1, 1, 3] => [1, 1] => [0] => result is 1

 [5, 5, 5, 10, 5] => [5, 5, 5, 10, 5, 5] => [5, 5, 5, 5] => [5, 5, 5, 5, 0] => [5, 5, 0] => [0, 0] => 2
 
 */

 //P: An array of numbers
 //R: A number

 /*
- An array cannot be reduced further if it has fewer than 2 nonzero elements remaining, so, length 0, length 1, length 2 with one zero, or any length with all elements being zeroes
- Given the length of the array goes up to 10 ** 5, I suspect performance will be an issue. Surely actually doing the swaps step by step is too inefficient.
- But what if the modulo of idx 0 and 1 is the perfect partner for the next pairing? 
- Iterate over it, keeping track of the indices we want to boot but also the modulos that are going to get added, and check those as you go
- Keep doing this with a "only divisions that don't result in a remainder of 0" criteria until you get a loop with no swaps, then allow any divisions for further simplification?

 */

const minimumArrayLength = function(nums) {
    if (nums.length < 2) {return nums.length;}
    let current = nums.slice();
    let toAppend = [];
    let toRemove = [];
    let zeroesAllowed = false;
    let swapsMade = false;
    let first = 0;
    let second;
    while (true) {
        for (let i = 0; i < nums.length; i++) {
            let cur = nums[first];
            if (!cur) {
                first++;
                continue;
            }
            if (i == first) {continue;}
            second = i;
            if (!nums[second]) {continue;}
            if (!zeroesAllowed && nums[second] % cur !== 0 || zeroesAllowed) {
                toRemove.push(first, second);
                toAppend.push(cur % nums[second]);
                second = null;
                first = i + 1;
                swapsMade = true;
            }
        }
        if (swapsMade) {
            current = current.filter((e, idx) => !toRemove.includes(idx)).concat(toAppend);
            toAppend = [];
            first = 0;
        } else if (!swapsMade && !zeroesAllowed) {
            zeroesAllowed = true;
        } else if (!swapsMade && zeroesAllowed) {
            break;
        }
    }
    return current.length;
};