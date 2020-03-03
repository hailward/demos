/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let ln = null;
  let tln = null;
  let exceed = 0;
  while (l1 != null || l2 != null || exceed != 0) {
    let v1 = 0;
    let v2 = 0;
    if (l1 != null) {
      v1 = l1.val;
      l1 = l1.next;
    }
    if (l2 != null) {
      v2 = l2.val;
      l2 = l2.next;
    }
    let total = v1 + v2 + exceed;
    if (total >= 10) {
      exceed = 1;
      total = total % 10;
    } else {
      exceed = 0;
    }
    if (!ln) {
      ln = new ListNode(total);
      tln = ln;
    } else {
      tln.next = new ListNode(total);
      tln = tln.next;
    }
  }
  return ln;
};
/**
 * ListNode 构造函数
 * @param {*} val 
 */
var ListNode = function (val) {
  this.val = val;
  this.next = null;
}
/**
 * 创建 ListNode
 * @param {*} val 
 */
var newListNode = function (val) {
  let ln = null;
  while (val > 0) {
    let v = val % 10;
    let next = ln;
    ln = new ListNode(v);
    ln.next = next;
    val = parseInt(val / 10);
  }
  return ln;
}
console.time('time')
console.log(addTwoNumbers(newListNode(342), newListNode(465)));
console.timeEnd('time')