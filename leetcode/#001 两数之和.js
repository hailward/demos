function toSum(nums, target) {
  let m = new Map()
  for (let i = 0; i < nums.length; i++) {
    let t = target - nums[i]
    if (m.has(t)) {
      return [m.get(t), i]
    }
    m.set(nums[i], i)
  }
}

// 测试用例
console.log([2, 7, 11, 15], 9)