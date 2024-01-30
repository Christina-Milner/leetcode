/* Given an array of strings, return the length of the longest possible string with only unique characters you can obtain by combining elements of this array. */

//P: An array of strings
//R: A number

/*
- This made me think back to the Codewars about seeing which buttons on the PIN pad were worn down and deducing which combinations the PIN could be.
- To see if two strings can be combined without getting dupe characters, stick both of their individual characters into a Set and check whether its size is equal to the sum of the lengths of the strings
- The hints and the constraint of arr.length only going up to 16 suggests we might actually get away with a solution in quadratic time \o/
- So, keep an array of the options for strings. First string goes in there. After the second string, we have first string, second string, and first string + second string (if no dupes). 
- At the end, find the longest string in this array. 
*/

function maxLength(arr) {
    const wordHasDupes = str => {
        let chars = new Set(str.split(''));
        return chars.size != str.length;
    }
    let options = [];
    for (let word of arr) {
        if (wordHasDupes(word)) {
            continue;
        }
        if (!options.length) {
            options.push(word);
        } else {
            let moreOptions = [];
            for (let option of options) {
                let letters = new Set(option.split(''));
                word.split('').forEach(char => letters.add(char));
                if (letters.size < word.length + option.length) {
                    continue;
                } else {
                    moreOptions.push(word + option);
                }
            }
            options = options.concat(moreOptions);
            options.push(word);
        }
    }
    return options.length ? options.reduce((acc, cur) => Math.max(acc, cur.length), 0) : 0;
}

/* Could have probably reused the HasDupes function further down instead of doing the split and Set again, but HasDupes was an ex post facto insertion after realising
the strings in the input array could already contain dupes in themselves.
More advanced solution to chew on: https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/solutions/1479768/c-bitwise-maps-backtracking-dfs-solution-explained-100-time-95-space/ */