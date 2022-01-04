/**
 * leetCode 1137. 第 N 个泰波那契数
 * @param {number} n
 * @return {number}
 */
 var tribonacci = function(n) {
  // 相当于斐波那契升级版 T(n) = T(n - 1) + T(n - 2) + T(n - 3)
  if(n < 2) {
      return n;
  } 
  if(n === 2 ) {
      return 1;
  }
  // set base
  const dp = new Array(n).fill(0);
  dp[1] = 1;
  dp[2] = 1;

  for(let i = 3 ; i <= n ; i ++ ) {
      dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3]
  }

  return dp[n]

};