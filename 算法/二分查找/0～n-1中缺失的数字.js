/**
 * 剑指 Offer 53 - II. 0～n-1中缺失的数字
 * 一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/que-shi-de-shu-zi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @return {number}
 *
 * 异或解法
 */
var missingNumber = function (nums) {
  let n = nums.length + 1;
  let sum = 0;

  for (let i = 0; i < n; ++i) {
    sum += i;
    // console.log('now sum is:',sum)
  }
  for (let i = 0; i < nums.length; ++i) {
    sum -= nums[i];
  }
  return sum;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  // 二分解法 // 注意二分的类型 [1,1] 区间 和 [1,2) 区间，下面是左右闭合区间
  let i = 0,
    j = nums.length - 1;
  while (i <= j) {
    let m = (i + j) >> 1;
    if (nums[m] == m) {
      i = m + 1;
    } else {
      j = m - 1;
    }
  }
  return i;
};
