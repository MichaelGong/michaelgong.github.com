# Application Cache
`这是一个坑！！！建议不要轻易使用在生产环境中，如果一定要使用，请做深入研究后再使用。`

## Application Cache 是干什么的？
Application Cache是HTML5的新特性，允许浏览器在本地存储页面所需要的资源，说白了就是在本地进行资源缓存。

## Application Cache 的用法
用法其实很简单：

1、需要在你的`html`标签上`manifest`标签，形式如下：
```html
<!Doctype html>
<html manifest="cache.manifest">
<htm>
```
`manifest`标签内是一个相对路径上的一个文件，也就是说这个`cache.manifest`和你当前的html文件在同一个目录下。

`manifest`标签内的文件名可以是`xx.xxx`的形式，逗号后面的`xxx`一般来讲会写成`appcache`,名字比较直观。
但是无论你写成什么样子的都需要注意在服务器上配置这个类型的文件的`MIME-type`，将其设置为`text/cache-manifest`,
比如，在 Apache 服务器上，若要设置`.appcache`文件的 MIME 类型，可以向根目录或应用的同级目录下的一个
`.htaccess` 文件中增加 `AddType text/cache-manifest .appcache` 。

2、创建`cache.manifest`文件

第一步中已经说过了，这个文件是按照相对路径来的，所以要把它创建在它所在的html的同一目录下。

一个标准的清单文件大致是这样的：
```js
CACHE MANIFEST
# version 1.0.0
CACHE:
./js/main.js


NETWORK:
./js/network.js

FALLBACK:
/ fallback.html
```
第一行的`CACHE MANIFEST`是固定的，第一行必须是这个，后面的`#`符号代表本行是注释，

`CACHE:`后面的内容表示需要缓存的内容

`NETWORK:`后面的内容表示需要进行网络请求的内容，此处可以是用通配符`*`

`FALLBACK:`这个字段有点类似map类型，有key和value，key在前，value在后，表示当key无法请求的时候，浏览器会展示
value对应的内容，可以使用通配符，但是路径都是相对路径

Application Cache还有一些API，首先你要获取到Application对象
```js
var appCacahe = window.applicationCache
```
然后Application Cache提供了很多监听事件，比如：
```js
appCacahe.addEventListener('updateready',function(){
    if(appCacahe.status == appCacahe.UPDATEREADY){
        appCacahe.swapCache();
        window.location.reload();
    }
},false);
appCacahe.addEventListener('obsolete',appCacheError);
appCacahe.addEventListener('error',appCacheError);
function appCacheError(){
    //更新错误
    window.location.href='./test.html';
}
```
上面就是可以手动更新你页面的manifest文件的方法。

下面是applicationCache的属性及相关说明：

`checking` ： 用户代理检查更新或者在第一次尝试下载manifest文件的时候，本事件往往是事件队列中第一个被触发的

`noupdate` ： 检测出manifest文件没有更新

`downloading` ：用户代理发现更新并且正在取资源，或者第一次下载manifest文件列表中列举的资源

`progress` ：用户代理正在下载资源manifest文件中的需要缓存的资源

`cached` ：manifest中列举的资源已经下载完成，并且已经缓存

`updateready`：manifest中列举的文件已经重新下载并更新成功，接下来js可以使用swapCache()方法更新到应用程序中

`obsolete`：manifest的请求出现404或者410错误，应用程序缓存被取消

`error`：manifest的请求出现404或者410错误，更新缓存的请求失败、manifest文件没有改变，但是页面引用的manifest文件没有被正确地下载、
         在取manifest列举的资源的过程中发生致命的错误、在更新过程中manifest文件发生变化，，如果发生上述情况就会触发这个事件

以上是可以用于监听的事件，下面是对应的各种属性，属性是跟着上面的事件变化而变化的。

`applicationCache.UNCACHED` : 未缓存

`applicationCache.IDLE` : 闲置

`applicationCache.CHECKING` : 检查中

`applicationCache.DOWNLOADING` : 下载中

`applicationCache.UPDATEREADY` : 已更新

`applicationCache.OBSOLETE` : 失效

## Application Cache 的坑
之所以一开始就强调说，要慎用，是因为它是有很多坑的。

1、Manifest的缓存机制是这样的：在页面基本加载完毕后才会去更新Manifest，这个时候用户看到的页面仍然是你之前
的页面，所以在你的js代码中就需要监听Manifest的更新状态，当检测到文件已更新的时候，就需要location.reload()来
重新加载页面（可以利用上面提到的代码）。注意：Manifest内的注释修改也被认为是修改了Manifest

2、这个要感谢我们伟大的电信运营商们，他们竟然会在你的代码中进行广告劫持，所以，嘿嘿，在某些情况下，你的用户有可能
缓存了运营商的广告，只要你的Manifest文件没有修改，那么用户打开看到的都是广告！！！！！

3、Manifest所在的html文件，也会被缓存下来。所以在你更新了你的Html文件之后，还需要修改Manifest文件或者Manifest
的文件名（哪怕只修改了注释），然后就可以利用第一条的那个方法（~~~~(>_<)~~~~更新个html未免也太过麻烦了）

4、容量限制，一般情况下，容量大小限制为5M，虽然有些浏览器会多一些，但是我们只能按照最少的算。这个一般情况下是足够了，
但是如果缓存容量多大，就会导致整个Manifest文件中的所有文件都缓存失败，所以请注意文件大小。

5、一些Manifest察觉不到的改变：你修改了css、js、image，这些Manifest都无法察觉到这些修改，所以这个时候你仍然需要
修改Manifest文件(可以只改个注释的版本号)

6、兼容性问题：移动端兼容性还好，但是pc端IE10以后才支持

7、网上有说可以通过iframe来避免一些问题，然而测试过后，并没有什么用啊。
