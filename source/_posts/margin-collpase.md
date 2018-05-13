---
title: Margin Collpase/ Margin 重叠
date: 2018-05-13 13:11:11
keywords: margin, collpase
tags: [margin-collpase]
categories: [前端, margin]
summary: margin-collpase，又称外边距塌陷或边距重叠，它表示在html流式布局中，在垂直方向上外边距会发生叠加的现象。
---

## 什么是margin collpase

margin-collpase，又称外边距塌陷或边距重叠，它表示在html流式布局中，在垂直方向上外边距会发生叠加的现象。

## margin collpase 的表现
测试连接：[点这里](https://codesandbox.io/s/pyz8nq0o9x)，你可以边看文章，边修改属性以加深理解
### 1、兄弟元素之间存在垂直方向的margin，取最大值
```html
<div class="div1">div1</div>
<div class="div2">div2</div>
```
```css
.div1 {
  margin-bottom: 10px;
}
.div2 {
  margin-top: 15px;
}
```

以上这个html结构就符合`兄弟元素之间存在垂直方向的margin`的情况，如果没有`margin collpase`特性的话，div1与div2之间的间距应该是 10 + 15 = 25px，但是实际情况是div2与div1之间的间距为15px，为什么会发生这种情况呢？为什么是15px不是10px呢？
>>> 是因为css在解析过程中发现，这两个div之间发生了`margin collpase`，css会将两者之间的间距渲染成了两者之间的最大值，这里就是15px。

即便你将div1的margin-bottom调整成15px，div2的margin-top调整成10px，最后两者之间的间距仍然是15px，因为取得是最大值。

### 2、父子元素margin叠加，取最大值
```html
<div class="border">
  <div class="div1">
    <div class="div2">div</div>
  </div>
</div>
```
```css
.border {
  border: 1px solid #666;
}
.div1 {
  margin-top: 10px;
}
.div2 {
  margin-top: 15px;
}
```
以上示例的demo，符合`父子元素margin叠加`的条件，首先div1的第一个子元素是div2，而且div2没有padding、border等属性，如果不考虑`margin collpase`的话，border与div2之间的间距应该是 10 + 15 = 25px，而实际结果是15px，是由于`margin collpase`作用的结果，造成他们之间的间距是div1和div2间距的最大者。

### 3、空元素的margin叠加
```html
<div class="border">
  <div class="div1"></div>
</div>
```
```css
.border {
  border: 1px solid #666;
}
.div1 {
  margin-top: 10px;
  margin-bottom: 15px;
}
```

div1是个空元素，它同时具有margin-top、margin-bottom属性，但是最终呈现出来的结果是border的高度只有15px，而不是25px。所有对于空元素而言，他依然是取的最大值。

### margin collpase 是好还是坏？

`margin collpase`的特性谈不上更好或是更坏，他是在css设计时就被制定出来的，在早期的html中页面比较简单，大多以多段文字的形式进行展示，这种方式有助于保证段落之间展示合适的距离，而且在文章结束出依然有margin-bottom的支撑。但是在现代化的开发中，我们需要去了解这个特性，并在他出现的时候，合理的判断出来。

### 如何规避？
如果你仔细观察过上面的例子，你会发现只要你随便在内层div中加入padding或者border等属性，就会使这个特性消失，所以规避`margin collpase`并不难，常见的方法如下：
>>> 1.外层padding 
2.透明边框border:1px solid transparent;
3.绝对定位postion:absolute:
4.外层DIV overflow:hidden;
5.内层DIV　加float:left;display:inline;
6.外层DIV有时会用到zoom:1;

