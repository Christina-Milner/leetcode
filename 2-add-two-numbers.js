/* Given two numbers represented backwards as singly linked lists with each node being a digit (and no leading zeroes), return their sum as a linked list.

Example:
2 -> 4 -> 3
+
5 -> 6 -> 4
= 7 -> 0 -> 8
because 342 + 465 = 807
*/

//P: TWo linked lists
//R: A linked list

/*
- I was about to comment on how extremely annoying it is having to traverse each list to the end and then start adding stuff up and how that seems to suggest using a workaround like converting to array,
    but that's just because I'd missed the "reverse order" part. 
- The tricky part here is just the fact that we'll be at the end of the list after finishing the sum but we need to return the head which there is no easy way to backtrack back to, but that shouldn't be
    a problem, we just park it in a variable somewhere and then use a working variable to keep moving down the chain

- So! Initialise a ListNode with a value of l1.val + l2. val % 10 and park the carry (result of integer division by 10) somewhere
- This needs to run while either input's next is not null
- Move on to each list item's next, add the values and the carry, update carry, create a new node, set the head node's next to it and update the current working node to it
- Once there's no next, tack on any carry as appropriate and return head

*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */


function addTwoNumbers(l1, l2) {
    let head = new ListNode((l1.val + l2.val) % 10);
    let carry = Math.floor((l1.val + l2. val) / 10);
    let first = l1.next;
    let second = l2.next;
    let working = head;
    while (first  || second) {
        let firstVal = first ? first.val : 0;
        let secondVal = second ? second.val : 0;
        let next = new ListNode((firstVal + secondVal + carry) % 10);
        carry = Math.floor((firstVal + secondVal + carry) / 10);
        working.next = next;
        if (first) {first = first.next};
        if (second) {second = second.next};
        working = working.next;
    }
    if (carry) {
        let next = new ListNode(carry);
        working.next = next;
    }
    return head;
}

/* This beats 19% on time and 5% on space so not ideal, but... I don't really see a way around it being O(n) in both time and space complexity so ehhh?
I could have used the nullish coalescing operator instead of creating new variables for first and second but I really, really didn't want to see "null doesn't have this property". */

