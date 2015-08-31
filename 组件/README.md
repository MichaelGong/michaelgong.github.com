# 文件说明
> js文件包含两个文件 `one.js` 和 `onenozepto.js`,其中`one.js`中包含zepto，`onenozepto.js`中不包含zepto，这是两个文件的唯一区别。
所以在项目中只需要引用这两个文件中的一个即可。建议，在项目中需要使用的jQuery的时候，引用`onenozepto.js`，否则引用`one.js`就好

此文件中除了zepto.js之外，还有其他文件，artTemplate.js(模板引擎)、require.js等内容。

# 文档API
## M.version / M.v
文件版本：0.1
## M.touch
自动判断当前状态是否支持touch事件，如果支持赋值为`touchend`,如果不支持赋值为`click`
## M.APIBASE
ajax请求的基础地址
## M.os
判断当前系统是什么系统以及系统版本等等

```html
    android格式:{android: true, version: "4.4.4", tablet: false, phone: true}
    ios格式：{iphone: true, ios: true, version: "7.0", tablet: false, phone: true}
```
## M.isAndroid()
判断当前系统是否是Android
## M.isIphone()
判断当前系统是否是iphone
## M.isIos()
判断当前系统是否是ios
## M.checkOS()
返回当前系统名字的字符串
## M.random(min,max)
返回min到max之间的随机数，包括min和max
## M.register(key,obj)
    将插件注册到M对象下
## M.alert(title,content,cb)
此方法模拟js中的alert的功能，样式与ios中alert的样式类似

* title 标题，可不传，默认为‘提示’
* content 内容
* cb 点击确定后的回调函数，不传时，点击确定弹出框消失
> 此方法参数数量可选：<br>
1个参数：默认当做content处理
2个参数：第一个参数为content，第二个参数为cb

## M.confrim(title,content,okCb,cancelCb)
    此方法模拟js中的confrim的功能，样式与ios中的confirm的样式类似
    * title 标题，不传默认为‘提示’
    * content 内容
    * okCb 点击确定按钮的回调 ，不传时点击弹出框消失
    * cancelCb 点击取消按钮的回调 ，不传时点击弹出框消失
> 此方法title可不传，此时 第一个参数为content,第二个参数为okCb，以此类推

## M.showToast(text,duration,isControl)
    此方法模拟Android中的toast提示功能，默认状态下展示2s后，自动消失
    * text 需要展示的文字
    * duration 持续时间，默认2s
    * isControl 布尔值，默认为false，如果为true，则需要手动调用M.hideToast才能关闭toast
## M.hideToast()
    关闭toast
## M.actionSheet(arr,cancelCb)
    此方法模拟ios中的actionsheet
[actionSheet长这样](http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=actionsheet&step_word=&pn=31&spn=0&di=7503544760&pi=&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=2673508320%2C804144218&os=317200336%2C438899745&adpicid=0&ln=1290&fr=&fmq=1441008973299_R&ic=undefined&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=11&objurl=http%3A%2F%2Fupload-images.jianshu.io%2Fupload_images%2F73313-8197973ec42f1f92.png%3FimageMogr2%2Fauto-orient%2Fstrip%7CimageView2%2F2&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bp7tv55s_z%26e3Bv54AzdH3Fw6ptvsjfAzdH3FVFR0njE&gsm=0)
    * arr 数组，形式如下：[{text:'需要展示的文字',handler:function(){}}],handler表示点击相应item的回调函数
    * cancelCb 取消按钮点击的回调函数，不传默认会关闭actionsheet

## M.imgpreload(imgs,onComplete,onReady)
    * imgs 数组，需要预加载的图片数组
    * onComplete 图片加载完成后的回调，带两个参数count：成功加载图片数量 imgs：原图片数组
    * onReady  每张图片加载完成后都会执行的回调

## M.ajax(options,ispost)
    ajax请求，支持跨域，具体用法同jquery或者zepto中的ajax方法

## M.getUrlParam(url)
    获取url中带有的参数
    * url 需要处理的url，不传默认取当前页面的url
## M.setCookie(name, value, expire_days)
    设置cookie
## M.getCookie(name)
    获取cookie
## M.delCookie(name)
    删除cookie
