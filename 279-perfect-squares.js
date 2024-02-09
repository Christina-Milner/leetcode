/* Given an integer n, return the least number of perfect square numbers that sum to it. */

//P: A number
//R: A number


/*
- Hmm. So, first, need a helper to check whether something is a perfect square. That's easy: if its square root is equal to its square root rounded down
- The lowest perfect square is 4, so any number below that should return 0 I'm guessing?
- Or actually, does 1 count as a perfect square? Quick Google suggests it does, so default answer is n itself
- Iterate from the square root of n down to 2
- For each of those numbers, take its square and check:
    - if n is divisible by that (if so, take result if better than current)
    - Otherwise, what the remainder would be when subtracting n.
        - What to do with that? If we recursively call the function on it, it's going to end up being too slow
        - Stick it in an object and hope we find a way to get to it down the line?
- Wait no, hang on. Is the lowest possible answer 1 (if the number is a perfect square), or 2 (because 1 number is not a sum of something ... although technically it's a sum of itself and 0? But is 0 a perfect square? Crikey, it is.)
- Ok, so if the number is a perfect square, answer is 1
- I want to say you always find the biggest square below the given number (by rounding down its square root and re-squaring), then use that and take the remainder and do the same thing to it until there either is no remainder or 
    the remainder is below 4. But I am struggling how this would accommodate the 12 = 4 + 4 + 4 scenario. It would find the 9, and add 1 + 1 + 1 and return 4 rather than 3. 
- Do I have bandwidth to do two loops? Ehh let's find out.

The above logic kind of got me somewhere, but then failed on the case of n = 19. Correct answer would be 9 + 9 + 1, so 3, but obviously my solution was expecting to be able to either keep going with the biggest square,
or find something the original is cleanly divisible by. 
*/



/**
 * @param {number} n
 * @return {number}
 */
const numSquares2 = function(n) {
    const isPerfectSquare = n => Math.sqrt(n) == Math.floor(Math.sqrt(n));
    let numOfSummands = n;

    if (isPerfectSquare(n)) {return 1;}

    const squareAndRemainder = (num, acc = 0) => {
        if (isPerfectSquare(num)) {
            numOfSummands = Math.min(numOfSummands, acc + 1);
            return;
        }
        if (num < 4) {
            numOfSummands = Math.min(numOfSummands, acc + num);
            return;
        }
        for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
            squareAndRemainder(num - i ** 2, acc + 1);
        }
    }
    return numOfSummands;

};

/* Calling it quits here - that still failed the 19 check and was going to start timing out on higher numbers.
    The solution, as it turns out, is DP. For reference: */


const numSquares = function(n) {
    // Initialize an array to store the minimum number of perfect squares needed to sum up to each index.
    let dp = new Array(n + 1).fill(Infinity);
    
    // Base case: 0 requires 0 perfect squares.
    dp[0] = 0;
    
    // Iterate through numbers from 1 to n.
    for (let i = 1; i <= n; ++i) {
        // Iterate through all possible perfect squares less than or equal to i.
        for (let j = 1; j * j <= i; ++j) {
            // Update the minimum number of perfect squares needed to sum up to i.
            // The current value is either the existing value or the number of perfect squares needed
            // to sum up to (i - j*j) plus one more perfect square (j*j).
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
        }
    }
    
    // The result is stored at index n, which represents the minimum number of perfect squares needed to sum up to n.
    return dp[n];
};