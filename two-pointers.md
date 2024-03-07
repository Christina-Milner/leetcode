Not exactly Leetcode, but kind of belongs here. Working through patterns instead of just doing random challenges.

Taken from Design Gurus "Grokking the Coding Interview"

**TWO POINTERS**

**Example 1: Find a pair with target sum in the sorted array**

Solution: 
	Mine: 
```
class Solution {
  search(arr, targetSum) {
    // TODO: Write your code here
    let solution = [-1, -1];
    let [left, right] = [0, arr.length - 1];
    while (right > left) {
      const currentSum = arr[left] + arr[right];
      if (currentSum == targetSum) {
        solution[0] = left;
        solution[1] = right;
        break;
      }
      else if (currentSum > targetSum) {
        right--;
      } else {
        left++;
      }
    }
    return solution;
  }
}
```
	- Brute force: For each starting element, use binary search to try to find the complement. O(n log n)
	- Two pointers: Put one at start and end, increment start if sum too small, decrement end if sum too large O(n). Space complexity O(1)
	- Hash table: For each number, check if the complement required to reach the sum is in the hash table, otherwise store current number as key and its index as value.
		Time complexity O(n), space complexity O(n) (worst case the entire array ends up in the hashmap). Time can degrade to O(n^2) due to hash collisions (?).


**Example 2: Move all uniques in an array of sorted numbers to the front in-place and return length of uniques subarray**

		(Oops - misunderstood this at first, it means have one of each value at the front, not "values that are unique in the array only".)
		
Solution:
	- Mine: Could not get it, while I got the idea of keeping one pointer for where to insert and one that iterates, I initialised them to 0 and 1 respectively
	and thought, if the values are the same, move right pointer and move left one only if we haven't had that value before, tried to keep track of that with a
	variable "prev". This failed on the first test of [2, 3, 3, 3, 6, 9, 9] as once the second 3 has been overwritten with the 6, left value is now still 3,
	right value is 9, and "previous value" is 6, tricking the algorithm into thinking it's sitting on a unique value.

	- Right solution: Basically the thing I thought, but done right so the prev variable isn't necessary
		- next/i starts at 0, nextNonDuplicate at 1
		- We compare arr at nextNonDuplicate - 1 to arr at i
		- If they are unequal, arr at nextNonDuplicate gets set to arr at i and nextNonDuplicate gets incremented
		- Why in blazes are we using a while loop with an increment at the end instead of a for loop? For literally no reason, I tested it.
		- O(n) time, constant space

Related example: Unsorted array of numbers and a target, remove all instances of target in-place and return length of new array

**Example 3: Squaring a sorted Array**

Solution:
	Mine:
```
class Solution {
  makeSquares(arr) {
    const n = arr.length;
    let squares = Array(n).fill(0);
    // TODO: Write your code here
    let toInsert = squares.length - 1;
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      if (arr[left] ** 2 > arr[right] ** 2) {
        squares[toInsert] = arr[left] ** 2;
        left++;
      } else {
        squares[toInsert] = arr[right] ** 2;
        right--;
      }
      toInsert--;
    }
  return squares
  }
}
```

(I have admittedly seen this one on Leetcode before).
	- Brute force: iteratively map array to array of its squares and then sort that (O(n * logN)) 
	- Two Pointers: Set one at first non-negative number and then go either direction. I didn't do this because the scenario where everything is 
		positive/negative melted my brain
	- Alternatively, starting at the ends and filling the result from the back is a valid alternative
	(Note to self that while this is clearly spawned by languages where array length is fixed, creating target array and then filling it from the back
	is a lot more performant than creating empty array and unshifting a bunch of stuff in. Could use push and then reverse at the end, but still.)
	- Annoyingly, they provide a walkthrough of the solution I did anyway, rather than the "start in the middle" one
	- Time and space complexity of O(n)

Ok I did figure out the "start in the middle" solution in the end but it feels clumsy because of the extra check needed to keep the right pointer from rocketing into space
while the left one sits at 0:

```
class Solution {
  makeSquares(arr) {
    console.log(arr)
    const n = arr.length;
    let squares = Array(n).fill(0);
    // TODO: Write your code here
    let right = 0;
    let toInsert = 0;
    while (arr[right] < 0) {
      right++;
    }
    let left = right - 1;
    while (left >= 0 || right <= arr.length - 1) {
      console.log(left, right)
      if (arr[left] ** 2 < arr[right] ** 2 || right >= arr.length) {
        squares[toInsert] = arr[left] ** 2;
        left--;
      } else {
        squares[toInsert] = arr[right] ** 2;
        right++;
      }
      toInsert++;
    }
  return squares
  }
}
```


** Triplet Sum to Zero (medium) **

Given an array of unsorted numbers, find all unique triplets in it that add up to zero.
Not sure how this is two pointers, but I would say go with the tabulation approach.
Look at first number. Push a subarray with just it in it in the output array.
Look at second number. Push a subarray with just it in it in the output array, as well as a copy of the one with the first element in it with this one added.
Repeat for remaining elements, except when a subarray already has 2 elements, only add third one if it fulfills the condition. 
Filter anything that isn't a triplet at the end.
This might not give us uniques, though.

class Solution {
  searchTriplets(arr) {
    let triplets = [];
    for (let num of arr) {
      let nextTriplets = []
      for (let triplet of triplets) {
        if (triplet.length == 1 || triplet.length == 2 && triplet[0] + [triplet[1] + num === 0]) {
          nextTriplets.push([...triplet, num])
        }
      }
      nextTriplets.push([num])
      triplets = triplets.concat(nextTriplets)
    }
    triplets = triplets.filter (e => e.length === 3)
    return triplets;
  }
}
Nope, no idea.
Actual solution:
- Sort input array
- For each number num in the array, find a pair that adds up to -num
- The subfunction that does that last part is what uses the two pointers
- Both function and subfunction ignore duplicate elements

Another attempt based on that pseudocode:

class Solution {
  searchTriplets(arr) {
    let triplets = []
    const sortedCopy = Array.from(new Set(arr.slice().sort((a, b) => a - b)))
    const findPair = (arr, num) => {
      let left = 0
      let right = arr.length - 1
      while (left < right) {
        const sum = arr[left] + arr[right]
        if (sum === num) {
          return [arr[left], arr[right]]
        }
        if (sum > num) {
          right--
          continue
        }
        else {left++}
      }
      return null
    }
    for (let i = 0; i < sortedCopy.length; i++) {
      let cur = sortedCopy[i]
      let result = findPair(sortedCopy.slice(i + 1), -cur)
      if (result) {
        triplets.push([cur, ...result])
      }
    }
    return triplets
}
}

*Actual solution*

class Solution {
  searchTriplets(arr) {
    arr.sort((a, b) => a - b); // Modifying the input ಠ_ಠ
    const triplets = [];
    for (let i = 0; i < arr.length; i++) {
      // skip same element to avoid duplicate triplets
      if (i > 0 && arr[i] === arr[i - 1]) { 
        continue;
      }
      this.searchPair(arr, -arr[i], i + 1, triplets);
    }

    return triplets;
  }

  searchPair(arr, targetSum, left, triplets) {
    let right = arr.length - 1;
    while (left < right) {
      const currentSum = arr[left] + arr[right];
      if (currentSum === targetSum) { // found the triplet
        triplets.push([-targetSum, arr[left], arr[right]]);
        left += 1;
        right -= 1;
        while (left < right && arr[left] === arr[left - 1]) {
          left += 1; // skip same element to avoid duplicate triplets
        }
        while (left < right && arr[right] === arr[right + 1]) {
          right -= 1; // skip same element to avoid duplicate triplets
        }
      } else if (targetSum > currentSum) {
        left += 1; // we need a pair with a bigger sum
      } else {
        right -= 1; // we need a pair with a smaller sum
      }
    }
  }
}
