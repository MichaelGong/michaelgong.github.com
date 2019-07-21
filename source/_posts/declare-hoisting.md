---
title: 声明提升
date: 2019-07-21 14:29:11
keywords:
tags: ['基础', '声明提升']
categories: [javascript]
summary:
---

## 变量的声明周期

当引擎处理变量的时候，变量的生命周期大致分为一下阶段：

1. 声明阶段(Declaration phase):在作用域中注册一个变量
2. 初始化阶段(Initialization phase): 为变量分配内存地址并为作用域中的变量创建绑定，在此步骤中变量使用undefined来初始化
3. 赋值阶段(Assignment phase): 为初始化的变量赋值

![](/images/Untitled-9807c575-8d4b-442f-884d-3f32c8d950f0.png)

## 变量声明提升

var变量的生命周期：

对于var变量而言，它的声明与初始化阶段是同时完成的，但是在初始化阶段，给变量赋的值是 undefined

![](/images/Untitled-aea48e91-7023-428d-86fd-50b8db377d5e.png)

```javascript
function func() {
  console.log(a);
  var a = 3;
}
func();
```

对于上面的代码，执行的时候，会输出undefined，并不会报错。原因在于变量的声明提升，在js的编译阶段，引擎会将变量的声明统一提升到作用域的顶部，也就是说，一句 `var a = 3;` 会被替换成先声明后赋值的2句语句 `var a; a=3;` ,所以上面的代码等同于：
```javascript
function func() {
  var a;
  console.log(a);
  a = 3;
}
```

## 函数声明提升

函数声明的生命周期：

![](/images/Untitled-7566e819-f83a-480b-a1f3-164c9f0851a6.png)

从上图可以看到，函数声明的生命周期的三个过程是一次性完成的，也就是说函数声明提升，会直接提升整个函数体。

函数声明提升是指对`函数声明`进行操作的提升。

我们可以通过两种方式声明函数：

1、function func(){}

2、var a = function(){}

第一种方式就是函数的声明，第二种方式是函数表达式，其实与变量的声明相同。所以接下来我们说的函数声明提升都是指的是第一种形式的函数。

对于函数声明提升而言，js引擎会把函数声明整体移动到当前作用域的顶部。

看个🌰：
```javascript
function func() {
  console.log(a);
  function a(){}
}
func();
```
执行上述代码会把函数a打印出来，实际上这段代码等同于：
```javascript
    function func() {
    	function a(){}
      console.log(a);
    }
    func();
```

再举个🌰：
```javascript
    function func() {
    	console.log(a);
      return;
      function a(){};
    }
    func(); // 输出：ƒ a(){}
```
在这个例子中，我们的函数a出现在return之后，但是声明提升的过程是发生在编译阶段的，并不是发生在执行阶段的，所以即便是有return，也不会起到其他的作用，该提升的内容依然会进行提升的。

再看一个🌰：
```javascript
    function func() {
    	console.log(a);
    	var a = 1;
    	function a(){};
    	function a(){console.log(1)}
    }
    func(); // 输出：ƒ a(){}
```

这个🌰的特别之处在于：变量a被声明了2次，并且每次被赋予的值的类型是不同的，一次是变量，一次是函数，那么为什么输出的是函数a呢？原因在于函数的提升的优先级高于变量提升的优先级，且在同名的情况下不会被同名的变量覆盖，但是会被同名的函数覆盖。

所以下面这个输出的是带有console.log的函数a
```javascript
    function func() {
    	console.log(a);
    	var a = 1;
    	function a(){};
    	function a(){console.log(1)}
    	var a = 2;
    }
    func(); // 输出：ƒ ƒ a(){console.log(1)}
```
## let、const、class的暂时性死区

let变量的生命周期中，声明、初始化、赋值三个阶段的完全分开的（const class与之相同），从图中可以看到，当进入到一个有let变量的作用域内时，let变量首先会进行声明，在作用域中注册其名称，然后解析器继续解析语句。如果在这个时候，尝试去访问let变量的话，就会报错ReferenceError，因为此时let变量的未被初始化，let变量处于暂时性死区。当解析到let variable;这句时才会进行初始化的操作，并将其初始化成undefined。

![](/images/Untitled-57572934-21cf-4c55-b699-1574614a593a.png)

举个🌰：
```javascript
    function func() {
    	console.log(a);
    	let a;
    	a = 3;
    }
    func(); // 报错：Uncaught ReferenceError: Cannot access 'a' before initialization
```
## 总结

1、var变量声明提升会在一开始进行声明、初始化成undefined两步操作

2、函数的声明提升会将整个函数体进行提升（更精确的说法是：函数声明提升会在一开始就进行声明、初始化、赋值等操作）

3、函数声明的优先级要搞与变量声明的优先级，且不会被变量声明所覆盖，但是会被同名的函数声明覆盖

4、let、const、class等变量的暂时性死区是因为在声明、初始化、赋值操作都是分开的，声明之后并没有立即进行初始化操作，而是等待代码执行到声明语句的位置再进行初始化操作。

参考：

- JS 变量生命周期：为什么 let 没有被提升：[https://juejin.im/post/5d2fb820e51d454f723025bb](https://juejin.im/post/5d2fb820e51d454f723025bb)