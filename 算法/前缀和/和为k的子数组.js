/**
 * LeetCode： 560
 * https://leetcode-cn.com/problems/subarray-sum-equals-k/
 * 给你一个整数数组 nums 和一个整数 k ，请你统计并返回该数组中和为 k
 * 的连续子数组的个数。
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  // 暴力枚举 会超出时限 O(n^2) 空间 O(1)
  let count = 0; // 计算子数组 = k 的数量

  for (let end = 0, len = nums.length; end < len; ++end) {
    let sum = 0; // 计算终点和

    for (let start = end; start >= 0; --start) {
      sum += nums[start];
      if (sum == k) {
        count++;
      }
    }
  }

  return count;
};

/**
 * 前缀和 + 哈希表优化
 */

// 定义前缀和 pre , 使 pre[i] = [num[0], ... , nums[i]].reduce((a, b) => a + b) ∑ nums[0~i];
// pre[i] 可以从 pre[i - 1] 得到 pre[i] = pre[i - 1] + nums[i]
// 然后能推出 pre[i] - pre[j - 1] = k
// pre[j - 1] = pre[i] - k

var subarraySum = function (nums, k) {
  const mp = new Map(); // hashMap 用于存储 前缀和数量的 kv 值。{前缀和， 前缀和出现次数}
  mp.set(0, 1); // 初始化kv base case

  let count = 0,
    pre = 0;

  for (const i of nums) {
    pre += i; // 自增前缀
    if (mp.has(pre - k)) {
      // 找到一个 j ~ i 和为 k 的组合.
      count += mp.get(pre - k);
    }

    if (mp.has(pre)) {
      mp.set(pre, mp.get(pre) + 1); // 如果已经有了 value + 1
    } else {
      mp.set(pre, 1); // 将没入hash表的前缀入表
    }
  }
  return count;
};
