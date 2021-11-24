/**
 * @param {number} target
 * @return {number[][]}
 */
/**
 * 方法一： 暴力递归 O(2^n)
 */
var findContinuousSequence = function (target) {
  let subStack = [];
  let resStack = [];

  for (let i = 0; i < target; i++) {
    let mid = 0;
    for (let j = i + 1; j < target; j++) {
      mid += j;
      if (mid === target) {
        subStack.push(j);
        resStack.push(subStack);
        subStack = [];
      } else if (mid < target) {
        subStack.push(j);
      } else {
        subStack = [];
        break; // 清空子栈，中断循环
      }
    }
  }
  return resStack;
};

/*
 * 此方法其实是对方法一的优化，因为方法一是没有考虑区间与区间的信息可以复用，
 * 只是单纯的枚举起点，然后从起点开始累加
 */

var findContinuousSequence = function (target) {
  // 这个是左右都闭合的方案
  let l = 1, // 不能从0开始 否则可能出现[0,1....] 这样的非法答案
    r = 2, // 指针初始化
    sum = 3;

  const resStack = [];

  while (l <= target / 2) {
    if (sum < target) {
      r++; //右侧右移
      sum += r;
    } else if (sum > target) {
      sum -= l;
      l++;
    } else {
      let curStack = [];
      for (let i = l; i <= r; i++) {
        console.log(i);
        curStack.push(i);
      }
      resStack.push(curStack);
      // 符合条件后 left 前推
      sum -= l;
      l++;
    }
  }

  return resStack;
};
