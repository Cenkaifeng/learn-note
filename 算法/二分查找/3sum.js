// 三数之和：梦开始的地方

/**
 * @param {number[]} nums
 * @return {number[][]}
 * LeetCode：15 https://leetcode-cn.com/problems/3sum/
 */
var threeSum = function (nums) {
  if (nums.length < 2) {
    return [];
  }
  // nums 排序
  nums.sort((a, b) => a - b);
  console.log("sort nums:", nums);
  let res = [];

  for (let k = 0; k < nums.length - 2; k++) {
    if (nums[k] > 0) break; //  j > i > k
    if (k > 0 && nums[k] === nums[k - 1]) continue; // skip the same `nums[k]
    let l = k + 1;
    let r = nums.length - 1;
    while (l < r) {
      // 双指针循环
      let midSum = nums[k] + nums[l] + nums[r];
      if (midSum < 0) {
        l++; //左指针右移
        while (l < r && nums[l] === nums[l - 1]) {
          l++;
        }
      } else if (midSum > 0) {
        r--; // 右指针左移
        while (l < r && nums[r] === nums[r + 1]) {
          r--;
        }
      } else {
        // 这里是和 == 0 但是要去重
        res.push([nums[k], nums[l], nums[r]]);
        l++;
        r--;
        //while(i < j && nums[l] == nums[++l]); && r 默认自增一遍，这个写法很秀但是不太好读
        while (l < r && nums[l] === nums[l - 1]) {
          l++;
        }
        while (l < r && nums[r] === nums[r + 1]) {
          r--;
        }
      }
    }
  }

  return res;
};
/**
 * 解题思路：
 * 先排序
 * 然后使用三指针（实际上是滑动窗口变异版 + 双指针）nums[k] + nums[left] + nums[right]
 */
