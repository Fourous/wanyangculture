var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    one:0,
    two:0,
    three:0,
    four:0,
    money:0,
    moneycharge:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.wanyangculture.com/php/getbdic.php',
      method: "POST",//get为默认方法/POST
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        uid: app.appData.userinfo[0].phonenum
      },
      success: function (res) {
        console.log("zhelishiqian")
        console.log(res.data);
        var list = res.data;
        that.setData({
          balance: list[1]
        })

      }
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

one:function(){
  this.setData({
    one:1,
    two:0,
    three:0,
    four: 0,
    money: 10
  })
},
two:function(){
  this.setData({
    one: 0,
    two: 1,
    three: 0,
    four: 0,
    money:20
  })
},
three:function(){
  this.setData({
    one: 0,
    two: 0,
    three: 1,
    four: 0,
    money: 50
  })
},
four:function(){
  this.setData({
    one: 0,
    two: 0,
    three: 0,
    four: 1,
    money: 100
  })
},
rechargemoney:function(){
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
          header:{
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res.data)
            var listid=res.data
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
                fee: that.data.money*100,  //后面要改成400 
                telephone: app.appData.userinfo[0].phonenum,
                body: '充值余额'
              },
              header: {//请求头
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                console.log(res)
                console.log("payment前面")
                wx.requestPayment({
                  timeStamp: res.data.timeStamp,
                  nonceStr: res.data.nonceStr,
                  package: res.data.package,
                  signType: 'MD5',
                  paySign: res.data.paySign,
                  success: function (res) {
                      console.log(res)
                      console.log("付款成功")
                  },
                  complete: function (res) { 
                    console.log("修改数据")
                    console.log(res)
                    if(res.errMsg!="requestPayment:fail cancel"){
                      console.log(that.data.money);
                      if(that.data.money==10){
                        that.setData({
                          moneycharge:100
                        })
                      }
                      else if(that.data.money==20){
                        that.setData({
                          moneycharge:250
                        })
                      }
                      else if(that.data.money==50){
                        that.setData({
                          moneycharge:650
                        })
                      }
                      else if(that.data.money==100){
                        that.setData({
                          moneycharge:1500
                        })
                      }
                      console.log(that.data.moneycharge);
                      wx.request({
                        url: 'https://www.wanyangculture.com/php/uppaydata.php',
                        method: "POST",
                        data: {
                          uid: app.appData.userinfo[0].phonenum,
                          total_fee: that.data.moneycharge,  //后面要改成400 
                          body: '充值余额'
                        },
                        header: {//请求头
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        success: function (res) {
                          console.log(res)
                          that.onLoad();
                        }
                      })
                    }

                    
            

                  }
                })
              },
              fail: function (err) { 
                console.log(err)
              },//请求失败
              complete: function () { }//请求完成后执行的函数
            })

          }
        })
      }
    })
  }
 

  // recharge: function () {
  //   var that = this
  //   wx.login({
  //     success: function (res) {
  //       wx.request({
  //         url: 'https://api.weixin.qq.com/sns/jscode2session',
  //         data: {
  //           appid: 'wxf97feea057e28b44',
  //           secret: '37ca5390ac03ca3bb25336254a422df3',
  //           js_code: res.code,
  //           grant_type: 'authorization_code'
  //         },
  //         method: 'GET',
  //         success: function (res) {
  //           console.log(res.data.openid)
  //           that.setData({
  //             openid: res.data.openid,//获取到的openid
  //             sessionkey: res.data.session_key,//获取到session_key 
  //           })
  //           wx.request({
  //             url: 'https://www.wanyangculture.com/php/pay/payfee.php',
  //             method: "POST",
  //             data: {
  //               uid: app.appData.userinfo[0].phonenum,
  //               id: res.data.openid,
  //               fee: that.data.money,  //后面要改成400 
  //               telephone: app.appData.userinfo[0].phonenum,
  //               body: '充值余额'
  //             },
  //             header: {//请求头
  //               "Content-Type": "application/x-www-form-urlencoded"
  //             },
  //             success: function (res) {
  //               console.log(res)
  //               wx.requestPayment({
  //                 timeStamp: res.data.timeStamp,
  //                 nonceStr: res.data.nonceStr,
  //                 package: res.data.package,
  //                 signType: 'MD5',
  //                 paySign: res.data.paySign,
  //                 success: function (res) {
  //                   console.log(res)
  //                 },
  //               })
  //             },
  //             fail: function (err) { },//请求失败
  //             complete: function () { }//请求完成后执行的函数
  //           })
  //         }
  //       })
  //     }
  //   })
  // }
})