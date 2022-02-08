/**
 * 55.跳跃游戏
 * https://leetcode-cn.com/problems/jump-game/
 */

//贪心解
/**
 * @param {number[]} nums
 * @return {boolean}
 */
//如果某一个作为 起跳点 的格子可以跳跃的距离是 3，那么表示后面 3 个格子都可以作为 起跳点
// 可以对每一个能作为 起跳点 的格子都尝试跳一次，把 能跳到最远的距离 不断更新

var canJump = function (nums) {
  if (nums.length === 1) return true;
  let k = 0; // k就是每次更新更跳到的最远距离
  for (let i = 0; i < nums.length; i++) {
    if (i > k) return false; // 如果更新完超过了那就跳不了
    k = Math.max(k, i + nums[i]);
  }
  return true; //如果可以一直跳到最后，就成功了
};
//动态规划解 https://leetcode-cn.com/problems/jump-game/solution/tan-xin-dong-tai-gui-hua-dong-hua-tu-jie-47ie/

function canJump(nums) {
  let dp = new Array(nums.length).fill(false); //初始化dp
  dp[0] = true; //第一项能到达
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      //当前位置j能达到，并且当前位置j加上能到达的位置如果超过了i，那dp[i]更新为ture，便是i位置也可以到达
      if (dp[j] && nums[j] + j >= i) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[nums.length - 1];
}
