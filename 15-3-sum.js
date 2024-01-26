/* Given an array of numbers, return all the triplets such that their sum is 0 and elements of the original array aren't used in duplicate. Also, the solution may not contain duplicate triplets.
 (I.e. using -1 twice when there's two -1s in the array is fine, but you can't have [-1, 1, 0] in the solution twice). */

//P: An array of numbers
//R: An array of arrays of numbers


/*
- I started playing with this in Leetcode before writing anything here... because I didn't want to spend ages on a write-up and then find it didn't work.
- I couldn't get it, even with the hints provided. Best idea I had was to basically keep an array of all currently possible permutations (i.e. for each number, create a copy of
    everything already in the array with less than 3 elements and add the number to that, as well as push it in by itself) and filter it for the correct number of elements and correct sum later.
    Problem with that, besides bad performance, is the duplicates.
    Using a Set helps with that but now you have to convert the subarrays to primitives because of how arrays aren't considered the same unless they literally reference the same object.
    I did try pasting them together as strings and doing it that way. But no.
*/

// NOT MY SOLUTION - "JAVA EASIEST SOLUTION EVER" adapted for Javascript.
/* Top solution does not work for me (not only because Sets apparently work very differently in Python and JS and *can* be used to get rid of duplicate tuples, but there was some issue
     with how the pointers got moved that led to missing results). */

     function threeSum(nums) {
        let ans = [];
        // Sort the array
        nums.sort((a, b) => a - b);

        for (let i = 0; i < nums.length - 2; i++) {
            // Skip duplicate elements for i
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue;
            }

            let j = i + 1;
            let k = nums.length - 1;

            while (j < k) {
                let sum = nums[i] + nums[j] + nums[k];

                if (sum == 0) {
                    // Found a triplet with zero sum
                    ans.push([nums[i], nums[j], nums[k]]);

                    // Skip duplicate elements for j
                    while (j < k && nums[j] == nums[j + 1]) {
                        j++;
                    }

                    // Skip duplicate elements for k
                    while (j < k && nums[k] == nums[k - 1]) {
                        k--;
                    }

                    // Move the pointers
                    j++;
                    k--;
                } else if (sum < 0) {
                    // Sum is less than zero, increment j to increase the sum
                    j++;
                } else {
                    // Sum is greater than zero, decrement k to decrease the sum
                    k--;
                }
            }
        }
        return ans;
    }

/* Now having a look at the hashmap solution but it requires reading C++. This solution does include a "break if nums[i] is greater than 0 because can't make it zero with elements following after" clause the above one 
seems to be missing. I just added it on LC and that somehow seems to have made it slower, eheh. */
/* Pseudocode of this C++ solution:

- Iterate over array and save to an object as map[nums[i]] = i
- Iterate from 0 to length -2 as before and use a second pointer that starts at i + 1
- Number we are now looking for is - (nums[i] + nums[j])
- If it's in the map and its index is greater than j (I think), push this triplet into the result
- Update j to last occurrence of second fixed number to avoid duplicates
- Update i to last occurrence of first fixed number to avoid duplicates
This sounds sus as heck. How do you know you wouldn't miss stuff in between?
*/