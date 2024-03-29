/* I'm climbing a staircase and it takes n steps to reach the top. I can take either 1 or 2 steps at a time. How many distinct ways can I get to the top? */


/*
- ????????? I hate this kind of thing
- From the examples: order matters. 1 step then 2 steps is not the same thing as 2 steps + 1 step.
- Is this a combinatorics thing? It is a combinatorics thing, isn't it. 
- Hm, so you always have the option of all 1s, or all 2s
- If it's an odd number, the "all 2s" option becomes 2 options: 1 + all 2s or all 2s + 1
- Then there's the version where you replace one pair of 1s with a 2: that's 1 less than the number of 1s
- Then you could replace 2 pairs and at that point my math brain explodes
- Hint is: To reach nth step, what could have been your previous steps? (Think about the step sizes). Thanks for nothing.
- I suspect I'm not going to get the idea behind this, but let's see if I can manage the brute force solution
- Went down a rabbit hole of trying to do it with combinatorics, but no dice
- Brute force would be using tabulation, I guess, but that'll be TLE for sure
- (Starting to read solution) ... FIBONACCI?? That even occurred to me at some point but the numbers don't match up! ... ooh, but that's because
  I'd forgotten a combination for n = 4 and gotten 4 instead of 5. Grumble. Ok, I'll stop reading here, Fibonacci it is.
*/




/**
 * @param {number} n
 * @return {number}
 */
let memo = {1: 1, 2: 2}
for (let i = 3; i <= 45; i++) {
    memo[i] = memo[i - 1] + memo[i - 2]
}
const climbStairs = function(n) {
    return memo[n]
};

/* The recursive solution timed out, so ¯\_(ツ)_/¯ */
