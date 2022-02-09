/**
 * https://leetcode-cn.com/problems/maximum-subarray/
 * 53.最大子数组和
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let dp = nums[0];
  let ret = nums[0];
  for (let i = 1; i < nums.length; i++) {
    console.log(dp);
    dp = Math.max(dp + nums[i], nums[i]); // 选取上一个对比最大数（不为负数）
    ret = Math.max(dp, ret); // 结果取值
    console.log("ret", ret);
    // 把结果返回
  }

  return ret;
};

/**
 * https://leetcode-cn.com/problems/maximum-sum-circular-subarray/
 * 918.环形子数组的最大和
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarraySumCircular = function (nums) {
  //数组的末端将会与开头相连呈环状
  if (nums.length < 1) {
    return 0;
  }

  let curMax, // 当前最大值
    max,
    curMin,
    min,
    sum;
  curMax = max = curMin = min = sum = nums[0]; // 统一从下标0 开始初始化

  // 没跨界， 跨界两种情况，
  //没有 跨越边界的情况直接求子数组的最大和即可 都可以按照53的解法
  //跨界 对数组求和再减去无环的子数组的最小和
  for (let i = 1; i < nums.length; i++) {
    sum += nums[i]; // 无环数组和

    curMax = curMax > 0 ? curMax + nums[i] : nums[i]; // curMax 可以理解成 dp[max]
    max = curMax > max ? curMax : max; // max 可以理解成当前数组最大值

    curMin = curMin < 0 ? curMin + nums[i] : nums[i];
    min = curMin < min ? curMin : min;
  }

  if (max < 0) return max; // max 是所有和叠加与比较，如果max < 0 那么数组里没有大于零的数了

  return Math.max(sum - min, max);
};

// 下面是自己写的暴力解
```js
function maxSubarraySumCircular(A) {
    const dp = new Array( A.length - 1).fill(0)// 艹 还有全部为负数的情况
    // dp[i] = max(dp[i - 1], dp[i]);
    let curMax = -Infinity;
    let flag = A.filter( a => {
        curMax = Math.max(a , curMax)
        return a > 0
    })
    if( flag.length ===0 ) return curMax;

    for(let i = 1 ; i <= A.length ; i++) {
        // 初始化当前窗口
        let temp
        if( i === 1) {
            temp = [...A]
        }else {
            let subTemp = [...A].slice(0, i)
            temp = [...A].concat(subTemp)
        }
        let subTemp;
        for(let j = 0 ; i + j <= temp.length; j++) {
            // 此时 i 大小约等于窗口
            // left = j right = i

            subTemp = temp.slice(j,i + j)
            subTemp = subTemp.reduce((a, b) => a + b);
            if( j === 0) {
                dp[i] = subTemp
            } else {
                dp[i] = Math.max(subTemp, dp[i])
            }
        }
        // 算完 dp[i] 得到最大值后，用dp[i] 和 dp[i+1] 做比较？
        if( i !== 0) {
            dp[i] = Math.max(dp[i - 1], dp[i])
        }
    }
    return dp[dp.length - 1]
}
```;
