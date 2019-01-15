// pages/bookback/bookback.js
var app = getApp()
const {
  extend,
  pullUpLoading
} = require("../../pullUpLoading/index.js");
var download = require("../../utils/download.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "",
    list: null,
    list0: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var type = options.message;
    this.setData({
      type: type
    })
    console.log("danggggggggggggggggggggggggggggg")
    console.log(this.data.type)
    wx.request({
      url: 'https://www.wanyangculture.com/php/classfy_book.php',
      method: "POST", //get为默认方法/POST
      header: { //请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        type: this.data.type,
        fir: 0
      },

      success: function (res) {
        console.log("这里是返回分类数据")
        console.log(res);
        console.log(res.data)
        that.setData({
          list: res.data,
          list0: res.data
        })
        var N = new Array();
        for (var i = 0; i < that.data.list.length; i++) {
          wx.request({
            url: 'https://www.wanyangculture.com/php/show_book.php',
            data: { //发送给后台的数据
              bookid: that.data.list[i].bookid,
            },

            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",

            success: function (res) {
              console.log(res.data)
              N.push(res.data)
              console.log(N)
              that.setData({
                list: N
              })
              console.log(that.data.list)
            },
            fail: function (err) { }, //请求失败
            complete: function () { } //请求完成后执行的函数
          })
        }


        console.log(that.data.list)
        var list_url_0 = new Array()
        for (var i in that.data.list0) {
          let id = that.data.list0[i].bookid
          let url = "https://www.wanyangculture.xyz/book/" + String(id) + ".jpg"
          list_url_0.push(url)
        }

        download.downloadSaveFiles({
          urls: list_url_0,
          success: function (res) {
            let list_0 = that.data.list0
            for (var j in list_0) {
              list_0[j].tag = res[j]
            }
            that.setData({
              list0: list_0
            })
          },
          fail: function (e) {
            console.info("下载失败");
          }
        })

        console.log(that.data.list0)
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