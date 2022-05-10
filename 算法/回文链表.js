// https://leetcode.cn/problems/palindrome-linked-list/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * 递归回溯判断解
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
let frontPointer; // 思路：复制一份当前链表头的引用，在回溯的时候同时比较头尾
var isPalindrome = function (head) {
  frontPointer = head;
  var walker = function (currentNode) {
    if (currentNode !== null) {
      if (!walker(currentNode.next)) {
        // 跑递归的同时直接判断 null
        return false;
      }
      if (currentNode.val !== frontPointer.val) {
        return false;
      }
      frontPointer = frontPointer.next;
      return true;
    }
    return true;
  };

  return walker(head);
};

// 用栈结构比较

var isPalindrome = function (head) {
  const stack = [];
  let bpPointer = head;
  while (head !== null) {
    stack.push(head.val);
    head = head.next;
  }
  while (bpPointer !== null) {
    if (bpPointer.val !== stack.pop()) {
      return false;
    }
    bpPointer = bpPointer.next;
  }
  return true;
};

// 其他，改成数组比较。都是对链表进行更换数据结构的解法。
