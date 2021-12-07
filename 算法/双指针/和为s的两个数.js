/**
 * Offer 57. 和为s的两个数
 *
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const arr = new Array(nums.length).fill([]);
  let ans = [];
  for (let i = 0, len = nums.length; i < len; i++) {
    arr[i] = [nums[i], target - nums[i]];
  }
  console.log(arr);
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i][0] + arr[i][1] === target && nums.includes(arr[i][1])) {
      ans = arr[i];
      break;
    }
  }

  return ans;
};
//最开始的思路是上面，用一个多维数组做配对存储，也就是类似，哈希表的思想。但是超时了

// 这道题适合用双指针作为求解，另外由于是排序的，所以还可以用二分查找做差值求解。
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let l = 0,
    r = nums.length - 1;

  while (l < r) {
    let sum = nums[l] + nums[r];
    if (sum > target) {
      r--;
    } else if (sum < target) {
      l++;
    } else {
      return [nums[l], nums[r]];
    }
  }
  return [];
};
