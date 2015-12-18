# 返回页面顶部
返回页面顶部的方法在项目中经常会遇到，尤其是长列表的项目中，显得很重要。

## 1.使用锚标记
这个很简单：
在页面顶部声明一个带id的标签
```html
<div id="top"></div>
```
然后再你需要的地方加上：
```html
<a href="#top" target="_self">返回顶部</a>
```
这个方式是瞬间到顶部。
## 2.使用scrollTo函数
这种方式只需要在相应的地方加上：
```html
<a href="javascript:window.scrollTo(0,0)">返回顶部</a>
```
这个方式是瞬间到顶部。
## 3.使用scrollBy函数
先介绍下scrollBy这个函数，它是用来使内容滚动指定像素的，它有两个参数，第一个参数表示x轴方向(向右)，第二个参数表示y轴方向（向下），比如说：window.scrollBy(3,4)，表示页面向右、向下分别滚动3px，4px。

那么我们就可以利用这个功能来是回到顶部了：
```javascript
function goToTop(time){
    var scrollTag = setTimeout(function(){
        goToTop(time);
    },time/50);
    if(document.documentElement.scrollTop>0 || document.body.scrollTop>0) 
    	window.scrollBy(0,-50);
    else clearTimeout(scrollTag);
}
goToTop(800);
```
上面的方法可以在800ms之内移动到页面顶部
## 4.使用scrollTop属性
`window.onscroll`函数就是用来监听窗口滚动事件的。
```javascript
function goToTop(time){
    var goTopInterval = setInterval(function(){
        if(document.body.scrollTop>0 || document.documentElement.scrollTop){
            document.body.scrollTop -= 50;
            document.documentElement.scrollTop -= 50;
        }else clearInterval(goTopInterval);
    },time/50);
}
goToTop(800);
```
这是带动画效果的，当然你也可以直接设置`document.documentElement.scrollTop=0` 或者 `document.body.scrollTop=0`，这杨设置并没有动画效果，和1、2的方法效果相同

## 5.使用jquery
配合jQuery的`animate`方法到达页面顶部
```javascript
$('body,html').animate({scrollTop:0},1000);
```

## 6.其他
有上面的方法基本都可以满足需求，但是我们的返回页面顶部的按钮并不会在打开页面的时候就出现，而是在用户滚动了屏幕之后再出现。我们可以利用`onscroll`方法来实现这个功能
假设你的返回顶部的按钮的id为`goToTop`
```javascript
var goElem = document.getElementById('goToTop');
window.onscroll = function(){
    if(document.documentElement.scrollTop>300||document.body.scrollTop>300){
        goElem.style.display = 'block';
    }else{
        goElem.style.display = 'none';
    }
}
//或者jquery版本
var $go = $('#goToTop');
$(window).scroll(function(){
    if($(this).scrollTop()>300){
        $go.show();
    }else{
        $go.hide();
    }
});
```
