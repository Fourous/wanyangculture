// pages/personoption/sharemybook/sharemybook.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share_book: null,
    image:[],
    temp:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var downloaduserid = app.appData.userinfo[0].phonenum
    var temp = new Array()//三位的数组
    wx.request({
      url: 'https://www.wanyangculture.com/php/usersharebook.php',
      method: "POST",
      data: {
        uid: app.appData.userinfo[0].phonenum
      },
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          share_book: res.data
        })
        var share = new Array()
        share = that.data.share_book
        for (var i = 0; i < that.data.share_book.length; i++) {
          if (that.data.share_book[i][3] == 'N') {
            share[i][3] = '未审核'
          } 
          else {
            share[i][3] = '已审核'
          }
             let shareid = that.data.share_book[i][1]
            console.log(shareid)
            for(let j=0;j<3;j++){
            var url = "https://www.wanyangculture.xyz/donateBook/" + String(downloaduserid) + "_" + shareid + "_" + String(j) + ".jpg"
            console.log(url)
            wx.downloadFile({
              url: url,
              success: (res) => {
                console.log(res)
                let image_url = res.tempFilePath
                temp[shareid] = that.data.image
                temp[shareid][j] = image_url
                that.setData({
                  temp: temp
                })
              }
            })
          }
        }
        that.setData({
          share_book: share
        })
        console.log(that.data.share_book)
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
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
  toscan: function () {
    wx.navigateTo({
      url: '../../testscan/testscan',
    })
  },
  // sao1: function () {
  //   // let box_id = "01"
  //   // let door_id = "01"
  //   // let uid = app.appData.userinfo[0].phonenum
  //   wx.request({
  //     url: "https://www.wanyangculture.com/php/open_door.php",
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  //     },
  //     data: {
  //       box_id: "01",
  //       door_id: "01",
  //       uid: "12345678910"
  //     },
  //     method: "POST",
  //     success: (res) => {
  //       console.log(res);
  //     }
  //   })
  // },
  // sao2: function () {
  //   // let box_id = "01"
  //   // let door_id = "01"
  //   // let uid = app.appData.userinfo[0].phonenum
  //   wx.request({
  //     url: "https://www.wanyangculture.com/php/open_door.php",
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  //     },
  //     data: {
  //       box_id: "01",
  //       door_id: "02",
  //       uid: "12345678910"
  //     },
  //     method: "POST",
  //     success: (res) => {
  //       console.log(res);
  //     }
  //   })
  // },
  // sao3: function () {
  //   // let box_id = "01"
  //   // let door_id = "01"
  //   // let uid = app.appData.userinfo[0].phonenum
  //   wx.request({
  //     url: "https://www.wanyangculture.com/php/open_door.php",
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  //     },
  //     data: {
  //       box_id: "01",
  //       door_id: "03",
  //       uid: "12345678910"
  //     },
  //     method: "POST",
  //     success: (res) => {
  //       console.log(res);
  //     }
  //   })
  // },
  // sao4: function () {
  //   // let box_id = "01"
  //   // let door_id = "01"
  //   // let uid = app.appData.userinfo[0].phonenum
  //   wx.request({
  //     url: "https://www.wanyangculture.com/php/open_door.php",
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  //     },
  //     data: {
  //       box_id: "01",
  //       door_id: "04",
  //       uid: "12345678910"
  //     },
  //     method: "POST",
  //     success: (res) => {
  //       console.log(res);
  //     }
  //   })
  // },
  // sao5: function () {
  //   // let box_id = "01"
  //   // let door_id = "01"
  //   // let uid = app.appData.userinfo[0].phonenum
  //   wx.request({
  //     url: "https://www.wanyangculture.com/php/open_door.php",
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  //     },
  //     data: {
  //       box_id: "01",
  //       door_id: "05",
  //       uid: "12345678910"
  //     },
  //     method: "POST",
  //     success: (res) => {
  //       console.log(res);
  //     }
  //   })
  // }

})