/* Given a roman numeral (a string), convert it to an integer. */


/* 
- This had a Python attempt at a solution filled in but no submissions, so it looks like I attempted to do this at some point, but was foiled by how to do the subtraction for things like IX correctly.
- The answer to that is EZ: include the 4 and 9 values in your hashmap.
- It feels like there *should* be a "check if there is a value bigger than this to the right of this one and if so, this current one is a negative" type solution, but it's more of a pain than it's worth
- Integer to Roman I've always done recursively, but that's because doing the recursive call on the modulo just looks real smooth. With a string we're just subbing stuff out of, I'm leaning towards a while loop.
*/


/**
 * @param {string} s
 * @return {number}
 */
const romanToInt = function(s) {
    const map = {CM: 900, M: 1000,  CD: 400, D: 500, XC: 90, C: 100, XL: 40, L: 50, IX: 9, X: 10,  IV: 4, V: 5, I: 1}
    let result = 0
    while (s.length) {
        for (let key in map) {
            if (s.includes(key)) {
                s = s.replace(key, "")
                result += map[key]
            }
        }
    }
    return result
};

/* The above works fine, but the repeated iteration over all the keys in the object feels wasteful. So I tried writing a solution that only passes over the string once: */


const romanToInt_new = function(s) {
    const map = {CM: 900, M: 1000,  CD: 400, D: 500, XC: 90, C: 100, XL: 40, L: 50, IX: 9, X: 10,  IV: 4, V: 5, I: 1}
    let result = 0
    let pointer = 0
    while (pointer <= s.length - 1) {
        if (s[pointer + 1] && (s[pointer] + s[pointer + 1]) in map) {
            result += map[s[pointer] + s[pointer + 1]]
            pointer += 2
        } else {
            result += map[s[pointer]]
            pointer++
        }
    }
    return result
};

/* That also works, but with an absolutely catastrophic runtime performance (beats 5% of JS users, as opposed to 15% or so for the previous one), which slightly confuses me.
Ok, mystery solved - I'd left one console.log in, and after removing it, I just had to click submit repeatedly to get it from "beats 8%" to "beats 75%", so I'm going to assume these
numbers are meaningless decor and move on with my life. */