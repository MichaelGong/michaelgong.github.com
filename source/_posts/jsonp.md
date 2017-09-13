---
title: 跨域请求之JSONP
date: 2017-09-12 21:35:05
tags: [jsonp, 前端, 跨域]
keywords: jsonp, 前端, 跨域
---

## 跨域

由于浏览器的`同源策略`使得浏览器在一个的域名下访问另外一个域名的接口时，会自动拦截接口请求，主要是浏览器处于安全性考虑做了限制。

那么什么情况才是跨域呢？<div class="tip" style="margin:0;">只要协议、域名、端口号三者中有一个不同，就被认为是跨域。</div>
比如以下几个域名之间都是跨域的关系：
http://a.com
https://a.com
http://a.com:8181
http://b.a.com

http://a.com/a/b.js 与 http://a.com/b/b.js 他们之间不存在跨域关系

解决跨域的方式有很多种，比如JSONP、CORS、iframe、postMessage等方式，今天主要介绍一下JSONP的方式。

## JSONP
百度百科对JSONP的解释为：
> JSONP(JSON with Padding)是JSON的一种“使用模式”，可用于解决主流浏览器的跨域数据访问的问题。由于同源策略，一般来说位于 server1.example.com 的网页无法与不是 server1.example.com的服务器沟通，而 HTML 的script 元素是一个例外。利用 script 元素的这个开放策略，网页可以得到从其他来源动态产生的 JSON 资料，而这种使用模式就是所谓的 JSONP。用 JSONP 抓到的资料并不是 JSON，而是任意的JavaScript，用 JavaScript 直译器执行而不是用 JSON 解析器解析。

JSONP的主要原理就是利用了浏览器的`script`标签进行网络请求，主要的流程如下：
> * 1、根据请求的接口地址以及参数，生成一个链接，这个链接需要添加一个特定的参数用于后台识别，比如callback=jsonp123，callback是固定的，jsonp123是动态的。
> * 2、使用上述url创建一个script标签，并创建一个window.jsonp123的函数，这个函数接受一个参数，用于接受服务端返回的数据
> * 3、服务端在接受到上传script请求后，解析url中的callback，返回一段js，这段js直接调用的window.jsonp123，并把返回结果传入到该函数中
> * 4、在window.jsonp123执行完毕后把刚刚创建的scrip标签删除

<div class="tip">对于上述1中的`callback=jsonp123`中的callback是可以变动的，你也可以写成`cb=jsonp123`，但是无论你写成什么都需要和服务端的同事协商好，因为服务端需要得到前端定义的方法名，才能正确的进行上述3的步骤。</div>

## 实现一个JSONP方法
以下方法的实现来自[JSONP原理及简单实现](http://www.travisup.com/post/index/28)

以下是一个JSONP的完整实现：
```javascript
var JSONP = {
    // 获取当前时间戳
    now: function() {
        return (new Date()).getTime();
    },
    // 获取16位随机数
    rand: function() {
        return Math.random().toString().substr(2);
    },
    // 删除节点元素
    removeElem: function(elem) {
        var parent = elem.parentNode;
        if(parent && parent.nodeType !== 11) {
            parent.removeChild(elem);
        }
    },
    // url组装
    parseData: function(data) {
        var ret = "";
        if(typeof data === "string") {
            ret = data;
        }
        else if(typeof data === "object") {
            for(var key in data) {
                ret += "&" + key + "=" + encodeURIComponent(data[key]);
            }
        }
        // 加个时间戳，防止缓存
        ret += "&_time=" + this.now();
        ret = ret.substr(1);
        return ret;
    },
    getJSON: function(url, data, func) {
        // 函数名称
        var name;
        // 拼装url
        url = url + (url.indexOf("?") === -1 ? "?" : "&") + this.parseData(data);
        // 检测callback的函数名是否已经定义
        var match = /callback=(\w+)/.exec(url);
        if(match && match[1]) {
            name = match[1];
        } else {
            // 如果未定义函数名的话随机成一个函数名
            // 随机生成的函数名通过时间戳拼16位随机数的方式，重名的概率基本为0
            // 如:jsonp_1355750852040_8260732076596469
            name = "jsonp_" + this.now() + '_' + this.rand();
            if (url.indexOf("callback=?")>-1) {
                // 把callback中的?替换成函数名
                url = url.replace("callback=?", "callback="+name);
                // 处理?被encode的情况
                url = url.replace("callback=%3F", "callback="+name);
            } else {
                url = url + "callback="+name;
            }
            
        }
        // 创建一个script元素
        var script = document.createElement("script");
        script.type = "text/javascript";
        // 设置要远程的url
        script.src = url;
        // 设置id，为了后面可以删除这个元素
        script.id = "id_" + name;
        
        // 把传进来的函数重新组装，并把它设置为全局函数，远程就是调用这个函数
        window[name] = function(json) {
            // 执行这个函数后，要销毁这个函数
            window[name] = undefined;
            // 获取这个script的元素
            var elem = document.getElementById("id_" + name);
            // 删除head里面插入的script，这三步都是为了不影响污染整个DOM啊
            JSONP.removeElem(elem);
            // 执行传入的的函数
            func(json);
        };
        // 在head里面插入script元素
        var head = document.getElementsByTagName("head");
        if(head && head[0]) {
            head[0].appendChild(script);
        }
    }
};
```



