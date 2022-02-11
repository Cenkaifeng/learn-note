/**
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/
 * leetCode.121
 */
/**
 * 记录【今天之前买入的最小值】
    计算【今天之前最小值买入，今天卖出的获利】，也即【今天卖出的最大获利】
    比较【每天的最大获利】，取最大值即可
 * @param {*} prices 
 * @returns 
 */
function maxProfit(prices) {
  let buy = prices[0];
  let sale = 0;
  let fin = 0;

  prices.forEach((_v, _i, _a) => {
    sale = Math.max(sale, prices[_i] - buy);
    buy = Math.min(buy, prices[_i]);
    fin = sale > 0 ? sale : 0;
  });
  return fin;
}

/**
 * leetCode.122 买卖股票最佳时机2
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/
 */

/**
 * 本来想着用之前 121 的思路，但是越想越复杂。然后画了个柱状图模拟了三种情况

持续升序
持续降序
有升有降
然后发现双指针可以很好解决这题，而且时间复杂O(n)和空间复杂O(1) 只要做t就能解决这题的问题，今天买，明天涨就卖。
 */
/**
 * @param {number[]} prices
 * @return {number}
 *  双指针 空间复杂度 O(1) 时间复杂 O(n)
 */
var maxProfit = function (prices) {
  if (prices.length < 2) {
    return 0;
  }

  const len = prices.length;
  let left = 0;
  let right = 1; // 初始化
  let earn = 0; // 赚取的利润

  while (right < len) {
    if (prices[left] < prices[right]) {
      earn += prices[right] - prices[left];
      left++;
      right++; // 指针移动
    }
    if (prices[left] >= prices[right]) {
      left = right;
      right++;
    }
  }
  return earn;
};

// 贪心算法 比双指针更简单了一些
// 时间复杂度 O(n) 空间复杂度 O(1)
function maxProfit(prices) {
  let res = 0;
  for (let i = 1; i < prices.length; i++) {
    let tmp = prices[i] - prices[i - 1]; // 这个步骤从tmp 前后差值中找大于零的加上去
    if (tmp > 0) res += tmp;
  }
  return res;
}

// 动态规划 时间复杂度 O(n) 空间复杂度 O(n)

function maxProfitDp(prices) {
  let len = prices.length;
  if (len < 2) {
    return 0;
  }

  // 0：持有现金
  // 1：持有股票
  // 状态转移：0 → 1 → 0 → 1 → 0 → 1 → 0
  const dp = new Array(len).fill([]); // fill 创建二维数组这样写有隐患，建议按下面的写法

  dp[0][0] = 0;
  dp[0][1] = -prices[0];

  for (let i = 1; i < len; i++) {
    // 这两行调换顺序也是可以的
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }
  return dp[len - 1][0];
}

/**
 * 309. 最佳买卖股票时机含冷冻期
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  // 本题相较于之前的买卖，增加了冷冻期的概念相当于 T1 交易模式

  let len = prices.length;
  if (len === 0) {
    return 0;
  }
  //由于可以无限次交易，所以只定义两个维度，第一个维度是天数，第二个维度表示是否持有股票，0表示不持有，1表示持有，2表示过渡期
  const dp = new Array();
  for (let i = 0; i < len; i++) {
    dp.push([]);
  }

  dp[0][0] = 0;
  dp[0][1] = -prices[0];
  dp[0][2] = 0;

  for (let i = 1; i < len; i++) {
    // 核心在于对于三个状态下每天的最大值
    // 当天不持有股票的情况有两种
    // a. i - 1 天也不持有
    // b. i - 1 天是过渡期
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][2]);

    // 第i天持有股票有两种情况
    // a. i - 1 天也持有股票， i 天不操作
    // b. i - 1 天不持有股票， 在 i天买入
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);

    // 第 i 天是冷冻期只有一种情况， i - 1 天持有股票且卖出
    dp[i][2] = dp[i - 1][1] + prices[i]; // 这时候一般是dp[i-1][1]负数，相当于求差值了
  }

  // 最后最大利润是最后一天，不持有股票或者进入冷冻期的情况
  console.log(dp);
  return Math.max(dp[len - 1][0], dp[len - 1][2]);
};
