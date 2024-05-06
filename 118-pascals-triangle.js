/* Given an integer num, return the first num rows of Pascal's triangle (a triangle with a 1 at the top and along the edges and every number being the sum
    of the two above it.) 
Example 1:

Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
*/

/*
- I am almost positive I've done this on Codewars, but let's see if I remember without googling it or looking up my old solution. It shouldn't be hard.
- Question is, is there a way to do it other than actually calculating each row?
- The row subarrays are all 1 longer than their index in the larger array
- And the first and last element is always 1
- The second and penultimate element appear to always be the index (see pyramid below)
- But, hm, nah, not seeing a useful pattern other than the one that defines it. So will just have to start with [[1], [1, 1]] and figure out calculating the rest from that
- Each number at index n (excluding 0 and length - 1) is the sum of the previous row at n - 1 and n, no?

                            1
                        1       1
                    1       2       1
                1       3       3       1
            1       4       6       4       1
        1       5       10      10      5       1
    1       6       15      20      15      6       1
1       7       21      35      35      21      7       1
*/



/**
 * @param {number} numRows
 * @return {number[][]}
 */
function generate(numRows) {
    if (!numRows) { return [] }
    let solution = [[1]]
    while (solution.length < numRows) {
        const row = solution.length + 1
        let newRow = Array.from({length: row}, () => 0)
        newRow[0] = 1
        newRow[row - 1] = 1
        for (let i = 1; i < row - 1; i++) {
            newRow[i] = solution[row - 2][i - 1] + solution[row - 2][i]
        }
        solution.push(newRow)
    }
    return solution
};
