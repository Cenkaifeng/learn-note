/**
 * leetCode. 83. 删除排序链表中的重复元素
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * 递归解法
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  // base case 定位终止条件
  if (head == null || head.next == null) {
    return head;
  }

  head.next = deleteDuplicates(head.next);
  // 每一个节点要做的判断
  if (head.next != null && head.val === head.next.val) {
    head = head.next;
  }
  return head;
};

/* 双指针解
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates2 = function (head) {};
