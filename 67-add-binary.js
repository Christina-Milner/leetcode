/* Given two binary strings, return their sum as a binary string. */

/*
- ? parseInt() to convert the binary strings to num, add them up, then use toString() to convert back? What am I missing?
- Is this aimed at languages that don't have these methods and I'm supposed to write them from scratch or something?
- There might be some trick to adding binary numbers up directly but if there is idk what it is
- Doing the methods by hand would mean:
    - parseInt: Iterate over string from the back and add up the appropriate powers of 2
    - toString: Kind of like a roman numerals deal, find highest power of 2 that will fit in and then iterate down from there until remaining number is 0
- Not doing that, though, because why would I
- Ah, the catch is that the numbers get too big for this to work accurately
- OK then I do need to look into how you add binary numbers https://www.wikihow.com/Add-Binary-Numbers
- I should've probably been able to figure that out, it works like regular addition except you treat 2 like 10
- I want to say we used arrays for Codewars problems about summing big strings, but I don't really see the advantage of doing that as opposed to keeping it a string?
- Oh yeah, to get access to reverse() because iterating from the back of 2 things of different lengths is a pain
*/


/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
const addBinary = function(a, b) {
    const first = a.split('').reverse()
    const second = b.split('').reverse()
    let solution = []
    let firstPointer = 0
    let secondPointer = 0
    let carry = 0
    while (firstPointer < first.length || secondPointer < second.length) {
        let firstValue = firstPointer < first.length ? Number(first[firstPointer]) : 0
        let secondValue = secondPointer < second.length ? Number(second[secondPointer]) : 0
        let digit = firstValue + secondValue + carry
        if (digit < 2) {
            solution.push(digit)
            carry = 0
        } else {
            solution.push(digit % 2)
            carry = 1
        }
        firstPointer++
        secondPointer++
    }
    if (carry) {
        solution.push(carry)
    }
    return solution.reverse().join('')
};
