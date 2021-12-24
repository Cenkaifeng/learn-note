/**
 * 104. 二叉树的最大深度
 * https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
 */

// DFS 递归解 Max(r, l) + 1

function maxDepth(root) {
  if (root === null) {
    return 0;
  } else {
    let leftHeight = maxDepth(root.left);
    let rightHeight = maxDepth(root.right);

    return Math.max(leftHeight, rightHeight) + 1; // 这个加一，是每个节点的单位depth , 最后回溯上来的时候每个分支都会在它们的父节点进行max比较
  }
}

// TODO: BFS 解法
