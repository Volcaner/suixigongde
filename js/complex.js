(function($) {
    /** Complex
     * [做一个可复用的 code]
     * @author kaican
     * @desc 2018/9/13
     */
    $.Complex = function() {
        var that = this;

        var ua = navigator.userAgent;

        /** init
         * [do nothing]
         * @return {[type]} [description]
         */
        this.init = function() {};

        /** isWechat
         * [description]
         * @return {[type]} [boolean]
         */
        this.isWechat = function() {
            var pattern_wechat = /MicroMessenger/;
            if(pattern_wechat.test(ua)) {
                return true;
            }
            return false;
        };

        /** isWeibo
         * [description]
         * @return {[type]} [boolean]
         */
        this.isWeibo = function() {
            var pattern_weibo = /weibo/;
            if(pattern_weibo.test(ua)) {
                return true;
            }
            return false;
        };

        /** isAndroid
         * [description]
         * @return {[type]} [boolean]
         */
        this.isAndroid = function() {
            return ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
        };

        /** isIOS
         * [description]
         * @return {[type]} [boolean]
         */
        this.isIOS = function() {
            return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        };

        /** isMobile
         * [description]
         * @return {[type]} [description]
         */
        this.isMobile = function() {
            return !!ua.match(/AppleWebKit.*Mobile.*/); //是否为移动终端
        };

        /** extends
         * [继承方法封装]
         * @param  {[type]} childClass  [子类]
         * @param  {[type]} parentClass [父类]
         * @return {[type]}             [description]
         *
         * var childClass = function() {parentClass.call(this)}
         */
        this.extends = function(childClass, parentClass) {
            var Fun = function() {};
            Fun.prototype = new parentClass();
            childClass.prototype = new Fun();
            childClass.prototype.constructor = childClass;
        };

    };

    /** window.COMPLEX
     * [COMPLEX 自行引用扩展]
     */
    window.COMPLEX = new $.Complex();

    /** window.PUB
     * [PUB 轻小型]
     */
    window.PUB = new $.Complex();
})(jQuery);
