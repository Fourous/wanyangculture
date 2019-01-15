var countdown = 60;
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      is_show: true
    })
    countdown = 60;
    return;
  } else {
    that.setData({
      is_show: false,
      last_time: countdown
    })

    countdown--;
  }
  setTimeout(function () {
    settime(that)
  }
    , 1000)
}
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenum: null,
    identify: null,
    self_identify: null,
    password: null,
    Sta: false,
    disable: true,
    sec: 30,
    time: '获取验证码', //倒计时 
    currentTime: 61,
    last_time: '',
    is_show: true

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

  phonenumInput: function (e) {
    this.setData({
      phonenum: e.detail.value
    })
    if (this.data.phonenum == null || this.data.phonenum.length < 11 || this.data.phonenum.length > 11) {
      this.setData({
        disable: true
      })
    } else {
      this.setData({
        disable: false
      })
    }
  },

  ideInput: function (e) {
    this.setData({
      self_identify: e.detail.value
    })
  },

  pswInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  clickVerify: function () {
    var that = this;
    wx.request({
      url: 'https://www.wanyangculture.com/BookLazy/demo/sendSms.php',
      method: "POST",
      data: {
        phone: that.data.phonenum
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res);
        that.setData({
          is_show: (!that.data.is_show),  //false
          identify: res.data
        })
        settime(that);
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
    // 将获取验证码按钮隐藏60s，60s后再次显示   
  },

  judge: function () {
    //还要判断一下手机号是否被注册
    var that = this

    if (that.data.identify != that.data.self_identify) {
      wx.showToast({
        title: '验证码错误',
        icon: 'loading',
        duration: 2000
      })
    }
    else if (that.data.phonenum == null || that.data.phonenum.length != 11) {
      wx.showToast({
        title: '手机号错误',
        icon: 'loading',
        duration: 2000
      })
    }
    else if (that.data.password == null || that.data.password.length < 6) {
      wx.showToast({
        title: '密码过短',
        icon: 'loading',
        duration: 2000
      })
    }
    else if (that.data.password.length > 16) {
      wx.showToast({
        title: '密码过长',
        icon: 'loading',
        duration: 2000
      })
    }
    else {
     app.appData.userinfo[0].phonenum = that.data.phonenum
      app.appData.userinfo[0].password = that.data.password
      console.log(that.data.phonenum)
      console.log(that.data.password)
      wx.navigateTo({
        url: '../identity/identity',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
})