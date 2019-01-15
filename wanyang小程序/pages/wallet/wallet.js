var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
  money:0.0,
  username:null,
  image: '../images/pig.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that=this;
    // wx.getStorage({
    //   key: 'userInfo',
    //   success: function(res) {
    //     that.setData({
    //       userInfo: res.data
    //     })
    //   },
    // })
    that.setData({
      username: app.appData.userinfo[0].nickname
    })
  
    let downloaduserid = app.appData.userinfo[0].phonenum
    console.log(downloaduserid)
    let url = "https://www.wanyangculture.xyz/userinfo/" + String(downloaduserid) + "avatar" + ".png"
    console.log(url)
    wx.downloadFile({
      url: url,
      success: (res) => {
        console.log(res)
        let image_url = res.tempFilePath
        console.log(res.tempFilePath)
        if (app.appData.userinfo[0].Sta == false) {
          var avatarwx = this.data.userInfo.avatarUrl
          that.setData({
            image: avatarwx
          })
        } else {
          if(res.statusCode==200){
            that.setData({
              image: image_url
            })
          }
         
        }
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
  
vip:function(){
wx.navigateTo({
  url: '../vip/vip',
})
},
  recharge:function(){
    wx.navigateTo({
      url: '../recharge/recharge',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  exchange:function(){
    wx.navigateTo({
      url: '../exchange/exchange',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  forgift:function(){
    wx.navigateTo({
      url: '../forgift/forgift',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  buyrecord:function(){
    wx.navigateTo({
      url: '../buyrecord/buyrecord',
    })
    console.log("消费记录")
  }
})