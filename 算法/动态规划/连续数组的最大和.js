/**
 * 
 * Offer 42. 连续子数组的最大和 
 * https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/
 * 输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。
 * 求所有子数组的和的最大值。

  要求时间复杂度为O(n)。

*
 * 动态规划解法为本题最优解
 */

//思路很清晰，只是有一点建议。 因为有的时候，题目要求可能不能修改原有数组，考虑到在dp列表中，dp[i]只和dp[i-1]有关,所以用两个参数存储循环过程中的dp[i]和dp[i-1]的值即可，空间复杂度也为O(1)。 代码如下：

var maxSubArray = function (nums) {
  let dp = nums[0];
  let ret = nums[0];
  for (let i = 1; i < nums.length; i++) {
    console.log(dp);
    dp = Math.max(dp + nums[i], nums[i]); // 选取上一个对比最大数（不为负数）
    ret = Math.max(dp, ret); // 结果取值
    console.log("ret", ret);
    // 把结果返回
  }

  return ret;
};
/**
 * 转移方程如下
 * 当 dp[i−1]>0 时：
 *    执行 dp[i] = dp[i-1] + nums[i] dp[i] = dp[i−1] + nums[i] ；
 * 当 dp[i−1]≤0 时：
 *    执行 dp[i] = nums[i] dp[i] = nums[i] ；
 */

/**
 * 做空间优化后
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let res = nums[0];
  for (let i = 1; i < nums.length; i++) {
    // dp = Math.max((dp + nums[i]) , nums[i]) // 选取上一个对比最大数（不为负数）
    nums[i] += Math.max(nums[i - 1], 0); // 大于零 + nums[i - 1] , 小于零不变。
    res = Math.max(res, nums[i]); // 结果取值
    // 把结果返回
  }

  return res;
};
