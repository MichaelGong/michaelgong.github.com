---
title: 简单的聊下new操作符
date: 2019-03-04 19:36:20
keywords: new关键字
tags: [前端, 基础]
categories: [前端, 基础, 面试]
---
<!-- toc -->

## 定义

`new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。`

## 语法

`new constructor([arguments])`
  
>  constructor: 一个指定对象实例的类型的类或函数

>  arguments: 用来被contructor调用的参数列表

其中constructor就是构造函数。

举个栗子：
```javascript
function Car(color) {
  this.color = color;
}

Car.prototype.go = function() {
  console.log('the ' + this.color + ' car is going');
}

var car = new Car('red');

console.log(car.color); // 访问构造函数的属性

console.log(car.go()); // 访问构造函数原型上的属性
```

>通过以上代码可以看出new 创建的实例有以下几个特点：
>* 可以访问构造函数的属性
>* 可以访问构造函数原型里的属性

## 带return的构造函数

上面的构造函数Car并没有返回值(可以理解为返回了undefined),但是如果添加return返回值的情况会发生什么呢？

```javascript
function Car(color) {
  this.color = color;
  return 1;
}
Car.prototype.go = function() {
  console.log('the ' + this.color + ' car is going');
}
var car = new Car('red');
console.log(car.color); // red
console.log(car.go()); // the red car is going
```
构造函数返回了一个基础类型的数值，此时实例car与之前的运行结构并没有差异。

那么，如果将return的基础类型更换一个复杂类型呢？
```javascript
function Car(color) {
  this.color = color;
  return { weight: 500 };
}
Car.prototype.go = function() {
  console.log('the ' + this.color + ' car is going');
}
var car = new Car('red');
console.log(car.color); // undefined
console.log(car.go()); // Uncaught TypeError: car.go is not a function
```
此时，上面的运行结果发生了变化，car.color为undefined,而且也访问不到构造函数原型上的方法了。

这个时候我们将car实例在控制台打印一下的话会发现，car实例实际上是：`{weight: 500}`。

>通过以上实验可以得出两个结论：
>* 构造函数返回基本类型时，该返回值没有任何作用
>* 构造函数返回复杂类型时，实例的结果为该返回值，实例将访问不到构造函数的属性以及构造函数原型上的属性。

## new的过程中发生了什么？

>1. 创建一个继承自构造函数原型的对象
>2. 使用指定的参数调用构造函数，并将执行过程中的this指向刚刚创建的对象
>3. 由构造函数返回的对象就是new的结果。如果构造函数没有返回对象，那么返回步骤1中创建的对象。

## 自己实现一个new操作符

通过上移端我们已经知道了new的过程找那个发生了什么，那么接下来我们就可以自己模拟一下new操作符的实现了。

1、首先创建一个继承自构造函数原型的对象
```javascript
function create() {
  let Con = [].shift.call(arguments); // 函数的第一个参数被当做构造函数
  const obj = Object.create(Con.prototype);
  // const obj = {};
  // Object.setPrototypeOf(obj, Con.prototype);
}
```
在上述过程中我们获取了函数的第一个参数，这个参数被当做构造函数，然后创建了一个对象obj，并让对象obj继承了构造函数的原型。

2、执行该构造函数，并将this指向构造函数
```javascript
function create() {
  let Con = [].shift.call(arguments); // 函数的第一个参数被当做构造函数
  const obj = Object.create(Con.prototype);
  Con.apply(obj, arguments); // 执行了构造函数，并将构造函数的this指向了obj
}
```

3、如果构造函数执行之后返回了一个object对象就直接返回它，否则返回obj
```javascript
function create() {
  let Con = [].shift.call(arguments); // 函数的第一个参数被当做构造函数
  const obj = Object.create(Con.prototype);;
  const result = Con.apply(obj, arguments); // 执行了构造函数，并将构造函数的this指向了obj
  return result instanceof Object ? result : obj;
}
```
## 验证

以上就完成了new操作符的所有过程，接下来验证一下我们写的方法是否正确。

```javascript
function Car(color) {
  this.color = color;
}
Car.prototype.go = function() {
  console.log('the ' + this.color + ' car is going');
}
var car = create(Car, 'red');
console.log(car.color);
console.log(car.go());
```
你可以将以上代码复制到控制台查看是否正确执行。