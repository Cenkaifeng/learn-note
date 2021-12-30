/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/** Math.min(leftHight, rightHight)
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  return traversal(root);
};

/**
首先可以想到使用深度优先搜索的方法，遍历整棵树，记录最小深度。

对于每一个非叶子节点，我们只需要分别计算其左右子树的最小叶子节点深度。这样就将一个大问题转化为了小问题，可以递归地解决该问题。

作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/solution/er-cha-shu-de-zui-xiao-shen-du-by-leetcode-solutio/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/

function traversal(root) {
  if (root === null) {
    return 0;
  }
  //1.左孩子和有孩子都为空的情况，说明到达了叶子节点，直接返回1即可
  if (root.left == null && root.right == null) return 1;
  // 和最大深度不同，不能一味的使用同样逻辑
  let leftHight = traversal(root.left);
  let rightHight = traversal(root.right);

  //2.如果左孩子和由孩子其中一个为空，那么需要返回比较大的那个孩子的深度
  //这里其中一个节点为空，说明h1和h2有一个必然为0，所以可以返回h1 + h2 + 1;
  if (root.left == null || root.right == null)
    return leftHight + rightHight + 1;

  return Math.min(leftHight, rightHight) + 1;
}
/**
 * 
 * 这道题的关键是搞清楚递归结束条件

叶子节点的定义是左孩子和右孩子都为 null 时叫做叶子节点
当 root 节点左右孩子都为空时，返回 1
当 root 节点左右孩子有一个为空时，返回不为空的孩子节点的深度
当 root 节点左右孩子都不为空时，返回左右孩子较小深度的节点值
 * 
 * 
 */
