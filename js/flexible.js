(function(doc, win) {
    var Flexible = function() {
        var that = this;

        this.init = function() {
            // 手机型号
            var ua = win.navigator.userAgent;
            _isIOS = function() {
                return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            };

            // 设置 viewport
            var dpr = win.devicePixelRatio || 1;
            // var scale = _isIOS() ? 1 / dpr : 1;
            var scale = 1;
            doc.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

            // 动态设置 html 的 font-size
            var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;

                    // if(clientWidth>=750){
                    //     docEl.style.fontSize = '100px';
                    // }else{
                    //     docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
                    // }

                    if(clientWidth<=1242) {
                        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';  // clientWidth 750px  fontSize 100px
                    }
                    if(clientWidth>1242) {
                        docEl.style.fontSize = 100 * (1024 / 750) + 'px';  // clientWidth 750px  fontSize 100px
                    }


                };

            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        };
    };

    win.flexible = new Flexible();
    win.flexible.init();
})(document, window);
