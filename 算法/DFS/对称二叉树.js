/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// var isSymmetric = function (root) {
//   let leftOrder = [];
//   let rightOrder = [];

//   traversal(root.left, leftOrder);
//   traversal(root.right, rightOrder);

//   return leftOrder.reverse().join("") === rightOrder.join("");
// };

// function traversal(root, res = []) {
//   if (root === null) {
//     return;
//   }
//   traversal(root.left, res);
//   res.push(root.val);
//   traversal(root.right, res);
// }
/**
 *
 * 上面的逻辑并不能cover 深度一直但是互为镜像的同值树，明显是形成对栈和数组的路径依赖了
 *
 */

/**
 * 我们看一下对称二叉树的定义
 * L.val=R.val ：即此两对称节点值相等。
 * L.left.val = R.right.valL.left.val=R.right.val ：即 LL 的 左子节点 和 RR 的 右子节点 对称；
 * L.right.val = R.left.valL.right.val=R.left.val ：即 LL 的 右子节点 和 RR 的 左子节点 对称。
 */

function isSymmetric(root) {
  return root == null ? true : recur(root.left, root.right);
}
function recur(L, R) {
  if (L == null && R == null) return true;
  if (L == null || R == null || L.val != R.val) return false;
  return recur(L.left, R.right) && recur(L.right, R.left);
}
