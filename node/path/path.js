const path = require('path');
// 环境信息
console.log('执行环境', process.env.PATH);
console.log('当前文件路径', __dirname);
console.log('当前文件', __filename);
// 格式化已知路径
let entry = __filename;
console.log('获取文件后缀：', path.extname(entry));
console.log('获取文件名：', path.basename(entry));
console.log('获取文件名（不含后缀）：', path.basename(entry, path.extname(entry)));
console.log('获取文件路径：', path.dirname(entry))
console.log('获取绝对路径：', path.resolve(entry, '../'))
console.log('标准化路径：', path.normalize(entry))
console.log('是否绝对路径：', path.isAbsolute(entry))
console.log('合并路径：', path.join(__dirname, path.basename(entry)))
console.log('获取相对路径：', path.relative('../', entry))
console.log('格式化路径对象：', path.format(path.parse(entry)))
console.log('生成路径对象：', path.parse(entry))
console.log('获取平台路径分隔符：', path.sep)
console.log('获取平台路径定界符：', path.delimiter)

// {resolve: [Function: resolve], // 获取绝对路径
// normalize: [Function: normalize],  // 标准化路径
// isAbsolute: [Function: isAbsolute],  // 是否绝对路径
// join: [Function: join],  // 合并路径
// relative: [Function: relative],  // 获取相对路径     
// toNamespacedPath: [Function: toNamespaced
// dirname: [Function: dirname],  // 获取文件路径
// basename: [Function: basename],  // 获取文件名
// extname: [Function: extname],  // 获取文件拓展名 
// format: [Function: format],  // 从对象返回路径
// parse: [Function: parse],  // 从路径返回对象
// sep: '\\',                               
// delimiter: ';',                          
// win32: [Circular],                       
// posix:                                   
//  { resolve: [Function: resolve],         
//    normalize: [Function: normalize],     
//    isAbsolute: [Function: isAbsolute],   
//    join: [Function: join],               
//    relative: [Function: relative],       
//    toNamespacedPath: [Function: toNamespa
//    dirname: [Function: dirname],         
//    basename: [Function: basename],       
//    extname: [Function: extname],         
//    format: [Function: format],           
//    parse: [Function: parse],             
//    sep: '/',                             
//    delimiter: ':',                       
//    win32: [Circular],                    
//    posix: [Circular],                    
//    _makeLong: [Function: toNamespacedPath
// _makeLong: [Function: toNamespacedPath] }