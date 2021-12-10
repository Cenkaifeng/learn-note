/**
 * LeetCode: 448
 * 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。

    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

var findDisappearedNumbers = function (nums) {
  // 暴力解超出时间, 用了array api , 导致 O(n^2)
  // get [1, n] 数组
  let temp = [];
  for (let i = 1; i <= nums.length; i++) {
    temp.push(i);
  }
  // 遍历 temp 去除 [1, n] 在 nums 中重复的元素
  for (let i = 0; i < temp.length; i++) {
    if (nums.includes(temp[i])) {
      temp.splice(i, 1);
      i--;
    }
  }
  return temp;
};

/** 思路：
将所有正数作为数组下标，
置对应数组值为负值。
那么，仍为正数的位置即为（未出现过）消失的数字。

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  for (let i = 0; i < nums.length; ++i) {
    // 因为 nums[i] 的绝对值是小于 nums.length 的.
    // 把nums i 对应nums 有的元素做负数处理，这样就会出现没有被处理的 nums[j] , 这个时候 j 就是数组中消失的数。
    nums[Math.abs(nums[i]) - 1] = -Math.abs(nums[Math.abs(nums[i]) - 1]);
  }
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      res.push(i + 1); // 因为下标从 0 开始，要 + 1 还原[1, n]
    }
  }
  return res;
};
