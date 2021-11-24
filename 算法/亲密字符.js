/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var buddyStrings = function (s, goal) {
  if (s.length !== goal.length) return false;

  if (s === goal) {
    // 如果两者字符相等走这个判断
    const count = new Array(26).fill(0); // 创建一个表...

    for (let i = 0; i < s.length; i++) {
      count[s[i].charCodeAt() - "a".charCodeAt()]++; // 把字符char值+1 放入哈希表
      if (count[s[i].charCodeAt() - "a".charCodeAt()] > 1) {
        return true;
      }
    }
    return false;
  } else {
    let first = -1,
      second = -1;
    for (let i = 0; i < s.length; i++) {
      if (s[i] !== goal[i]) {
        if (first === -1) first = i;
        else if (second === -1) second = i;
        else return false;
      }
    }

    return (
      second !== -1 && s[first] === goal[second] && s[second] === goal[first]
    );
  }
};
