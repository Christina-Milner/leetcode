/* A number is a Harshad number if it is divisible by the sum of its digits. Given a number, return that sum if the number is a Harshad number, and -1 otherwise. */


/*
- We can easily obtain the sum of digits by converting to string (and then either iterating over them by hand or splitting to array and using reduce)
- We then check for divisibility using the modulo
- ???
- Profit
*/



/**
 * @param {number} x
 * @return {number}
 */
const sumOfTheDigitsOfHarshadNumber = function(x) {
    let sum = 0
    const numStr = String(x)
    for (let i = 0; i < numStr.length; i++) {
        sum += Number(numStr[i])
    }
    return x % sum === 0 ? sum : -1
};

/* Beats 100% on time and space because not enough people have done this, eheh.
Time complexity would be O(n).
Is this like the opposite of Codewars where really old problems were way easier and newer ones much harder?

Guy in the solution says converting to string introduces extra time and space complexity and uses a loop where he takese modulo ten
as the digit and integer divides the number by 10 instead. Can do, sure. Making a copy of x is entirely unnecessary, though. */