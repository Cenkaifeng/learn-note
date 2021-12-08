/**
 * Offer II 012. 左右两边子数组和相等
 * https://leetcode-cn.com/problems/tvdfij/
 * 
 * 给你一个整数数组 nums ，请计算数组的 中心下标 。

数组 中心下标 是数组的一个下标，其左侧所有元素相加的和等于右侧所有元素相加的和。

如果中心下标位于数组最左端，那么左侧数之和视为 0 ，因为在下标的左侧不存在元素。这一点对于中心下标位于数组最右端同样适用。

如果数组有多个中心下标，应该返回 最靠近左边 的那一个。如果数组不存在中心下标，返回 -1 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/tvdfij
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  // 根据题意优先从左边开始查找.

  let count = 0;

  for (let i = 0, len = nums.length; i < len; i++) {
    // js 中的前缀和解法都可以用reduce优化。
    // count = nums.reduce((a, b) => a + b);
    count += nums[i];
  }

  let preCount = 0;
  for (let i = 0, len = nums.length; i < len; i++) {
    if (preCount * 2 + nums[i] == count) {
      // 核心判断当前值的二倍 + 当前值 = ∑
      return i;
    }
    preCount += nums[i]; // 顺序自增
  }

  return -1;
};

/**
 * 当遍历到第 i 个元素时，设其左侧元素之和为 sum，则其右侧元素之和为 total - nums[i] - sum。
 *
 * 左右侧元素相等即为 sum = total - nums[i] - sum ，即 2 * sum + nums[i] = total。
 */
