// pages/buyrecord/buyrecord.js
var hostDomain = 'https://www.wanyangculture.com'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      money:null,
      lendtime:0,
      returntime:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this
      wx.request({
          url: hostDomain + "/php/ispaylist.php",
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data: {
            uid: app.appData.userinfo[0].phonenum
          },
          method: "POST",
          success: (res) => {
            var list=res.data
            for(let i=0;i<20;i++){
              that.setData({
                money:list[i]
              })
            }
            console.log(res)
            
          },
          fail: function (res) {
            console.log(res);
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

  }
})