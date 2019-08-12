(function($) {
  var vm = new Vue({
    el: '#app',
    data: function() {
      return {
        bIsOnline: false,
        bIsLoading: true,

        form: {
          name: '',
          tel: '',
          type: true,
          resource: '',
          num: '',
          content: '',
          agree: true,
        },
      }
    },
    beforeCreate() {
      if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
          document.addEventListener('WeixinJSBridgeReady', this.handleBridgeReady, false);
        }
        else if (document.attachEvent){
          document.attachEvent('WeixinJSBridgeReady', this.handleBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', this.handleBridgeReady);
        }
      }
      else{
        this.handleBridgeReady();
      }
    },
    mounted() {
      var that = this;

      // resize
      this.handleResize();

      // hide loading
      this.handleHideLoading();
    },
    methods: {
      ajax: function(url, params, callback) {
        if(!this.bIsOnline) {
          alert('感谢您的参与！');
          return false;
        }

        $.post(url, params, function(data){
          if(callback) {
            callback(data);
            return false;
          }
          return false;
        }, 'json');
      },
      handleBridgeReady() {
        WECHAT.config({
            debug: false,
            appId: 'wxf8b4f85f3a794e77',
            timestamp: 1536892275,
            nonceStr: 'Ziz2GYXmCgnmbz1p',
            signature: '77f99c47934d5a174c4a8ca54e4d0016bec12c06',
            jsApiList: [
                'onMenuShareTimeline',
            ]
        });

        WECHAT.ready(function() {
            WECHAT.onMenuShareTimeline('title', 'link', 'imgUrl');
        });
      },
      handleResize() {
        var that = this;

        // resize
        window.addEventListener("resize", function(event) {
          window.flexible.init();
        }, false);
      },
      handleHideLoading() {
        var that = this;

        // hide loading
        setTimeout(function() {
          that.bIsLoading = false;
        }, 300);
      },
      handlePay() {
        var that = this;
        var form = this.form;
        if(this.isUorN(form.name) || !form.type) {
          this.$message({
            message: '请您填写完整信息～',
            type: 'warning',
            customClass: 'tips_alert',
            // duration: 0,
          });
          return false;
        }
        if(this.isUorN(form.resource)) {
          this.$message({
            message: '请您选择捐款金额～',
            type: 'warning',
            customClass: 'tips_alert',
            // duration: 0,
          });
          return false;
        }
        if(!this.isUorN(form.tel) && !this.telReg(form.tel)) {
          this.$message({
            message: '请您输入正确的手机号码～',
            type: 'warning',
            customClass: 'tips_alert',
            // duration: 0,
          });
          return false;
        }
        if(!form.agree) {
          this.$message({
            message: '请您认真阅读/同意捐款协议～',
            type: 'warning',
            customClass: 'tips_alert',
            // duration: 0,
          });
          return false;
        }

        if(window.PUB.isWechat()) {
          alert('wechat pay');

          if (typeof WeixinJSBridge != "undefined"){
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入
                "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数
                "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串
                "package":"prepay_id=u802345jgfjsdfgsdg888",
                "signType":"MD5",         //微信签名方式：
                "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
              },
              function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                }
              }
            );
          }
        }
        else {
          alert('ali pay');

          this.ajax('/api/donation', {
            user_name: form.name,
            user_phone: form.tel,
            // type: form.type ? 'tample' : 'tample',
            type: 'tample',
            content: form.content,
            agreed: form.agree ? '1' : '0',
            money: form.resource,
            money_count: form.num,
          }, function(res) {
            // window.location.href = item.jump_url;
            console.log(res);
          })
        }
      },
      telReg(val) {
        // 校验手机号码
        let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        return reg.test(val);
      },
      isUorN(str) {
        return Object.prototype.toString.call(str) !== "[object String]" || str === "";
      },
    },
    watch: {},
  });
})(jQuery);
