// 剑指Offer 03.数组中的重复数字
//https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/
/**
 * 
找出数组中重复的数字。


在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

示例 1：

输入：
[2, 3, 1, 0, 2, 5, 3]
输出：2 或 3 

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (nums) {
  // 时间复杂度O(NlogN) 空间O(1)
  // for(let i = 0 ; i < nums.length ; i ++) {
  //     let j = nums.length - 1;
  //     while(i < j) {
  //         if(nums[i] === nums[j]) {
  //             return nums[i]
  //         } else {
  //             j --;
  //         }
  //     }
  // }
  // 利用数组不越界 时间O(N) 空间O(n)
  // const mapArr = new Array(nums.length).fill(0);
  // for(let i = 0 ; i < nums.length; i ++) {
  //     if(mapArr[nums[i]] === 0) {
  //         mapArr[nums[i]] ++
  //     } else {
  //         return nums[i]
  //     }
  // }
  // 原地 hashmap 不用多余空间O(n) O(1)
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] !== i) {
      //让位置i 的地方放元素i。如果位置i的元素不是i的话，那么我们就把i元素的位置放到它应该在的位置
      // 即 nums[i] 和nums[nums[i]]的元素交换，这样就把原来在nums[i]的元素正确归位了。
      // 如果发现 要把 nums[i]正确归位的时候，发现nums[i]（这个nums[i]是下标）那个位置上的元素和要归位的元素已经一样了
      if (nums[i] === nums[nums[i]]) {
        return nums[i];
      }
      let temp = nums[i]; // 不加分号居然会 ReferenceError: 报错
      [nums[i], nums[temp]] = [nums[temp], nums[i]];
    }
  }
};

var findbest = function (nums) {
  const n = nums.length;
  if (n < 2) {
    return;
  }
  let i = 0;
  while (i <= n) {
    if (i === nums[i]) {
      i++;
      continue;
    }
    if (nums[i] === nums[nums[i]]) {
      return nums[i];
    }
    let temp = nums[i];
    [nums[i], nums[temp]] = [nums[temp], nums[i]];
  }
};
