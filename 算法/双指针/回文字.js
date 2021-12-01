/**
 * https://leetcode-cn.com/problems/valid-palindrome/submissions/
 * @param {string} s
 * @return {boolean}
 */
 var isPalindrome = function(s) {
  if(s === "") return true;
  s = s.toLocaleLowerCase()
  // 奇偶判断 s.length % 2 === 0
  let l = 0, r = s.length - 1;
  while(l <= r) {
      if(!(/[0-9a-z]/.test(s[l]))) {// 非判断字符跳针
          l++;
      }else if(!(/[0-9a-z]/.test(s[r]))) { // 非判断字符跳针
          r--;
      }else {
          if(s[l] === s[r]) { // 如果相等，指针同时移动
              l++;
              r--;
          }else {
              return false;
          }
      }
  }
  return true
};