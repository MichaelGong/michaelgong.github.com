---
title: isNaN 与 Number.isNaN 区别
date: 2018-06-01 12:51:49
keywords: 前端, isNaN, Number.isNaN
tags: [isNaN]
categories: [前端, isNaN]
summary:
---

## NaN
js中有一个特殊的对象：NaN，它表示一个非法的数字，即：Not a Number。
在js中她也是唯一一个不等于自身的变量，即：`NaN !== NaN` `NaN != NaN`

## window.isNaN
window.isNaN在接收到参数后，会先把参数`转化成数字A`(重点)，然后再比较`A !== A`，用代码可以表示为：
```javascript
window.isNaN = function (value) {
  var val = Number(value);
  return val !== val;
}
```
> 由于中间存在一步将参数转化成数字的过程，所以最后结果会出现各种差异

例如：
```javascript
// 以下结果为true的都是因为Number的值是NaN
isNaN(NaN);  // true
isNaN({}); // true
isNaN(undefined); // true
isNaN('字符串');  // true
isNaN(['a']); // true
isNaN(['123a']); // true

// 以下结果为false，是因为她们可以被转化成数字
isNaN(null); // false
isNaN(''); // false
isNaN(true); // false
isNaN(false); // false
isNaN([]); // false
isNaN([1]); // false
isNaN(['1']); // false
isNaN(new Date()); // false
```


## Number.isNaN
Number.isNaN是在es6中新增的方法，该方法就是用来参数是否是 `NaN` 这个值的。
例如：
```javascript
Number.isNaN(NaN); // true
Number.isNaN(0 / 0); // false
Number.isNaN(Number.NaN); // false

Number.isNaN(true); // false
Number.isNaN(''); // false
Number.isNaN(123); // false
Number.isNaN(undefined); // false
Number.isNaN(null); // false
```
其实这个api判断的内容很简单，只要你传入的参数不是`NaN`，那么结果都是false，否则为true。
由于这是es6的方法，在不支持的浏览器中，可以使用polyfill：
```javascript
Number.isNaN = function(val) {
  return val !== val;
}
// 或者
Number.isNaN = function(val) {
  return (
    typeof val === 'number' &&
    window.isNaN(val)
  )    
};
```