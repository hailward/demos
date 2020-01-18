console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

new Promise((resolve) => {
  console.log('promise_1-1')
  resolve()
}).then(() => {
  console.log('promise_1-2')
})

Promise.resolve().then(function() {
  console.log('promise_2-1')
}).then(function() {
  console.log('promise_2-2')
});

console.log('script end');

// 执行结果
// script start
// promise_1-1
// script end
// promise_1-2
// promise_2-1
// promise_2-2
// setTimeout