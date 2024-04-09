/* There are n people in a queue for tickets, where the 0th person (?! how do you do, fellow humans?) is atthe front and the (n - 1)th person is at the back.
There is an array tickets of length n where the ith person would buy tickets[i].
Each person takes exactly 1 second to buy a ticket. A person can only buy 1 at a time and instantaneously teleports to the back of the line to buy more. People
leave the line if they have no more tickets to buy.
Return the time taken for the person at position k to finish buying tickets. */


/*
- Oh my god the phrasing of the problem has all my wats. Also, at this point, why bother trying to make it a real-world problem, this is like with the
    perfectly spherical horses and no friction or air resistance.
- Basically, we decrement the elements of the array by 1 each round and stop when the element at index k hits 0 and return how many operations that took
- And ideally find a way to do that more efficiently
*/




/**
 * @param {number[]} tickets
 * @param {number} k
 * @return {number}
 */
function timeRequiredToBuy(tickets, k, acc = 0) {
    if (tickets[k] === 0) {
        return acc
    }
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i] > 0) {
            tickets[i]--
            acc++
        }
        if (i === k && tickets[i] === 0) {
            break
        }
    }
    return timeRequiredToBuy(tickets, k, acc)
};

/* ^ That did not work for reasons I wasn't actually sure about, but trying to fix it I came up with the more efficient formula:
Fundamentally, we need tickets[k] tickets for everyone ahead in line who is buying at least the same amount, and the target, and 
tickets[k] - 1 for everyone behind in line (as they will not get their last one on the last round). For everyone who is getting 
fewer tickets than tickets[k], we just get all of theirs.
The test the above failed was [84,49,5,24,70,77,87,8], desired output 154, it was getting 157. 
... oh and now I realise why, because I need for it to not finish the round where tickets[k] hits 0. Fixing in the above code
and changing comments to past tense. Above code DOES work now.
But anyway, getting back to my example, 154 is 24 + 24 + 5 + 24 + 23 + 23 + 23 + 8.
*/

function timeRequiredToBuy(tickets, k) {
    let total = 0
    let num = tickets[k]
    for (let i = 0; i < tickets.length; i++) {
        const cur = tickets[i]
        if (i <= k && cur >= num) {
            total += num
        }
        else if (cur >= num) {
            total += num - 1
        }
        else {
            total += cur
        }
    }
    return total
};

/* So, that is the more efficient solution. Time complexity of that is O(n), space complexity is constant.
On the recursive solution, I also modified the input, which is bad, but as no one seems to care about this on leetcode ever (unless
it's included in the problem to make it harder), I didn't bother making a copy and putting the recursion in a helper.
But in any case, time complexity on that would be...
uhh... potentially worse than quadratic, depending on the value of tickets[k]? 
*/