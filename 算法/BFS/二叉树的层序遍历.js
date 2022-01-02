/** * leetcode: 102.二叉树的层序遍历
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * 层序遍历作为 最经典BFS算法之一 核心逻辑在于怎么让 BFS 输出二维层序结构的数组

 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) {
    return [];
  }
  let res = [];
  let queue = [root]; // 初始化第一个

  while (queue.length > 0) {
    let current = [];
    let n = queue.length;
    for (let i = 0; i < n; i++) {
      let node = queue.shift();

      current.push(node.val);
      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    res.push(current);
  }

  return res;
};
