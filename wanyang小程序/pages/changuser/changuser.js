// pages/changuser/changuser.js
var app = getApp();
const uploadImage = require('../../utils/UploadAliyun.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-11-08',
    buttonder:1,
    username: null,
    weixinnum: null,
    weixinnumSta: null,
    phonenumSta: null,
    signature: null,
    sex: null,
    birthday: null,
    localplace: null,
    email: null,
    array:['男','女'],
    index:0,
    tempFilePaths: null,
    changeTags: [false],
    // imgs: [],
    ims:'',
    image:'../images/pig.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
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
        // 下载成功才能更改前端的内容
          if(res.statusCode==200){
            that.setData({
              image: image_url
            })
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
    //   var that=this
    //   that.setData({
    //     username: app.appData.userinfo[0].nickname,
    //     weixinnum: app.appData.userinfo[0].weixinnum,
    //     weixinnumSta: app.appData.userinfo[0].weixinnumSta,
    //     phonenumSta: app.appData.userinfo[0].phonenumSta,
    //     signature: app.appData.userinfo[0].signature,
    //     sex: app.appData.userinfo[0].sex,
    //     birthday: app.appData.userinfo[0].birthday,
    //     localplace: app.appData.userinfo[0].localplace,
    //     email: app.appData.userinfo[0].email
    //   })
    //   var index=this.data.index
    //   if(this.data.sex=='男'){
    //     this.setData({
    //       index:0
    //     })
    //   }
    //   else{
    //     index: 1
    //   }
    //   console.log(index)
    // let downloaduserid = app.appData.userinfo[0].phonenum
    // console.log(downloaduserid)
    // let url = "https://www.wanyangculture.xyz/userinfo/" + String(downloaduserid) + "avatar" + ".png"
    // console.log(url)
    // wx.downloadFile({
    //   url: url,
    //   success: (res) => {
    //     console.log(res)
    //     let image_url = res.tempFilePath
    //     console.log(res.tempFilePath)
    //     if (app.appData.userinfo[0].Sta == false) {
    //       var avatarwx = this.data.userInfo.avatarUrl
    //       that.setData({
    //         image: avatarwx
    //       })
    //     } else {
    //       that.setData({
    //         image: image_url
    //       })
    //     }
    //   }
    // })
    var that = this
    that.setData({
      username: app.appData.userinfo[0].nickname,
      weixinnum: app.appData.userinfo[0].weixinnum,
      weixinnumSta: app.appData.userinfo[0].weixinnumSta,
      phonenumSta: app.appData.userinfo[0].phonenumSta,
      signature: app.appData.userinfo[0].signature,
      sex: app.appData.userinfo[0].sex,
      birthday: app.appData.userinfo[0].birthday,
      localplace: app.appData.userinfo[0].localplace,
      email: app.appData.userinfo[0].email
    })
    var index = this.data.index
    if (this.data.sex == '男') {
      this.setData({
        index: 0
      })
    }
    else {
      this.setData({
        index: 1
      })
    }
    console.log(index)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("hide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // 这是页面卸载，在页面消失的时候上传所有信息

    console.log("onunload")

   
      // wx.showModal({
      //   title: '万洋提示您',
      //   content: '返回更改将丢失是否确定返回',
      //   success: function (res) {
      //     if (res.confirm) {//这里是点击了确定以后
      //       console.log('用户点击确定')
      //       wx.redirectTo({
      //         url: '../info/info',
      //       })
      //     } else {//这里是点击了取消以后
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
    
   
    
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

  chnickname:function(){
    wx.navigateTo({
      url: '../changuserone/changuserone?message=' + this.data.username + '&type=0',
    })
  },
  bindsexch:function(e){
    this.setData({
      index:e.detail.value
    })
    app.appData.userinfo[0].sex = this.data.array[this.data.index];
  },
  chwechat: function () {
    wx.navigateTo({
      url: '../changuserone/changuserone?message=' + this.data.weixinnum+'&type=1',
    })
  },
  chsign: function () {
    wx.navigateTo({
      url: '../changuserone/changuserone?message=' + this.data.signature + '&type=2',
    })
  },
  exadress: function () {
    wx.navigateTo({
      url: '../changuserone/changuserone?message=' + this.data.localplace + '&type=3',
    })
  },
  chemail: function () {
    wx.navigateTo({
      url: '../changuserone/changuserone?message=' + this.data.email + '&type=4',
    })
  },
  chbirth:function(e){
    console.log(e)
    var date = String(e.detail.value)
    this.setData({
      date: date
    })
    app.appData.userinfo[0].birthday=this.data.date
  },

  chavatar:function(){
    var that = this
    wx.chooseImage({
      success: function (res) {
        let image = res.tempFilePaths[0]
        that.setData({
          image: image
        })
        console.log(that.data.imgs)
      },
    })

  },

  savachange:function() {
    var that=this
  this.data.buttonder=0
   this.setData({
     buttonder: this.data.buttonder
    })
    //这里通过页面栈来实现回退
    var pages = getCurrentPages()
    var tempPage = pages[pages.length - 2]
    var uid = app.appData.userinfo[0].phonenum
    wx.request({
      url: 'https://www.wanyangculture.com/php/change_person_info.php',
      method: "POST",
      data: {
        uid: app.appData.userinfo[0].phonenum,
        nickname: app.appData.userinfo[0].nickname,
        introduction: app.appData.userinfo[0].signature,
        xingbie: app.appData.userinfo[0].sex,
        birthday: app.appData.userinfo[0].birthday,
        address: app.appData.userinfo[0].localplace,
        wechat: app.appData.userinfo[0].weixinnum,
        email: app.appData.userinfo[0].email
      },
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res)
        console.log(app.appData.userinfo[0].sex)
        if (res.data == 1) {
          //上传图片
          uploadImage({
            fileName: uid + 'avatar' + '.png',
            filePath: that.data.image,
            dir: 'userinfo/',   //阿里云上保存照片的目录
            success: function (res) {
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2000
              })
            },
            fail: function (res) {
              console.log(res)
            }
          })
          // wx.showToast({
          //   title: '修改成功',
          //   icon: 'success',
          //   duration: 2000
          // })
        } 
        else {
          wx.showToast({
            title: '修改失败',
            icon: 'fail',
            duration: 2000
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
   


  }
})