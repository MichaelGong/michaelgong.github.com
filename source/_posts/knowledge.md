---
title: 前端琐碎知识点整理
date: 2017-09-15 18:52:18
keywords: 前端知识点
tags: [flex, 兼容性, 华为]
categories: [前端, flex, 知识点]
summary: 
---

<!-- toc -->

## flex在华为手机中的兼容性

只能说华为系统是个神奇的系统，正常来讲在华为手机上flex也是可以使用的，但是如果你使用了`flex:1`的话，很有可能出现布局问题，这个时候需要添加width:0属性。如果你的标签是行内元素的话，可能还需要给元素添加display:block属性

## js判断是否是数组
```javascript
function isArrayFn(obj) {
    if (typeof Array.isArray === 'function') { // ES6语法
        return Array.isArray(obj);
    } else {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
}
```

## CSS控制用户无法选择内容
```css
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
```
移动端基本全都兼容，[兼容性](http://caniuse.com/#feat=user-select-none)

## CSS设置点击某个元素时高亮
```css
a {
    -webkit-tap-highlight-color:rgba(0,0,0,.5);
}
```
详情可以点[这里](http://www.css88.com/webkit/-webkit-tap-highlight-color/)

## CSS禁用系统默认处理的功能
-webkit-touch-callout
是否禁用系统默认处理的功能，例如：链接元素比如新窗口打开，img元素比如保存图像等等
```css
-webkit-touch-callout: 属性
none： 系统默认菜单被禁用
inherit：系统默认菜单不被禁用
```
详情请点[这里](http://www.css88.com/webkit/-webkit-touch-callout/)

## CSS3选择器 `:target` 
很惭愧，这个属性的用法是最近才知道的。
之前有同事问过我一个问题：浏览器锚点（就是url中带有#id这种形式的）怎么让页面上方空出一块距离。当时我的回答是：好像不行吧，除非用js来控制。显然这回答是不正确的，我们利用`:target`选择器可以做到这一点，例如本站的锚点。
假设你有需要锚点的div如下：
```html
<div id="target">这里是锚点</div>
```
那么你的css可以这样写：
```css
#target:target {
    padding-top: 80px;
}
```
padding或者使用margin看你页面的实际需求，这是只是举个例子，这样你的锚点就角距离页面顶部80px了。

##  移动端输入框自动获取焦点问题

```html
<input type="text" autofocus="autofocus" />
```

由于移动端的限制，尤其是iphone手机，如果你想要在进入页面之后没有任何交互行为的情况下出发输入框自动获取焦点，这基本是不可能的。所以这个属性起作用的重要前提是: 在自动获取焦点之前页面上有与用户的交互行为，比如点击按钮等等。

## 移动端键盘右下角文字设置
```html
<form action="#">
    <input type="text" />
</form>
```
如果你的input没有被form包住的话，那么键盘右下角将显示 `换行` 字样，添加了form并且有action的话，就会显示`前往`或`GO`字样。 

如果希望按钮上显示 `搜索`的话，那么input的type值应为`search`

## localStorage在无痕模式下被禁用的问题

在很多浏览器中开启了无痕模式后，localstorage无法使用了，建议在使用前可以做下localStorage的测试：
```js
function testLocalStorage() {
    try {
        localStorage.setItem('testLocalStorage', 1);
        localStorage.removeItem('testLocalStorage');
        return true;
    } catch(e) {
        return false;
    }
}
```

## SCSS中calc中不能处理变量的问题
```css
div {
    height: calc(100% - $footerHeight);
}
```
以上场景在scss中不能正常处理`$footerHeight`这个变量，如果需要在scss中使用变量的话需要将变量用`#{$variable}` 包裹一下，如下：
```css
div {
    height: calc(100% - #{$footerHeight});
}
```


