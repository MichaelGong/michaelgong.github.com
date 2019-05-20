---
title: JS中的模块化
date: 2019-05-20 14:24:15
keywords:
tags: [模块化]
categories: [模块化]
summary:
---

# 模块化

# 1、为什么会出现模块化

在古老的还没有模块化的年代(其实也没几年)开发前端页面的时候一个html里面一个js文件搞定所有的功能，好一点的程序员可能会进行文件的划分，不同的文件内做不同的功能，但是这样依然会带来一些问题，比如：**全局变量的污染、没有明显的命名空间、代码维护性低**等等问题，虽然之后出现IIFE(立即执行函数)的方式在一定程度上解决了全局变量污染的问题，但是依然无法满足我们对于模块化或者命名空间的需求。

所以js模块化在之后的发展过程中依次出现了

1. commonjs
2. amd
3. cmd
4. es6模块化

# 2、模块化的发展历程

## 2.1、无模块化

简单的script链接的堆叠(有时需要保证链接的顺序)，在不同的文件内做不同的功能，在这种模式下出现全局变量污染等问题，有时你甚至不知道你同事写的代码中用到的变量都是从哪里来的，开发体验非常差。

## 2.2、CommonJS规范(主要适用于非浏览器端)

CommonJS规范推出的时候主要的应用场景并不是浏览器端，你可以查看维基百科中[CommonJS](https://en.wikipedia.org/wiki/CommonJS)的介绍：

> CommonJS is a project with the goal to establish conventions on module ecosystem for JavaScript outside of the web browser.

基于非浏览器(主要是node内)运行的特性，commonjs被设计成**同步**加载模块的方式。

Commonjs作为规范，有各种各样的实现，其中与前端密切相关的就是Nodejs中 Module的设计。

### NodeJs   Module

在nodejs module中，每个文件都被当做一个单独的模块，当node模块系统解析某个文件的时候，会自动在文件内容外部包裹一段代码，如下：
```javascript
(function(exports, require, module, __filename, __dirname){

})
```

具体代码可以查看nodejs中有关commonjs loader的代码：[loader](https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js#L127), 在127行代码中就引用了Module.wrapper对script进行包装。

> exports: 导出对象
require: 引入其他模块
module: 模块的引用
__filename: 绝对文件名
__dirname:  文件的绝对路径

所以其实commonjs是包裹了你的代码并将你的代码的export绑定到了mudule.exports 或是exports内。同时上述方法也解释了为什么node中的文件默认会有require、exports、module、__filename、__dirname等变量。

## 2.3、AMD规范(Asynchronous Module Definition)

由于CommonJS是采用同步的方式，所以它并不适用于浏览器端，因为浏览器端都是从远程服务器上去加载js脚本的，这个时候如果采用同步的方式浏览器将会卡主，体验极差。所以为了满足浏览器端的模块化开发的需求，就出现了AMD，而requirejs就是对AMD的一种实现。

在requirejs中主要有两个核心内容：define 、require，一个用来定义模块，一个用来引用模块。接下来我们来看一个简单的例子：
```javascript
// 对requirejs进行基础配置
requirejs.config({
  baseUrl: 'lib', // 规定文件的下载位置
  paths: {
    app: './app', // 规定某个模块的路径位置
  }
});
// 定义一个app模块，它依赖module1模块
define('app', ['module1'], function(module1){
  alert(module1.text);
});
// 使用app模块进行业务开发，当app模块被加载完毕并执行后，才会执行后面的回调函数
require(['app'], function(app) {
  // 进行业务逻辑
})
```

requirejs是**依赖前置**的，也就是说当你的回调函数factory执行之前，你依赖的所有文件(包括代码中require进来的)都已经被执行了。

## 2.4、CMD规范(Common Module Definition)

CMD要解决的问题和AMD是一致的，只不过在模块的定义与模块运行的方式上有所差异。CMD规范主要思想是**依赖就近**原则，Seajs是CMD的一种比较流行的实现方式。
```javascript
// module.js
define(function(require, exports, module) {
  var $ = require('jquery');
  $('body').addClass('body');
});

seajs.use(['module'], function(module) {
  // 业务逻辑
});
```
从写法上看，Seajs与requirejs的不同：

1. define的写法的不同，主要体现在factory回调函数上，seajs中的factory中的参数是固定的:require、exports、mdule，当然在语法上seajs也支持requirejs一样的语法，但是并不建议使用。
2. seajs中是依赖就近的，所以你只需要在你需要用到某个模块的时候书写 require('xxx') 就可以引入该模块，这是与requirejs的主要区别。

实际上CMD的写法和Commonjs十分相似。

## 2.5、UMD

随之模块化的发展，amd和cmd在前端中的使用越来越多，为了同时兼容AMD、CMD、CommonJS以及没有模块化等情况，我们的前辈们发明了UMD模式，代码如下：
```javascript
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery', 'lodash'], factory);
  } else if (typeof exports === 'object') {
    // commonjs cmd
    module.exports = factory(require('jquery'), require('lodash'));
  } else {
    // 浏览器全局变量(root 即 window)
    root.xxx = factory(root.jQuery, root._);
  }
}(this, function($, _) {

}));
```

 参考：[https://75team.com/post/译神马是amd-commonjs-umd.html](https://75team.com/post/%E8%AF%91%E7%A5%9E%E9%A9%AC%E6%98%AFamd-commonjs-umd.html)

## 2.6、ES6 Module

长期以来，JS中并没有原生的模块系统，因此在ES6中引入的原生Module的概念，但是到目前为止各大浏览器并没有实现这个规范。

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

其实我们现在平时开发中已经在大量使用了ES6 Module了：import export就是ES6 Module的两大特性。如果想要深入了解ES6 Module的话，推荐阅读[阮一峰老师的博客](http://es6.ruanyifeng.com/#docs/module)，讲解的非常细致。

# 3、其他

### CommonJs中 exports 和 module.exports 的联系与区别

在CommonJS中exports实际上就是module.exports的引用，但是当你像这样写的话：
```javascript
exports = {
  a: 1,
}
```

这时exports被重新赋值，此时exports就不是module.exports的引用了，所以现在exports !== module.exports.

所以在非必要情况下不建议这种写法。

### requireJs 和 seajs的执行对比

先看下requirejs与seajs的区别：

![](/images/modulecompare.png)

区别截图来自：[https://www.cnblogs.com/zhangruiqi/p/7538920.html](https://www.cnblogs.com/zhangruiqi/p/7538920.html)

关于执行的对比：

两者都是先异步加载所有模块。

requirejs 依赖前置，在模块加载完毕之后就执行该模块，在所有模块加载完毕后会进入到factory回调函数中，执行主逻辑。

seajs 依赖就近，会先加载所有模块，但是不会执行，在所有模块加载完毕之后会进入到factory回调函数中，当遇到对应的require方法时才会去执行对应的模块，这样模块的执行和顺序和书写顺序是完全一致的。

### CommonJS 与 ES6 Module区别

如果你看过上面提到的[阮一峰老师的博客](http://es6.ruanyifeng.com/#docs/module)的话，可以直接忽略下面的内容。

(1) CommonJS模块的输出是一个值的拷贝，ES6 Module 输出的是值的引用。

- commonjs输出的值是一个拷贝，也就是说，一旦输出一个值，模块内部的变化将不会影响输出的值。
- ES6 Module是值的的引用，它是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

(2) CommonJS是运行时加载，ES6 Module是编译时输出接口

- 运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。
- 编译时加载: ES6 模块不是对象，而是通过 `export` 命令显式指定输出的代码，`import`时采用静态命令的形式。即在`import`时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。

CommonJS 加载的是一个对象（即`module.exports`属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。



参考：

这一次，我要弄懂javascript的模块化：[https://juejin.im/post/5b4420e7f265da0f4b7a7b27](https://juejin.im/post/5b4420e7f265da0f4b7a7b27)

阮一峰博客： [http://es6.ruanyifeng.com/#docs/module](http://es6.ruanyifeng.com/#docs/module)

RequireJS 与 SeaJS 的异同：[https://www.cnblogs.com/zhangruiqi/p/7538920.html](https://www.cnblogs.com/zhangruiqi/p/7538920.html)

深入浅出 Nodejs（ 二 ）：Nodejs 文件模块机制：[https://cloud.tencent.com/developer/article/1005768](https://cloud.tencent.com/developer/article/1005768)

深入浅出 Node.js（三）：深入 Node.js 的模块机制：[https://www.infoq.cn/article/nodejs-module-mechanism](https://www.infoq.cn/article/nodejs-module-mechanism)

深入浅出 Nodejs（四）：Nodejs 异步 I/O 机制：[https://cloud.tencent.com/developer/article/1005792](https://cloud.tencent.com/developer/article/1005792)