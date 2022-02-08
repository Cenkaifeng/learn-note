/**
 * https://leetcode-cn.com/problems/pascals-triangle/
 *    1
 *   1 1
 *  1 2 1
 * 1 3 3 1
 *
 */

/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  // 层数确定
  // 每层元素 arr[n][m] = arr[n - 1][m] + arr[n - 1][m - 1]
  // if arr.length > 1 ? arr[n][0] = 1 arr[n][arr[n.length]] = 1;
  let baseArr = [[1]];
  if (numRows < 2) {
    return baseArr;
  }
  let resArr = [[1], [1, 1]];
  for (let i = 2; i < numRows; i++) {
    // let temp = [];
    // for (let j = 0; j <= i; j++) {
    //   if (j === 0 || j === i) {
    //     temp.push(1);
    //   } else {
    //     let rowsItem = resArr[i - 1][j] + resArr[i - 1][j - 1];
    //     temp.push(rowsItem);
    //   }
    // }
    // 优化一下，实际上会增加点开销但是会好看点
    let temp = new Array(i + 1).fill(1);
    for (let j = 1; j < temp.length - 1; j++) {
      temp[j] = resArr[i - 1][j] + resArr[i - 1][j - 1];
    }
    resArr.push(temp);
  }
  return resArr;
};

// 官方解法
var generate = function (numRows) {
  const ret = [];

  for (let i = 0; i < numRows; i++) {
    const row = new Array(i + 1).fill(1);
    for (let j = 1; j < row.length - 1; j++) {
      row[j] = ret[i - 1][j - 1] + ret[i - 1][j];
    }
    ret.push(row);
  }
  return ret;
};
