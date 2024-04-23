/* Given an array of integers, find the maximum sum of a pair of numbers from nums such that
the maximum digit of both numbers is equal. Return that or -1 if nonexistent. */

/*
- Brute force solution would be nested loop, take first number, determine max digit, iterate over rest of array looking for numbers with same max digit and update sum
    as appropriate
- More efficient solution is going to be similar to Two Sum: a hashmap keeping track of potential "partners" for each number.
- So: Iterate over array. Populate hashmap with max digit as key and a number array as values
- If 2 numbers have already been found for a digit and another one turns up, compare to the two existing ones and, if bigger than one, boot out the smaller one and add
    the new one
- Max digit could be found by repeatedly integer dividing by 10/taking modulo 10 (keeping track of biggest result seen) or converting to string (and then iterating over the string or
    splitting to array and finding the max or w/e)
- Check which digit pair has biggest sum at the end or return -1 if no pairs

*/


/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSum(nums) {
    const maxDigit = num => {
        let max = 0
        num = Math.abs(num)
        while (num >= 10) {
            let digit = num % 10
            if (digit > max) {
                max = digit
            }
            num = Math.floor(num / 10)
        }
        if (num > max) { max = num}
        return max
    }

    let digitMap = {}

    for (let num of nums) {
        const max = maxDigit(num)
        if (!(max in digitMap)) {
            digitMap[max] = [num]
        }
        else if (digitMap[max].length < 2) {
            digitMap[max].push(num)
        }
        else {
            let [bigger, smaller] = [Math.max(...digitMap[max]), Math.min(...digitMap[max])]
            if (num >= smaller) {
                digitMap[max] = [num, bigger]
            } 
        }
    }
    const maxSum = Object.values(digitMap).filter(e => e.length == 2).reduce((acc, cur) => cur[0] + cur[1] > acc ? cur[0] + cur[1] : acc, 0)
    return maxSum || -1
};
