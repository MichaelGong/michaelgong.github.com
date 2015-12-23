# touch事件

## 事件类型
1.touchstart:用户触摸到屏幕的时候会触发这个事件

2.touchend:用户手指在屏幕上拿起的时候触发

3.touchmove:用户手指在屏幕上移动的时候触发

4.touchenter:当触点进入到某个element时触发

5.touchleave:当触点离开某个element时触发

5.touchcancel:当触点由于某些原因被中断时触发。
	
有几种可能的原因如下（具体的原因根据不同的设备和浏览器有所不同）：
	>由于某个事件取消了触摸：例如触摸过程被一个模态的弹出框打断。
	>触点离开了文档窗口，而进入了浏览器的界面元素、插件或者其他外部内容区域。
	>当用户产生的触点个数超过了设备支持的个数，从而导致 TouchList 中最早的 Touch 对象被取消。

## 监听事件
监听事件的方式很简单，使用`addEventListener`即可：
```javascript
var el = document.geElementById('touchtest');
el.addEventListener('touchstart',handleStart,false);
el.addEventListener('touchend',handleEnd,false);
el.addEventListener('touchmove',handleMove,false);
el.addEventListener('touchenter',handleEnter,false);
el.addEventListener('touchleave',handleLeave,false);
el.addEventListener('touchcancel',handleCancel,false);
```

## 事件的相关属性
正如上面所展示的，可以监听相应事件，然后只需要在相应的函数中处理逻辑就可以了：

以touchstart为例：
```javascript
function handleStart(event){
	console.log(event);
}
```
OK,那么下面我们就来了解下`event`这个参数。

`event`参数中包含了很多信息，不过有些信息并没有太大用处，我们选择几个常用的信息看下：

1.`target`:这个属性可以获取你点击了页面上的那个元素触发了这个事件，这个元素的性质和documente.geElementById('touchtest')的性质一样。

2.`touches`:包含了所有当前接触触摸平面的触点的 Touch 对象，无论它们的起始于哪个 element 上，也无论它们状态是否发生了变化<br>
3.`targetTouches`:包含了作用于指定的element的Touch对象

4.`changedTouches`:包含了所有从上一次触摸事件到本次事件中，状态发生变化的触点的Touch对象

然后需要注意的是以上2、3、4中的都包含的属性：

1、`clientX/clientY`:相对于浏览器窗口viewport的左上角的位置

2、`pageX/pageY`:相对于页面左上角的位置

3、`screenX/screenY`:相对于屏幕左上角的位置


## 其他
以上都是些基础，基本上在平时使用中都已经足够了，然后这里介绍一点js库来满足我们对touch事件的需求

1、[fastClick](https://github.com/ftlabs/fastclick)这个库可以解决移动端click延迟的问题且不会点击穿透（zepto的touch会出现点击穿透）

2、[touch.js](http://touch.code.baidu.com/)百度出的touch库，有中文文档和实例，用法很简单

3、[hammer.js](http://hammerjs.github.io/) 一个很牛的touch库，但是感觉学习成本比较高
