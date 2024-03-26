/* Having a look at the most recent problems as well so I'm not just doing the oldest ones.
Given a string s, return the maximum length of a substring such that it contains at most two occurrences of each character. */


/*
- So, try to solve first, worry about optimising later
- The brute force approach would be iterating over the string once from each starting position, creating a hash map of the 
    characters present, and aborting/updating the length as appropriate once a character is encountered that's already present twice
- I am going to go have a peek at "longest substring without repeating chars", though, because it does feel like a variation on that
- Ok, my own solution to that was actually pretty close to what I described above, except instead of iterating over the string from every possible
    starting position, I went to the index + 1 of the letter I had just encountered the duplicate of
- That should be stealable if I use an array of the indices where I've encountered it as the value in the hashmap with the letter as key
*/


/**
 * @param {string} s
 * @return {number}
 */
const maximumLengthSubstring = function(s) {
    let currentMax = 0
    let totalMax = 0
    let letters = {}
    let pointer = 0
    while (pointer < s.length) {
        const cur = s[pointer]
        if (!(cur in letters)) {
            letters[cur] = [pointer]
            currentMax++
            pointer++
        }
        else if (letters[cur].length == 1) {
            letters[cur].push(pointer)
            currentMax++
            pointer++
        }
        else {
            if (currentMax > totalMax) {
                totalMax = currentMax
            }
            pointer = letters[cur][0] + 1
            letters = {}
            currentMax = 0
        }
    }
    if (currentMax > totalMax) {
        totalMax = currentMax
    }
    return totalMax
};

/* Needed a small adjustment - restart iterating at one after the first occurrence of the letter, rather than the second. Otherwise fine.
Time complexity is quadratic, I fear (on a string of all the same character, it would iterate from every possible starting position), but
apparently that's good enough here? */
