var app = getApp()
var download = require("../../utils/download.js")
var find = require("../../utils/find.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: null,
    uid0: null,
    name: null,
    follow_user: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    wx.request({
      url: 'https://www.wanyangculture.com/php/show_person_col.php',
      method: "POST",
      data: {
        uid: app.appData.userinfo[0].phonenum
      },
      header: { //请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function(res) {
        that.setData({
          uid: res.data,
          uid0: res.data,
        })
        console.log(that.data)
        if (that.data.uid != "") {
          //将图片的url放到数组中
          console.log("1")
// --------------------------------------------------------------------------------
          var user_url_0 = new Array()
          for (var i in that.data.uid) {
            let downloaduserid = that.data.uid[i].col_uid
            let url = "https://www.wanyangculture.xyz/userinfo/" + String(downloaduserid) + "avatar" + ".png"
            console.log(i)
            user_url_0.push(url)
            console.log(user_url_0)
          }

          //调用封装方法实现多图片的下载，而且在appData中的数据顺序是正确的
          download.downloadSaveFiles({
            urls: user_url_0,
            success: function (res) {
              let user_0 = that.data.uid0
              for (var j in user_0) {
                user_0[j].tag = res[j]
              }
              console.log(user_0)
              that.setData({
                uid0: user_0
              })
              console.log(that.data.uid0)
            },
            fail: function (e) {
              console.info("下载失败");
            }
          })
// ------------------------------------------------------------------------------------


          find.findPerson({
            urls: that.data.uid,
            success: function (res) {
              let user_0 = that.data.uid0
              for (var j in user_0) {
                user_0[j].info = res[j]
              }
              console.log(user_0)
              that.setData({
                uid0: user_0
              })
              console.log(that.data.uid0)
            },
            fail: function (e) {
              console.info("下载失败");
            }
          })



// ---------------------------------------------------------------------------------------------
        } else {
          that.setData({
            name: null
          })
        }
      },
      fail: function(err) {}, //请求失败
      complete: function() {} //请求完成后执行的函数
    })


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})