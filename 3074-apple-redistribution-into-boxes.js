/* 
Given 2 arrays, one with packs of apples containing arr1[i] apples each, and one of boxes with a capacity of arr2[i] apples each,
return the minimum number of boxes required to pack up all the apples, keeping in mind that apples from the same pack can go in different boxes.
*/

/*
- My take is the array of apple packs is 100% useless and all we need is to sum it up once to know how many apples there are to distribute
- It says the input is generated such that it's possible to redistribute the apples into boxes so I guess we don't need to do a "are there more apples than there is capacity" check
- So, uh, sort the capacity array descending and then see how many elements we need to grab to achieve the total? Based on the examples, half-empty boxes are allowed.
*/



/**
 * @param {number[]} apple
 * @param {number[]} capacity
 * @return {number}
 */
const minimumBoxes = function(apple, capacity) {
    let totalApples = apple.reduce((acc, cur) => acc + cur, 0)
    let packed = 0
    const sortedCopy = capacity.slice().sort((a, b) => b - a)
    let pointer = 0
    while (pointer < sortedCopy.length && packed < totalApples) {
        packed += sortedCopy[pointer]
        pointer++
    }
    return pointer
};

/* 
- Aaaa how is this even remotely the same difficulty as the weird math stuff
- Doing pretty well on both time and space too - the latter surprises me as I expect leetcode to be full of people who'd rather
    modify the original to save space
- Time complexity n log n because there's a sort involved, yeah? The reduce is one O(n) operation, the sort probably an O(n log n) operation
    and the pointer moving over the box array another one, but it boils down to O(n log n).
- Space complexity O(n) because of the array copy, would be constant if I modified the original instead (at least I *think* we're talking about
    auxiliary space when we say space complexity?)
*/