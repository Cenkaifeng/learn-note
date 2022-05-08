/**
 * https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/submissions/
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let count = 0;
  // 递归算链表长度
  const len = traverse(head, n);
  if (n === len) {
    //删除头链
    return head.next;
  }
  return head;
};

var traverse = function (head, n) {
  if (head === null) return 0;
  let num = traverse(head.next, n);
  // 回溯逻辑
  if (num === n) {
    head.next = head.next.next;
  }
  return num + 1;
};

//双指针解
var removeNthFromEnd = function (head, n) {
  //双指针解。
  let dummy = new ListNode(0, head); // 从0 开始，这样 second 与 first 有 n - 0 的差
  let first = head; // 先行指针；
  let second = dummy;
  let firstStep = 0;
  while (first !== null) {
    // 先行指针前进 n
    if (firstStep < n) {
      firstStep++;
      first = first.next;
    } else if (firstStep === n) {
      // 前后
      first = first.next;
      second = second.next;
    }
  }
  // console.log(second, second.val)
  second.next = second.next.next; // second 使用新的实例计算

  dummy = dummy.next;
  return dummy;
};
