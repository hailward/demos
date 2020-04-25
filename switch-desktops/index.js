const ioHook = require('iohook')
const robot = require("robotjs-node10")
const utils = require('./utils')

const screen_height = robot.getScreenSize().height

const meet_the_condition = () => {
  let y = robot.getMousePos().y
  if (screen_height - y <= 20 || y <= 20) {
    return true
  } else {
    return false
  }
}

ioHook.on("mousedown", event => {
  if (event.button === 4) {
    if (meet_the_condition()) {
      robot.keyTap('left', ['control', 'command'])
    }
  } else if (event.button === 5) {
    if (meet_the_condition()) {
      robot.keyTap('right', ['control', 'command'])
    }
  }
});
ioHook.on('mousewheel', utils.debounce(function () {
  if (meet_the_condition()) {
    robot.keyTap('tab', 'alt')
  }
}, 200, true))
ioHook.start();