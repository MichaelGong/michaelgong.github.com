---
title: 节流与防抖
date: 2017-10-10 15:21:31
keywords: 节流、防抖
tags: [节流, 防抖]
categories: util
summary: 
---

函数的`节流`与`防抖`在日常的开发中会经常的使用到，下面我们就来看下这两个概念。

## 节流 throttle

概念：每间隔固定的时间就去执行某个函数。

场景：一个商品列表，图片懒加载，在用户滚动页面的时候，再加载要进入到屏幕中的图片。

这个场景中，用户不断滚动页面，就需要我们不断的加载图片，这个场景就适合我们用节流来进行优化。

简单实现：
```javascript
var throttle = function (fn, delay) {
    var last = 0;
    return function() {
        if (+new Date() - last > delay) {
            fn.apply(this, arguments);
            last = curr;
        }
    }
}
```

## 防抖 debounce

概念：如果在固定的时间内一直被调用，就不会触发该方法，直到超过固定时间后才会触发。

场景：乘坐电梯时，乘客一直在往电梯内进入的状态下，电梯门是不会关闭的，直到没有乘客进入后，电梯门才会关闭。

```javascript
var debounce = function(idle, action){
  var last
  return function(){
    var ctx = this, args = arguments
    clearTimeout(last)
    last = setTimeout(function(){
        action.apply(ctx, args)
    }, idle)
  }
}
```


节流和防抖主要核心代码都是利用了`setTimeout`实现的，有兴趣的可以查看 [JS魔法堂：函数节流（throttle）与函数去抖（debounce）](http://www.cnblogs.com/fsjohnhuang/p/4147810.html) 这篇文章中有较详细的分析了underscore中 节流和防抖的实现。大家可以直接用underscore或者lodash中的节流和防抖函数。

参考：
[JS魔法堂：函数节流（throttle）与函数去抖（debounce）](http://www.cnblogs.com/fsjohnhuang/p/4147810.html)
