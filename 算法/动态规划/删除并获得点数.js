// 这题如果可以理解打家劫舍系列就很好理解。

/**
 *
 * 假如有 [2,2,3,3,4,5] 可以转换成
 * all [0,1,2,2,1,1] 这个排列
 */

/**
 * https://leetcode-cn.com/problems/delete-and-earn/
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
  const n = nums.length;
  if (nums === null || n === 0) {
    return 0;
  } else if (n === 1) {
    return nums[0];
  }

  let max = nums[0]; // 设置一个初始值,去找这个nums 中最大数，以此确定 all 和 dp 数组的边界
  for (let i = 0; i < n; ++i) {
    max = Math.max(max, nums[i]);
  }

  // 首先把这道题做出新数组, 用下标对应nums元素，all元素对应nums元素出现数量
  const all = new Array(max + 1).fill(0);
  for (let num of nums) {
    all[num]++;
  }

  // 开始初始化 dp ,nums 在处理出 max 和 all 之后也就没他的事了
  const dp = new Array(max + 1).fill(0);
  dp[1] = all[1] * 1;
  dp[2] = Math.max(dp[1], all[2] * 2);

  for (let i = 2; i <= max; ++i) {
    // 此时完全可以用打家劫舍思维，dp[i] = max(dp[i - 2] + nums[i], dp[i - 1]) =>
    // dp[i] = max(dp[i - 1], dp[i - 2] + i * all[i]) i* all[i] 对于 nums[i]
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + i * all[i]);
  }
  return dp[max];
};
