
// 打印 dom 对象上的属性
let app = document.querySelector('#app');
console.dir(app)
// 以表格的形式打印对象
let table = [
  {
    id: 1,
    name: '唐三藏',
    age: 1000
  }, {
    id: 2,
    name: '孙悟空',
    age: 0
  }, {
    id: 3,
    name: '猪八戒',
    age: 0
  }, {
    id: 4,
    name: '沙僧',
    age: 0
  }
]
console.table(table)