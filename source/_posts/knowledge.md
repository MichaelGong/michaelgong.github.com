---
title: 前端琐碎知识点整理
date: 2017-09-15 18:52:18
keywords: 前端知识点
tags: [flex, 兼容性, 华为]
categories: [前端, flex, 知识点]
summary: 
---

<!-- toc -->
## ios系统对yyyy-mm-dd hh:mm:ss时间格式不兼容

ios系统(主要safari浏览器)对yyyy-mm-dd hh:mm:ss格式的时间不兼容
```javascript
let date = new Date('2019-03-01 17:55:24');  
```
对于以上结果会返回 `null`,所以需要针对这种情况进行特殊处理，将'-'变成'/' 即可，形如：yyyy/mm/dd hh:mm:ss，代码如下：
```javascript
replace(/\-/g, '/');
```


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

## CORS相关
preflight(预检请求，即Options请求的发送)的发送原则：
1、使用了以下任意HTTP方法：`PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH`
2、人为设置了`CORS安全首部字段集合`之外的其他首部，该集合为：
    `Accept、Accept-Language、Content-Language、Content-Type、DPR、Downlink、Save-Data、Viewport-Width、Width`
其中Content-Type要满足下文的条件
3、Content-Type的值不属于下列之一：
    application/x-www-form-urlencoded
    multipart/form-data
    text/plain
4、请求中的XMLHttpRequestUpload 对象注册了任意多个事件监听器
5、请求中使用了ReadableStream对象。

以上各项的相反就是简单请求。
参考：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

## withCredentials
如果你在a域发送了b域的请求，且b域设置了cookie信息，那么在a域会以b域的形式存储一份cookie，如果没有设定withCredentials或是credentials: ‘include’的话，就算服务器传了set-cookie也不会被写入。

在你请求b域的接口时，如果不设置withCredentials为true的话，请求依然会被跨域限制，而且此时服务器的返回头不能是`Access-Control-Allow-Origin: *` 必须指定相应的域名才行。

## npm config (备忘)
设置npm的registry
``` bash
# 淘宝镜像
npm config set registry https://registry.npm.taobao.org/
# 默认npm镜像
npm config set registry=http://registry.npmjs.org

# 当前登录的npm账号（注意要切换到默认npm镜像）
npm whoami
# 登录npm
npm login
# 发布npm
npm publish .
# 更新版本
npm version 0.1.1
```
npm README 不更新的解决方法：https://github.com/npm/registry/issues/42#issuecomment-243428303

## git 修改.gitignore文件后缓存问题
```bash
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```


