/* Task from the Leetcode chapter on Linked Lists.
Design your implementation of the linked list (singly or doubly, I chose singly).
LLs are 0-indexed and need to have:
    - method get(index): Returns the value of the node at this index in the list, or -1 if not present
    - addAtHead(val): Makes a node of the given value the head of the current list
    - addAtTail(val): makes a node of the given value the last element of the current list
    - addAtIndex(index, val): Inserts a node of the given value at the given index in the list, if it is valid
    - deleteAtIndex(index): deletes the node at that index, if it is valid

This threw me for a loop for a while because of how the constructor was expected to take no arguments and how some of those methods only make sense
when used on the head. It eventually dawned on me that I actually needed two classes here, one that the task was expecting and one for the Node class
that I'm familiar with as the data structure for a LL. */

class MyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    get(index) {
        if (index < 0 || index >= this.size) {
            return -1;
        }
        let pos = 0;
        let cur = this.head;
        while (pos < index) {
            cur = cur.next;
            pos++;
        }
        return cur ? cur.val : -1;
    }
    addAtHead(val) {
        let newHead = new Node(val, this.head);
        this.head = newHead;
        this.size++;
    }
    addAtTail(val) {
        let cur = this.head;
        if (!cur) {
            this.addAtHead(val)
        } else {
            while (cur.next !== null) {
                cur = cur.next;
            }
            let newTail = new Node(val, null);
            cur.next = newTail;
        }
        this.size++;
    }
    addAtIndex(index, val) {
        if (index >= 0 && index <= this.size) {
            if (!index) {
                this.addAtHead(val);
                this.size++;
            } else {
            let prev;
            let cur = this.head;
            let pos = 0;
            while (pos < index - 1) {
                cur = cur.next;
                pos++;
            }
            if (cur) {
                prev = cur;
                cur = cur ? cur.next : null;
                let newThing = new Node(val, null);
                prev.next = newThing;
                newThing.next = cur;
                this.size++;
            }
            }
        }
    }
    deleteAtIndex(index) {
        if (index >= 0 && index < this.size) {
            if (!index) {
                this.head = this.head.next;
                this.size--;
            } else {
            let prev;
            let cur = this.head;
            let pos = 0;
            while (pos < index - 1) {
                cur = cur.next;
                pos++;
            }
            if (cur) {
                prev = cur;
                cur = cur.next ? cur.next.next : null;
                prev.next = cur;
                this.size--;
            }
            }
        }
        
    }
}

class Node {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}

/* I am dubious of the numbers. I had originally added a this.values property (keeping an array of all the values in the list) for debugging purposes,
and with that still in it, the code performed better on runtime and memory than it does now that I thought to take it out. Apparently, this beats 29% on runtime
(with the temp array in and an unshift/push/splice operation for all the modifying operations, it was 55% whut) and 19% on memory. ¯\_(ツ)_/¯ */