// 这是个dp + tree 类型的题型
/**
 * 
 * 二叉搜索树：
 * 是指一棵空树或者具有下列性质的二叉树：

若任意节点的左子树不空，则左子树上所有节点的值均小于它的根节点的值；
若任意节点的右子树不空，则右子树上所有节点的值均大于它的根节点的值；
任意节点的左、右子树也分别为二叉查找树；
没有键值相等的节点。
 */
/**
 * 思路：假设n个节点存在二叉树的个数是 G(n), 领 f(i) 为以 i 为根的二叉搜索树的个数，
 *
 * G(n) = f(1) + f(2) +... +f(n)
 * (卡特兰数)
 */

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  let dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i < n + 1; i++) {
    for (let j = 1; j < i + 1; j++) {
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }

  return dp[n];
};
