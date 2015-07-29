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
            }
        };

        _M.prototype.register = function(key,obj){
            this[key] = obj;
        };

        return new _M();
    })();
    //M.loading


    if(typeof window !== 'undefined'){
        window.M = M;
    }
})();