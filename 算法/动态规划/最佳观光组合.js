/**
 * 本题作为买卖股票系列前置题目
 * LeetCode.1014
 * https://leetcode-cn.com/problems/best-sightseeing-pair
 */

// 首先暴力解法
/**
 * @param {number[]} values
 * @return {number}
 */
var maxScoreSightseeingPair = function (values) {
  let higher = 0; // values[0]
  let len = values.length;
  // const dp = new Array(values.length).fill(0);

  // 每组景点和 =  景点评分和 - 距离差
  for (let i = 0; i < len; i++) {
    let dpH = 0;
    for (let j = i + 1; j < len; j++) {
      let cur = values[i] + values[j] + i - j;
      dpH = Math.max(cur, dpH);
    }
    higher = Math.max(dpH, higher);
  }

  return higher;
};

// 单for 动态规划， O(n)时间复杂 空肩复杂O(1)
/**
 * @param {number[]} values
 * @return {number}
 */
var maxScoreSightseeingPair = function (values) {
  // 把公式变形 values[i] + values[j] + i - j -> values[i] + i + values[j] - j
  // left = values[i] + i
  let higher = 0;
  let left = values[0]; // 初始化 left = value[0] + 0

  // 随着遍历数组，我们对两部分和取最大值，并且若当前的值—下标对之和比之前更大，我们就更新left部分的值即可。
  for (let i = 1, len = values.length; i < len; i++) {
    higher = Math.max(higher, left + values[i] - i);
    left = Math.max(left, values[i] + i); //本轮left 用于下一轮求最大值higher
  }

  return higher;
};
