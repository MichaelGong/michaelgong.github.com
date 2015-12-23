/**
 * Created by GH on 2015/7/29.
 */
var APIBASE = 'http://lppz.letwx.com/api/jsapi';
//tap事件
(function( window ) {
    var Tap = {};

    var utils = {};

    utils.attachEvent = function(element, eventName, callback) {
        if ('addEventListener' in window) {
            return element.addEventListener(eventName, callback, false);
        }
    };

    utils.fireFakeEvent = function(e, eventName) {
        if (document.createEvent) {
            return e.target.dispatchEvent(utils.createEvent(eventName));
        }
    };

    utils.createEvent = function(name) {
        if (document.createEvent) {
            var evnt = window.document.createEvent('HTMLEvents');

            evnt.initEvent(name, true, true);
            evnt.eventName = name;

            return evnt;
        }
    };

    utils.getRealEvent = function(e) {
        if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length) {
            return e.originalEvent.touches[0];
        } else if (e.touches && e.touches.length) {
            return e.touches[0];
        }

        return e;
    };

    var eventMatrix = [{
        // Touchable devices
        test: ('propertyIsEnumerable' in window || 'hasOwnProperty' in document) && (window.propertyIsEnumerable('ontouchstart') || document.hasOwnProperty('ontouchstart')),
        events: {
            start: 'touchstart',
            move: 'touchmove',
            end: 'touchend'
        }
    }, {
        // IE10
        test: window.navigator.msPointerEnabled,
        events: {
            start: 'MSPointerDown',
            move: 'MSPointerMove',
            end: 'MSPointerUp'
        }
    }, {
        // Modern device agnostic web
        test: window.navigator.pointerEnabled,
        events: {
            start: 'pointerdown',
            move: 'pointermove',
            end: 'pointerup'
        }
    }];

    Tap.options = {
        eventName: 'tap',
        fingerMaxOffset: 11
    };

    var attachDeviceEvent, init, handlers, deviceEvents,
        coords = {};

    attachDeviceEvent = function(eventName) {
        return utils.attachEvent(document.documentElement, deviceEvents[eventName], handlers[eventName]);
    };

    handlers = {
        start: function(e) {
            e = utils.getRealEvent(e);

            coords.start = [e.pageX, e.pageY];
            coords.offset = [0, 0];
        },

        move: function(e) {
            if (!coords.start && !coords.move) {
                return false;
            }

            e = utils.getRealEvent(e);

            coords.move = [e.pageX, e.pageY];
            coords.offset = [
                Math.abs(coords.move[0] - coords.start[0]),
                Math.abs(coords.move[1] - coords.start[1])
            ];
        },

        end: function(e) {
            e = utils.getRealEvent(e);

            if (coords.offset[0] < Tap.options.fingerMaxOffset && coords.offset[1] < Tap.options.fingerMaxOffset && !utils.fireFakeEvent(e, Tap.options.eventName)) {
                // Windows Phone 8.0 trigger `click` after `pointerup` firing
                // #16 https://github.com/pukhalski/tap/issues/16
                if (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) {
                    var preventDefault = function(clickEvent) {
                        clickEvent.preventDefault();
                        e.target.removeEventListener('click', preventDefault);
                    };

                    e.target.addEventListener('click', preventDefault, false);
                }

                e.preventDefault();
            }

            coords = {};
        },

        click: function(e) {
            if (!utils.fireFakeEvent(e, Tap.options.eventName)) {
                return e.preventDefault();
            }
        },

        emulatedTap: function( e ) {
            if ( coords.offset ) {
                utils.fireFakeEvent( e, Tap.options.eventName );
            }

            return e.preventDefault();
        }
    };

    init = function() {
        var i = 0;

        for (; i < eventMatrix.length; i++) {
            if (eventMatrix[i].test) {
                deviceEvents = eventMatrix[i].events;

                attachDeviceEvent('start');
                attachDeviceEvent('move');
                attachDeviceEvent('end');
                utils.attachEvent(document.documentElement, 'click', handlers['emulatedTap']);

                return false;
            }
        }

        return utils.attachEvent(document.documentElement, 'click', handlers.click);
    };

    utils.attachEvent(window, 'load', init);

    if (typeof define === 'function' && define.amd) {
        define(function() {
            init();

            return Tap;
        });
    } else {
        window.Tap = Tap;
    }

})( window );
//M对象
(function(window){
    /**
     * 全局M对象，声明了版本
     * @constructor
     */
    var M =(function(){
        var _M = function(){
            this.version = '0.1';
            this.v = this.version;
            this.touch = ('ontouchstart' in window)?'tap':'click';
            this.loadingID = 'M-loading';
            this.APIBASE = APIBASE;
            /**
             * 获取当前系统和版本
             * android格式:{android: true, version: "4.4.4", tablet: false, phone: true}
             * ios格式：{iphone: true, ios: true, version: "7.0", tablet: false, phone: true}
             */
            this.detect = function(ua, platform){
                var os = {}, browser = this.browser = {},
                    webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
                    android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
                    osx = !!ua.match(/\(Macintosh\; Intel /),
                    ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
                    ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
                    iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
                    webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
                    win = /Win\d{2}|Windows/.test(platform),
                    wp = ua.match(/Windows Phone ([\d.]+)/),
                    touchpad = webos && ua.match(/TouchPad/),
                    kindle = ua.match(/Kindle\/([\d.]+)/),
                    silk = ua.match(/Silk\/([\d._]+)/),
                    blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
                    bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
                    rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
                    playbook = ua.match(/PlayBook/),
                    chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
                    firefox = ua.match(/Firefox\/([\d.]+)/),
                    firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
                    ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
                    webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
                    safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)

                if (browser.webkit = !!webkit) browser.version = webkit[1]

                if (android) os.android = true, os.version = android[2]
                if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
                if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
                if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
                if (wp) os.wp = true, os.version = wp[1]
                if (webos) os.webos = true, os.version = webos[2]
                if (touchpad) os.touchpad = true
                if (blackberry) os.blackberry = true, os.version = blackberry[2]
                if (bb10) os.bb10 = true, os.version = bb10[2]
                if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
                if (playbook) browser.playbook = true
                if (kindle) os.kindle = true, os.version = kindle[1]
                if (silk) browser.silk = true, browser.version = silk[1]
                if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
                if (chrome) browser.chrome = true, browser.version = chrome[1]
                if (firefox) browser.firefox = true, browser.version = firefox[1]
                if (firefoxos) os.firefoxos = true, os.version = firefoxos[1]
                if (ie) browser.ie = true, browser.version = ie[1]
                if (safari && (osx || os.ios || win)) {
                    browser.safari = true
                    if (!os.ios) browser.version = safari[1]
                }
                if (webview) browser.webview = true

                os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
                (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
                os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
                (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
                (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))));

                return os;
            };

            this.os = this.detect(navigator.userAgent, navigator.platform);
            /**
             * 判断是否是android手机
             * @returns {number}
             */
            this.isAndroid = function(){
                return this.os.android;
            };
            /**
             * 判断是否是iphone手机
             * @returns {number}
             */
            this.isIphone = function(){
                return this.os.iphone;
            };
            /**
             * 判断是否是ios系统
             */
            this.isIos = function(){
                return this.os.ios;
            };
            /**
             * 返回当前系统的字符串
             * @returns {*}
             */
            this.checkOS = function(){
                if(this.isAndroid()) return 'android';
                else if(this.isIphone()) return 'iphone';
                else if(this.isIos()) return 'ios';
                else if(this.os.tablet) return 'tablet';
                else if(this.os.phone) return 'phone';
                else return 'not phone';
            };
            /**
             * 产生随机数，例如：生成0-9之间的数（包括0，包括9） random(0,9)
             * @param min
             * @param max
             * @returns {number}
             */
            this.random = function(min,max){
                return Math.floor(min + Math.random() * (max - min + 1));
            };
            /**
             * 修改页面title
             * @param title 字符串
             */
            this.title = function(title){
                if(Object.prototype.toString.call(title) === "[object String]"){
                    document.title = title;
                }
            }
        };

        _M.prototype.register = function(key,obj){
            this[key] = obj;
        };

        return new _M();
    })();
    //loading
    (function(){
        var _tmp = {};
        /**
         * loading组件
         */
        _tmp.loading = function(){
            var str = '<section id="'+M.loadingID+'" class="M-loading-pop wh-100">' +
                '<div class="mpop">' +
                '<div class="box box-center box-v wh-100">' +
                '<div class="ball-clip-rotate-multiple">' +
                '<div></div>' +
                '<div></div>' +
                '</div>' +
                '<div class="m-t-15 c-fff loading-font">正在加载数据...</div>' +
                '</div>' +
                '</div>' +
                '</section>';
            var $dom = $('#'+ M.loadingID);
            $dom[0] ? $dom.show() : $('body').append(str);
            $dom = null;
            $('#'+M.loadingID).on('touchstart',function(e){
                e.preventDefault();
            });
        };
        /**
         * 隐藏loading
         */
        _tmp.loadingHide = function(){
            $('#'+ M.loadingID).hide();
        };
        for(var k in _tmp){
            if(_tmp.hasOwnProperty(k)) M.register(k,_tmp[k]);
        }
    })();
    //alert组件
    (function(){
        var alertId = 0;//弹出框的 id的索引
        var toastTempArr = [];//存放toast实例
        var aniMationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        /**
         * 真正生成alert的方法
         * @param title 标题
         * @param content 内容
         * @param cb 确定的回调
         * @constructor
         */
        var Alert = function(title,content,cb){
            this.id = alertId++;
            this.cb = cb;
            var alertHtml='<div id="m-popup-'+(this.id)+'" class="M-pop wh-100">'+
                '<div class="M-popup center">'+
                '<div class="M-title">'+title+'</div>'+
                '<div class="M-content">'+content+'</div>'+
                '<div class="M-handler box"><span class="M-handler-ok box-f1">确定</span></div>'+
                '</div>'+
            '</div>';
            this.alertDom = $(alertHtml).appendTo('body');
        };
        Alert.prototype.show = function(){
            var Mpopup = this.alertDom.find('.M-popup').show();
            Mpopup.css('margin-top',-(Mpopup.height()/2+20)).addClass('ani zoomIn').one(aniMationEnd,function(){
                Mpopup.removeClass('ani zoomIn');
                Mpopup.unbind(aniMationEnd);
            });
            return this;
        };
        Alert.prototype.on = function(cb){
            var me = this;
            this.alertDom.find('.M-handler-ok').on(M.touch,function(e){
                if(cb) cb && cb.call(me);
                else me.hide();
                e.preventDefault();
            });
            this.alertDom.on(M.touch,function(e){
                var target = $(e.target);
                if(target.closest('.M-popup').length==0){
                    me.hide();
                }
                e.preventDefault();
            });
            return this;
        };
        Alert.prototype.hide = function(){
            var me = this;
            this.alertDom.find('.M-popup').addClass('ani zoomOut').one(aniMationEnd,function(){
                me.alertDom.remove();
            });
            return this;
        };
        /**
         * 生成confirm对象的方法
         * @param title 标题
         * @param content 内容
         * @param okCb 确定的回调
         * @param cancelCb 取消的回调
         * @constructor
         */
        var Confirm = function(title,content,okCb,cancelCb){
            this.id = alertId++;
            this.okCb = okCb;
            this.cancelCb = cancelCb;
            var confirmHtml='<div id="m-popup-'+(this.id)+'" class="M-pop wh-100">'+
                '<div class="M-popup center">'+
                '<div class="M-title">'+title+'</div>'+
                '<div class="M-content">'+content+'</div>'+
                '<div class="M-handler box">'+
                '<span class="M-handler-cancel box-f1">取消</span>'+
                '<span class="M-handler-ok box-f1">确定</span>'+
                '</div>'+
                '</div>'+
                '</div>';
            this.confirmDom = $(confirmHtml).appendTo('body');
        };
        Confirm.prototype.show = function(){
            var Mpopup = this.confirmDom.find('.M-popup').show();
            Mpopup.css('margin-top',-(Mpopup.height()/2+20)).addClass('ani zoomIn').one(aniMationEnd,function(){
                Mpopup.removeClass('ani zoomIn');
                Mpopup.unbind(aniMationEnd);
            });
            return this;
        };
        Confirm.prototype.on = function(okCb,cancelCb){
            var me = this;
            this.confirmDom.find('.M-handler-ok').on(M.touch,function(e){
                if(okCb) okCb && okCb.call(me);
                else me.hide();
                e.preventDefault();
            });
            this.confirmDom.find('.M-handler-cancel').on(M.touch,function(e){
                if(cancelCb) cancelCb && cancelCb.call(me);
                else me.hide();
                e.preventDefault();
            });
            this.confirmDom.on(M.touch,function(e){
                var target = $(e.target);
                if(target.closest('.M-popup').length==0){
                    me.hide();
                }
                e.preventDefault();
            });
            return this;
        };
        Confirm.prototype.hide = function(){
            var me = this;
            this.confirmDom.find('.M-popup').addClass('ani zoomOut').one(aniMationEnd,function(){
                me.confirmDom.remove();
            });
            return this;
        };
        /**
         * 生成toast实例的对象
         * @param options toast对应的参数
         * @constructor
         */
        var Toast = function(options){
            this.id = alertId++;
            this.options = options;
            if(!options.duration){
                this.options.duration = 2000;
            }
            var toastHtml = '<div id="m-popup-'+this.id+'" class="M-toast"><span>'+this.options.text+'</span></div>';
            this.toastDom = $(toastHtml).appendTo('body');
        };
        Toast.prototype.show = function(){
            var me = this;
            this.toastDom.addClass('ani zoomIn').show().one(aniMationEnd,function(){
                me.toastDom.removeClass('ani zoomIn');
                me.toastDom.unbind(aniMationEnd);
                if(me.options.isControl){
                    toastTempArr.push(me);
                    return me;
                }
                setTimeout(function(){
                    me.hide();
                },me.options.duration);
            });
            return this;
        };
        Toast.prototype.hide = function(){
            var me = this;
            this.toastDom.addClass('ani zoomOut').one(aniMationEnd,function(){
                me.toastDom.remove();
            });
            return this;
        };

        var ActionSheet = function(options){
            this.id = alertId++;
            this.options = options;
            var asHtml ='<div id="m-popup-'+this.id+'" class="M-pop"><div class="M-popup bottom" style="background: transparent;"><div class="actionsheet"><div class="actionsheet-group">';
            for(var i=0;i<this.options.items.length;i++){
                asHtml += '<button class="actionsheet-item">'+options.items[i].text+'</button>';
            }
            asHtml += '</div><button class="actionsheet-cancel">取消</button></div</div></div>';
            this.actionSheetDom = $(asHtml).appendTo('body');
        };

        ActionSheet.prototype.show = function(){
            var me = this;
            this.actionSheetDom.find('.M-popup').addClass('ani slideInUp').show().one(aniMationEnd,function(){
                me.actionSheetDom.find('.M-popup').removeClass('ani slideInUp');
                me.actionSheetDom.find('.M-popup').unbind(aniMationEnd);
            });
            return this;
        };
        ActionSheet.prototype.on = function(){
            var me = this;
            this.actionSheetDom.find('.actionsheet-item').each(function(i,elem){
                $(elem).on(M.touch,function(e){
                    if(me.options.items[i].handler) me.options.items[i].handler && me.options.items[i].handler.call(me);
                    e.preventDefault();
                });
            });
            this.actionSheetDom.find('.actionsheet-cancel').on(M.touch,function(e){
                if(me.options.cancelCb) me.options.cancelCb && me.options.cancelCb.call(me);
                else me.hide();
                e.preventDefault();
            });
            this.actionSheetDom.on(M.touch,function(e){
                var target = $(e.target);
                if(target.closest('.M-popup').length==0){
                    me.hide();
                }
                e.preventDefault();
            });
            return this;
        };
        ActionSheet.prototype.hide = function(){
            var me = this;
            this.actionSheetDom.find('.M-popup').addClass('ani slideOutDown').one(aniMationEnd,function(){
                me.actionSheetDom.remove();
            });
            return this;
        };


        var _tmp = {};
        /**
         * alert组件
         * @param title 标题
         * @param content 内容
         * @param cb 点击确定后的回调函数
         */
        _tmp.alert = function(title,content,cb){
            if(!content){ //只传了一个参数,第一个参数当做content处理
                content = title;
                title = '提示';
            }else if(typeof content === 'function'){//传了2个参数，相当于传了content 和 cb
                cb = content;
                content = title;
                title = '提示';
            }
            return new Alert(title,content).on(cb).show();
        };
        /**
         * confirm组件
         * @param title 标题
         * @param content 内容
         * @param okCb 确定的回调函数
         * @param cancelCb 取消的回调函数
         */
        _tmp.confirm = function(title,content,okCb,cancelCb){
            if(typeof content === 'function'){ //没有传入title
                cancelCb = okCb;
                okCb = content;
                content = title;
                title = '提示';
            }
            return new Confirm(title,content,okCb,cancelCb).on(okCb,cancelCb).show();
        };
        /**
         * 类似于Android的toast的功能，具有自动消失的功能
         * @param text 需要展示的内容
         * @param duration toast持续时间 ,默认为2s
         * @param isControl 布尔值，默认为false，如果为true，则需要手动调用hide方法将其关闭
         */
        _tmp.showToast = function(text,duration,isControl){
            return new Toast({
                text:text,
                duration:duration,
                isControl:isControl
            }).show();
        };
        _tmp.hideToast = function(){
            var tmp = toastTempArr.shift();
            if(tmp) tmp.hide();
            else console.warn('你所想关闭的toast不存在！');
            return tmp;
        };
        /**
         * 生成actionsheet
         * @param arr actionsheet对应的数组 {text:'',handler:function}
         * @param cancleCb 取消按钮的回调函数
         * @returns {*}
         */
        _tmp.actionSheet = function(arr,cancelCb){
            var options = {};
            options.items = arr;
            options.cancelCb = cancelCb;
            return new ActionSheet(options).on().show();
        };

        for(var k in _tmp){
            if(_tmp.hasOwnProperty(k)) M.register(k,_tmp[k]);
        }
    })();

    //图片预加载组件
    (function(){
        var _tmp = {};
        /**
         *  图片预加载
         */
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
        })();
        /**
         * 图片预加载
         * @param imgs 数组，需要预加载的图片数组
         * @param onComplete 图片加载完成后的回调，带两个参数count：成功加载图片数量 imgs：原图片数组
         * @param onReady  每张图片加载完成后都会执行的回调
         */
        _tmp.imgpreload = function(imgs,onComplete,onReady) {
            var onComplete = onComplete || function(count,imgs){};
            var onReady = onReady || function(i,img){};

            var loaded = 0;
            var error = 0;
            for(var i = 0; i < imgs.length; i++){
                (function(n){
                    var n = n;
                    imgReady(imgs[n],function(){
                        ++loaded;
                        onReady && onReady(n,imgs[n]);
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
        };
        for(var k in _tmp){
            if(_tmp.hasOwnProperty(k)) M.register(k,_tmp[k]);
        }
    })();
    //post请求
    (function(){
        var _tmp = {};
        _tmp.ajax = function(action,params,appid,callback,apiopenid,apitoken,debug) {
            if(!action) {
                M.showToast("action不能为空");
                return false;
            }

            if(!appid) {
                M.showToast("appid不能为空");
                return false;
            }

            this.httpid = this.httpid || 0;
            this.httpid ++;

            var postdata = {};
            postdata.action = action;
            postdata.params = (typeof params == "string" ? params:(JSON.stringify(params) || ""));
            postdata.letwxid = appid;
            postdata.apiopenid = apiopenid || "testopenid";
            postdata.apitoken = apitoken || "testopenid";
            if(debug) {
                postdata.debug = debug;
            }

            if(M.APIBASE.indexOf(window.location.host) < 0) { //接口地址和当前地址不在一个域，则以跨域的方式调用
                var cbkey = 'httpcb'+this.httpid;
                var ngapi = window.ngapi = ngapi || {};
                ngapi[cbkey] = function(data) {
                    callback && callback(data);
                    delete ngapi[cbkey]; //消除对象
                    $("#"+cbkey).remove(); //消除无用的script
                };

                postdata.callback = "ngapi."+cbkey;

                var query = [];
                for(var p in postdata) {
                    if(postdata.hasOwnProperty(p)) {
                        if(typeof postdata[p] == "object") {
                            query.push(p+"="+encodeURIComponent(JSON.stringify(postdata[p])));
                        }
                        else query.push(p+"="+encodeURIComponent(postdata[p]));
                    }
                }
                var url = M.APIBASE+"?"+query.join("&");
                var script = document.createElement('script');
                script.src = url;
                script.id = cbkey;//直接append会导致script无法触发
                $("head").append(script);
            }
            else {
                $.post(M.APIBASE, postdata, function(json) {
                    try {
                        callback && callback(json);
                    } catch (e) {
                        //TODO错误处理
                        M.showToast('AJAX请求处理错误');
                    }
                }, "json");
            }
        };
        for(var k in _tmp){
            if(_tmp.hasOwnProperty(k)) M.register(k,_tmp[k]);
        }
    })();

    //一些基础的工具
    (function(){
        var _tmp = {};
        _tmp.getUrlParam = function(url){
            var str = url;
            if (!str) str = window.location.search;
            str = str.replace('#rd',''); //去除微信链接后面的#rd
            var obj = new Object();
            if (str.indexOf('?') > -1) {
                var string = str.substr(str.indexOf('?') + 1);
                var strs = string.split('&');
                for (var i = 0; i < strs.length; i++) {
                    var tempArr = strs[i].split('=');
                    obj[tempArr[0]] = tempArr[1];
                }
            }
            return obj;
        };
        _tmp.setCookie = function(name, value, expire_days) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expire_days);
            document.cookie = name + '=' + escape(value) + ((expire_days == null) ? '' : ';expires=' + exdate.toGMTString());
        };
        _tmp.getCookie = function(name) {
            var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
            if (arr = document.cookie.match(reg))
                return (arr[2]);
            else
                return null;
        };
        _tmp.delCookie = function(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.getCookie(name);
            if (cval != null)
                document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
        };
        //将对象转化成数据
        _tmp.toArray = function(obj){
            try{
                return Array.prototype.slice.call(obj);
            }catch(e){
                var arr = [];
                for(var i in obj){
                    arr.push(obj[i]);
                }
                return arr;
            }
        }
        for(var k in _tmp){
            if(_tmp.hasOwnProperty(k)) M.register(k,_tmp[k]);
        }
    })();
    if(typeof window !== 'undefined'){
        window.M = M;
    }
})(window);
//requestAnimationFrame
(function(window) {
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
}(window));