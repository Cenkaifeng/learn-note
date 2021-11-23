/**
给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/container-with-most-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  // 暴力解的思路是 双循环穷举，但是O(n^2)的时间复杂度 会导致超时
  // let max = 0
  // for(let i = 0; i < height.length ; i ++) {
  //     for (let j = i + 1; j < height.length; j ++) {
  //         max = Math.max(max, Math.min(height[i], height[j]) * (j - i))
  //     }
  // }
  // return max
  // 暴力解超时了...

  let l = 0,
    r = height.length - 1,
    max = 0;

  while (l < r) {
    max = Math.max(max, Math.min(height[l], height[r]) * (r - l));

    if (height[r] < height[l]) {
      // 指针的变化
      --r;
    } else {
      ++l;
    }
  }
  return max;
};
