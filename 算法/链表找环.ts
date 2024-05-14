//链表找环是一个经典的算法题

/**
 * 解题思路通常有两种，一种用hashmap 遍历一次查看有没有重复访问的点，
 * 第二种就是经典快慢针算法，快慢针同时遍历，当快针追上慢针的时候，说明有环
 */

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function hasCycle(head: ListNode | null): boolean {
    if(head == null || head.next == null ) return false;

    let slow = head, fast = head.next;
    while ( slow != fast ) { // 相等即找到环
        if( fast == null || fast.next == null) {
            return false
        }
        slow = slow.next;
        fast = fast.next.next;// 多两步
    }
    return true
};