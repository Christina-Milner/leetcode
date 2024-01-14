/* Given a sudoku board as a 2D array (of strings containing either a number or "." for empty cells), modify it in-place (!)  to solve it. 
All input is 9 x 9 boards with exactly one solution. */

//P: An array of arrays of strings
//R: Void

/*
- This is hard, probably too hard, but I've done at least parts of it before and it's going to keep floating around in my head until I figure it out.
- So, the in-place part throws an extra monkey wrench into the works (because then if you have to backtrack, how do you separate what was provided from 
    your guesses?) but tbh I think I'm going to work around it by writing something that returns a new array and then iterating over it to modify the old one
    once it has found a solution ¯\_(ツ)_/¯ 
- Otherwise:
    - You write helpers to check what's in the row, column and box. I have done this before on Codewars and will be yoinking them from there. (One is current array,
        one is 2D array reduced to each row's element at current index, and the last one was some slicing in groups of 3 shenanigans I don't need to pick apart again
        if I've done it before)
    - For each cell, you take the options of 1-9 and rule out any already present in the row, column or box
    - Then recursively call the function on the grid with each of the remaining options filled in
    - If the function reaches a state where it has 0 valid options for a cell, it returns
    - If it reaches a full grid but the grid violates the rules, it returns
    - If it reaches a full grid that fulfils the win conditions, it assigns it to a variable sitting outside the recursive function but inside the main function
        and returns
    - If that variable isn't null after the recursive function is done, iterate over the 2d array in it to modify the input to what's in there
    - Time and space complexity: Oh dear Lord I don't know. I suspect time is in polynomial territory. Space is awful because I'm generating a new array on
        each pass. I'll look at solutions later to see how to do it better.
*/

/*
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
function solveSudoku(board) {
    let solution = sudoku(board);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            board[i][j] = solution[i][j]
        }
    }
};



function sudoku(puzzle) {
    // Numbers that can be used as I need this in multiple places
    const nums = Array.from({length: 9}, (_, i) => String(i + 1))
    // Returns an array of arrays that are the columns of the puzzle
    const getColumns = (grid) => {
        let arr = []
        for (let i = 0; i < 9; i++) {
            arr.push(grid.map(row => row[i]))
        }
        return arr
    }
    // Returns an array of arrays that are the 3x3 boxes
    const getBoxes = (grid) => {
        let rowGroups = []
        let boxes = []
        for (let i = 1; i <= 3; i++) {
            rowGroups.push(grid.slice((i - 1) * 3, i * 3))
        }
        for (let group of rowGroups) {
            for (let i = 1; i <= 3; i++) {
                let box = group.map(row => row.slice((i - 1) * 3, i * 3)).reduce((acc, cur) => acc.concat(cur), [])
                boxes.push(box)
            }
        }
        return boxes
    }
    // Don't need rows as these are just the elements of the puzzle array

    // Find the 3 x 3 box that a given square at puzzle[y][x] is in
    const findBox = (x, y, grid) => {
        if (y < 3) {
            if (x < 3) {return getBoxes(grid)[0]}
            else if (x < 6) {return getBoxes(grid)[1]}
            else {return getBoxes(grid)[2]}
        }
        else if (y < 6) {
            if (x < 3) {return getBoxes(grid)[3]}
            else if (x < 6) {return getBoxes(grid)[4]}
            else {return getBoxes(grid)[5]}
        }
        else {
            if (x < 3) {return getBoxes(grid)[6]}
            else if (x < 6) {return getBoxes(grid)[7]}
            else {return getBoxes(grid)[8]}
        }
    }

    // Returns the possible choices for a square at x, y, excluding everything already present in that row, column or box
    const possibilities = (x, y, grid) => {
        return nums.filter(num => !grid[y].includes(num) && !getColumns(grid)[x].includes(num) && !findBox(x, y, grid).includes(num))
   }

    // Check whether the puzzle is filled out
    const filled = grid => grid.every(row => !(row.includes(".")))

    const recursiveSolver = (grid) => {
        if (filled(grid)) {
            return grid
        }
        let row, col
        for (let y = 0; y <= 8; y++) {
            for (let x = 0; x <= 8; x++) {
                if (grid[y][x] === ".") {
                    row = y
                    col = x
                }
            }
        }
        const possibilitiesArr = possibilities(col, row, grid)
        for (let num of possibilitiesArr) {
            grid[row][col] = num
            if (recursiveSolver(grid)) {
                return grid
            }
            grid[row][col] = "."
        }       
    }
    return recursiveSolver(puzzle)
}

/* Boh I forget I'd actually written a complete solver on CW. And sadly LC went down so I can't get the low-down on how to properly do this.
Lame. */