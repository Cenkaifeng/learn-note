/**
 *
 *  Offer II 004 :https://leetcode-cn.com/problems/WGki4K/
 * 给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次。
 * 请你找出并返回那个只出现了一次的元素。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  const hashMap = new Map(); // 创建一个 hashMap 利用唯一性求出 value == 1 的 key
  for (const num of nums) {
    hashMap.set(num, (hashMap.get(num) || 0) + 1);
  }
  // let ans = 0;
  // for (const [num, occ] of hashMap.entries()) {
  //   if (occ === 1) { // 出现次数 1
  //     ans = num;
  //     break;
  //   }
  // }
  // return ans;
  for (const [num, occ] of hashMap.entries()) {
    if (occ === 1) {
      // 优化
      return ans;
      // break;
    }
  }
};
