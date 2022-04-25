// LeetCode: 22 https://leetcode-cn.com/problems/generate-parentheses/
/**
 
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
示例 1：

输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]

*/

/**
 * @param {number} n
 * @return {string[]}
 */

var generateParenthesis = function (n) {
  let res = [];
  walker(res, n, n, "");
  return res;
};
var walker = function (res, left, right, cur) {
  // TODO: 可以考虑剪枝进行优化。
  // Optimization: 在形参里加入不变 n 如果 r > n l > n r > l 直接返回以此达到剪枝效果
  if (left === 0 && right === 0) {
    res.push(cur);
    return;
  }
  if (left > 0) {
    walker(res, left - 1, right, cur + "(");
  }
  if (right > left) {
    walker(res, left, right - 1, cur + ")");
  }
};
