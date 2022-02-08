/**
 * https://leetcode-cn.com/problems/house-robber/submissions/
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  //转移方程： dp[i] = max(dp[i - 2] + nums[i], dp[i - 1])
  if (nums.length < 2) {
    return nums[0];
  }
  const dp = new Array(nums.length).fill(-Infinity);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  // console.log()
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }
  // console.log(dp)
  return dp[dp.length - 1];
};

/**
 * 打家劫舍ii
 * https://leetcode-cn.com/problems/house-robber-ii/submissions/
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length < 2) {
    return nums[0];
  }
  // 环队列处理

  const first = [...nums];
  first.pop();
  const second = [...nums];
  second.shift();

  return Math.max(resolve(first), resolve(second));
};

function resolve(arr) {
  let pre = 0,
    cur = 0,
    tmp = 0;
  // 状态转移方程dp[n + 1] = max(dp[n] , dp[n - 1]+ num)
  for (let num of arr) {
    tmp = cur; // 储存上一轮dp[n+1]，本轮为 dp[n]
    //  dp[n+1] = max(dp[n], dp[n-1]+num)
    cur = Math.max(cur, pre + num);
    pre = tmp; // 把当前经历的放到 dp[n-1] 的位置
  }
  return cur;
}
// 总体看 resolve 这个环节其实有维持 dp 和 arr, pre和cur 在dp中，紧挨着向右滑动cur 紧跟着num
