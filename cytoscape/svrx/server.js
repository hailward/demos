const path = require('path');
const svrx = require('@svrx/svrx');

const server = svrx({
  root: path.resolve(__dirname, '../'),
  port: 8080,
  https: false,
  route: 'svrx/route.js',
  liveload: true,
  serve: {
    base: path.resolve(__dirname, '../'), // 静态资源目录
    index: 'index.html',                  // 访问根路径时展示的文件
    directory: true,                      // index.html不存在时显示文件列表页
  },
  open: '/index.html',
  historyApiFallback: false,
  proxy: false, // 代理规则
  cors: true    // 跨域资源共享
})

server.start()