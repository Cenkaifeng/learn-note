// 滑动窗口最大值

/**
 * @param {number[]} nums
 * @param {number} k 窗口大小值
 * @return {number[]}
 */
function maxSlidingWindow(nums, k) {
  let wl = 0;
  let wr = wl + k - 1;
  let res = [];
  while (wr <= nums.length - 1) {
    let focus = []; // 处理窗口内数据的临时数组
    if (wr > nums.length - 1) {
      // 右侧窗口达到了 nums 最大值终止
      break;
    } // 窗口终止
    for (let i = wl; i <= wr; i++) {
      focus.push(nums[i]);
      if (i === wr) {
        // 窗口内数字的最后一个
        res.push(focus.sort((a, b) => a - b).pop()); // 每次把focus的最大值通过排序后放进 res
      }
    }
    wl++; // 窗口移动
    wr++;
  }
  return res;
}
