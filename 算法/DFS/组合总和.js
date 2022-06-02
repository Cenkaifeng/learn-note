/**
 * 
 * 
 * 39. 组合总和 https://leetcode.cn/problems/combination-sum/
给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 

对于给定的输入，保证和为 target 的不同组合数少于 150 个。 candidates 
 * 39. 组合总和
给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 

对于给定的输入，保证和为 target 的不同组合数少于 150 个。 target 
 * 39. 组合总和
给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 

对于给定的输入，保证和为 target 的不同组合数少于 150 个。
 */

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 本题解法采用回溯思想
var combinationSum = function (candidates, target) {
  if (candidates.length === 0) return [];

  let ans = [];
  let path = [];
  candidates.sort((a, b) => a - b); // 排序是剪枝的前提
  travals(candidates, target, 0, path, ans);
  return ans;
};

var travals = function (arr, target, begin, currans, ans) {
  currans = [...currans];
  // console.log(`currans: ${currans}; ans: ${ans}`)
  // 需要出口条件
  if (target === 0) {
    ans.push(currans);
    return;
  }
  for (let i = begin; i < arr.length; i++) {
    // 剪枝条件
    if (target - arr[i] < 0) {
      return;
    }

    currans.push(arr[i]);
    travals(arr, target - arr[i], i, currans, ans); // 不用 i + 1 表示可以重复读取当前数
    currans.pop(); //回溯清理： 该节点下的所有路径都走完了，清理堆栈，准备下一个递归。例如弹出当前节点
  }
};
