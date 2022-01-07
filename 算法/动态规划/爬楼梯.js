/**
 * @param {number} n
 * @return {number}
 */
// var climbStairs = function(n) {
//     if (n <= 1) return 1
//     return climbStairs(n - 1) + climbStairs(n - 2)
// };// 用递归会超出执行时间限制

// 循环
var climbStairs = function (n) {
  let p = 0,
    q = 0,
    r = 1;

  if (n < 3) return n;
  for (let i = 1; i <= n; ++i) {
    p = q;
    q = r;
    r = p + q;
  }
  return r;
};
//动态规划解题

var climbStairs = function (n) {
  const dp = [];
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};
