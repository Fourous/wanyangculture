const uploadImage = require('../../utils/UploadAliyun.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    temp: 0,
    bookName: null,
    bookAuthor: null,
    imgs: ["../images/catchphpoto.png",
      "../images/catchphpoto.png",
      "../images/catchphpoto.png"],
    changeTags: [false, false, false],
  },

  /**
   * 生命周期函数--监听页面加载
   * option：页面跳转所带过来的参数
   */
  onLoad: function (options) {
    let bookInfo = JSON.parse(options.bookInfoStr)
    console.log(bookInfo)
    //获取到图书信息
    this.setData({
      bookName: bookInfo.title,
      bookAuthor: bookInfo.author
    })
  },

  bindImgPositiveTap: function () {
    var that = this
    wx.chooseImage({
      success: function (res) {
        let tags = that.data.changeTags
        let tempImgs = that.data.imgs
        let currentImg = res.tempFilePaths[0]
        tempImgs[0] = currentImg
        tags[0] = true
        that.setData({
          imgs: tempImgs,
          changeTags: tags,
        })
        console.log(that.data.imgs)
      },
    })
  },

  bindImgNegativeTap: function () {
    var that = this
    wx.chooseImage({
      success: function (res) {
        let tempImgs = that.data.imgs
        let tags = that.data.changeTags
        let currentImg = res.tempFilePaths[0]
        tempImgs[1] = currentImg
        tags[1] = true
        that.setData({
          imgs: tempImgs,
          changeTags: tags,
        })
        console.log(that.data.imgs)
      },
    })
  },

  bindImgContentTap: function () {
    var that = this
    wx.chooseImage({
      success: function (res) {
        let tags = that.data.changeTags
        let tempImgs = that.data.imgs
        let currentImg = res.tempFilePaths[0]
        tempImgs[2] = currentImg
        tags[2] = true
        that.setData({
          imgs: tempImgs,
          changeTags: tags
        })
        console.log(that.data.imgs)
      },
    })
  },
  cancelImg: function (op) {
    console.log(op);
    var id = op.currentTarget.dataset.id;
    var that = this;
    that.data.imgs[id] = "../images/catchphpoto.png";
    that.setData({
      imgs: that.data.imgs
    });
  },
  //提交捐书申请
  //新增内容：上传三张照片至服务器用于审核，需要重新做一个界面
  bindSureTap: function () {
    var that=this
    //检查用户是否已经选择了三张照片
    let imgs = this.data.imgs
    let tags = this.data.changeTags
    wx.request({
      url: 'https://www.wanyangculture.com/php/donate_book.php',
      method: "POST",
      data: {
        uid: app.appData.userinfo[0].phonenum
      },
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
         var shareid=res.data
        if (tags[0] && tags[1] && tags[2]){
          for (var i = 0; i < 3; i++) {
            if (tags[i]) {
              uploadImage({
                //上传格式是shareid唯一标志
                fileName: app.appData.userinfo[0].phonenum + "_" + shareid + "_" + String(i)+".jpg",
                filePath: imgs[i],
                dir: 'donateBook/',
                success: function (res) {
                  // 捐书完成之后，跳出成功提示
                  wx.showToast({
                    title: '捐书成功',
                    icon: 'success',
                    duration: 1000
                  })
                  wx.navigateBack({

                  })
                },
                fail: function (res) {

                }
              })
            }
            else {
              //缺少三张时候
              wx.showToast({
                title: '照片缺少',
                icon: '../images/panda.png',
                image: '../images/panda.png',
                duration: 1500,
                mask: true,
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            }
          }
         }else {
          wx.showToast({
            title: '照片缺少',
            icon: '../images/panda.png',
            image: '../images/panda.png',
            duration: 1500,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
         }


      },
      fail: function (err) { },//请求失败
      complete: function () {

       }//请求完成后执行的函数
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