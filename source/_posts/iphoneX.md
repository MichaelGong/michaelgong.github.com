---
title: iPhoneX H5适配
date: 2017-11-24 19:31:42
keywords: iPhoneX适配
tags: [前端, string, 字符串]
categories: [前端, 前端适配]
summary: iPhoneX的适配
---

嗯，苹果又出了一个屁奇怪的机型，需要前端同学们做适配了（神奇的机型）。

默认情况下，iPhoneX的适配需要考虑到头部和底部的适配，但是一般来讲，很多app内的页面头部都是原生适配的，对于H5来说顶部的适配就不大需要考虑了（实际上适配思路和底部的适配是一致的），那么我们下面就来看看底部的适配。

先来看下iPhone X的适配的安全区域：

![iphoneX](/images/iphoneX.jpeg)

下方的区域是用来充当实体home键的的区域，这个区域的高度是34px。

为了适配iPhone X，苹果在页面的meta标签中多了一个 viewport-fit 属性，大概如下：

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
```
viewport-fit有几个属性：
`contain: 页面内容显示在safe area内`
`cover: 页面内容充满屏幕`
`auto: 默认contain`

除了这个meta之外还有4个常量值允许你在css中使用：
constant(safe-area-inset-top)
constant(safe-area-inset-left)
constant(safe-area-inset-right)
constant(safe-area-inset-bottom)

从字面的意思应该就能明白，分别代表距离上部、左部、右部、底部的距离。
在 viewport-fit=contain 的情况下，以上是不生效的，也就是说只有在viewport-fit=cover的情况下才起作用。
且在竖屏模式下，left\right的值都是0，top的值88px，bottom的值是34px。

你可以通过给body添加：
```css
body {
    padding-top: constant(safe-area-inset-top);
    padding-left: constant(safe-area-inset-left);
    padding-right: constant(safe-area-inset-right);
    padding-bottom: constant(safe-area-inset-bottom);
}
```
来使页面内容不会超出安全区域。

这样我们就可以适配我们的页面了。

### 第一种方案：
利用css3 `media` 属性来识别iphoneX设备：
```css
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {

}
```
比如我们的footer便签的固定在页面底部的,这个时候我们就可以给footer(原高90px)多添加一下bottom高度(34px)：
```css
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    footer {
        height: 124px; // 90px + 34px
    }
}
```
如果你用scss的话可以利用sass的mixin来处理：
```css
@mixin iphoneX() {
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        @content
    }
}
@include iphoneX() {
    footer {
        height:124px;
    }
}
```
这种方案不是很推荐，因为后面如果出现了同样操作模式的但是屏幕尺寸不同的其他iphone手机，就需要额外去弥补。

### 第二种方案

利用 `calc` 来适配。
推荐使用这种方式，比较简单。

```css
footer {
    height: calc(90px + constant(safe-area-inset-bottom));
}
```
个人比较推荐第二种方案，简单，而且能够自动适配横屏和竖屏的情况。

========================更新于 2017年12月12日========================

不得不说苹果真的是扯淡啊，刚出的新属性，结果在下一个系统小版本更新里就不再支持了，具体可以查看[这里](https://webkit.org/blog/7929/designing-websites-for-iphone-x/)，其中有这么一段话：
<div class="tip">The env() function shipped in iOS 11 with the name constant(). Beginning with Safari Technology Preview 41 and the iOS 11.2 beta, constant() has been removed and replaced with env(). You can use the CSS fallback mechanism to support both versions, if necessary, but should prefer env() going forward.
</div>
所以从11.2开始就要使用`env`了，但是constant还是要兼容的，所以方案变成了下面这样：
```css
footer {
    height: calc(90px + constant(safe-area-inset-bottom));
    height: calc(90px + env(safe-area-inset-bottom));
}
```

