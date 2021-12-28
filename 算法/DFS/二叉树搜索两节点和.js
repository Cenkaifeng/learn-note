/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * 本题为LeetCode 543 二叉树的直径的变体
 * 查找是否有两节点值的和为 k
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
const mapper = new Map();
var findTarget = function (root, k) {
  let res = false;

  traversal(root, k);

  console.log(mapper);
  if (mapper.size) {
    for (const [key, val] of mapper) {
      if (key !== val && mapper.has(mapper.get(key))) {
        // 原本的思路是hash + DFS 遍历出对应的哈希然后循环求值，在这一步寄了。
        return true;
      }
    }
    return res;
  } else {
    return res;
  }
};

function traversal(root, k) {
  if (root === null) {
    return;
  }
  traversal(root.left, k);
  traversal(root.right, k);
  if (root.val < k) {
    mapper.set(root.val, k - root.val);
  }
}

// 正解：使用映射表 + DFS

const findTarget = (root, k) => {
  const set = new Set();
  const search = root => {
    // 如果找到节点空，找不到
    if (root === null) return false;

    // set中有需要的值，直接返回true
    if (set.has(k - root.val)) {
      return true;
    } else {
      // 没有的话，登记一下
      set.add(root.val);
    }

    // 左右子树继续找，任意一个找到即可
    return search(root.left) || search(root.right);
  };
  return search(root);
};
