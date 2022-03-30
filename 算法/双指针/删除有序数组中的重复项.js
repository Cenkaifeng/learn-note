/**
 * leetCode.26 删除有序数组中的重复项
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
 *
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (nums.length < 2) {
    return nums.length;
  }
  // 数组原地修改使用快慢指针思路
  let slow = 0;
  let fast = 0;

  while (fast < nums.length) {
    if (nums[slow] !== nums[fast]) {
      slow++; //慢指针移动
      nums[slow] = nums[fast]; //然后将当前不同的值替换到慢指针上
    }
    fast++; // 指针移动
  }
  return slow + 1; // 最后实际去除重复后的数组下标为慢指针数
};
