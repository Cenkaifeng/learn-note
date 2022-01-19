/**
 * 
 * 219. 存在重复元素 II https://leetcode-cn.com/problems/contains-duplicate-ii/
  给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，
  满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 
 */

// 暴力解
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const n = nums.length;
  let ans = false;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      if (i !== j && nums[i] === nums[j] && Math.abs(i - j) <= k) {
        ans = true;
        break;
      }
    }
  }
  return ans;
};

// 可以看做是滑动窗口为k的数进行求解

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      return true;
    }
    set.add(nums[i]); // 每次都会把当前数字加入
    if (set.size > k) {
      // 维持一个 size <= k 的 hashmap
      set.delete(nums[i - k]); // 删除 i - k 的原因是，维护一个 k 的窗口，然后这个窗口不断向前滑动
    }
  }
  return false;
};
