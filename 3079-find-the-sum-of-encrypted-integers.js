/* Given an array of positive integers, assume the function encrypt() replaces every digit of every number with its largest digit (e.g. encrypt(523) = 555).
Return the sum of the encrypted elements.*/

/*
- Right, so encrypt() could be done by converting to string to be able to iterate over the number. Or if you wanted to avoid that you'd integer divide by the highest power of 10
    then subtract the result of that and repeat the process to check the individual digits, but why
- Is converting the numbers and summing up the array actually what this is going for, though? Surely there's another catch. Otherwise this is just a reduce
- There's a hint saying "encrypted numbers are of the form 11...1 * maxDigit". I have no idea what that's supposed to mean.
- Let's see what happens with the obvious approach

*/



/**
 * @param {number[]} nums
 * @return {number}
 */
const sumOfEncryptedInt = function(nums) {
    const encrypt = num => {
        const numToStr = String(num)
        const max = Math.max(...numToStr.split('').map(Number))
        return Number(String(max).repeat(numToStr.length))
    }
    return nums.reduce((acc, cur) => acc + encrypt(cur), 0)
};

/* Hm ... ok? Sure? From 3 submits, it does look like it's on the slower end, but doing well on memory.
One of the top solutions is basically this but in Python, and Python makes this a lot easier as it apparently allows feeding a string into max()
and numbers have a length property. */

const sumOfEncryptedInt2 = function(nums) {
    const encrypt = num => {
        const numToStr = String(num)
        let max = 0
        for (let char of numToStr) {
            if (Number(char) > max) {
                max = Number(char)
            }
        }
        return Number(String(max).repeat(numToStr.length))
    }
    let total = 0
    for (let num of nums) {
        total += encrypt(num)
    }
    return total
};

/* Wrote this second version to see how tinkering with bits of the algorithm would affect performance (and also because I'm never quite sure
whether I'm even allowed to use inbuilt methods as so many of the problems rely on pretending they don't exist).  It's about the same speed, but
generally better with memory. As a final refactor, I think I would keep the reduce from the first version (no need to reinvent the wheel with a
for loop), but keep the second version's approach to finding the maximum digit. */