/* Given a string s consisting of words and spaces, return the length of the last word. */

/*
- There's a few ways to do this - the obvious one would be to split by spaces and then return length of last item in the array
- lastIndexOf space won't work, at least not without using trim() or something first, because there's strings with trailing spaces
- If I pretend the splitting option is not a thing: initialise a pointer at end of string
- If there's a space there, decrement it until there isn't, then decrement until there is again and return difference between those two indices
- If there isn't a space, just decrement until there is one and return difference between that index and string length
- Track this by initialising a second pointer at string end that gets moved to first non-space character first
*/



/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLastWord = function(s) {
    let endOfLastWord = s.length - 1
    while (s[endOfLastWord] === " " && endOfLastWord > 0) {
        endOfLastWord--
    }
    let startOfLastWord = endOfLastWord
    while (s[startOfLastWord] !== " " && startOfLastWord >= 0) {
        startOfLastWord--
    }
    return endOfLastWord - startOfLastWord
};

/* Righto. And this has O(n) time complexity, of course. */