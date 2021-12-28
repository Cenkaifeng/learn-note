/**
 * leetCode 543. 二叉树的直径
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
let maxDepthCount = 0;
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  //每一条二叉树的「直径」长度就是一个节点的左右子树的最大深度之和。
  maxDepth(root);
  return maxDepthCount;
};

var maxDepth = function (root) {
  if (root === null) {
    return 0;
  }

  let leftMax = maxDepth(root.left);
  let rightMax = maxDepth(root.right); // 当前节点子树最大深度
  // 后序位置，计算最大直径；
  let curDiameter = leftMax + rightMax;

  maxDepthCount = Math.max(maxDepthCount, curDiameter);

  return 1 + Math.max(leftMax, rightMax);
};

// [1,2,3,4,5]
