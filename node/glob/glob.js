const path = require('path')
const glob = require('glob')

function getEntry(globPath) {
  let entries = {};
  console.log(glob.sync(globPath))  // 文件路径数组
  glob.sync(globPath).forEach((entry) => {
    // let extname = path.extname(entry)  // 获取文件名
    // let basename = path.basename(entry, extname)  // 去除文件拓展名
    let name = path.basename(entry, path.extname(entry));
    entries[name] = entry;
  })
  return entries;
}
let entries = getEntry('./node_modules/**/*.js')

console.log(entries)