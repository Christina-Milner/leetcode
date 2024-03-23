/* Given the heads of two sorted linked lists, merge them into one sorted list and return its head. */

/*
- Initialise two pointers, one set to head 1 and the other to head 2
- Whichever one has the lower value becomes the head of the new list and the pointer moves to its next
- We now basically repeat this process until both pointers have reached null, but...
- We need to have a third pointer move down the new list to keep attaching new nodes in the right place, while also saving the head somewhere so we can return it at the end
*/


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
const mergeTwoLists = function(list1, list2) {
    if (!list1 && !list2) {
        return null
    }
    else if (!list1) {
        return list2
    }
    else if (!list2) {
        return list1
    }
    let first = list1
    let second = list2
    let temp
    if (list1.val <= list2.val) {
        temp = list1
        first = first.next
    } else {
        temp = list2
        second = second.next
    }
    let result = temp
    while (first || second) {
        if (first && second) {
            if (first.val <= second.val) {
                temp.next = first
                first = first.next
            } else {
                temp.next = second
                second = second.next
                
            }
        }
        else if (first) {
            temp.next = first
            first = first.next
        } else {
            temp.next = second
            second = second.next
        }
        temp = temp.next
    }
    return result
};

/* That beats 99.36% of users with JS, apparently. I know the numbers are meaningless and it'll probably drop to 40% if I run it again, but
I'll still take it. */