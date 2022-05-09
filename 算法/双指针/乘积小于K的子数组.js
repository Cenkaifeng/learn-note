/**
 * https://leetcode.cn/problems/subarray-product-less-than-k/
 * 滑动窗口解
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

var numSubarrayProductLessThanK = function (nums, k) {
  if (k <= 1) return 0;
  const n = nums.length;
  let l = 0;
  let prod = 1;
  let res = 0;
  for (let r = 0; r < n; r++) {
    // r昨晚右边界持续右移
    prod *= nums[r]; //计算乘积
    while (prod >= k) {
      // 如果乘积大于 target
      prod /= nums[l++]; // 窗口左侧从乘积里除掉后 l右移一格
    }
    res += r - l + 1;
  }
  return res;
};
