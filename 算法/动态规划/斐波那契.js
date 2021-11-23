/**
 * @param {number} n
 * @return {number}
 */
// 暴力递归解法
function fib(n) {
  // 时间复杂度O(2^n)
  if (n === 0 || n === 1) return n;

  return fib(n - 1) + fib(n - 2);
}

var fib = function (n) {
  // dp 解 自顶向下

  const dp = new Array(n + 1).fill(0);
  return helper(dp, n);
};

var helper = function (dp, n) {
  // base case
  if (n === 0 || n === 1) return n;
  // 找出重复计算
  if (dp[n] !== 0) {
    return dp[n];
  } else {
    dp[n] = helper(dp, n - 1) + helper(dp, n - 2);
  }
  return dp[n];
};

var fib = function (n) {
  // dp 解 自底向上
  if (n === 0) return 0;

  const dp = new Array(n + 1).fill(0); // O(n) 时间复杂度 O(n)空间复杂度

  // base case
  dp[0] = 0;
  dp[1] = 1;
  // 状态转移
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};

function fib(n) {
  // O(n)时间复杂度 O(1) 空间复杂度
  // base case
  if (n === 0 || n === 1) {
    return n;
  }

  // 递推关系
  let prev = 0,
    curr = 1;
  for (let i = 2; i <= n; i++) {
    // let sum = prev + curr;
    // prev = curr;
    // curr = sum;
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}
