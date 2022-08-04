/**
 * 
leetcode: 77. 组合 https://leetcode.cn/problems/combinations/
给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。

你可以按 任何顺序 返回答案。

示例 1：

输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
示例 2：

输入：n = 1, k = 1
输出：[[1]]
 

提示：

1 <= n <= 20
1 <= k <= n

 */
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = function (n, k) {
  //
  let path = [];
  const result = [];

  const traversal = function (n, k, startIndex, path) {
    //优化 剪枝：temp 长度加上区间 [cur, n] 的长度小于 k，不可能构造出长度为 k 的 path
    if (path.length + (n - startIndex + 1) < k) {
      return;
    }

    if (path.length === k) {
      // path.length === k 为终止条件，同时提交合法值
      result.push([...path]);
      return;
    }
    for (let i = startIndex; i <= n; i++) {
      path.push(i);
      traversal(n, k, i + 1, path);
      path.pop(); // 最后一个推出
      // 回溯收集逻辑
    }
  };
  traversal(n, k, 1, path);
  return result;
};
// path: Array, result: Matrix ,
// n, k,
// startIndex

// 回溯三部曲
// 1. 确定递归函数参数、返回值
// 2. 确定终止条件
// 3. 单层递归逻辑
