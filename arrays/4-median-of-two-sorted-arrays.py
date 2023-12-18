# Doing these in Python to stay practiced
# Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
# The overall run time complexity should be O(log (m+n)).

# Thought process: Use two pointers because absolutely everything here boils down to two (or more) pointers
# Use the pointers to iterate over a theoretical combined array up to what would be the middle element
# If length of combined arrays is odd, return that element, if even, take the average of it and the one before it

import math

class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        middle = len(nums1) + len(nums2)
        if middle == 0:
            return 0
        if middle == 1:
            return nums1[0] if len(nums1) == 1 else nums2[0]
        medianIdx =  math.floor(middle / 2)
        firstPointer = 0
        firstMax = len(nums1) - 1
        secondPointer = 0
        secondMax = len(nums2) - 1
        cur = 0
        while firstPointer + secondPointer <= medianIdx:
            if middle % 2 == 0 and firstPointer + secondPointer == medianIdx:
                if firstPointer > firstMax:
                    cur = (cur + nums2[secondPointer]) / 2
                elif secondPointer > secondMax:
                    cur = (cur + nums1[firstPointer]) / 2
                elif nums1[firstPointer] <= nums2[secondPointer]:
                    cur = (cur + nums1[firstPointer]) / 2
                else:
                    cur = (cur + nums2[secondPointer]) / 2
                break     
            else:
                if firstPointer > firstMax:
                    cur = nums2[secondPointer]
                    secondPointer += 1
                elif secondPointer > secondMax:
                    cur = nums1[firstPointer]
                    firstPointer += 1
                elif nums1[firstPointer] <= nums2[secondPointer]:
                    cur = nums1[firstPointer]
                    firstPointer += 1
                else:
                    cur = nums2[secondPointer]
                    secondPointer += 1
        return cur

# Probably a little clumsy, but after working with JS for a while, "list index out of range" is the bane of my existence
# Honestly just wanted to wrap it in a try/except block and return "Tough shit" if exception triggered
# Discussion suggests test cases do not enforce the performance requirement but I should be fine on that front, even if
    # this only beat 33.5% of Python3 submissions on runtime
    
# Ok this clever person who has posted a solution explanation says this would be O(n + m), meaning it's NOT fast enough
    # Which should've been obvious, no log element unless there's a binary search type thing going on
    # Unfortunately, I am not understanding their binary search approach to this AT ALL.
# But, someone else made a walkthrough! https://youtu.be/QjrchMRAkew?si=7AlkVtyQmWdYFp3e

'''
We need to identify (x1, y1) from the first array and (x2, y2) from the second array such that:
    x1 <= y2
    x2 <= y1
Because it ensures that all a, b <= min(1, 2, 6, 10) and all x,y >= max(1,2, 6, 10)
(I.e., all numbers to the left are no larger than the coloured numbers in the middle we're looking at, and all numbers to the right
are at least as large. )
Number of elements to the left of x1 and x2 is ((total_elem + 1) // 2) - 2
(to be continued)
'''