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
  // 前序： 中 左 右 ; 中序： 左 中 右 ; 后序: 左 右 中;

  vec.push(node.val);
  traverser(node.right, vec);

  return vec;
}

//  压栈法，

/*Tips:栈是一种 先进后出的结构，出栈顺序为左，中，右
那么入栈顺序必须调整为倒序，也就是 右，中，左
同理，如果是前序遍历，入栈顺序为 右，左，中；后序遍历，入栈顺序中，右，左
*/
// 前序

// 入栈顺序 右 —> 左
// 节点出栈顺序 中 -> 左 -> 右
function preorderTraversal(root, res = []) {
  if (!root) return res; // 如果是null直接返回

  const stack = [root]; // 先序第一个就是根节点 stack 需要持续出栈

  let cur = null; // cur 作为树指针

  while (stack.length) {
    cur = stack.pop(); // 当前指向栈顶的节点

    res.push(cur.val);

    cur.right && stack.push(cur.right);
    cur.left && stack.push(cur.left); // 压栈法和递归法相反着来
  }
}

// 入栈顺序 左 -> 右
// 出栈 左 中 右
function inorderTraversal(root, res = []) {
  const stack = [];
  let cur = root;

  while (stack.length || cur) {
    if (cur) {
      // 没到叶子节点结束就接着遍历
      stack.push(cur); // 先推入当前

      cur = cur.left; // 指针左移；
    } else {
      // 最左的都推进去后 [1, 2, 4] 难理解的地方在于，同一父节点反复进出 stack
      //       1
      //      / \
      //     2   3
      //    /\   /\
      //   4  5 6  7
      // 4 已经没有子节点了所以走了 else
      cur = stack.pop(); // 弹出栈顶，这个时候栈顶是叶子节点父节点 2
      res.push(cur.val);

      cur = cur.right; // 指针往右节点移动
    }
  }

  return res;
}

//  压栈后序
// 入栈 左 -> 右
// 出栈 中 -> 右 -> 左 结果翻转

var postorderTraversal = function (root, res = []) {
  if (!root) return res;
  const stack = [root];
  let cur = null;
  do {
    cur = stack.pop();
    res.push(cur.val);
    cur.left && stack.push(cur.left);
    cur.right && stack.push(cur.right);
  } while (stack.length);
  return res.reverse();
};
// Morris 中序
// 见题解 https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/er-cha-shu-de-zhong-xu-bian-li-by-leetcode-solutio/

/**
 *
 * Morris 伪代码逻辑
 *
 * x not left child
 *  x 加入 res
 *  x = x.right
 * x has left child. 找 predecessor
 *  predecessor right 为 null , 指向 x, x = x.left
 *  predecessor right 不为空， x 加入 res, x = x.right
 */
function inorderTraversalByMorris(root) {
  const res = [];
  let predecessor = null;
  //predecessor 指针x 的前驱节点
  //x 为当前遍历到的节点root

  while (root) {
    if (root.left) {
      // 作为前驱节点，就是 x 左移的一步
      predecessor = root.left;

      // 节点向左走一步，然后不断向右
      while (predecessor.right && predecessor.right !== root) {
        predecessor = predecessor.right;
      }

      // 让 predecessor 的右指针指向 root (x), 继续遍历左树

      if (!predecessor.right) {
        predecessor.right = root;
        root = root.left;
      } else {
        // 左树访问完了，我们要断开连接
        res.push(root.val);
        predecessor.right = null;
        root = root.right;
      }
    } else {
      // 没有左子树直接访问右
      res.push(root.val);
      root = root.right;
    }
  }

  return res;
}
