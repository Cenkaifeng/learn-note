/**
 * https://leetcode-cn.com/problems/find-the-duplicate-number/
 * 寻找重复数 287
 * 
给定一个包含 n + 1 个整数的数组 nums ，其数字都在 1 到 n 之间（包括 1 和 n），
可知至少存在一个重复的整数。
假设 nums 只有 一个重复的整数 ，找出 这个重复的数 。
你设计的解决方案必须不修改数组 nums 且只用常量级 O(1) 的额外空间。
 */

// 解法一： 双for循环暴力解 if(nums[i] === nums[j]) return nums[i]; O(n^2) 不细说了

// 解法二：hashMap
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  const map = new Map();
  for (let i = 0, n = nums.length; i < n; i++) {
    if (map.has(nums[i])) {
      // let tmp = map.get(nums[i]);
      return nums[i];
    } else {
      map.set(nums[i], 1);
    }
  }
};
// 解法三：二分查找
/**
 *
 * 难点在于 cnt[i] <= i
 * 表示 nums 数组中小于等于 i 的数有多少个
 * O(nlogn) = O(n) cnt * 二分搜索 O(logn)
 */
var findDuplicate = function (nums) {
  const n = nums.length;
  let l = 1,
    r = n - 1,
    ans = -1;
  while (l <= r) {
    let mid = (l + r) >> 1; // 去中位值 Math.floor((l + r)/2));
    let cnt = 0;
    for (let i = 0; i < n; ++i) {
      cnt += nums[i] <= mid; // 记录小于 mid 的个数
    }
    if (cnt <= mid) {
      // 二分的核心：缩小搜索空间
      l = mid + 1; // 如果 cnt <= mid 说明目标在 mid 右边
    } else {
      r = mid - 1; // 大于说明 cnt[i] 的数量 > mid 说明 [l , mid] 这个区域有重复
      ans = mid;
    }
  }
  return ans;
};

/* 解法四：快慢指针

将数组的下标i和nums[i]都看成是指针。如 0 是指针，指向 nums[0], 而nums[0] 也是指针，指向 nums[nums[0]].

则快指针走法是 fast = nums[nums[fast]]
慢指针走法是 slow = nums[slow], 当 fast = slow 时， fast 和 slow 必在环内
*/
function findDuplicate(nums) {
  let slow = 0;
  let fast = 0;
  while (true) {
    // 第一阶段 找到 fast === slow
    slow = nums[slow];
    fast = nums[nums[fast]];

    if (slow == fast) {
      break;
    }
  }
  // slow 的这个点是作为环的入口
  let find = 0;
  while (true) {
    find = nums[find];
    slow = nums[slow];

    if (find === slow) {
      return find;
      // find 作为第三指针？ 为什么第在快慢比较之后还需要第三指针找出，上一步的slow 指针是一个下标，最后还是需要find找到对应环入口值值
    }
  }
}
// 同类型解法参考[环形链表II](https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/)
