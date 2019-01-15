var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    content: null,
    choose: true,
    bookid: '',
    image:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    that.setData({
      bookid: options.id
    })

    let downloaduserid = that.data.bookid
    console.log(downloaduserid)
    let url = "https://www.wanyangculture.xyz/book/" + downloaduserid+".jpg"
    console.log(url)
    wx.downloadFile({
      url: url,
      success: (res) => {
        console.log(res)
        let image_url = res.tempFilePath
        console.log(res.tempFilePath)
        that.setData({
          image: image_url
        })
        // if (app.appData.userinfo[0].Sta == false) {
        //   //var avatarwx = this.data.userInfo.avatarUrl
        //   // that.setData({
        //   //   image: avatarwx
        //   // })
        // } else {
        //   var image=that.data.image
        // }
      }
    })
    wx.request({
      url: 'https://www.wanyangculture.com/php/show_book.php',
      data: {//发送给后台的数据
        bookid: options.id,
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
        // "Content-Type": "application/json"
      },
      method: "POST",//get为默认方法/POST

      success: function (res) {
        var book=res.data
        book=book[0]
        console.log(book[0])
        console.log(res)
        console.log(res.data)
        console.log(res.data.bookname)
        that.setData({
          book: book
        })
        console.log(that.data.book)
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
    console.log(that.data.book)
    wx.request({
      url: 'https://www.wanyangculture.com/php/user_collect_book.php',
      data: {//发送给后台的数据
        uid: app.appData.userinfo[0].phonenum,
        bookid: that.data.bookid,
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
        // "Content-Type": "application/json"
      },
      method: "POST",//get为默认方法/POST
      success: function (res) {
       console.log(res)
       if(res.data==1){
         //显示已经收藏
        that.setData({
          choose:false
        })

       }else {
         that.setData({
           choose: true
         })
       }
        // that.setData({
        //   book: book
        // })
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
  collect: function () {
    var that = this;
    that.data.choose = that.data.choose ? false : true;
    var uid = app.appData.userinfo[0].phonenum;
    if (app.appData.userinfo[0].Sta == false) {
      wx.showToast({
        title: ' 您还未注册',
        icon: '../images/panda.png',
        image: '../images/panda.png',
        duration: 1500,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    else {
      wx.request({
        url: 'https://www.wanyangculture.com/php/change_collect_book.php',
        method: "POST",//get为默认方法/POST
        header: {//请求头
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: {
          uid: app.appData.userinfo[0].phonenum,
          bookid: this.data.bookid
        },
        success: function (res) {
          console.log(res.data);
          if (res.data == 0) {
            wx.showToast({
              title: '取消收藏成功',
              icon: 'success',
              duration: 1000,
              // mask: true
            })
          } else if (res.data == 2) {
            console.log("shoushoushoushsou")
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 1000,
              // mask: true
            })
          }
        },
        fail: function (res) { },
        complete: function (res) {
          that.setData({
            choose: that.data.choose
          });
        },
      })
    }
    // that.data.choose = that.data.choose ? false : true;
    // var uid = app.appData.userinfo[0].phonenum;
   
  },
  write:function(){
    if (app.appData.userinfo[0].Sta == false) {
      wx.showToast({
        title: ' 您还未注册',
        icon: '../images/panda.png',
        image: '../images/panda.png',
        duration: 1500,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
     else {
      wx.navigateTo({
        url: '../commentWriting/commentWriting?bookname=' + this.data.book.bookname,
      })
    }
   
  }
})