//https://leetcode-cn.com/problems/additive-number/

/**
 * @param {string} num
 * @return {boolean}
 */
var isAdditiveNumber = function (num) {
  // if(num.length < 3) {
  //     return false;
  // }
  return dfs(num, 0, 0, 0, 0);
};

/**
 * @param {String} num
 * @param {Number} index 当前dfs到达num 对应 index
 */
function dfs(num, index, count, prevprev, prev) {
  if (index >= num.length) {
    return count > 2;
  }

  let current = 0; // 当前数字初始化
  for (let i = index; i < num.length; i++) {
    let c = Number(num[i]);

    if (Number(num[index]) === 0 && i > index) {
      // 剪枝1：不能做为前导0，但是它自己是可以单独做为0来使用的
      return false;
    }

    current = current * 10 + c - "0";

    if (count >= 2) {
      let sum = prevprev + prev;
      if (current > sum) {
        // 剪枝2：如果当前数比之前两数的和大了，说明不合适
        return false;
      }
      if (current < sum) {
        // 剪枝3：如果当前数比之前两数的和小了，说明还不够，可以继续添加新的字符进来
        continue;
      }
    }

    // 当前满足条件了，或者还不到两个数，向下一层探索
    if (dfs(num, i + 1, count + 1, prev, current)) {
      return true;
    }
  }

  return false;
}

// TEST Case "112358" "199100199"
