---
title: 数组操作之reduce
date: 2018-03-08 12:15:08
keywords: 数组, reduce
tags: [数组, reduce]
categories: [前端, 数组]
summary: reduce是一种数组运算，通常用于将数组的所有成员"累积"为一个值。
---

reduce方法是Array.prototype上的一个方法，是在es6中添加的数组方法。

> 语法：
arr.reduce(callback[, initialValue])

callback: 是一个function参数，该function接收四个参数
&nbsp;&nbsp;&nbsp;&nbsp;`accumulator`：累加器
&nbsp;&nbsp;&nbsp;&nbsp;`currentValue`：数组中正在处理的元素
&nbsp;&nbsp;&nbsp;&nbsp;`currentIndex`：正在处理的元素的索引
&nbsp;&nbsp;&nbsp;&nbsp;`array`：原数组
initialValue： 可选，用于充当callback的第一个参数的初始值，如果不传该值，则callback的第一个参数是数组的第一个值。

该方法执行后返回累计处理的结果。

如果传了initialValue，callback第一次执行的时候accumulator为initialValue，currentValue为数组中的第一个值；如果没有传initialValue，callback第一次执行的时候，accumulator为数组的第一个值，currentValue为数组中的第二个值。
<div class="tip">值得注意的是：
1、如果数组为空，且initialValue为空，会抛出TypeError。
2、如果数组仅有一个元素，且没有提供initialValue，那么此唯一值将被返回并且callback不会被执行。
3、如果数组为空，且提供了initialValue，那么此唯一值将被返回并且callback不会被执行。
</div> 
接下来我们来看下这三种情况：
1、数组为空且initialValue为空
```javascript
[].reduce((pre, cur) => {
  console.log(pre, cur);
  return pre + cur;
});
// 将会抛出异常 Uncaught TypeError: Reduce of empty array with no initial value

// 但是这段代码将不会报错,因为初始值不为空
[].reduce((pre, cur) => {
  console.log(pre, cur);
  return pre + cur;
}, 1);
```

2、数组仅有一个元素且initialValue为空
```javascript
[1].reduce((pre, cur) => {
  console.log(pre, cur);
  return pre + cur;
});
[,1,,,].reduce((pre, cur) => {
  console.log(pre, cur);
  return pre + cur;
});
// 以上两种情况都将输出1，且console.log不会输出。
[null,1,null].reduce((pre, cur) => {
  console.log(pre, cur);
  return pre + cur;
});
// 这种方式也将输出1，但是callback是执行的

// 请注意[1],[,1,,]和[null,1,null]的区别
```

3、数组为空，且initialValue不为空
```javascript
[].reduce((pre, cur) => {
  console.log(pre, cur);
  return pre + cur;
}, 1);
// 结果将输出1，且callback不执行
```

## 参考
[Array.prototype.reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)