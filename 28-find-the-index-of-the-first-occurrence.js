/* GIven two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack. 

Example: haystack = "sadbutsad", needle = "sad"
Output: 0
*/


/*
Picked this as it's tagged Two Pointers and I've been focusing on that. 
So, unless I'm missing something, the JS method indexOf just does exactly this. It works fine with more than one character. 
But I assume I'm meant to pretend that doesn't exist (and this challenge was probably written with PITA languages in mind)?
(For the record, submitting it using indexOf beats 94.12% of JS users on time and 76.03% on space. Eheheee.)

I would think, iterate over the haystack string looking for the first character of needle. Once you find it, start a nested loop
checking for the rest of the string that aborts as soon as it finds a mismatch. If you get to the end of needle, return the current i.
At the end of the loop (no match found), return - 1.

*/

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */

// Real world solution

const strStr = function(haystack, needle) {
    return haystack.indexOf(needle)
};


// "I'm learning about algorithms" solution

const strStr_manual = function(haystack, needle) {
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        let cur = haystack[i]
        if (cur === needle[0]) {
            // I mean seriously here I could just go "if haystack.slice(i, i + needle.length) === needle", but then WHERE IS MY SECOND POINTER
            for (let j = i; j < i + needle.length; j++) {
                let k = j - i
                if (haystack[j] !== needle[k]) {
                    break
                }
                if (j === i + needle.length - 1) {
                    return i
                }
            }

        }
    }
    return -1;
};
/* (Meanwhile, that solution performs absolutely terrible on time and space complexity. Renaming it so VS Code stops yelling at me.) */
/* The takeaway here is apparently the Knugh-Morris-Pratt String Matching Algorithm? */