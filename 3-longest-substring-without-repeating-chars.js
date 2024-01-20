/* Given a string s, find the length of the longest substring without repeating characters.

Example:
s = "abcabcbb"
Solution = 3
Longest substring is "abc".

*/

//P: A string
//R: A number

/*
- Says I have attempted this, but not solved it. Should be able to do that now. 
- Need 2 variables, current max and total max, both start at 0
- Initialise empty object and start iterating over string
- For each letter in the string, add it to the object as the key and its index as the value, and increment the current max
- Once a letter is encountered that's already present in the object:
    - Compare current max with total max and update the latter if the former is bigger
    - Reset current max to 0
    - Wipe object
    - Resume iterating at the index of the first occurrence of that letter + 1
*/

function lengthOfLongestSubstring(s) {
    let totalMax = 0;
    let currentMax = 0;
    let letterMap = {};
    let pointer = 0;
    while (pointer < s.length) {
        let cur = s[pointer];
        if (cur in letterMap) {
            if (currentMax > totalMax) {
                totalMax = currentMax;
            }
            currentMax = 0;
            pointer = letterMap[cur] + 1;
            letterMap = {};
            continue;
        }
        letterMap[cur] = pointer;
        currentMax++;
        pointer++;
    }
    return Math.max(totalMax, currentMax);
}

/* Beats 12% on time, 5% on memory. Ahem. */
/* Here's one by someone else that beats 82% on time: */

var lengthOfLongestSubstring = function(s) {
    const setMap = new Set();
    let max = 0;
    let index = 0;
    for(let i = 0; i<s.length; i++){
        let key = s[i];
        while(setMap.has(key)){
            setMap.delete(s[index]);
            index++;
        }
        setMap.add(key);
        max = Math.max(max, setMap.size);
    }
    return max;
};

