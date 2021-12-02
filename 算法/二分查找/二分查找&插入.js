function binarySearch(arr, value, start = 0, end = arr.length) {
  // 这个解法LeetCode过不了，会超时
  if (start >= end) {
    return start;
  }
  let mid = Math.floor((start + end) / 2);

  let midValue = arr[mid];

  if (value === midValue) {
    return mid;
  } else if (value > midValue) {
    return binarySearch(arr, value, mid + 1, end);
  } else {
    return binarySearch(arr, value, start, mid);
  }
}

// while 循环解法（性能更好点...
function sort(list, val) {
  let left = 0,
    right = list.length;
  while (left < right) {
    let mid = (right + left) >> 1; // 这个位运算有点骚，相当于 Math.floor() 的效果了
    let value = list[mid];
    if (value === val) {
      return mid;
    } else if (value > val) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left + 1;
}
// 双指针 + 二分while解
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1; //
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
};
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  // 边界处理
  if (target < nums[0]) return 0;
  if (target > nums[nums.length - 1]) return nums.length;
  let left = 0;
  let right = nums.length - 1;
  let mid;
  while (left < right) {
    mid = (left + right) >> 1;
    if (nums[mid] == target) {
      return mid;
    } else {
      nums[mid] > target ? (right = mid) : (left = mid + 1);
    }
  }

  return left;
};
