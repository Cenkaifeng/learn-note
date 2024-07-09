/**
 Do not return anything, modify nums in-place instead.
 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。

 

示例 1:

输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
示例 2:

输入: nums = [0]
输出: [0]
 

提示:

1 <= nums.length <= 104
-231 <= nums[i] <= 231 - 1

 移动0的思路在于，先找到第一个非0元素，然后从后往前遍历，将非0元素依次放到前面。所以要拆分两个动作
 1. 找到0并移动到后面
 2. 非零的元素依次移动到前面
 */
function moveZeroes(nums: number[]): void {
    let len = nums.length;
    if( len === 0 || len === 1) return;


    // 2. 非零前移 & 记录 0 数量 第一个指针
    let j = 0;
    for (let i = 0; i < len; i++) {
        if (nums[i] !== 0) {
            nums[j++] = nums[i];
        }
    }

    // 将末尾元素全部赋值为 0 
    for (let i = j; i < len; i++) {
        nums[i] = 0;
    }
}

// 进阶，减少循环次数
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    let len = nums.length;
    if (len === 0 || len === 1) {
        return nums;
    }
    // j 前存放都是不等于 0 的元素
    let j = 0;
    for (let i = 0; i < len; i++) {
        if (nums[i] !== 0) {
            // 其实前面和第一解法大同小异，但引入t 来处理中间不等于 0 的元素
            let t = nums[i];
            nums[i] = nums[j];
            nums[j++] = t;
        }
    }
    return nums;
};