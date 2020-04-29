const ioHook = require('iohook')
const robot = require("robotjs-node10")
const utils = require('./utils')
// 获取屏幕高度
const { height: screen_height } = robot.getScreenSize()
// 判断鼠标是否在状态栏上
const meet_the_condition = () => {
  let y = robot.getMousePos().y
  return (screen_height - y <= 20 || y <= 20)
}
// 500ms 后松开 'alt' 键
const alt_up_debounce = utils.debounce(function () {
  robot.keyToggle('alt', 'up')
}, 500)
// 上一个桌面
const go_prev_desktop = () => {
  robot.keyTap('left', ['control', 'command'])
}
// 下一个桌面
const go_next_desktop = () => {
  robot.keyTap('right', ['control', 'command'])
}
// 下一个应用
const go_next_app = () => {
  robot.keyToggle('alt', 'down')
  robot.keyTap('tab')
  alt_up_debounce();
}
// 点击鼠标侧键切换桌面
ioHook.on("mousedown", event => {
  if (meet_the_condition()) {
    if (event.button === 4) {
      go_prev_desktop()
    } else if (event.button === 5) {
      go_next_desktop()
    }
  }
});
// 滑动鼠标滚轮在当前桌面切换应用
ioHook.on('mousewheel', utils.debounce(function () {
  if (meet_the_condition()) {
    go_next_app()
  }
}, 50, true))

ioHook.start();