/**
 * Created by GH on 2015/7/29.
 */
(function(){
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
            /**
             * 利用了zepto的os方法获取当前系统和版本
             * android格式:{android: true, version: "4.4.4", tablet: false, phone: true}
             * ios格式：{iphone: true, ios: true, version: "7.0", tablet: false, phone: true}
             */
            this.os = $.os;
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
            var eName = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            var Mpopup = this.alertDom.find('.M-popup').show();
            Mpopup.css('margin-top',-(Mpopup.height()/2+20)).addClass('ani zoomIn').one(aniMationEnd,function(){
                Mpopup.removeClass('ani zoomIn');
                Mpopup.unbind(eName);
            });
            return this;
        };
        Alert.prototype.on = function(cb){
            var me = this;
            this.alertDom.find('.M-handler-ok').on(M.touch,function(){
                if(cb) cb && cb();
                else me.hide();
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
                Mpopup.unbind(eName);
            });
            return this;
        };
        Confirm.prototype.on = function(okCb,cancelCb){
            var me = this;
            this.confirmDom.find('.M-handler-ok').on(M.touch,function(){
                if(okCb) okCb && okCb();
                else me.hide();
            });
            this.confirmDom.find('.M-handler-cancel').on(M.touch,function(){
                if(cancelCb) cancelCb && cancelCb();
                else me.hide();
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

        var Toast = function(options){
            this.id = alertId++;
            this.options = options;
            if(!options.duration){
                this.options.duration = 2000;
            }
            var toastHtml = '<div id="m-popup-'+this.id+'" class="M-toast"><span>'+this.options.text+'</span></div>'
            this.toastDom = $(toastHtml).appendTo('body');
        };
        var toastTempArr = [];
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
                content = title;
                cb = content;
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

        for(var k in _tmp){
            if(_tmp.hasOwnProperty(k)) M.register(k,_tmp[k]);
        }
    })();


    if(typeof window !== 'undefined'){
        window.M = M;
    }
})();