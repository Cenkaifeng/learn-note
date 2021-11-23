/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

// 状态： 目标金额 amount
// 选择： coins 数组中列出的所有硬币的面值
// 函数定义： 凑出总金额 amount, 至少需要 coinChange(coins, amount) 枚硬币
// base case : amount === 0 时，需要 0 枚硬币； amount < 0时，不可能凑出

// coinChange([1,2,5], 11) = 1 + min(coinChange([1,2,5], 10), coinChange([1,2,5], 9), coinChange([1,2,5], 6));

var coinChange = function (coins, amount) {
  // 暴力解法

  if (amount === 0) return 0;
  if (amount < 0) return -1;

  let res = Infinity;
  for (let coin of coins) {
    // 计算子问题的结果
    const subProblem = coinChange(coins, amount - coin);
    // 子问题无解则跳过
    if (subProblem === -1) continue;

    res = Math.min(res, subProblem + 1);
  }
  return res == Infinity ? -1 : res;
};

// 自顶向下时 递归备忘录
let memo;
var coinChange = function (coins, amount) {
  // 初始化特殊值
  memo = new Array(amount + 1).fill(-888);
  return dp(coins, amount);
};

function dp(coins, amount) {
  // 时间复杂度O(n)
  if (amount == 0) return 0;
  if (amount < 0) return -1;
  // 查看备忘录，防止重复计算
  if (memo[amount] !== -888) {
    return memo[amount];
  }
  let res = Infinity;
  for (let coin of coins) {
    // 计算子问题的结果
    const subProblem = dp(coins, amount - coin);
    // 子问题无解则跳过
    if (subProblem === -1) continue;

    res = Math.min(res, subProblem + 1);
  }
  // 存备忘录
  memo[amount] = res == Infinity ? -1 : res;
  return memo[amount];
}

// 至底向上，dp迭代解法

function coinChange(coins, amount) {
  let dp = new Array(amount + 1).fill(amount + 1);

  // base case
  dp[0] = 0;

  for (let i = 0; i < dp.length; i++) {
    // 内层 for 循环在求所有选择的最小值
    for (let coin of coins) {
      if (i - coin < 0) continue; //子问题无解跳过

      // 状态转移方程
      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }
  // 返回金额结果
  return dp[amount] === amount + 1 ? -1 : dp[amount];
}
