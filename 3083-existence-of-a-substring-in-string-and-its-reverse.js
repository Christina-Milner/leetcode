/* Given a string, find any substring of length 2 that would also be present in the reverse of s, and return true if you find one, false otherwise. */


/* 
- Create hashmap
- Iterate over string, looking at pairs of current element + neighbour
- If the two letters are the same, return true
- If not, form the reverse and check whether that's in the hashmap
- If yes, return true, if no, put current pair in and move on

*/


/**
 * @param {string} s
 * @return {boolean}
 */
const isSubstringPresent = function(s) {
    let map = {}
    for (let i = 0; i < s.length - 1; i++) {
        if (s[i] == s[i + 1]) {return true}
        const reverse = s[i + 1] + s[i]
        if (reverse in map) {return true}
        map[s[i] + s[i + 1]] = true
    }
    return false
};

/* That binary addition thing? 45 minutes. This? 5. I am definitely more of a words and letters person than a numbers person.*/