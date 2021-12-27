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

// BFS 解法 层序遍历

/**
 * 1. root === null return 0
 * 2. 初始化：queue = [root] counter = 0;
 * 3. while 循环遍历 [] break
 *  1. 初始化空列表tmp储存下一层节点；
 *  2. 遍历队列各节点，将其子节点都加入 tmp
 *  3. 更新队列 queue = tmp, 将下一层节点赋值给queue
 *  4. 统计层数 res ++
 */

function maxDepth(root) {
  if (root === null) {
    return 0;
  }
  let queue = [root];
  let counter = 0;

  while (queue.length) {
    let tmp = [];

    for (let item of queue) {
      item.left && tmp.push(item.left);
      item.right && tmp.push(item.right);
    }

    queue = tmp;

    counter++;
  }

  return counter;
}
