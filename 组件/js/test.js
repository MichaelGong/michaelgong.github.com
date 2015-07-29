/**
 * Created by Administrator on 2015/6/10.
 */
var MHJ = {
    client : {
        name:null,
        version:null,
        ua : navigator.userAgent.toLowerCase(),
        setClient : function(name,ver){
            console.log(name + ver);
            this.name = name;
            this.version = ver;
        },
        checkClient : function(){
            var me = this;
            (s = me.ua.match(/windows ([\d.]+)/)) ? me.setClient("win", me.toFixedVersion(s[1])) :
                (s = me.ua.match(/windows nt ([\d.]+)/)) ? me.setClient("win", me.toFixedVersion(s[1])) :
                    (s = me.ua.match(/linux ([\d.]+)/)) ? me.setClient("linux", me.toFixedVersion(s[1])) :
                        (s = me.ua.match(/mac ([\d.]+)/)) ? me.setClient("mac", me.toFixedVersion(s[1])) :
                            (s = me.ua.match(/ipod ([\d.]+)/)) ? me.setClient("iPod", me.toFixedVersion(s[1])) :
                                (s = me.ua.match(/ipad[\D]*os ([\d_]+)/)) ? me.setClient("iPad", me.toFixedVersion(s[1])) :
                                    (s = me.ua.match(/iphone[\D]*os ([\d_]+)/)) ? me.setClient("iPhone", me.toFixedVersion(s[1])) :
                                        (s = me.ua.match(/android ([\d.]+)/)) ? me.setClient("android", me.toFixedVersion(s[1])) : 0;
        },
        toFixedVersion : function(ver, floatLength) {
            ver = ("" + ver).replace(/_/g, ".");
            floatLength = floatLength || 1;
            ver = String(ver).split(".");
            ver = ver[0] + "." + (ver[1] || "0");
            ver = Number(ver).toFixed(floatLength);
            return ver;
        },
        isIPhone : function(){
            return this.name.toLowerCase() == 'iphone';
        },
        isAndroid : function(){
            return this.name.toLowerCase() == 'android';
        }
    },
    loading : function(){
        this.loadingDefault();
    },
    loadingDefault : function(){
        //insertAdjacentHTML兼容性写法：http://www.css88.com/archives/5040
        var str = '<section id="M-loading" class="M-pop wh-100 zoom ">' +
                    '<div class="mpop">' +
                        '<div class="box box-center box-v wh-100">' +
                            '<div class="ball-clip-rotate-multiple">' +
                                '<div></div>' +
                                '<div></div>' +
                            '</div>' +
                            '<div class="m-t-15 c-fff">正在加载数据...</div>' +
                        '</div>' +
                    '</div>' +
                   '</section>';
        var _dom = document.getElementById('M-loading');
        _dom ? (_dom.style.display == 'block' ? '' : _dom.style.display = 'block') : document.body.insertAdjacentHTML('beforeEnd',str);
        _dom = null;
    },
    loadingHide : function(){
        var _dom = document.getElementById('M-loading');
        _dom ? (_dom.style.display == 'none' ? '' : _dom.style.display = 'none') : '';
        _dom = null;
        this.loadingPerHide();
    },
    loadingPer : function(num){
        var str = '<section id="M-loading-per" class="M_loading zoom">' +
                        '<div class="M_loading_clip">' +
                            '<div class="M_loading_bar"></div>' +
                        '</div>' +
                        '<div class="M_percent" id="M-percent">0%</div>' +
                  '</section>';
        var num = num ? num : 0;
        var _dom = document.getElementById('M-loading-per');
        _dom ? (_dom.style.display == 'block' ? '' : _dom.style.display = 'block') : document.body.insertAdjacentHTML('beforeEnd',str);
        var _perDom = document.getElementById('M-percent');
        _perDom.innerHTML = num + '%';
        if(num==100){
            this.loadingHide();
        }
        _dom = null;
    },
    loadingPerHide : function(){
        var _dom = document.getElementById('M-loading-per');
        _dom ? (_dom.style.display == 'none' ? '' : _dom.style.display = 'none') : '';
        _dom = null;
    },
    preloadimg : function(imgs,onComplete,onReady){
        var me = this;
        me.loadingPer();
        var onComplete = onComplete || function(count,imgs){};
        var onReady = onReady || function(i,img){};

        var loaded = 0;
        var error = 0;
        for(var i = 0; i < imgs.length; i++){
            (function(n){
                var n = n;
                me.imgReady(imgs[n],function(){
                    ++loaded;
                    onReady && onReady(n,imgs[n]);
                    me.loadingPer(((loaded+error)/imgs.length)*100);
                    if(loaded + error >= imgs.length){
                        onComplete && onComplete(loaded,imgs);
                    }
                },null,function(){
                    ++ error;
                    if(error + loaded >= imgs.length) {
                        onComplete && onComplete(loaded,imgs);
                    }
                });
            })(i);

        }
    },
    imgReady : (function(){
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
            var onready, width, height, newWidth, newHeight, img = new Image();

            img.src = url;

            // 如果图片被缓存，则直接返回缓存数据
            if (img.complete) {
                ready.call(img);
                load && load.call(img);
                return;
            }
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
        };
    })(),
    /**
     * 产生随机数，例如：生成0-9之间的数（包括0，包括9） random(0,9)
     * @param min
     * @param max
     * @returns {number}
     */
    random : function(min,max){
        return Math.floor(min + Math.random() * (max - min + 1));
    }
};

MHJ.client.checkClient();

//requestAnimationFrame、cancelAnimationFrame
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());
