# requestAnimationFrame

可以使用`requestAnimationFrame`替换之前使用的`setInterval`或者`setTimeout`，当然并不是完美的，主要是因为`requestAnimationFrame`的浏览器兼容性。

## 为什么要使用`requestAnimationFrame`
原因主要是因为`requestAnimationFrame`的性能相比`setInterval`要更好。

`setInterval`、`setTimeout`是需要开发者手动指定间隔时间的，虽然说现在很多浏览器的显示频率都是16.7ms,但是在某些情况下也会有所例外的，所以就出现了`requestAnimationFrame`.

![frame-lost.png](./images/frame-lost.png)

上图中上面那张图可以理解为：浏览器每个16.7ms刷新一下显示内容，下面的图可以理解为每10ms刷新一下显示内容，如果按照下图来的话那么没过两帧都会有一帧是看不到的，这样会影响使用，所以`requestAnimationFrame`出现了。
## 兼容性
[浏览器兼容性](http://caniuse.com/#feat=requestanimationframe)
大体为：IE10以后，ios safari 6.1以后，Android4.4以后，这兼容性也是醉醉的~~~

## 语法
语法其实很简单啦，就是：
```js
var raf = requestAnimationFrame(callback); //开始animationFrame
var caf = cancelAnimationFrame(raf); //取消对应id的animationFrame
```
很简单有木有！！！

ok，为了浏览器的兼容性你可以简单的这样写：
```js
window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            }
})();
```
然后下面是更加健全的方法：
```js
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                                    // Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
```
加入这个然后直接执行，可以像下面这样：
```js
var i = 0 ;
var id = requestAnimationFrame(callback); //调用requestAnimationFrame
function callback(){
    console.log('requestAnimationFrame'+(++i));
    id = requestAnimationFrame(callback); //再次调用
    if(i>=100){
        cancelAnimationFrame(id); //取消requestAnimationFrame
    }
}
```
## 最后

本文是参考这篇文章的：[CSS3动画那么强，requestAnimationFrame还有毛线用？](http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/)
