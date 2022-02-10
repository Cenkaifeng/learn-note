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
