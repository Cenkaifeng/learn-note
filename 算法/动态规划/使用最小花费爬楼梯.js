/**
 * leetCode.746
 * https://leetcode-cn.com/problems/min-cost-climbing-stairs/
 */

/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  const n = cost.length;
  if (n < 2) {
    return 0; // 边界判断
  }
  // 思路：pre/ prepre / curr 来判断最优

  //到达当前台阶时判断下从前一个台阶过来省事，还是从前一个的前一个过来省事，一直累加到最后一个台阶完，最小值就是最省体力的。 用p1和p2表示前两个和前一个台阶所耗费的体力，一遍循环就可以了。
  let p1 = 0;
  let p2 = 0;
  for (let i = 2; i <= n; i++) {
    // i = 2 因为需要考虑pre 和 prepre 而 curr 其实是不需要弄出来的指针
    [p1, p2] = [p2, Math.min(p2 + cost[i - 1], p1 + cost[i - 2])];
  }
  return p2;
};
