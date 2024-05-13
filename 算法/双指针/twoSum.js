// 剑指Offer 2 006:排列数组中两个数字之和
var twoSum = function (numbers, target) {
  // 暴力解:先在数组中固定一个一个数字，再依次判断数组中其余的数字与它的和是不是等于k，这种暴力解法的时间复杂度为O(n^2)

  let res = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > target) continue;

    // let diff = target - numbers[i];
    // col[i] = diff;
    let mid = target - numbers[i];

    for (let j = 1; j < numbers.length; j++) {
      if (numbers[j] === mid && i !== j) {
        res = [i, j].sort((a, b) => a - b);
      }
    }
  }
  return res;
};

// 双指针解法 O(n)
// 解法不适用 case target 6 numbers [3,2,4]
var twoSum = function (numbers, target) {
  let i = 0,
    j = numbers.length - 1;
  let sum = numbers[i] + numbers[j]; // 初始化
  while (i < j && sum != target) {
    if (sum < target) {
      // 指针移动
      i++;
    } else {
      j--;
    }
    sum = numbers[i] + numbers[j];
  }
  return [i, j];
};
/**
 * hashMap 解法
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const map = new Map(); // 数组中同一元素不重复出现

  for (let i = 0, len = nums.length; i < len; i++) {
    if (map.has(target - nums[i])) {
      let res = map.get(target - nums[i]);

      return [i, res];
    }
    map.set(nums[i], i);
  }
};
