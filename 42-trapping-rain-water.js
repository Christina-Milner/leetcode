/* Given an array of numbers, imagine these represent the height of blocks. Calculate how many units of water are being trapped between them.
Example: 
[0,1,0,2,1,0,1,3,2,1,2,1]
=> 6

Example 2: 
[4,2,0,3,2,5]
=> 9

*/

//P: An array of numbers
//R: A number

/*
- So, going through the example:
    - First block is 0. There's no water here, ignore, move on. 
    - Next comes 1. Water is still 0 but we need to save this somewhere to know how high  the "container" currently is.
    - Next is 0, so now we can add 1 unit of water to the total
    - Next is 2, but if there were no more blocks at all, we'd actually have to delete the current amount of water as it's not 
        actually contained anywhere if there isn't a right-hand wall, so:
- Set a water total and a water temp (both 0). The latter is for keeping amounts where we don't know the height of the right-hand block yet and may have to adjust it.
- First block encountered becomes the "left-hand block" and is tracked (both in height and in index)
- Any subsequent smaller blocks or zeroes encountered add left - current units of water to the temp
- Once a block of at least the same height as LH is encountered, make it the new LH and add current temp to total, and reset it
- But what if that ISN'T the case? If the last block in example 2 was just another 2 instead of the 5
    - I'd have to backtrack to the 3, subtract 1 unit for it and the 2 indices before it that were assuming a max height of 4 when it's only 3, and get rid of anything
        after it.
- We basically have to keep track of the current sum both assuming there'll be a right hand backing at least as high as the left one, and assuming whatever we've currently seen is
*/


function trap(height) {
    let totalVolume = 0;
    let tempVolume = 0;
    let leftWall = null;
    let potentialRightWalls = {};
    for (let i = 0; i < height.length; i++) {
        const cur = height[i];
        if (cur) {
            // First block encountered
            if (!totalVolume && !tempVolume) {
                leftWall = [cur, i]
                continue
            }
        }
        if (leftWall) {
            const prev = leftWall[0];
            // Block that should be covered with water but may not be if there isn't a right wall further down the line
            if (cur < prev) {
                potentialRightWalls[cur] = cur in potentialRightWalls ? potentialRightWalls[cur].concat(i) : [i];
                tempVolume += prev - cur;
            }
            // Block equal to previous one that encloses that part of the container
            else if (cur >= prev) {
                totalVolume += tempVolume;
                tempVolume = 0;
                leftWall = [cur, i];
                potentialRightWalls = {};
            }
        }
    }
    // If that loop finishes and temp isn't 0, there isn't a closing block as high as the left wall we were assuming
    while (Object.keys(potentialRightWalls).length) {
        let max = Math.max(...Object.keys(potentialRightWalls));
        let idx = potentialRightWalls[max].pop();
    }
    return totalVolume;
};

/* Trying to finish that last part up there just had me come up with the idea of doing this "row by row", naively like so:

[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
[0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0]
[0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1]

function trap(height) {
    let total = 0;
    let picture = [];
    while (height.some(e => e)) {
        picture.push(height.map(e => e ? 1 : 0));
        height = height.map(e => e ? e - 1 : 0)
    }
    for (let row of picture) {
        total += row.filter(e => !e).length - row.indexOf(1) - (row.length - 1 - row.lastIndexOf(1))
    }
    return total;
}

That works except for being too slow, runtime on that is horrendous but how can I abstract it? 
*/
/* Answer: I don't. It's two pointers again. Of course. */

function trap(height) {
    let left = 0, right = height.length - 1, leftMax = 0, rightMax = 0, water = 0;
    while (left <= right) {
        if (height[left] <= height[right]) {
            if (height[left] > leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] > rightMax) {
                rightMax = height[right];
            }
            else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    return water;
}