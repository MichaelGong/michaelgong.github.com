---
title: BFC
date: 2019-06-04 15:07:45
keywords: BFC
tags: [BFC]
categories: [CSS]
summary: BFC(Block Formatting Context) 块级格式化上下文，是W3C CSS 2.1规范中的一个概念，它决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。BFC中的内容不会影响到其外部的内容，类似于一个BFC就是一个独立的行政单位，也就是说BFC就是一个作用范围，可以把它理解成是一个独立的容器，容器内的元素不会在布局上影响到外面的元素，并且BFC具有普通容器所没有的一些特性。
---

# BFC

## 什么是BFC？

BFC(Block Formatting Context) 块级格式化上下文，是W3C CSS 2.1规范中的一个概念，它决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。BFC中的内容不会影响到其外部的内容，类似于一个BFC就是一个独立的行政单位，也就是说BFC就是一个作用范围，可以把它理解成是一个独立的容器，容器内的元素不会在布局上影响到外面的元素，并且BFC具有普通容器所没有的一些特性。

## 怎样触发BFC？

1. 根元素
2. float属性值不为none
3. overflow属性值不为visible
4. position属性值absolute、fixed
5. display属性：inline-block、table、table-row、table-row-group、table-header-group、table-cell、table-caption、table-header-footer-group、inline-block、flow-root、flex\inline-flex、grid\inline-grid
6. column-count或column-width不为auto
7. column-span的属性为all的元素

> 1、外边距折叠(Margin collapsing) 也只会发生在属于同一BFC的块级元素之间。
2、浮动定位和清除浮动时只会应用于同一个BFC内的元素。
3、浮动不会影响其他BFC中元素的布局，而清除浮动只能清除同一BFC中在它前面的元素的浮动。

## 特点

1. BFC垂直方向边距重叠(margin-collapsing)
2. BFC区域不会与浮动元素重叠(经典的左右两栏布局)
3. 计算BFC高度的时候，浮动子元素也会参与计算
4. BFC就是一个独立的容器

## 试题

    <body>
    	<div id="div1" style="margin: 10px;"></div>
    	<div id="div2" style="margin: 20px;"></div>
    <body>

div1 与 div2 之间的间距是多少？为什么？

答：div1与div2之间的间距是20px，因为在BFC中触发了margin-collapsing，在这种情况下取较大的margin值。

    <body>
    	<div id="div" style="margin: 10px;"></div>
    	<span id="span" style="margin: 20px;"></span>
    <body>

div 与 span 之间的间距是多少？为什么？

答：div1与div2之间的间距是10px，因为对于span来说padding-top\padding-bottom\margin-top\margin-bottom都不起作用

## 参考

块格式化上下文：[https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

BFC 深入理解, 什么是BFC ?：[https://juejin.im/post/5b724d5051882561131aaa52](https://juejin.im/post/5b724d5051882561131aaa52)

10 分钟理解 BFC 原理：[https://zhuanlan.zhihu.com/p/25321647](https://zhuanlan.zhihu.com/p/25321647)