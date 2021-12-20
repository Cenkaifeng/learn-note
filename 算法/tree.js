// 二叉树中序遍历

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const vec = [];
  traverser(root, vec);
  return vec;
};

function traverser(node, vec) {
  if (node === null) {
    return;
  }
  traverser(node.left, vec);
  // 其实很简单 push放前面 就是前序，中间就是中序，
  // 后面就是后续。要理解为什么放这里是这样，还是要画个图好理解

  vec.push(node.val);
  traverser(node.right, vec);

  return vec;
}

// TODO: 压栈法，
