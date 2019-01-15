var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:null,

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

  codeinput:function(e){
    this.setData({
      code: e.detail.value
    })
  },
  getmes: function (e) {
    var message = e.detail.value;
    console.log("信息")
    console.log(e.detail.value)
    this.data.code = e.detail.value
    console.log(this.data.code)
    // app.appData.userinfo[0].nickname=e.detail.value
  },
  exchange:function(){
    var that=this
    // jiaoyan_duihuanma.php
    console.log("兑换")
    wx.request({
      url: 'https://www.wanyangculture.com/php/jiaoyan_duihuanma.php',
      method: "POST",
      data: {
        code:that.data.code
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // -1没有查询到，兑换成功换成type，不成功则-2
        console.log("vipvipvipvipvipvipvipvipvipvipvip")
        console.log(res)
        // change_usertype.php
        if(res.data>0|res.data==0){
          wx.request({
            url: 'https://www.wanyangculture.com/php/change_usertype.php',
            method: "POST",
            data: {
              uid: app.appData.userinfo[0].phonenum,
              type: res.data
            },
            header: {//请求头
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              if (res.data == 1) {
                wx.showToast({
                  title: '兑换成功',
                })
                var pages = getCurrentPages()
                var tempPage = pages[pages.length - 2]
                wx.navigateBack({

                })
              } else {
                wx.showToast({
                  title: '兑换失败',
                })
              }
              console.log(res)
              // change_usertype.php
            },
            fail: function (err) { },//请求失败
            complete: function (res) {


            }//请求完成后执行的函数
          })
        }
        else{
          wx.showToast({
            title: '没有兑换码',
          })
        }
      
      },
      fail: function (err) { },//请求失败
      complete: function (res) {


      }//请求完成后执行的函数
    })
  },


})