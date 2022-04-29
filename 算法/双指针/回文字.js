/**
 * https://leetcode-cn.com/problems/valid-palindrome/submissions/
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  if (s === "") return true;
  s = s.toLocaleLowerCase();
  // 奇偶判断 s.length % 2 === 0
  let l = 0,
    r = s.length - 1;
  while (l <= r) {
    if (!/[0-9a-z]/.test(s[l])) {
      // 非判断字符跳针
      l++;
    } else if (!/[0-9a-z]/.test(s[r])) {
      // 非判断字符跳针
      r--;
    } else {
      if (s[l] === s[r]) {
        // 如果相等，指针同时移动
        l++;
        r--;
      } else {
        return false;
      }
    }
  }
  return true;
};

// offer2 18 https://leetcode-cn.com/problems/XltzEq/ 干净点的解法
var isPalindrome2 = function (s) {
  if (s === "") return true;
  s = s.replace(/[^0-9a-zA-Z]/g, "").toLocaleLowerCase();
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
};
