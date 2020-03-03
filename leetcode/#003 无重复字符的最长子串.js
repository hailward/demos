/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let start = 0, end = 0, max = 0;
  let map = new Map();
  // 为第一个字符设置标记
  map.set(s[start], 1);
  while(end < s.length) {
    // 判断当前长度是否未最长
    max = (end - start + 1) > max ? (end - start + 1) : max;
    // 向后移动一个字符
    end++;
    // 如果当前字符已被标记，则清空之前所有的标记
    while(map.get(s[end])) {
      map.set(s[start], 0);
      start++;
    }
    // 重新设置标记
    map.set(s[end], 1);
  }
  return max;
};

// 测试用例
console.log(lengthOfLongestSubstring('abcabc'));
console.log(lengthOfLongestSubstring('abcdef'));
console.log(lengthOfLongestSubstring('a'));