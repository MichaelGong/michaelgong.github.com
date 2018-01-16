---
title: arrow_function
date: 2018-01-16 21:18:36
keywords: 箭头函数
tags: [箭头函数]
categories: [前端]
summary: 箭头函数与普通函数的区别
---

# 箭头函数与普通函数的区别

1. 写法的区别
2. 箭头函数没有原型
3. 基于上一条，箭头函数不能作为构造函数，不能使用new
4. 箭头函数不绑定arguments，可以用rest写法来替代
5. 箭头函数的this指向了上下文的this，并且不能通过call、apply、bind来改变。

