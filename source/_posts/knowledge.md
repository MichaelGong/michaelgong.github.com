---
title: 前端琐碎知识点整理
date: 2017-09-15 18:52:18
tags: [flex, 兼容性, 华为]
categories: [前端, flex, 知识点]
keywords: 前端知识点
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


