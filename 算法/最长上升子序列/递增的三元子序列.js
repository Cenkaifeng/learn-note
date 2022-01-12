/*
https://leetcode-cn.com/problems/increasing-triplet-subsequence/

给你一个整数数组 nums ，判断这个数组中是否存在长度为 3 的递增子序列。

如果存在这样的三元组下标 (i, j, k) 且满足 i < j < k ，使得 nums[i] < nums[j] < nums[k] ，返回 true ；否则，返回 false 。
*/

// 我最开始的时候读题理解有问题，就一心想着用双指针，但是其实它应该用贪心或者二分的思想去解
// 说双指针不行，把下面first 换成 left second 换 right 也不对。但是终归是解题思想的理解程度还不够。
// 如果是连续子序列应该可以用双指针、滑动窗口，但是这里的子序列可以是分散的所以得用lis做。
// 可以看 递增的三原子序列.png 这个图相当简洁明了。
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
  const n = nums.length;
  let first = nums[0],
    second = Number.MAX_VALUE;
  // 贪心解法
  for (let i = 0; i < n; i++) {
    let num = nums[i];
    if (num > second) {
      // 说明大于 first && second
      return true;
    } else if (num > first) {
      second = num;
    } else {
      // num < first || (nums < second && num < first)
      first = num;
    }
  }
  return false;
};

// case [2, 6, 3, 1, 5] true

// 二分法 + 贪心
/**
 * 简单来说，就是在遍历每个数 nums[i]nums[i] 的同时，
 * 维护一个具有单调性的 f[] 数组，其中 f[len] = x代表长度为 len 的最长上升子序列最小结尾元素为 x
 * 可以证明 f 数组具有单调性，因此每次可以通过二分找到小于nums[i] 的最大下标
 * 来作为nums[i] 的前一个数

 * @param {*} nums 
 * @returns 
 */
function increasingTriplet2(nums) {
  let n = nums.length,
    ans = 1;
  // 这里用 f
  let f = new Array(n + 1).fill(Number.MAX_VALUE);

  for (let i = 0; i < n; i++) {
    let num = nums[i];
    let l = 1,
      r = i + 1;
    while (l < r) {
      let mid = (l + r) >> 1;
      if (f[mid] >= num) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    f[r] = num;
    ans = Math.max(ans, r);
  }
  return ans >= 3;
}
