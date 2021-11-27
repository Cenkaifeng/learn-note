/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
  // base case
  if (nums.length === 1) {
    return 1;
  }

  let maxSubLength = 1; // 边界初始值
  let l = 0; //
  let r = 1; //
  let i = 1;
  while (r < nums.length) {
    // 指针移动条件
    if (nums[i - 1] < nums[i]) {
      r++;
      maxSubLength = Math.max(maxSubLength, r - l);
    } else {
      l = i;
      r = i + 1;
    }

    ++i;
  }

  return maxSubLength;
};
/**
 * 贪心思想解法
 */
var findLengthOfLCIS = function (nums) {
  let ans = 0;
  const n = nums.length;
  let start = 0;
  for (let i = 0; i < n; i++) {
    if (i > 0 && nums[i] <= nums[i - 1]) {
      start = i;
    }
    ans = Math.max(ans, i - start + 1);
  }
  return ans;
};
