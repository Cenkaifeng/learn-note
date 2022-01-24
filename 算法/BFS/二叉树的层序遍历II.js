/**
 * https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/
 * 给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  const ans = [];
  if (!root) {
    return ans;
  }

  const queue = [root];

  while (queue.length > 0) {
    const thisLevel = [];
    let n = queue.length;
    // 每次都去取出一层的所有节点
    for (let i = 0; i < n; i++) {
      let currNode = queue.pop();
      thisLevel.push(currNode.val); // 推入层集合

      currNode.left && queue.unshift(currNode.left);
      currNode.right && queue.unshift(currNode.right);
    }

    ans.unshift(thisLevel); // 单层节点集合往队头塞入
  }

  return ans;
};
