// pages/peplepay/peplepay.js
var hostDomain = 'https://www.wanyangculture.com';
var app=getApp();
var Util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  money:0,
  timestamp:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 这里是计算账单的
  payment: function () {
    var that = this
    wx.request({
      url: hostDomain + "/php/ispay.php",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        uid: app.appData.userinfo[0].phonenum
      },
      method: "POST",
      success: (res) => {
        console.log("这里是计算账单数字的调用");
        console.log(res)
        
          that.setData({
            money: res.data
          })
        
        
      },
      fail: function (res) {
        console.log(res);
      }

    })
  },
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
    var that=this;
    that.payment();
    var timestamp=Date.parse(new Date());
    timestamp=timestamp/1000;
    timestamp=timestamp*1000;
   
    var date=new Date(timestamp);
      that.setData({
        timestamp: date.toGMTString()
      })
  
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
  confirm:function(){
    console.log("确认")
    wx.switchTab({
      url: '../scan/scan',
    })
  }
})