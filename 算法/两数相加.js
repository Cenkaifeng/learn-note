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
var addTwoNumbers = function (l1, l2) {
  // 创建临时的链表
  let resNode = new ListNode(0);
  // 记录好相关的临时链表信息
  let res = resNode;
  // 记录是否进行进位运算
  let flag = 0;
  //当l1不为空或l2不为空或不需要进位时
  while (l1 || l2 || flag) {
    // 记录其相关的值
    let val1 = l1 ? l1.val : 0;
    let val2 = l2 ? l2.val : 0;
    let sum = val1 + val2 + flag;
    //判断是否需要进位
    flag = sum >= 10 ? 1 : 0;
    //链表所存储的元素只能为余数
    sum = sum % 10;
    //当相关的链表不为空时，则链表一次向下遍历
    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }
    //向临时创建的链表追加元素
    resNode.next = new ListNode(sum);
    resNode = resNode.next;
  }
  return res.next;
};

// 参考解法
// 作者：programmer-8b
// 链接：https://leetcode-cn.com/problems/add-two-numbers/solution/liang-shu-xiang-jia-by-programmer-8b-vlq1/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// 我的解法到测试用例 1566 就会崩，涉及到大数位运算
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
var addTwoNumbers = function (l1, l2) {
  let add = "";
  let added = "";

  while (l1 !== null) {
    add += l1.val;
    l1 = l1.next;
  }
  while (l2 !== null) {
    added += l2.val;
    l2 = l2.next;
  }
  let _res =
    Number(add.split("").reverse().join("")) +
    Number(added.split("").reverse().join(""));

  _res = String(_res)
    .split("")
    .map(e => {
      return Number(e);
    });

  console.log(_res);
  let res = makeListNode(_res);
  return res;
};
// 手动生成一个链表吧
function makeListNode(arr) {
  // 假设入参为数组
  let res = null;
  if (arr.length === 1) {
    res = new ListNode(arr[0], null);
  } else {
    res = new ListNode(arr.pop(), makeListNode(arr));
  }

  return res;
}

function addTwoNumbers(l1, l2) {
  //  俩指针分别指向两个链表，同时移动俩指针
  let cur1 = l1;
  let cur2 = l2;
  let left = 0; // 其他题解里的 pre listNode 具体可以看官方题解
  let head;
  let result = (head = new ListNode());
  while (cur1 != null || cur2 != null) {
    let count1 = cur1 ? cur1.val : 0;
    let count2 = cur2 ? cur2.val : 0;
    let total = count1 + count2 + left;
    left = total >= 10 ? 1 : 0; // 对两个指针指向的数求和，判断和10的大小，记录进位
    result.next = new ListNode(total % 10);
    result = result.next;

    if (cur1 != null && cur2 != null) {
      // 分别判断两个链表是否已经到结尾，根据是否结尾进行移动对应链表的指针
      cur1 = cur1.next;
      cur2 = cur2.next;
    } else if (cur1 == null) {
      cur2 = cur2.next;
    } else {
      cur1 = cur1.next;
    }
  } // 边界判断最后是否还有进位，如果有则追加进位节点
  if (left) {
    result.next = new ListNode(left);
  }

  return head.next;
}
