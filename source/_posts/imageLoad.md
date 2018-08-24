---
title: 图片预加载与懒加载
date: 2017-09-26 14:36:20
keywords: 图片, 预加载, 懒加载
tags: [图片, 预加载, 懒加载]
categories: [图片加载]
summary: 
---

我们在项目开发过程中，经常有预加载或者懒加载的需求，今天我们就来分析一下，图片预加载与懒加载。

## 图片的加载

我们可以通过多种方式来加载图片，比如：html中img标签，css中background以及js中的`new Image`等方式，今天我们的主要方式就是js中的`new Image`的方式。`new Image`的方式实际上等价于`document.createElement('img')`

先看下语法：
```javascript
Image(width, height)
```
width、height就是指定图片的宽高。

Image对象的实例有很多属性，其中比较常用的有：
width: 图片的渲染宽度
height: 图片的渲染高度
naturalWidth: 图片的实际宽度
naturalHeight: 图片的实际高度
complete: 只读属性，返回一个 Boolean 如果浏览器已经取出图像则返回true, 并且它是一个 supported image type,图像解码的过程中没有错误.

Image对象还有三个事件函数：
onabort: 当用户放弃图像的装载时调用的事件句柄。
onerror: 在装载图像的过程中发生错误时调用的事件句柄。
onload: 当图像装载完毕时调用的事件句柄。

## 实现一个简单的图片加载

有了以上Image的知识，我们来实现一个简单的图片加载就比较容易了。
首先你可以new 一个 Image对象，然后给Image对象添加src属性，然后就利用onload的事件函数就可以加载图片了。
```javascript
function loadImage(url, cb) {
    var image = new Image();
    image.onload = function() {
        console.log('图片加载完成了');
        cb && cb.call(image);
    }
    image.src = url;
    if (image.complete) {
        cb && cb.call(image);
        image.onload = null;
        return;
    }
}
loadImage('http://img6.bdstatic.com/img/image/pcindex/tongmengpctufanbingbing.jpg', function() {
    console.log('width: ', this.width);
    console.log('naturalWidth: ', this.naturalWidth);
});
```
这样一个简单的图片加载就完成了，当然这个方法是有局限性的，并不能支持多图加载，只能一张，有兴趣的话，可以自行改造一下，其实添加一个循环就可以了。

其实想说的并不是这种方式，这种方式想必大家都会，也不用我多说，哈哈哈！

## 高端玩法以及思考

这种方法不是我发明的，是从[这里](http://www.codeweblog.com/%E6%AF%94onload%E6%9B%B4%E5%BF%AB%E8%8E%B7%E5%8F%96%E5%9B%BE%E7%89%87%E5%B0%BA%E5%AF%B8/)学习来的。
[gist地址](https://gist.github.com/hehongwei44/5ab040cf3a8b27311d72)
```javascript
// 更新：
// 05.27: 1、保证回调执行顺序：error > ready > load；2、回调函数this指向img本身
// 04-02: 1、增加图片完全加载后的回调 2、提高性能

/**
 * 图片头数据加载就绪事件 - 更快获取图片尺寸
 * @version	2011.05.27
 * @author	TangBin（PS:我不是作者，我只是代码的搬运工）
 * @see		http://www.planeart.cn/?p=1121
 * @param	{String}	图片路径
 * @param	{Function}	尺寸就绪
 * @param	{Function}	加载完毕 (可选)
 * @param	{Function}	加载错误 (可选)
 * @example imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
		alert('size ready: width=' + this.width + '; height=' + this.height);
	});
 */
var imgReady = (function () {
  /*list用来存放onready的函数队列,intervalID用来存放定时器的引用*/
	var list = [], intervalId = null,

	// 用来执行队列
	tick = function () {
		var i = 0;
		for (; i < list.length; i++) {
		  /*end用来表示onready函数是否执行完必，splice用来删除队列中的项目*/
			list[i].end ? list.splice(i--, 1) : list[i]();
		};
		//队列全部执行完成后的清除工作。
		!list.length && stop();
	},

	// 停止所有定时器队列,释放内存中的引用
	stop = function () {
		clearInterval(intervalId);
		intervalId = null;
	};
  /**
  * 闭包
  * @param:url  图片的路径
  * @param:ready 图片尺寸就绪的回调函数
  * @param: load 图片加载完毕的回调函数
  * @param: err 图片加载出错的回调函数
  *
  */
	return function (url, ready, load, error) {
		var onready, width, height, newWidth, newHeight,
			  img = new Image();
		
		img.src = url;

		// 如果图片被缓存，则直接返回缓存数据
		if (img.complete) {
			ready.call(img);
			load && load.call(img);
			return;
		};
		
		width = img.width;
		height = img.height;
		
		// 加载错误后的事件
		img.onerror = function () {
			error && error.call(img);
			onready.end = true;
			img = img.onload = img.onerror = null;
		};
		
		// 图片尺寸就绪
		onready = function () {
			newWidth = img.width;
			newHeight = img.height;
			if (newWidth !== width || newHeight !== height ||
				// 如果图片已经在其他地方加载可使用面积检测
				newWidth * newHeight > 1024
			) {
				ready.call(img);
				onready.end = true;
			};
		};
		onready();
		
		// 完全加载完毕的事件
		img.onload = function () {
			// onload在定时器时间差范围内可能比onready快
			// 这里进行检查并保证onready优先执行
			!onready.end && onready();
		
			load && load.call(img);
			
			// IE gif动画会循环执行onload，置空onload即可
			img = img.onload = img.onerror = null;
		};

		// 加入队列中定期执行
		if (!onready.end) {
			list.push(onready);
			// 无论何时只允许出现一个定时器，减少浏览器性能损耗
			if (intervalId === null) intervalId = setInterval(tick, 40);
		};
	};
})();
```
这段代码在社区中感觉存在的挺多的，在各种图预加载中被使用，据说是腾讯大牛写的。这段代码的精妙之处在于制作了一个定时器，并在定时器内对图片进行了面积检测，当检测到宽高积大于某个值的时候，就认为图片尺寸准备好了，相应的就会触发ready方法。

```javascript
onready = function () {
    newWidth = img.width;
    newHeight = img.height;
    if (newWidth !== width || newHeight !== height ||
        // 如果图片已经在其他地方加载可使用面积检测
        newWidth * newHeight > 1024
    ) {
        ready.call(img);
        onready.end = true;
    };
};
```
面积检测的逻辑就在这段代码中，至于为什么是1024，可能是程序员的执着吧，哈哈哈！ 

这个想法我个人还是很佩服的，大神就是大神。

但是，这里想要说明一下的是：
虽然上述例子中推荐的方法是这样的：
```javascript
imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
    alert('size ready: width=' + this.width + '; height=' + this.height);
});
```
但是 这种方式作者的意图在于能够比onload更提前的获取到图片的尺寸值，而不是完全加载完图片，完全加载完图片还是需要在load函数中调用，像这样：
```javascript
imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function(){},function () {
    alert('size ready: width=' + this.width + '; height=' + this.height);
});
```

两种方式都可以，但是还是需要结合自己的业务场景来使用，比如，上述代码使用到商品列表中，个人建议使用第一种方式即传入ready函数，但是如果你是h5的小游戏，需要提前加载图片资源的话，个人建议使用第二种方式即传入load函数，ready可以传入一个空函数，或者你也可以改造一下上述代码，使得ready可以传null。

## 改造成可以传入图片数组的方式
创建一个js文件，名叫：imageLoad.js
```javascript
var imgReady = (function () {
    var list = [], intervalId = null,

    // 用来执行队列
    tick = function () {
        var i = 0;
        for (; i < list.length; i++) {
            list[i].end ? list.splice(i--, 1) : list[i]();
        }
        !list.length && stop();
    },

    // 停止所有定时器队列
    stop = function () {
        clearInterval(intervalId);
        intervalId = null;
    };

    return function (url, ready, load, error) {
        var onready, width, height, newWidth, newHeight,
            img = new Image();

        img.src = url;

        // 如果图片被缓存，则直接返回缓存数据
        if (img.complete) {
            ready.call(img);
            load && load.call(img);
            return;
        }
        ;

        width = img.width;
        height = img.height;

        // 加载错误后的事件
        img.onerror = function () {
            error && error.call(img);
            onready.end = true;
            img = img.onload = img.onerror = null;
        };

        // 图片尺寸就绪
        onready = function () {
            newWidth = img.width;
            newHeight = img.height;
            if (newWidth !== width || newHeight !== height ||
                // 如果图片已经在其他地方加载可使用面积检测
                newWidth * newHeight > 1024
                ) {
                ready && ready.call(img);
                onready.end = true;
            }
        };
        onready();

        // 完全加载完毕的事件
        img.onload = function () {
            // onload在定时器时间差范围内可能比onready快
            // 这里进行检查并保证onready优先执行
            !onready.end && onready();

            load && load.call(img);

            // IE gif动画会循环执行onload，置空onload即可
            img = img.onload = img.onerror = null;
        };

        // 加入队列中定期执行
        if (!onready.end) {
            list.push(onready);
            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
            if (intervalId === null) intervalId = setInterval(tick, 40);
        }
        ;
    };
})();
// 导出一个对象
export default {
	/**
	* 加载函数
	* @param: imgs  图片的路径的数组
	* @param: onComplete 所有图片都加载过的回调
	* @param: onReady 每张图片可以获取大小时候的回调
	* @param: isReady 是否启用ready函数，默认false。如果此值传true，那么onReady会在每张图能够获取到尺寸的时候触发；如果传false或者不传，onReady会在每张图loaded的时候触发
	*/
    load:function(imgs, onComplete, onReady, isReady) {
        var onComplete = onComplete || function(count,imgs){};
        var onReady = onReady || function(i,img){};
		var tmpFunc = function() {};
        var isReady = isReady || false;
        var loaded = 0;
        var error = 0;
        for(var i = 0; i < imgs.length; i++){
            (function(n){
                var n = n;
				var loadFunc = function(){
					++loaded;
					onReady && onReady(n, imgs[n], this);
					if(loaded + error >= imgs.length){
						onComplete && onComplete(loaded,imgs);
					}
				}
                imgReady(imgs[n],
					isReady ? loadFunc : tmpFunc,
					isReady ? tmpFunc : loadFunc,
					function(){
						++ error;
						if(error + loaded >= imgs.length) {
							onComplete && onComplete(loaded,imgs);
						}
                	}
				);
            })(i);

        }
    }
}
```
调用方式
```javascript
import imgLoad from 'imageLoad.js';

imgLoad.load(['http://img6.bdstatic.com/img/image/pcindex/tongmengpctufanbingbing.jpg'],null, function(index,url,img) {
	console.log(index, url);
	alert('size ready: width=' + img.width + '; height=' + img.height);
},true);
```
这样我们就可以一次加载多张图片了。

## 图片预加载
预加载的话其实已经没有什么可说的了，使用上述方法在图片展示之前加载图片就好。

## 图片懒加载

图片懒加载的方式可以说和上述内容就没有太多关系了。

图片懒加载的技术点主要在：监听页面滚动、判断元素是否出现在屏幕内。

### 监听页面滚动

监听页面滚动只需要`window.addEventListener('scroll', function() {})`就可以了。但是这个过程是可以优化的。
具体怎么优化呢？我们就需要用到：节流。 概念可以查看[这里](http://happybug.top/2017/10/10/debounce-throttle/)

### 判断元素是否出现在屏幕内

1、通过scrollTop来判断
```javascript
var ele = document.getElementById('img');
if (ele.offsetTop - document.documentElement.scrollTop < document.documentElement.clientHeight) {
    // 这里元素就在可视区域内
}
```
2、getBoundingClientRect()
getBoundingClientRect用于获取页面中某个元素相对于浏览器可视范围的上、右、下、左的距离。

<div class="tip">注意：这个方法获取的距离是相对于浏览器左边界和上边界的。如下图所示</div>
![https://mdn.mozillademos.org/files/15087/rect.png](https://mdn.mozillademos.org/files/15087/rect.png)

这个方法的兼容性还是很好的，在大多数的浏览器下至少会返回6个参数：top,right,bottom,left,width,height(IE 下没有width、height属性)。
IE没有宽度高度属性，如果你需要用IE下用到这个方法的话，可以利用`getBoundingClientRect().right-getBoundingClientRect().left`的方式来获取宽度，高度只需用bottom减去top就可以了。
那么我们同样可以利用这个方法来判断元素是否出现在屏幕内。
```javascript
// 是否进入到屏幕内（只判断了垂直方向）
function isIntoViewport(ele) {
    var rect = ele.getBoundingClientRect();
    var clientHeight = document.documentElement.clientHeight;
    return ele.top >= 0 && ele.top <= clientHeight;
}
```
以上方法可能和你在其他地方看到的思路不一样，是因为我们在这里的应用场景是判断元素进入到页面的时候，而不是元素完全在页面内。

3、IntersectionObserver

这个API的兼容性不是很好，具体可以查看[这里](http://caniuse.com/#search=intersection)
你可以像这样初始化一个IntersectionObserver
```javascript
// 初始化某个元素
var observer = new IntersectionObserver(function(entries) {
    console.log(entries);
}, {
    root: null,
    threshold: [0, 0.5, 1],
    rootMargin: "50px 0px"
});
var ele = document.getElementById('img');
// 开始观察某个元素，一个observer可以观察多个element
observer.observe(ele);
// 停止观察
observer.unobserve(ele);
// 关闭观察器
observer.disconnect();
```
IntersectionObserver 接收两个参数：
`callback`: 回调函数，该回调函数接收一个参数entries，这个参数是个数组，当前的oserver监听几个元素，这个数组的长度就是几。
        entries中的每一个元素都是一个IntersectionObserverEntry对象，大概长这样：
```json
{
    time: 3893.92,
    rootBounds: ClientRect {
        bottom: 920,
        height: 1024,
        left: 0,
        right: 1024,
        top: 0,
        width: 920
    },
    boundingClientRect: ClientRect {
        // ...
    },
    intersectionRect: ClientRect {
        // ...
    },
    intersectionRatio: 0.54,
    target: element
}
```
每个属性的含义如下：
```html
time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
target：被观察的目标元素，是一个 DOM 节点对象
rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null
boundingClientRect：目标元素的矩形区域的信息
intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
intersectionRatio：目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0
```

`options`: 这个参数是一个对象，可能的参数有：

`threshold`: 数组，默认[0]，数组中参数形式都是0-1之间的小数，表示元素的可见范围。这个参数用于规定当前元素在可见多少范围时可见触发回调，例如传入[0,0.25,0.5,0.75,1]时，表示当前元素0%，25%，50%,75%,100%可见时，会触发回调函数。

`root`: Element类型的元素，如：document.querySelector('#img')， 指定目标元素所在的容器节点（即根元素）。注意，容器元素必须是目标元素的祖先节点。

`rootMargin`: 用来扩展或缩小rootBounds这个矩形的大小，从而影响intersectionRect交叉区域的大小。它使用CSS的定义方法，比如10px 20px 30px 40px，表示 top、right、bottom 和 left 四个方向的值。

所以如果用IntersectionObserver来判断元素是否出现在屏幕内的话：
```javascript
var observer = new IntersectionObserver(function(entries) {
    console.log('将要进入屏幕内');
    // 可以在这里循环entries判断是否是ele元素，并停止该元素的observer
})
var ele = document.getElementById('img');
observer.observe(ele);
```
[这里](https://github.com/ApoorvSaxena/lozad.js)有一个完全利用IntersectionObserver API实现的懒加载的库，有兴趣的可以阅读下。

本来想自己实现一个图片懒加载的，后来想想没必要造那么多轮子，何况自己写的确实不如人家写的好，就不献丑了。这个放一个我时常用的一个懒加载的库：[https://github.com/toddmotto/echo](https://github.com/toddmotto/echo)

参考：
[比onload更快获取图片尺寸](http://www.codeweblog.com/%E6%AF%94onload%E6%9B%B4%E5%BF%AB%E8%8E%B7%E5%8F%96%E5%9B%BE%E7%89%87%E5%B0%BA%E5%AF%B8/)
[IntersectionObserver API 使用教程](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)