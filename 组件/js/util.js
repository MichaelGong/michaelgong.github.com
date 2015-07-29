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
            this.os = Zepto.os;
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
        _tmp.loading = function(){
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
            var $dom = $('#'+ M.loadingID);
            $dom[0] ? $dom.show() : $('body').append(str);
            $dom = null;
        };
        _tmp.loadingHide = function(){
            $('#'+ M.loadingID).hide();
        };
        for(var k in _tmp){
            if(_tmp.hasOwnProperty(k)) M.register(k,_tmp[k]);
        }
    })();
    //
    (function(){

    })();


    if(typeof window !== 'undefined'){
        window.M = M;
    }
})();