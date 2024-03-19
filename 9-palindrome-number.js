/* Given an integer, return a boolean indicating whether it is a palindrome. 

Example: 121 => true
-121 => false
10 => false
*/

/*
- The obvious solution is converting it to a string and going from there, but that is trivial (have 2 pointers that move from the outside in and check whether their respective elements are the same)
- At the bottom, it does specifically say, follow up: could you solve it without converting the integer to a string?
- I wonder! 
- So, any negatives are immediately out
- Anything smaller than 10 is immediately true
- For everything else, it's integer division/modulos, no? Like you check how high you can to go in the powers of 10 and still have a number smaller than x (gnashing your teeth at 
    the fact you cannot use the length property for it)
- Like for 121, the biggest power of 10 is 100. 121 // 100 = 1. 121 % 10 is also 1. We ignore the middle power.
- If it was 1221, it'd be 1221 // 1000, and 1221 % 10, then 1221 % 1000 to get rid of the first 1 and 221 - 1 to get rid of the second? Then with a two-digit number, you check whether it // 10 and it % 10 are the same?

*/


/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = function(x) {
    // Was hoping to do this without converting to string, but could not find a way around
    // leading zeroes, so just band-aiding this line on
    x = Number(String(x).replace(/0/g, "9"))
    // A minus at the start always means no palindrome
    if (x < 0) { return false }
    // A single digit always is a palindrome
    if (x < 10 ) { return true }
    // Find the highest power of 10 that fits into the number
    let pow = 0
    while (10 ** pow < x) {
        pow++
    }
    if (10 ** pow > x) {pow--}
    // Integer division by that power of 10 and modulo 10 get us the first and last digit, for comparison 
    if (Math.floor(x / 10 ** pow) !== x % 10) { return false }
    // Get rid of the digits we just checked and recursively call function on what remains
    return isPalindrome(Math.floor((x % (10 ** pow)) / 10))
};

/* That got through 7756 of 11511 test cases or so, but then leading zeroes become a problem. Leading zeroes just disappear when treating x as number, so 1000021 gets classed as a palindrome
as only the remains after the two ones are compared and removed. 
Pity, I liked the recursive solution (came to me when I typed out the single line case and thought, this smells like a base case). 
What we'll have to do instead is to use a two pointer approach with the powers of 10. 
But what, eeven if I get this working with 1000021, if a number with leading zeroes is passed in to begin with, I have no chance of catching it without converting to string. Screw it, that's what we're doing.
Just adding a line to replace out zeroes at the top because nothing's stopping me from getting rid of them.
This is the actual solution using numbers only, converted from Python:
*/
const isPalindrome2 = function(x) {
    if (x < 0 || x !== 0 && x % 10 == 0) {
        return false;
    }
    let half = 0;
    while (x > half) {
        half = (half * 10) + (x % 10);
        x = Math.floor(x / 10);
    }
    return x == half || x == Math.floor(half / 10)
};

/* ... annd that takes me from "beats 5%" to "beats 99%". Amazing. I had the general idea of "it's to do with 10s and modulos", but failed to implement it correctly. */

/* Happened to be discussing code with someone and it occurred to me how to fix my recursive approach. It's cumbersome and not a good solution to this problem,
but it's fixable (just keep comparing to the powers of 10 to detect leading zeroes that went bye bye): */

const isPalindrome3 = function(x) {
    // A minus at the start always means no palindrome
    if (x < 0) { return false }
    // A single digit always is a palindrome
    if (x < 10 ) { return true }
    // Find the highest power of 10 that fits into the number
    let pow = 0
    while (10 ** pow < x) {
        pow++
    }
    if (10 ** pow > x) {pow--}
    // Integer division by that power of 10 and modulo 10 get us the first and last digit, for comparison 
    if (Math.floor(x / 10 ** pow) !== x % 10) { return false }
    let potentialNewNum = Math.floor((x % (10 ** pow)) / 10)
    // Did removing the first digit take us to a bunch of leading zeroes?
    pow -= 2
    while (10 ** pow > potentialNewNum) {
        if (potentialNewNum % 10 !== 0) {
            return false
        }
        potentialNewNum = Math.floor(potentialNewNum / 10)
        pow -= 2
    }
    // Get rid of the digits we just checked and recursively call function on what remains
    return isPalindrome(potentialNewNum)
};