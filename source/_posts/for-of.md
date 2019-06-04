---
title: for-of 中为什么可以做异步回调
date: 2019-06-04 15:00:55
keywords: for-of
tags: [for-of, javascript]
categories: [javascript]
summary: 允许js对象去定义它们的迭代行为。为了变成可迭代对象，一个对象必须实现@@iterator 方法，意思是这个对象或者对象的原型上必须要有一个Symbol.iterator的属性
---

# for-of 中为什么可以做异步回调

# Iterator

`**可迭代协议**`：允许js对象去定义它们的迭代行为。为了变成可迭代对象，一个对象必须实现@@iterator 方法，意思是这个对象或者对象的原型上必须要有一个Symbol.iterator的属性

`**迭代器协议**`：实现Iterator的方式：必须要有一个next方法，并且该方法返回一个形如 `{value: xx, done: false }` 的对象，当迭代器的迭代次数超过了可迭代次数时done为true，value的值可以别省略。

Iterator是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作。Iterator本身是符合迭代器协议的。

Iterator的作用主要有三个：

1. 为各种数据结构，提供统一、简洁的访问接口
2. 使数据结构的成员能够按照某种次序排列
3. 为ES6中的for...of命令提供接口，供其消费(解构赋值和扩展运算符中也会用到Iterator：[...arr])

模拟实现一个简单的Iterator

    function iteratorMaker(arr) {
    	let nextIndex = 0;
    	return function() {
    		return nextIndex < arr.length
    			? {value: arr[nextIndex], done: false}
    			: {value: undefined, done: true};
    	}
    }

在原生js中，String、Array、TypedArray、Map、Set、Arguments、NodeList对象都有默认的Iterator实现（object对象默认没有实现Iterator，主要是因为默认无法确定遍历的顺序），他们是通过实现Symbol.iterator属性实现的。如果我们想某个对象拥有自定义的Iterator属性，可以通过定义这个对象的Symbol.iterator属性：

    const obj = {
    	[Symbol.iterator]: function() 
    		return {
    			next: function() {
    				return {
    					value: 1,
    					done: true,
    				}
    			}
    		}
    	}
    }

### 遍历器对象的return()、throw()方法

遍历器中除了具有next方法之外，还可以具有return方法和throw方法。

**return方法**：当你的遍历器对象在执行过程中提前退出时(通常是因为出错或者是有break语句)，就会调用return方法，如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法。return方法必须返回一个对象。

    function readLinesSync(file) {
    	return {
    		[Symbol.iterator]() {
    			return {
    				next() {
    					return {done: false, value: 1};
    				},
    				return() {
    					file.close();
    					return { done: ture}
    				}
    			}
    		}
    	}
    }

throw方法主要配合Generator函数使用，一般的遍历器对象用不到这个方法。

## Generator

语法：

    function* generator() {
    	var a = 'hello';
    	yield a;
    	yield 'world';
    }
    var a = generator();
    a.next(); // { value: 'hello', done: false}
    a.next(); // { value: 'world', done: false}
    a.next(); // { value: undefined, done: true}

在调用generator的时候，其函数体并不立即执行，而是会返回一个遍历器iterator对象，当你执行遍历器对象的next方法的时候，才会真正执行generator方法体内部的内容。

当执行next的方法的时候，在函数体内遇到yield的时候，函数体将停止执行并将yield后的结果值返回出来(也就是next的执行结果，形如：{value:xxx,done: false})，直到下一个next方法被调用时才会从上次停止的位置继续向下执行。

> yield表达式本身没有返回值，但是next方法可以带一个参数，这个参数会被当做上一个yield表达式的返回值。这里需要注意的是第一次调用next方法时，传入的参数是无效的，因为它之前并没有yield方法。

举个栗子🌰：

    function* foo(x) {
      console.log('第一个:', ' x:', x);
      var y = 2 * (yield (x + 1));
      console.log('第二个:', ' x:', x , ' y:', y);
      var z = yield (y / 3);
      console.log('第三个:', ' x:', x, ' y:', y, ' z:', z);
      return (x + y + z);
    }
    
    var a = foo(5); // 返回一个generator对象
    
    a.next(10);
    // console.log输出：第一个:  x: 5，因为这是第一个执行的next方法，它之前并没有yield语句
    // 返回的值为：{value: 6, done: false}
    
    a.next(11);
    // console.log输出：第二个:  x: 5  y: 22，11被当成上一个yield表达式的结果，即：var y = 2 * 11
    // 返回的值为：{value: 7.333333333333333, done: false}
    
    a.next(12);
    // console.log输出：第三个:  x: 5  y: 22  z: 12，道理同上
    // 返回的值为：{value: 39, done: true}
    
    a.next(); // {value: undefined, done: true}

Generator的其他内容强烈建议阅读：[阮一峰的Generator 函数的语法](http://es6.ruanyifeng.com/#docs/generator)，里面内容很多。

# for-of

在ES6中，js借鉴C++、Java等语言，引入了for...of循环，作为便利所有数据结构的统一方法。一个数据结构只要部署了Symbol.iterator属性，就被视为具有Iterator接口，就可以使用for...of循环进行遍历，也就是说for...of循环内部调用的是数据结构的Symbol.iterator方法，这就为我们在for...of内进行异步调用提供了可能。

for-of方法可以自动遍历Generator函数运行时生成的Iterator对象，且此时不在需要next方法。

# 与for-in区别

for...in只能获取键名，for...of可以获取键值 

let arr = [1,2,3]; [arr.foo](http://arr.foo) = 'hello'; for...in 循环arr的结果：0,1,2,hello，for...of循环arr的结果：1,2,3。可以看出for...of循环数组只会遍历有数字索引的属性。

for...of支持异步调用

for...in 循环会循环原型链上的键

参考：

迭代协议：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)

Generator 函数的语法：[http://es6.ruanyifeng.com/#docs/iterator](http://es6.ruanyifeng.com/#docs/iterator)
