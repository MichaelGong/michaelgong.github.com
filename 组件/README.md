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
    此方法模拟js中的alert的功能，样式与ios中alert的演示类似
    * title 标题，可不传，默认为‘提示’
    * content 内容
    * cb 点击确定后的回调函数，不传时，点击确定弹出框消失
> 此方法可以参数数量可选：<br>
1个参数：默认当做content处理
2个参数：
