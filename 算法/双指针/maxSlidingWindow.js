// 滑动窗口最大值

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  let wl = 0;
  let wr = wl + k - 1;
  let res = [];
  while (wr <= nums.length - 1) {
    let focus = [];
    if (wr > nums.length - 1) break; // 窗口终止
    for (let i = wl; i <= wr; i++) {
      focus.push(nums[i]);
      if (i === wr) {
        res.push(focus.sort((a, b) => a - b).pop());
      }
    }
    wl++; // 窗口移动
    wr++;
  }
  return res;
};
