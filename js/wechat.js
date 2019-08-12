(function($) {
    /** Wechat
     * [封装 wx 功能组件]
     * 只能在 wx 绑定的域名下使用： （如：all.vic.sina.com.cn）
     * 引入js：<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js" charset="utf-8"></script>
     * @author kaican
     * @desc 2018/9/13
     *
     * 可调用方法：
     * 1. config() 配置项
     * 2. ready() 在 wx 环境 ready 后，操作 其他 api
     * ...
     */
    $.Wechat = function() {
        var that = this;

        /** ready
         * [调用 API 时，在 wx.ready 之后调用]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        this.ready = function(callback) {
            wx.ready(function() {
                if(callback) callback();
            });
        };

        /** config
         * [也可以自行配置]
         * @param  {[type]} appId     [description]
         * @param  {[type]} timestamp [description]
         * @param  {[type]} nonceStr  [description]
         * @param  {[type]} signature [description]
         * @param  {[type]} jsApiList [数组]
         *     'checkJsApi',
         *     'onMenuShareTimeline',
         *     'onMenuShareAppMessage',
         *     'onMenuShareQQ',
         *     'onMenuShareWeibo',
         *     'onMenuShareQZone',
         *     'hideMenuItems',
         *     'showMenuItems',
         *     'hideAllNonBaseMenuItem',
         *     'showAllNonBaseMenuItem',
         *     'translateVoice',
         *     'startRecord',
         *     'stopRecord',
         *     'onVoiceRecordEnd',
         *     'playVoice',
         *     'onVoicePlayEnd',
         *     'pauseVoice',
         *     'stopVoice',
         *     'uploadVoice',
         *     'downloadVoice',
         *     'chooseImage',
         *     'previewImage',
         *     'uploadImage',
         *     'downloadImage',
         *     'getNetworkType',
         *     'openLocation',
         *     'getLocation',
         *     'hideOptionMenu',
         *     'showOptionMenu',
         *     'closeWindow',
         *     'scanQRCode',
         *     'chooseWXPay',
         *     'openProductSpecificView',
         *     'addCard',
         *     'chooseCard',
         *     'openCard'
         * @param  {[type]} debug     [description]
         * @return {[type]}           [description]
         */
        this.config = function(appId, timestamp, nonceStr, signature, jsApiList, debug) {
            wx.config({
                debug: debug || false,
                appId: appId,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: jsApiList
            });
        };

        /** init
         * [do nothing]
         */
        this.init = function() {};

        /** checkJsApi
         * [判断当前版本是否支持指定 JS 接口，支持批量判断]
         * @param  {[type]}   jsApiList [description]
         * @param  {Function} callback  [res]
         * @return {[type]}             [res]
         */
        this.checkJsApi = function(jsApiList, callback) {
            wx.checkJsApi({
                jsApiList: jsApiList,
                success: function (res) {
                    if(callback) callback(res);
                }
            });
        };

        /** onMenuShareAppMessage
         * [description]
         * @param  {[type]} title  [description]
         * @param  {[type]} desc   [description]
         * @param  {[type]} link   [description]
         * @param  {[type]} imgUrl [description]
         * @return {[type]}        [description]
         */
        this.onMenuShareAppMessage = function(title, desc, link, imgUrl) {
            wx.onMenuShareAppMessage({
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    // alert('用户点击发送给朋友');
                },
                success: function (res) {
                    // alert(JSON.stringify(res));
                },
                cancel: function (res) {
                    // alert('已取消');
                },
                fail: function (res) {
                    // alert(JSON.stringify(res));
                }
            });
        };

        /** onMenuShareTimeline
         * [监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口]
         * @param  {[type]} title  [description]
         * @param  {[type]} link   [description]
         * @param  {[type]} imgUrl [description]
         * @return {[type]}        [description]
         */
        this.onMenuShareTimeline = function(title, link, imgUrl) {
            wx.onMenuShareTimeline({
                title: title,
                link: link,
                imgUrl: imgUrl,
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    // alert('用户点击分享到朋友圈');
                },
                success: function (res) {
                    // alert('已分享');
                },
                cancel: function (res) {
                    // alert('已取消');
                },
                fail: function (res) {
                    // alert(JSON.stringify(res));
                }
            });
        };

        /** onMenuShareWeibo
         * [监听“分享到微博”按钮点击、自定义分享内容及分享结果接口]
         * @param  {[type]} title  [description]
         * @param  {[type]} desc   [description]
         * @param  {[type]} link   [description]
         * @param  {[type]} imgUrl [description]
         * @return {[type]}        [description]
         */
        this.onMenuShareWeibo = function(title, desc, link, imgUrl) {
            wx.onMenuShareWeibo({
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                trigger: function (res) {
                    // alert('用户点击分享到微博');
                },
                complete: function (res) {
                    // alert(JSON.stringify(res));
                },
                success: function (res) {
                    // alert('已分享');
                },
                cancel: function (res) {
                    // alert('已取消');
                },
                fail: function (res) {
                    // alert(JSON.stringify(res));
                }
            });
        };

        /** chooseImage
         * [description]
         * @param  {Function} callback   [description]
         * @param  {[type]}   count      [description]
         * @param  {[type]}   sizeType   [description]
         * @param  {[type]}   sourceType [description]
         * @return {[type]}              [description]
         */
        this.chooseImage = function(callback, count, sizeType, sourceType) {
            wx.chooseImage({
                count: count || 1,  // 默认9
                sizeType: sizeType || ['original', 'compressed'],  // 可以指定是原图还是压缩图，默认二者都有  ['original', 'compressed']
                sourceType: sourceType || ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // alert('已选择 ' + res.localIds.length + ' 张图片');
                    callback(res);
                }
            });
        };

        /** previewImage
         * [description]
         * @param  {[type]} current [当前图片]
         * @param  {[type]} urls    [所有图片]
         * @return {[type]}         [description]
         */
        this.previewImage = function(current, urls) {
            wx.previewImage({
                current: current,
                urls: urls
            });
        };

        /** hideOptionMenu
         * [description]
         * @return {[type]} [description]
         */
        this.hideOptionMenu = function() {
            wx.hideOptionMenu();
        };

        /** showOptionMenu
         * [description]
         * @return {[type]} [description]
         */
        this.showOptionMenu = function() {
            wx.showOptionMenu();
        };

        /** scanQRCode
         * [description]
         * @param  {[type]} needResult [默认为0，扫描结果由微信处理，1则直接返回扫描结果]
         * @param  {[type]} scanType   [["qrCode","barCode"]可以指定扫二维码还是一维码，默认二者都有]
         * @return {[type]} resultStr  [当needResult 为 1 时，扫码返回的结果]
         */
        this.scanQRCode = function(needResult, scanType, callback) {
            wx.scanQRCode({
                needResult: needResult, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: scanType, // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    if(callback) callback(res.resultStr);  // 当needResult 为 1 时，扫码返回的结果
                }
            });
        };
    };
    window.WECHAT = new $.Wechat();
})(jQuery);
