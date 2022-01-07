/**
 * https://leetcode-cn.com/problems/longest-consecutive-sequence/solution/zui-chang-lian-xu-xu-lie-by-leetcode-solution/
 * leetCode: 128
 *
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
/**
用哈希表存储每个端点值对应连续区间的长度
若数已在哈希表中：跳过不做处理

*/
var longestConsecutive = function (nums) {
  const set = new Set();
  const n = nums.length;
  for (const num of nums) {
    set.add(num);
  } // 先得出一个去重
  // 后续思路是遍历
  let longestStreak = 0; // 当前最长连续序列长度;

  for (const num of set) {
    if (!set.has(num - 1)) {
      // 当前没有前一个，换句话说是，只从第一个开始，避免重复处理。

      let curNum = num;
      let currentSteak = 1; // 当前最大栈

      while (set.has(curNum + 1)) {
        curNum++;
        currentSteak++;
      }

      longestStreak = Math.max(longestStreak, currentSteak);
    }
  }

  return longestStreak;
};
