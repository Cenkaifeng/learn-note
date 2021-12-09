// 接雨水
/**
 *
 * 暴力解法 (超时)
 * @param {number[]} height
 * @return {number}
 */
//  直接按问题描述进行。对于数组中的每个元素，
//  我们找出下雨后水能达到的最高位置，
//  等于两边最大高度的较小值减去当前高度的值。
var trap = function (height) {
  let ans = 0;
  for (let i = 1, size = height.length - 1; i < size; i++) {
    //初始化 左右遍历
    let max_left = 0,
      max_right = 0;

    for (let j = i; j >= 0; j--) {
      // 从当前下标开始向左查找
      max_left = Math.max(max_left, height[j]);
    }

    for (let j = i; j <= size; j++) {
      // 从当下开始向右查找最大
      max_right = Math.max(max_right, height[j]);
    }

    // 当前位置的积水 = 当前左右最高值中 min - 柱子本身

    ans += Math.min(max_left, max_right) - height[i];
  }
  return ans;
};

/**
 * 动态规划
 */
// 暴力解中每次左右扫码的次数 = n * m , 重复扫码结果可以优化成dp

/**
 * 双指针
 */
