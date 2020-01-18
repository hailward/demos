// push实现
Array.prototype.customPush = function() {
  for(let i in arguments) {
    this[this.length] = arguments[i];
  }
  return this.length;
}
let array_1 = [];
array_1.customPush(1, 2, 3, 4);
array_1.customPush.apply(array_1, [1, 2, 3, 4])
array_1.customPush.call(array_1, 1, 2, 3, 4)
console.log(array_1)