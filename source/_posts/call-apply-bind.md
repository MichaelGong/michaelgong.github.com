---
title: call-apply-bind
date: 2019-07-19 10:58:31
keywords:
tags: [this]
categories: [javascript]
summary: js中常用call、apply、bind来改变this的指向，接下来我们先来看下3者之间的区别，然后再分别来模拟实现以下这三个方法。
---

# call、apply、bind

js中常用call、apply、bind来改变this的指向，接下来我们先来看下3者之间的区别，然后再分别来模拟实现以下这三个方法。

## 区别

- bind 接收多个参数，第一个参数表示this需要指向的对象，返回的是一个函数，调用这个函数会得到执行该函数的结果
- call、apply与bind不同，call、apply是直接执行该函数，直接就可以得到执行结果
- call与apply的区别是：call接收多个参数，apply后面接收的是一个数组参数

## 实现

我们事先先准备
```javascript
    var obj = {
    	name: 'michael',
    }
    
    function func(age, sex) {
    	console.log(this.name, age, sex)
    }
```
### Call方法：

直接调用原生方法：func.call(obj, 12, 'female')

自行实现一个Call方法：
```javascript
    Function.prototype.newCall = function(context, ...params) {
    	**context.fn** = this;
    	const result = context.fn(...params);
    	delete context.fn;
    	return result;
    }
    
    func.newCall(obj, 12, 'female');
```
在newCall方法中第一个参数是context，相当于我们传入的obj对象，这个时候我们在context对象上声明了一个属性fn，并将这个属性指向了this，这是为什么呢？

这里this对应的就是我们调用的函数，其实就是func，也就是说我们在obj上声明了一个fn的函数，这个函数和func是相等的，那么其实此时obj的结构就变成了：
```javascript
    var obj = {
    	name: 'michael',
      fn: func,
    }
```
然后此时我们执行context.fn的时候，fn内部的this就执行了context，也就是obj，在执行完之后为了确保原函数不被污染，我们要从context上移除fn。

这就是一个简单的模拟call的执行过程。其中有几点小问题：

1. 没有兼容context没有传值的情况
2. 没有兼容context上已经有fn属性的情况

所以稍加修改一下：
```javascript
    Function.prototype.newCall = function(context, ...params) {
    	context = context || window;
    	const fn = Symbol('fn');
    	**context[fn]** = this;
    	const result = context[fn](...params);
    	delete context[fn];
    	return result;
    }
```

apply的实现与call的实现方式基本类似，只需要专注一下参数的形式即可。

## bind方法：

bind方法的特点是返回的是一个待执行的函数
```javascript
    Function.prototype.bind = function(context, ...params) {
    	 
    	const func = this;
    	return function(...args) {
    		func.apply(context, params.concat(args))
    	}
    }
```