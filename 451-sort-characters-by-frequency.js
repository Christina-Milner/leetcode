/* Daily challenge time!
Given a string s, sort it in decreasing order based on the frequency of the characters. Return the sorted string; if there are multiple answers, return any of them.* */ 

//*: This is a lie

//P: A string
//R: A string

/*
- I have no idea on what planet this is a Medium, but this I can do. 
- Use an object as a map, iterate over the string and add each character if not present or increment its value otherwise
- Then sort by the object values and put it back together
*/

/**
 * @param {string} s
 * @return {string}
 */
const frequencySort = function(s) {
    let map = {};
    for (let i = 0; i < s.length; i++) {
        let cur = map[s[i]]
        map[s[i]] = cur ? cur + 1 : 1;
    }
    /* const mySort = (str1, str2) => {
        if (map[str1] == map[str2]) {
            return str2.localeCompare(str1);
        }
        return map[str2] - map[str1];
    } 
    return s.split('').sort((a, b) => mySort(a, b)).join('');*/
    return Object.keys(map).sort((a, b) => map[b] - map[a]).map(e => e.repeat(map[e])).join('');
};

/* So, I'd originally forgotten to take into account that turning the characters into object keys would (conveniently) eat duplicates, but I needed those to be present 
    in the returned string. The solution I went to was to map to the number of characters I'd saved in the object.
    Then it occurred to me, wait, isn't that unnecessary, when I can just split the original string to get the characters and their correct counts.
    Howeverrr this is when it turned out the phrasing of the problem is a lie. For the string "loveleetcode", which has 4 x e, 2 x l, 2 x o, 1 x c, 1 x d, 1 x t and 1 x v,
        "eeeelolovtcd" was not in fact accepted as an answer - same letters do have to be grouped together. 
        So I wrote a custom sorting function that would go by alphabet if frequency was the same, but that solution appeared to be significantly slower than my previous
        one using map, which is why that version is commented out above. */