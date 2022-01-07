//https://leetcode-cn.com/problems/roman-to-integer/
// ES6 reduce 解法，其实也是hash 表解法的拓展
const keyMap = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};
function romanToInt(s) {
  let sArr = s.split("");
  let res = sArr.reduce((prev, curr, index) => {
    if (keyMap[curr] < keyMap[sArr[index + 1]]) {
      // 后一位大于前一位的情况 I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。 采取先剪掉当前。
      return prev - keyMap[curr];
    }
    return prev + keyMap[curr];
  }, 0);
  return res;
}

// 正则解法；exec/ match
var keyMap = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
  IV: 4,
  IX: 9,
  XL: 40,
  XC: 90,
  CD: 400,
  CM: 900,
};

var romanToInt = function (s) {
  const numsReg = /IV|IX|XL|XC|CD|CM|I|V|X|L|C|D|M/g;
  let c;
  let count = 0;
  while ((c = numsReg.exec(s))) {
    console.log(count);
    count += keyMap[c];
  }
  return count;
};
