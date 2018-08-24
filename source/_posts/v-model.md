---
title: Vue中v-model的使用
date: 2018-01-30 22:01:42
keywords: vue, v-model
tags: [vue, v-model]
categories: [vue, 前端]
summary: Vue中的v-model是vue的一个指令，它既可以作用于input、textarea、select上，又可以作用于组件上。
---

## v-model 分类
v-model可以分为两种类型：
1. 作用于原生html元素上，如input、textarea、select上
2. 绑定在组件上的v-model

## 原生html元素

### 文本
```html
<input type="text" v-model="msg" placeholder="输入信息">
<textarea v-model="msg"></textarea>
```

### 复选框 checkbox
checked的值将是true或false
```html
<input type="checkbox" v-model="checked">
```
复选框组
```html
<input type="checkbox" value="Jack" v-model="checkedNames">
<input type="checkbox" value="John" v-model="checkedNames">
<input type="checkbox" value="Mike" v-model="checkedNames">
```
这个例子中，checkedNames应该是个数组类型，如果你选中了 'Jack'，那么checkedNames的值应该是['Jack']，详情可以查看 [vue官方-复选框](https://cn.vuejs.org/v2/guide/forms.html#%E5%A4%8D%E9%80%89%E6%A1%86)
此外，复选框还可以额外设置true或者false的值：
```html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
>
```
当选中时，vm.toggle的值为 'yes'，没有选中时 vm.toggle的值为 'no'，这种模式仅在非多选时起作用。

### 单选框
```html
<input type="radio" value="One" v-model="picked">
```
vm.picked 的值为 'One'

### 选择框
```html
<select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
</select>
```
此时selected的值就是option中的值，如果select添加了 multiple 属性，那么selected将是一个数组。
当然还可以通过动态绑定的形式进行：
```html
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
```
```javascript
new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
```
此时selected的值就是 A或B或C

### 修饰符
`.lazy` v-model会在每次input事件触发后将输入框的值同步到数据上，添加了lazy之后，就转变为change事件进行同步。
`.number` 将输入的内容转换成数值类型的
`.trim` 过滤首尾空白字符

## 组件上的v-model

其实以上内容在官网上都有，而且比这里详细，这里只是做个大概整体梳理，本文的主要内容是讲解`组件上的v-model`的应用。

首先我们来简单看下v-model这个指令，这个指令实际上是监听了`input`事件，然后动态改变了v-model绑定的值，出于这个思路，在组件的使用上其实也是利用的`input` 这个事件，并动态改变了model绑定的值。

下面我们来看一个例子： 有一个简单的图片展示组件ImageView，当用户点击按钮后，显示该组件遮盖整个屏幕，在用户点击图片任意位置后，隐藏组件。

组件的功能比较简单，以下是代码实现(未添加css)：
```javascript
<template>
<section v-show="currentValue" @click="close($event)">
    <img :src="imgUrl" /> 
</section>
</template>
<script>
export default {
    name: 'imageView',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        imgUrl: {
            type: String,
        }
    },
    data() {
        return {
            currentValue: false
        }
    },
    watch: {
        currentValue(val) { // 用一个本地变量代替v-model的value
            this.$emit('input', val); // 向上广播input事件
        },
        value(val) {
            this.currentValue = val;
        }
    },
    methods: {
        close(evt) {
            this.currentValue = false; 
        }
    }
}
</script>
```
调用的时候就可以这样：
```html
<image-view v-model="imageIsShow" :imgUrl="imgUrl"></image-view>
```
其中imageIsShow 应该是Boolean值。

看一下ImageView组件内做了什么事情呢？
> 1. props中有一个value值，这个值就是v-model绑定的值，v-model上的值会映射到这个value上
> 2. watch中监听了两个属性值，一个是上面说的`value`，一个是 `currentValue`，这两个值之间有一定的关系：
    当value值发生变化时，改变currentValue的值，就好像把value映射到currentValue上一样；
    当currentValue发生变化时，会向上触发`input`事件，并把currentValue的值传递过去，上层组件在感受到`input`变化后，将v-model绑定的值修改为currentValue的值。

基于以上两点，在组件内的事件close方法就可以通过改变currentValue的值，达到改变v-model绑定的值了。

### 组件内的model属性

在vue官网中对 自定义组件的v-model 介绍时，有如下定义()：
```javascript
Vue.component('my-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean,
    // 这样就允许拿 `value` 这个 prop 做其它事了
    value: String
  },
  // ...
})
```
其中多了model属性值，model.prop定义了v-model绑定的值会映射到props中的对应的值，在这个例子里就是将v-model映射到checked的值。model.event的值规定了向上触发的事件名称，默认的就是`input`，在这个例子中就是`change`.



