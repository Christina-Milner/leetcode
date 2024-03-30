/* Given a sorted linked list, return it still sorted, but with only unique node values. */

/*
- This is another of those things where I need to make a copy of the list because I'll be at the end when I'm done but need to return the head
- If it's already sorted, I don't need to keep track of all values I've already seen, just whatever the previous one was, right?
- Like, take the head and, after checking to make sure it even has a next, go while next.val is same as head.val, head.next is head.next.next
- Once we have a head.next that's different from head, move on to that one and repeat the same thing
- Once next is null, return the copy of the head
*/



/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteDuplicates = function(head) {
    let current = head
    while (current && current.next) {
        if (current.next.val === current.val) {
            current.next = current.next.next
        }
        else {
            current = current.next
        }
    }
    return head
};