// 接雨水
/**
 *
 * 暴力解法 (超时)
 * @param {number[]} height
 * @return {number}
 */
//  直接按问题描述进行。对于数组中的每个元素，
//  我们找出下雨后水能达到的最高位置，
//  等于两边最大高度的较小值减去当前高度的值。
var trap = function (height) {
  let ans = 0;
  for (let i = 1, size = height.length - 1; i < size; i++) {
    //初始化 左右遍历
    let max_left = 0,
      max_right = 0;

    for (let j = i; j >= 0; j--) {
      // 从当前下标开始向左查找
      max_left = Math.max(max_left, height[j]);
    }

    for (let j = i; j <= size; j++) {
      // 从当下开始向右查找最大
      max_right = Math.max(max_right, height[j]);
    }

    // 当前位置的积水 = 当前左右最高值中 min - 柱子本身

    ans += Math.min(max_left, max_right) - height[i];
  }
  return ans;
};

/**
 * 动态规划
 */
// 暴力解中每次左右扫码的次数 = n * m , 重复扫码结果可以优化成dp

var trap = function (height) {
  const n = height.length;
  if (n == 0) {
    return 0;
  }

  // 我们需要求出所有点对应的左边最高的集合 可以看做是 leftDp
  const leftMax = new Array(n).fill(0);
  leftMax[0] = height[0]; // 初始化边界
  for (let i = 1; i < n; ++i) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }
  // 我们需要求出所有点对应的右边最高的集合
  const rightMax = new Array(n).fill(0);
  rightMax[n - 1] = height[n - 1]; // 初始化边界
  for (let i = n - 2; i >= 0; --i) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  let ans = 0;
  for (let i = 0; i < n; ++i) {
    // 从上个解法里得到了一个简单公式 当前位置的积水 = 当前左右最高值中 min - 柱子本身
    ans += Math.min(leftMax[i], rightMax[i]) - height[i];
  }
  return ans;
};

/**
 * 双指针
 * 由于动态规划并不是最优解，O(n) 的空间复杂度，
 * 如果要把空间复杂度优化到O(1)常数，还是需要双指针。
 */
// 双指针实施的关键点在于，找到 right_max[i] > left_max[i]
/**
 * 
如果一端有更高的条形块（例如右端），积水的高度依赖于当前方向的高度（从左到右）。
当我们发现另一侧（右侧）的条形块高度不是最高的，我们则开始从相反的方向遍历（从右到左）。
我们必须在遍历时维护 left_max 和 right_max ，但是我们现在可以使用两个指针交替进行，
实现 1 次遍历即可完成。

 */
var trap = function (height) {
  let left = 0;
  let right = height.length - 1;
  let left_max = 0;
  let right_max = 0;
  let ans = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= left_max) {
        left_max = height[left];
      } else {
        ans += left_max - height[left];
      }
      ++left; //左移指针
    } else {
      if (height[right] >= right_max) {
        right_max = height[right];
      } else {
        ans += right_max - height[right];
      }
      --right; //指针右移
    }
  }
  return ans;
};
