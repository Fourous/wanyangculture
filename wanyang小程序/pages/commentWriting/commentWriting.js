var app = getApp()
var hostDomain = 'https://www.wanyangculture.com'
const uploadImage = require('../../utils/UploadAliyun.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookname: null,
    comment: null,
    tempFilePaths: null,
    btnType: "提交书评",
    imgs: [
      "../images/catchphpoto.png"
    ],
    changeTags: [false]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    // console.log(bookname)
    that.setData({
      bookname: options.bookname
    })
   console.log(that.data.bookname)
  },

  // booknameInput: function(e){
  //   this.setData({
  //     bookname: e.detail.value
  //   })
  // },

  commentInput: function (e) {
    this.setData({
      comment: e.detail.value
    })
  },

  //根据bookname提交书评接口还未给出
  submitBtnTap: function (e) {
    var that = this
    if (that.data.btnType == "提交书评") {
      // let tempFilePaths = res.tempFilePaths
      var uid = app.appData.userinfo[0].phonenum
      //var timestamp = Date.parse(new Date)/1000
     
      let uid = app.appData.userinfo[0].phonenum;
      wx.request({
        url: hostDomain + '/php/book_comment.php',
        //提交的数据
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: {
          uid: app.appData.userinfo[0].phonenum,
          bookname: that.data.bookname,
          comment: that.data.comment
        },
        method: "POST",
        success: (res) => {
          console.log(res)
          var id = res.data
          uploadImage({
            fileName: id + '.jpg',
            filePath: that.data.imgs[0],
            dir: 'user/',   //阿里云上保存照片的目录
            success: function (res) {
              that.setData({
                btnType: '提交书评',
                // tempFilePaths: tempFilePaths
              }),
                wx.showToast({
                  title: '发表成功',
                  icon: 'success',
                  duration: 2000
                })
            },
            fail: function (res) {
              console.log(res)
            }
          })
          wx.navigateBack({
          })
        }
      })
    }
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
  cancelImg: function (op) {
    console.log(op);
    var id = op.currentTarget.dataset.id;
    var that = this;
    that.data.imgs[id] = "../images/catchphpoto.png";
    that.setData({
      imgs: that.data.imgs
    });
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