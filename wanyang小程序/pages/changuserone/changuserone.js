// pages/changuserone/changuserone.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    value:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
    console.log(options)
    console.log(options.message)
    that.setData({
      message: options.message,
      type:options.type
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
  sava:function(){

  },
  getmes: function (e) {
    
    var message = e.detail.value;
    console.log("信息")
    console.log(e.detail.value)
    this.data.value=e.detail.value
    console.log(this.data.value)
  },
  save:function(){
    var that=this
    console.log(this.data.type) 
    var type=that.data.type
    switch (type) {
      case "1": app.appData.userinfo[0].weixinnum = that.data.value;
        var pages = getCurrentPages()
        var tempPage = pages[pages.length - 2]
        tempPage.setData({
          username: this.data.value
        })
       break;
      case "0": app.appData.userinfo[0].nickname = that.data.value; 
        var pages = getCurrentPages()
        var tempPage = pages[pages.length - 2]
        tempPage.setData({
          username: this.data.value
        })
        break;
      
      case "2": app.appData.userinfo[0].signature = that.data.value;
        var pages = getCurrentPages()
        var tempPage = pages[pages.length - 2]
        tempPage.setData({
          username: this.data.value
        })
         break;
      case "3": app.appData.userinfo[0].localplace = that.data.value; 
        var pages = getCurrentPages()
        var tempPage = pages[pages.length - 2]
        tempPage.setData({
          username: this.data.value
        })
        break;
      case "4": app.appData.userinfo[0].email = that.data.value; 
        var pages = getCurrentPages()
        var tempPage = pages[pages.length - 2]
        tempPage.setData({
          username: this.data.value
        })
        break;
      default:console.log("jjjj")
    }
    // wx.redirectTo({
    //   url: '../changuser/changuser',
    // })
    // var pages = getCurrentPages()
    // var tempPage = pages[pages.length-2]
    // tempPage.setData({
    //   username: this.data.value
    // })
    wx.navigateBack({
      
    })
  }
  
})