var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identity: null,
    name: null,
    phonenum:null,
    password:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  identityInput: function (e) {
    // console.log(iden)
    this.setData({
      identity: e.detail.value
    })
  },

  nameInput: function (e) {
    // var name = String(e.detail.value)
    // console.log(name)
    this.setData({
      name: e.detail.value
    })
  },

  judge: function () {
    //还要判断一下手机号是否被注册
    var that = this
    wx.request({
      url: 'https://op.juhe.cn/idcard/query',
      method: "POST",//get为默认方法/POST
      data: {//发送给后台的数据
        realname: that.data.name,
        idcard: that.data.identity,
        key: "b16702851fbdd7c3e173a5b182b3a060",
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        //console.log(res)
        that.setData({
          phonenum: app.appData.userinfo[0].phonenum,
          password: app.appData.userinfo[0].password
        })
        console.log("55555555555555555555555555555555555555555555")
        console.log(that.data.phonenum)
        console.log(that.data.password)
        console.log(that.data.realname)
        // true_name: that.data.realname
        if (res.data.result.res == 1) {
          wx.request({
            url: 'https://www.wanyangculture.com/php/registerweixin.php',
            method: "POST",//get为默认方法/POST
            data: {//发送给后台的数据
              telephone: app.appData.userinfo[0].phonenum,
              password: app.appData.userinfo[0].password,
              true_name:that.data.name,
              ID_card: that.data.identity
            },
            header: {//请求头
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              console.log(that.data.phonenum)
              console.log(that.data.password)
              console.log(that.data.true_name)
              console.log(that.data.ID_card)
              console.log(res)
              if (res.data == 1) {
                wx.showToast({
                  title: '注册成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.navigateTo({
                  url: '../logs/logs',
                  success: function (res) { 
                   
                  },
                  fail: function (res) { },
                  complete: function (res) { 
                    wx.showToast({
                      title: '注册成功',
                      icon: 'success',
                      duration: 2000
                    })
                  },
                })
              } 
              else if (res.data == 0) {
                wx.showToast({
                  title: '手机号已被注册',
                  icon: 'loading',
                  duration: 2000
                })
              }
              else {
                wx.showToast({
                  title: '注册失败',
                  icon: 'loading',
                  duration: 2000
                })
              }
            },
            fail: function (err) { },//请求失败
            complete: function () { }//请求完成后执行的函数
          })

          wx.navigateBack({
            delta: 2,
          })
        }
        else{
          wx.showToast({
            title: '身份信息不匹配',
            icon: 'loading',
            duration: 2000
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })

  },
})