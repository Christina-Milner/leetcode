/* Given an array of strings, find the longest common prefix. Return the empty string if none present.
Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"
*/

/*
- Naive solution is: Set entire first array element as longest common prefix (assuming this is the desired result if array length is 1), then iterate over rest of array, iteratively compare it to the current string
    and trim as needed on mismatches.
- I think that's O(n)? It does involve repeatedly iterating over the temp result, but that alone doesn't make it quadratic
- I don't think I see a way to streamline that? The DP solution for longest common subsequence doesn't apply here and also ran in quadratic time I'm pretty sure

*/

/**
 * @param {string[]} strs
 * @return {string}
 */
const longestCommonPrefix = function(strs) {
    if (!strs.length) { return "" }
    let result = strs[0]
    for (let i = 1; i < strs.length; i++) {
        const cur = strs[i]
        if (result.length > cur.length) {
            result = result.slice(0, cur.length)
        }
        for (let j = 0; j < result.length; j++) {
            if (result[j] !== cur[j]) {
                result = result.slice(0, j)
                break
            }
        }
    }
    return result
};

/* Checking the top solution by others, that suggests sorting the array (lexicographically) and then only comparing the first and last element.
    If sorting is n log n, is that actually better, though? */