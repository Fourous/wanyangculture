var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Sta: false, //接口好了要改的
    forgift: null,
    code: null,
    openid: null,
    sessionkey: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.wanyangculture.com/php/show_money.php',
      data: {
        uid: app.appData.userinfo[0].phonenum
      },
      method: 'POST',
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        if (res.data == 1) {
          that.setData({
            forgift: '已交押金'
          })
        } else {
          that.setData({
            forgift: '未交押金'
          })
        }

      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  handin: function () {
    var that = this
    var that = this
    wx.login({
      success: function (res) {
        console.log(res)
        wx.request({
          url: 'https://www.wanyangculture.com/php/getopenid.php',
          data: {
            code: res.code,
          },
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res.data)
            var listid = res.data
            that.setData({
              openid: listid[0],//获取到的openid
              sessionkey: listid[1],//获取到session_key 
            })
            wx.request({
              url: 'https://www.wanyangculture.com/php/pay/payfee.php',
              method: "POST",
              data: {
                uid: app.appData.userinfo[0].phonenum,
                id: listid[0],
                fee: 1,  //后面要改成400 
                telephone: app.appData.userinfo[0].phonenum,
                body: '充值押金'
              },
              header: {//请求头
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                console.log(res)
                wx.requestPayment({
                  timeStamp: res.data.timeStamp,
                  nonceStr: res.data.nonceStr,
                  package: res.data.package,
                  signType: 'MD5',
                  paySign: res.data.paySign,
                  success: function (res) {
                    console.log(res)
                  },
                })
              },
              fail: function (err) { },//请求失败
              complete: function () { }//请求完成后执行的函数
            })

          }
        })
      }
    })
  },

  handout: function () {
    var that = this
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wxf97feea057e28b44',
            secret: '37ca5390ac03ca3bb25336254a422df3',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data.openid)
            that.setData({
              openid: res.data.openid,//获取到的openid
              sessionkey: res.data.session_key,//获取到session_key 
            })
            wx.request({
              url: 'https://www.wanyangculture.com/php/pay/refund.php',
              method: "POST",
              data: {
                id: res.data.openid,
                fee: 1,  //后面要改成400 
                telephone: app.appData.userinfo[0].phonenum,
              },
              header: {//请求头
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                console.log(res)
                wx.requestPayment({
                  timeStamp: res.data.timeStamp,
                  nonceStr: res.data.nonceStr,
                  package: res.data.package,
                  signType: 'MD5',
                  paySign: res.data.paySign,
                  success: function (res) {
                    console.log(res)
                    that.setData({
                      Sta: true,
                      forgift: '未交押金',
                    })
                  },
                })
              },
              fail: function (err) { },//请求失败
              complete: function () { }//请求完成后执行的函数
            })
          }
        })
      }
    })
  },
})