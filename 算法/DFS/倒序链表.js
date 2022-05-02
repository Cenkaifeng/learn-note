// LeetCode 剑指Offer https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/comments/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */

var reversePrint = function (head) {
  const res = [];
  walker(head, res);
  return res;
};
var walker = function (head, res = []) {
  if (head === null) return;
  walker(head.next, res);
  res.push(head.val);
};

// 用语言不定长数组特性 Java 有ArrayBuffer

var reversePrint = function (head) {
  let nums = [];
  let node = head;
  while (node !== null) {
    nums.unshift(node.val);
    node = node.next;
  }
  return nums;
};
