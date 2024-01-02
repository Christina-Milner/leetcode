/* Given an integer array height of length n where each element is a vertical line of the given height, return the maximum amount of water
that can be held by a container formed by two of the lines and the x-axis. */

//P: An array of numbers
//R: A number

/*
- Given two lines, the water area (?) is the height of the shorter line (lower array value) times the difference in their indices (x-axis).
- In the example [1,8,6,2,5,4,8,3,7] => 49, just grabbing the two highest values would've created 8 x 5 = 40, so the 7 wins due to the extra 2
    on the x-axis
- In theory, the biggest area should be created by the first and last element, but not if a nearby element contributes more than it costs via
    the lower x value
- This is starting to sound suspiciously like two pointers again
- Put one pointer at 0 and one at length - 1
- Iterate towards the centre - if difference between current value and pointer value is greater than difference between their indices, swap

*/

const maxArea = function(height) {
    let leftIdx = 0;
    let rightIdx = height.length - 1;
    let water = 0;
    while (leftIdx < rightIdx) {
        let newWater = Math.min(height[leftIdx], height[rightIdx]) * (rightIdx - leftIdx);
        if (newWater > water) {
            water = newWater;
        }
        if (height[leftIdx] >= height[rightIdx]) {
            rightIdx--;
        } else {
            leftIdx++;
        }
    }
    return water;
};