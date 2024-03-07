/* Given a string, return the longest palindromic substring.

Example: s = "babad", output: "bab", with "aba" also being a valid answer */

/* 
Hints are: How can we reuse a previously computed palindrome to compute a larger palindrome?,
    If “aba” is a palindrome, is “xabax” a palindrome? Similarly is “xabay” a palindrome?
    If we use brute-force and check whether for every start and end position a substring is
      a palindrome we have O(n^2) start - end pairs and O(n) palindromic checks. Can we reduce the time for palindromic checks to O(1) by reusing some previous computation.

So... 
I have a vague idea of how the O(n^2) solution would work, but that's not going to pass. Would it help if I used a hashmap to keep track of what indices each letter turns up at?
Hm, no, because that doesn't solve the problem of having to check for each individual starting point. 
A string is always a palindrome if it's only one letter long. With two letters, they'd have to be the same letter, but that then changes once you add another one (i.e. you can't bail at "ba" and say
no longer a palindrome because if you add a "b", it is again.) Generally speaking, a word is a palindrome if its first half is its last half in reverse (middle doesn't matter on odd length ones).
Hm, I'm going to code out the brute force solution and then see if that gives me any ideas.
*/



/**
 * @param {string} s
 * @return {string}
 */
const longestPalindrome_old = function(s) {
    const isPalindrome = word => word == word.split('').reverse().join('');
    let longest = s[0]
    for (let i = 0; i < s.length; i++) {
        for (let j = s.length - 1;j > i; j--) {
            const substr = s.slice(i, j + 1)
            if (substr.length > longest.length && isPalindrome(substr)) {
                longest = substr
            }
        }
    }
    return longest
};

/* Ok, that is a version that gets correct answers up to the point where it exceeds the time limit. Now, how to avoid redundant operations? */
/* Have looked at explanations. Both "expand around center" and "recursion" were ideas I had floating around in my head (the "one character is a palindrome" thing smelled like a base case),
but given you have to account for a potential even and odd length palindrome, I didn't see how doing expand around center for every character would beat the above, and recursion
definitely doesn't. Interestingly enough, it seems that O(n^2) solutions actually pass this, problem is the above is technically O(n^3).
Dynamic Programming is an alternative, but turns out there is an algorithm specific to this problem: Manachar's Algorithm. I don't understand it, but I'll see if I can get 
"expand from center" right.*/

const longestPalindrome = function(s) {
    let longest = ""
    for (let i = 0; i < s.length; i++) {
        let cur = s[i]
        // Odd
        let j = 1
        while (s[i - j] && s[i + j] && s[i - j] === s[i + j]) {
            cur = s[i - j] + cur + s[i + j]
            j++
        }
        if (cur.length > longest.length) {
            longest = cur
        }
        // Even
        let k = i
        j = 1
        cur = ""
        while (s[k] && s[i + j] && s[k] === s[i + j]) {
            cur = s[k] + cur + s[i + j]
            k--
            j++
        }
        if (cur.length > longest.length) {
            longest = cur
        }
    }
    return longest
};

/* There we go. Thank the good Lord. Don't even need special characters to make the even check work. */