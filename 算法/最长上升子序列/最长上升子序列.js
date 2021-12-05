// TODO;
/**
 * 求最长上升子序列的长度
 * LeetCode：300.
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  // 1. 递推公式：动态规划

  let n = nums.length;
  if (n === 0) {
    return 0;
  }

  let dp = new Array(n).fill(1); // 初始化dp

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);

  // 2. 贪心 + 二分查找
};
/**
 * 求多个最长上升子序列个数
 * LeetCode：673.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
  if (nums.length === 0) return 0;

  let dp = new Array(nums.length).fill(1);
  let comb = new Array(nums.length).fill(1);
  let lisMax = 1; // 应付 length = 1 的数组，所以需要max init 1
  let ans = 0;

  for (let i = 1; i < dp.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        if (dp[j] + 1 > dp[i]) {
          // + 1 大于当前 lis 组合数不变
          dp[i] = dp[j] + 1; // 因为所有值都初始为 1 了，所以 + 1 更新 dp[i]. dp[i] 代表当前 index 递增序列数
          comb[i] = comb[j];
        } else if (dp[j] + 1 === dp[i]) {
          // + 1 等于当前 list 则有新组合
          comb[i] += comb[j];
        }
      }
    }
    lisMax = Math.max(lisMax, dp[i]);
  }

  for (let i = 0; i < nums.length; i++) {
    if (dp[i] === lisMax) {
      ans += comb[i];
    }
  }
  return ans;
};
