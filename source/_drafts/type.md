---
title: js对象类型的判断
tags:
---
JS对象类型的判断方式大致有三种方式：
> 1. typeof
> 2. instanceof
> 3. Object.prototype.toString.call()

## JavaScript的数据类型

JavaScript中的数据类型可以分为两类：原始类型、引用类型。

原始数据类型：
* Boolean
* Number
* String
* Undefined
* Null
* Symbol(ECMAScript 6 新定义)

引用类型:
* Object

原始数据类型和引用类型的`区别`在于：
> 1. `原始数据类型`会存放在`变量对象`中，这个对象实际上是存放在堆内存中的，但是他的功能比较特殊，理解上可以和堆内存做一下区分，在变量对象中的原始数据类型都是直接存的值，且是按值访问的，所以原始类型的操作都是操作的实际的值。
> 2. `引用类型`的值是保存在堆内存中的对象。JavaScript不允许直接访问堆内存中的位置，因此我们不能直接操作对象的堆内存空间。在操作对象时，实际上是在操作对象的引用而不是实际的对象。因此，引用类型的值都是按引用访问的。当访问引用类型的值的时候，其实上首先从变量对象中获取了该对象的地址应用(或者地址指针)，然后再从堆内存中获取我们需要的数据。

具体可以阅读[前端基础进阶（一）：内存空间详细图解](http://www.cnblogs.com/NatChen/p/6388793.html)，解析的很详细。

## typeof

typeof返回的是元素的数据类型。请注意typeof可以象函数那样使用`typeof(xx)`，但是typeof并不是一个函数，而是一个操作符。

我们可以像下面这样来调用typeof:
```javascript
var str = 'str';
console.log(typeof str);
```
JavaScript类型表格

Value | Class | Type 
- | :- | -: 
"foo" | String | string 
new String("foo") | String | object 
1.2 | Number | number
new Number(1.2) | Number | object
true | Boolean | boolean
new Boolean(true) | Boolean | object
new Date() | Date | object
new Error() | Error | object
[1,2,3] | Array | object
new Array(1,2,3) | Array | object
new Function() | Function | function
/abc/g  | RegExp | object
new RegExp("meow") | RegExp | object
() | Object | object
new Object() | Object | object

参考：[typeof 操作符](http://wiki.jikexueyuan.com/project/javascript-garden/types/typeof.html)

在这个表格中 `type` 一列就是`typeof`的运算结果。这个值都是小写的，而且涉及到new操作的除了Function以外都是object。
以上表格需要注意的点是：
<div class="tip">typeof '1' 和 typeof (new String('1')) 的值并不相同，同样的Number、Boolean也有相同的问题。
</div>

上表中涉及到的内容还少了几个值：`undefined`、`NaN`、`null`，接下来看下这几个值。
1. `typeof undefined === 'undefined'`
在js中不光只有`undefined`的typeof值是 'undefined'，`typeof document.all === 'undefined'`也是成立的。`document.all` 也是个奇葩的东西，在chrome等现代浏览器中，单独使用`document.all`的时候可以正常输出一个数组（包含了所有dom节点），但在判断boolean时，它的值是false，但在ie6 7 8中就是true
2. `typeof NaN === 'number'`
js中遵循的是[IEEE 754](https://en.wikipedia.org/wiki/IEEE_754)浮点数标准，在这个标准中规定了NaN也是一个浮点数：`arithmetic formats: sets of binary and decimal floating-point data, which consist of finite numbers (including signed zeros and subnormal numbers), infinities, and special "not a number" values (NaNs)`
3. `typeof null === 'object'`
null的值为object，确实是让人产生疑惑的，这里面还有一些小故事，有兴趣的可以查看[有哪些明明是bug，却被说成是feature的例子？](https://www.zhihu.com/question/66941121/answer/247939890) 的回答。
总结一下原因：JavaScript最初版本使用的是32位心痛，为了性能考虑，使用了低位存储变量的类型信息的方式，也就是：000->对象，001->整数，010->浮点数，100->字符串，110->布尔，这样的设置导致了null出现了不同的情况，因为null代表的是空指针，在多数平台下都是0x00来表示，低位的三位自然也就是000，所以typeof null 就是 'object'了。

## instanceof
判断某个实例是否属于某种类型。
用法：L instanceof R
其中L表示要判断的实例，R是一个类型值，比如 `var a = {}; a instanceof Object`，instanceof的一个更重要的作用是用于判断一个实例是否属于它的父类型，比如如下：
```javascript
function Parent(){}
function Child(){}
Child.prototype = new Parent();
var child = new Child();
console.log(child instanceof Child); // true
console.log(child instanceof Parent); // true
```
instanceof不光可以判断实例是否属于直接父类，它也可以判断实例是否属于祖先的实例。
比如：
```javascript
console.log(child instanceof Object); // true
```
<div class="tip">instanceof的执行原理：
1、如果L不是`Object`，返回false。
2、否则，另`L = L.__proto__`，
3、如果`L === null`返回false
4、判断`L === R.prototype`，如果为true，返回true，否则执行步骤2。
</div>可以看到，这其实是一个循环的过程，会不断的取`L.__proto__`的值和`R.prototype`进行对比。这个地方涉及到了原型链的相关知识，这里不做深入探讨，引入一张经典图供参考：

![原型链图](http://ovtdovq9q.bkt.clouddn.com/prototype.jpg)

有关于`instanceof`的规范可以查看[11.8.6 The instanceof operator](http://www.ecma-international.org/ecma-262/5.1/#sec-11.8.6)，其中的第7步中涉及到的`[[HasInstance]]`相关的方法，可以查看[15.3.5.3 [[HasInstance]] (V)](http://www.ecma-international.org/ecma-262/5.1/index.html#sec-15.3.5.3)，其中的参数V就是我们例子中的L，F就是我们例子中的R，O就是R.prototype。

那么接下来我们来看下一些instanceof示例：
```javascript
console.log(1 instanceof Number); // false
console.log(new Number(1) instanceof Number); // true
console.log('a' instanceof String); // false
console.log(new String('a') instanceof String); // true
console.log(true instanceof Boolean); // false
console.log(new Boolean(true) instanceof Boolean); // true
```
以上是 Number、String、Boolean类型的结果，之所以在非new的情况下返回false，是因为在[[HasInstance]]中的第一步就返回了false

以下内容涉及到了原型链相关内容，可以先看下上面的原型链的图

```javascript
console.log(Number instanceof Number); // false
```
转换一下其实就是 Number.__proto__ === Number.prototype，这个当然是false了，
因为所有的构造器/函数的__proto__ 都指向了Function.prototype
同理 String、Boolean、Object、Function、Array、Error、Date、RegExp的__proto__都指向了Function.prototype

## 参考

1. [前端基础进阶（一）：内存空间详细图解](http://www.cnblogs.com/NatChen/p/6388793.html)
2. [typeof 操作符](http://wiki.jikexueyuan.com/project/javascript-garden/types/typeof.html)
3. [JavaScript instanceof 运算符深入剖析](https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/index.html)
4. [有哪些明明是bug，却被说成是feature的例子？](https://www.zhihu.com/question/66941121/answer/247939890)
5. [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754)
6. [typeof 操作符](http://bonsaiden.github.io/JavaScript-Garden/zh/#types.typeof)
7. [JavaScript进阶系列—类型中的typeof 操作符](https://zhuanlan.zhihu.com/p/23248844)
8. [ECMAScript® 2015 Language Specification](http://www.ecma-international.org/ecma-262/6.0/index.html)
9. [ECMAScript® Language Specification](http://www.ecma-international.org/ecma-262/5.1/index.html)