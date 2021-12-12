/**
 * leetCode: 46
 * https://leetcode-cn.com/problems/permutations/
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 * 输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */

// 回溯、DFS

var permute = function (nums) {
  //
  let len = nums.length;
  const ans = [];

  if (len === 0) {
    return ans;
  }

  let used = new Array(len).fill(false);
  let path = [];

  dfs(nums, len, 0, path, used, ans);

  return ans;
};

function dfs(nums, len, depth, path, used, ans) {
  if (depth === len) {
    // 到达叶子节点
    ans.push(path);
    return;
  }

  for (let i = 0; i < len; i++) {
    if (!used[i]) {
      // 每一次尝试都创建新的变量来表示当前状态

      let newPath = [...path];
      newPath.push(nums[i]);

      let newUsed = [...used];
      newUsed[i] = true;

      dfs(nums, len, depth + 1, newPath, newUsed, ans);
    }
  }
}
