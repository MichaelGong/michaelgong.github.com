---
title: CSS 选择器相关
date: 2019-09-15 14:50:22
keywords: css selector
tags: [css]
categories: [css]
summary: 
---

## css引入方式有哪些？

* 行内样式： `<div style="color: red;"></div>`
* 内联样式：`<style type="text/css"></style>`  
* 外部样式：1、 link标签：`<link rel="stylesheet" type="text/css" href="xxx" />` 2、 @import 的方式

## css选择器的分类

css选择器有这么几个分类:
+ 基础选择器
+ 组合选择器
+ 伪类
+ 伪元素

其中基础选择器分为几下几类：
1. id选择器: `#id`
2. 类选择器: `.class`
3. 标签选择器: `div`
4. 通用选择器: `*`
5. 属性选择器: 
    - `[attr]` 选中带有指定属性的元素
    - `[attr=value]` 选中属性等于value值的元素
    - `[attr~=value]` 选中属性中的值以空格为分隔符隔开的列表中的某一项完全匹配到value的元素，比如：[type~='a']，可以匹配到`<div type="a"></div>` \ `<div type="a bc"></div>` \ `<div type="d a b"></div>`，但是无法匹配到`<div type="abc"></div>`
    - `[attr|=value]` 这个选择器有两个解析：1. 选中属性值完全匹配到value值的元素 2. 选中属性值以'value-'开头的元素，一般用于语言选择
    - `[attr^=value]` 选中属性值以value开头的元素
    - `[attr$=value]` 选中属性值以value结尾的元素
    - `[attr*=value]` 选中属性值中包含至少一个value的元素

组合选择器分类如下：
1. 紧邻兄弟选择器+， A+B 选择紧跟在A后面的B选择器，它们拥有共同的父元素，就是A后面的第一个元素且满足B
2. 一般兄弟选择器~，A~B 选择A后面的B选择器，它们拥有共同的父元素
3. 子选择器 >， A > B, A选择器内部的B选择器匹配的元素，且B是A的直接子元素
4. 后代选择器 ' ' 空格， A B, A内部的所有B，不论层级

伪类的内容比较多，可以参考https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#Index_of_standard_pseudo-classes, 以下举例一些常用的伪类： :hover, :active, :focus, :link, :visited, :not, :checked
:first-child,:first-of-type,:nth-child,:nth-of-type,:last-child,:last-of-type,:nth-last-child,:nth-last-of-type

伪元素的内容也不少，可以参考https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements#Index_of_standard_pseudo-elements
按照规范，伪元素是双冒号表示的。例如：::before, ::after, ::selection, ::placeholder, ::first-letter, ::first-line


## css选择器优先级

!important > id选择器 > 类选择器/属性选择器/伪类 > 标签选择器/伪元素 > 通配符选择器 > 继承 > 浏览器自定义的属性


## 如何确定一个css属性的优先级呢？

css中哪一个属性值最终作用的目标元素上都是由css选择器优先级决定的，它的计算方式如下:
A selector’s specificity is calculated for a given element as follows:
1. count the number of ID selectors in the selector (= A) 
2. count the number of class selectors, attributes selectors, and pseudo-classes in the selector (= B)
3. count the number of type selectors and pseudo-elements in the selector (= C)
4. ignore the universal selector

以上步骤大致是这样的：
首先有3个变量 A、B、C
1、计算出选择器中id选择器的个数，赋值给A
2、计算出选择器中class选择器、属性选择器、伪类选择器的个数，赋值给B
3、计算出选择器中标签选择器、伪元素选择器的个数，赋值给C
4、忽略通配符选择器

得到A、B、C三个值之后，其实就是把权重分成了A、B、C三个级别，
所以优先计算A的权重，当A的权重相等的时候才会去计算B的权重，否则就不需要计算B权重了，以此类推。


## 参考

[w3c关于css优先级的计算](https://www.w3.org/TR/selectors/#specificity-rules)