---
title: 如何实现一个简单的移动端Vue Confirm组件
date: 2017-09-19 13:19:23
keywords:  vue, 组件
tags: [vue, 组件]
categories: [vue, 前端]
summary: 百度百科的定义是：组件（Component）是对数据和方法的简单封装。 定义说明了组件的两个主要功能：数据和方法。对于软件开发而言，组件应该是服务于具体的业务逻辑，但是又和具体的业务逻辑没有直接关系的代码段。也就是说，组件是来源于实际业务需求，但高于业务需求的。一般来讲，组件可以接受用户的输入（这里的输入不一定是input的输入，可以理解成参数传入。），在经过一些处理之后将处理之后的结果反馈到用户面前。
---
<!-- toc -->

## 什么是组件

百度百科的定义是：组件（Component）是对数据和方法的简单封装。 
定义说明了组件的两个主要功能：数据和方法。对于软件开发而言，组件应该是服务于具体的业务逻辑，但是又和具体的业务逻辑没有直接关系的代码段。也就是说，组件是来源于实际业务需求，但高于业务需求的。一般来讲，组件可以接受用户的输入（这里的输入不一定是input的输入，可以理解成参数传入。），在经过一些处理之后将处理之后的结果反馈到用户面前。

## Vue组件

<div class="tip">如果你对Vue的组件已经很熟悉了，可以直接跳过该部分，以下内容全部来自官网</div>

Vue官方文章的解释：

> 组件 (Component) 是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。

具体请参考[vue中文文档](https://cn.vuejs.org/v2/guide/components.html)

这里对Vue组件简单回顾一下：
1、Vue组件可以采用全局注册和局部注册的形式，
```javascript
// 全局注册
Vue.component('my-component', {
  template: '<div>A custom component!</div>',
  data: function () {
    return data
  }
});

// 局部注册
var Child = {
  template: '<div>A custom component!</div>'
}
new Vue({
  // ...
  components: {
    // <my-component> 将只在父模板可用
    'my-component': Child
  }
})
```
2、data必须是函数 [官网参考](https://cn.vuejs.org/v2/guide/components.html#data-必须是函数)
data必须是函数，原因也很简单，使用函数是为了保证多个组件之间的数据相互独立，不共享。

3、props数据传递
你可以props从父组件向子组件传递信息，例如：
创建子组件，在子组件中利用props接收参数message
```javascript
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 可以用在模板内
  // 同样也可以在 vm 实例中像“this.message”这样使用
  template: '<span>{{ message }}</span>'
})
```
在父组件中，调用子组件时：
```javascript
// 传递静态定值
<child message="hello"></child> 
// 传递动态变量值 hello是个变量
<child :message="hello"></child>
```
当然你还可以在子组件中设置props的值，参考[这里](https://cn.vuejs.org/v2/guide/components.html#Prop-验证)

4、自定义事件
在父组件中使用 $on(eventName) 监听事件
在子组件中使用 $emit(eventName) 触发事件

Vue组件中还有很多其他概念，比如动态组件、组件v-model、slot、异步组件、递归组件等等，如果需要了解这些内容，可以查看官方网站。

## 实现一个Confirm组件

这个Confirm组件，模拟浏览器中的Confirm的行为：标题，内容，确定和取消按钮，样式模拟一下ios的样式。

这个组件的形式还是比较简单的，就是根据输入，显示相关信息，并在用户点击了确定和取消按钮的时候，做出相应的反应。

那么接下来我们就需要看下这个组件都要接收哪些参数了：
1、title:标题文字
2、content:提示内容
3、cancelText:取消按钮文字内容，默认“取消”
4、cancelFunc: 取消按钮的回调
5、confirmText: 确定按钮， 默认“确定”
6、confirmFunc: 确定按钮的回调

那么接下来就我们一步一步的实现一个Confirm组件，我们会按照`.vue`文件的形式进行这个组件的开发，并命名为`confirm.vue`
### 1、首先，我们需要创建html元素

html元素大致分为几层：
> * 最外层的包装层 （可以理解为一个外层容器）
> * 半透明的背景层 （可以用于点击背景弹层消失）
> * 主体内容部分   （正常的需要展示的内容）

其中`主体内容部分`又可以分为：
> * 标题区域
> * 内容提示区域
> * 按钮区域

按照上述的规划，页面元素可以这样写(按照.vue文件的形式，html需要放在template标签之内)：

```html
<template>
<section class="confirm-pop-container">
    <section class="confirm-pop-bg"></section>
    <section class="confirm-pop-main">
        <div class="confirm-pop-title">标题</div>
        <div class="confirm-pop-content">提示内容</div>
        <div class="confirm-pop-footer">
            <div class="confirm-pop-btn">取消</div>
            <div class="confirm-pop-btn">确定</div>
        </div>
    </section>
</section>
</template>
```
页面的HTML结构大致是这样的：

section.confirm-pop-container : 最外层包装层
    section.confirm-pop-bg : 半透明的背景层
    section.confirm-pop-main : 主体内容部分
        div.confirm-pop-title : 标题区域
        div.confirm-pop-content : 内容提示区域
        div.confirm-pop-footer : 按钮区域
            div.confirm-pop-btn : 分别代表两个按钮

这样我们页面的大致结构就已经有了，接下来我们可以根据结构来写样式了

### 2、写样式
样式部分我用的scss写的，这部分没什么特别的，就是正常写样式就可以了。
在`.vue`文件中，样式需要添加到style标签中，如下所示：
```html
<style lang="scss">

</style>
```

<iframe width="100%" height="300" src="//jsfiddle.net/Michael_Gong/oznqcz6p/embedded/css,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

样式添加完成后，confirm弹出框的样子(html中确定按钮添加了其他样式)：
{% qnimg confirm.jpg %}

这样就是confirm样式就暂时完成了。

### 3、组件的js
静态的组件我们现在已经完成了，现在就可以给组件添加js逻辑了，让我们的组件动起来。
按照`.vue`组件的形式，我们需要往script标签添加如下代码：

<iframe width="100%" height="300" src="//jsfiddle.net/Michael_Gong/oznqcz6p/embedded/js/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 4、将HTML与js联合起来

这样添加的话，我们的页面依旧没有和js联系起来，所以还需要在html添加事件监听，代码如下：
```html
<div class="confirm-pop-btn" @click="btnActionHandler('cancel')">取消</div>
<div class="confirm-pop-btn confirm-pop-btn-border blue" @click="btnActionHandler('confirm')">确定</div>
```
以上是给取消和确定按钮添加点击事件的响应。`btnActionHandler` 这个方法统一处理了取消和确定的事件处理，在这个方法内部还调用了一个方法`hideCallback`，这个方法向父组件发送一个`toggleconfirm`的事件，并传递一个参数：false，用于隐藏组件。

添加了事件以后，现在还不能控制组件的显示与隐藏。要想控制组件的显示和隐藏，需要利用props传递进来的参数`isShow`来控制组件的显示与隐藏，此时需要在组件最外层的`<section class="confirm-pop-container"></section>`这个标签上添加`v-show`或者`v-if`属性，代码如下：
```html
<section class="confirm-pop-container" v-show="isShow">
...
</section>
```
除了以上设置外外，还需要将页面中的元素修改成js中对应的变量，比如：`标题`的位置需要修改成用<code>&#123;&#123;title&#125;&#125;</code>，此时html代码应该如下所示：
<iframe width="100%" height="300" src="//jsfiddle.net/Michael_Gong/oznqcz6p/22/embedded/html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

这个时候一个`.vue`文件形式的组件已经创建好了，接下来就可以使用该组件了。

### 5、在其他组件中引用Confirm组件
引用的方式很简单，首先需要在需要使用的组件内引入confirm组件，然后在组件中的`components`添加confirm组件，最后需在html中引入confirm组件，并传入相应参数，例如：
```javascript
import confirm from './confirm.vue';
export default {
  name: 'example',
  data: {
    confirmShow: true
  },
  components: {
    confirm
  },
  methods: {
    toggleConfirm(isShow) { // 接收confirm组件传递上来的参数
      this.confirmShow = isShow;
    }
  }
}
```
以上代码是将confirm中引入进去js中，然后在html中如下调用：
```html
<confirm 
  :isShow="confirmShow" 
  title="标题" 
  content="提示内容" 
  @toggleconfirm="toggleConfirm"
></confirm>
```
这样这个confirm组件就可以正常调用了。

## 给组件添加动画

以上的代码已经可以正常使用了，现在我们希望我们的组件有点动效，就需要给我们的组件添加一些动画效果，我们可以利用vue中的`transition`来让我们的组件动起来。

`transition`详细用法请看[官网](https://cn.vuejs.org/v2/guide/transitions.html)

首先制定一下我们想要的动画效果：
1、背景图渐隐出现，渐隐消失，这个效果利用opacity实现
2、主体内容出现的时候从小变大，消失的时候从大变小，这个效果利用transform中的scale实现

我们将主要利用transition中的两个api：`v-enter-active`、`v-leave-active`。
利用以上两个api需要添加的样式如下：
```css
.confirm-ani-enter-active, .confirm-ani-leave-active {
    transition: all .2s;
    .confirm-pop-main {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.7); // translate(-50%, -50%) 是为了保证居中状态
    }
    .confirm-pop-bg {
        opacity: 0;
    }
}
```
此外还需要给`.confirm-pop-bg`和`.confirm-pop-main`添加css属性：`transition: all .2s`，这样你的组件就可以动起来了。

## 效果演示
以下是我在jsfiddle中做的效果，由于jsfiddle中并不能直接写`.vue`组件，所以这种形式和以上介绍的方式还是有所区别的，比如html模板的形式、命名的形式等等都存在差别，请注意差别。
<iframe width="500" height="500" src="//jsfiddle.net/Michael_Gong/11b3dk44/14/embedded/html,css,js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 其他思考

在实际项目开发中，像confirm、toast、loading这样的组件，我们可能在各个组件中都会用到，如果按照上述写法，就需要在每个需要用的到组件中都添加该组件的引用，这种方法难免有点麻烦，并且代码有些冗余。

那么，采用什么方式比较好呢？
以下说下我知道的两种实现方式：
> * 1、在最顶级组件中引入该组件，搭配vuex的属性来控制组件的状态
> * 2、制作成单独的组件，利用js方法调用来控制组件的状态。

第一种方法，确实可以实现，有些时候在我们的项目中也确实会存在这样的情况（虽然不是很推荐这种写法），个人不是很推荐使用，虽然能够解决问题，但是却要总是依赖于vuex，代码并不优雅。

那么就只是剩下第二种方式了，以上的描述方式可能并不是很清晰，那么我就来一步一步的实现它。

依然按照`.vue`文件的形式进行开发。
首先将之前的创建好的`confirm.vue`文件,拷贝到`confirm`文件夹下（confirm文件夹请自行创建），并在这个目录下创建一个`confirm.js`的文件。此时的目录结构应该是这样的：

├── confirm
|   ├── confirm.vue
|   └── confirm.js

在confirm.js中加入如下代码：
```javascript
import Vue from 'vue';
const Confirm = Vue.extend(require('./confirm.vue')); // 声明一个Confirm组件，一下操作的就是这个Confirm组件
let instance; // Confirm组件的一个实例
export default {
    show(options) { // 显示的方法，options可以是组件中的属性或方法
        if (!instance) { // 首先判断instancs是否为真，如果不为真，表示组件并没有实例化过，就需要实例化
            instance = new Confirm({ // 初始化confirm组件
                el: document.createElement('div')
            });
        }
        if (instance.isShow) return; // 如果组件已经是显示状态，那么不在向下执行代码
        instance.isShow = true; // 将组件的状态修改成显示
        for (var prop in options) { // 遍历传进来的属性，修改组件的属性值
            if (options.hasOwnProperty(prop)) {
                instance[prop] = options[prop];
            }
        }
        instance.hideCallback = function callback(isShow) { // 声明组件的隐藏的回调方法，这里声明了，组件内部的那个hideCallback方法就可以去掉了
            instance.isShow = isShow;
        }
        document.body.appendChild(instance.$el); // 将组件添加到页面中去

        Vue.nextTick(() => { // 在下一帧时显示组件
            instance.isShow = true; 
        });
    },
    close() { // 关闭组件
        if (instance) {
            instance.isShow = false;
        }
    }
};
```

以上方法有两点需要注意的：
1、`confirm.vue`中的 `hideCallback` 方法可以移除掉了，而是在`confirm.js`中声明了该方法，而且这个方法的行为也发生了变化，不在向父组件发送通知，而是修改了组件的`isShow`属性
2、当前这个组件有且仅有一个实例，在任何地方调用的都是操作的同一个实例。更进阶的方式是，做一个confirm栈，没初始化一个confirm实例都向栈中添加一个实例，隐藏时则将改实例移除出栈。栈是用来控制其显示顺序的，用户看到的永远是栈顶的组件，当栈顶的组件被隐藏后就将该组件移除出栈，接着显示下一个组件。

组件创建完成之后，还需要将组件添加到`Vue`实例中，方便我们调用：
```javascript
import Vue from 'vue';
import confirm from './confirm/confirm.js';
Vue.$confirm = Vue.prototype.$confirm = Confirm;
new Vue({
  el:'#app'
  ...
})
```
其中最关键的一句就是：`Vue.$confirm = Vue.prototype.$confirm = Confirm;`，将confirm组件绑定到Vue上。

这样我们在组件中就可以直接像这样调用：
```javascript
// 显示
this.$confirm.show({
    content: '显示内容',
    cancelText: '取消',
    cancelFunc: function() {

    },
    confirmText: '删除',
    confirmFunc: () => {
        
    }
});
// 关闭
this.$confirm.close();
```

这样我们的Confirm组件就完成了。