var app = getApp()
var Util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reputations: null,
    reputationStr:"",
    commentid:null,
    userpic:"../images/user1.png"
  },

  bindCommentInput: function(e){
    this.setData({
      reputationStr:e.detail.value
    })
  },

//提交书评
  toSubmit: function(){
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
    } else {
      if (this.data.reputationStr == null) {
        wx.showToast({
          title: '评论内容不能为空',
          icon: "none"
        })
      }
      else {
        var that = this
        let uid = app.appData.userinfo[0].phonenum
        wx.request({
          url: 'https://www.wanyangculture.com/php/cmt_cmt.php',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            uid: uid,
            commentid: that.data.commentid,
            reputationStr: that.data.reputationStr
          },
          method: "POST",
          success: (res) => {

            console.log(res.data)
            if (res.data == "1") {
              that.setData({
                reputationStr: ""
              })
              that.GetComments()
            }
          }
        })
      }
    }
    if(this.data.reputationStr == null){
      wx.showToast({
        title: '评论内容不能为空',
        icon:"none"
      })
    }
    else{
      var that = this
      let uid = app.appData.userinfo[0].phonenum
      wx.request({
        url: 'https://www.wanyangculture.com/php/cmt_cmt.php',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          uid: uid,
          commentid: that.data.commentid,
          reputationStr: that.data.reputationStr
        },
        method: "POST",
        success: (res) => {

          console.log(res.data)
          if(res.data == "1"){
            that.setData({
              reputationStr: ""
            })
            that.GetComments()
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取到当前的commentid
    this.setData({
      commentid:options.commentid
    })
    //获取评论
    this.GetComments()
  },

  GetComments: function(){
    var that = this
    wx.request({
      url: 'https://www.wanyangculture.com/php/ret_cmt_cmt.php',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        commentid: that.data.commentid
      },
      method: "POST",
      success: (res) => {
        var tempComments = res.data
        console.log(res)
       
        for (let i = 0; i < 20; i++) {
          if (tempComments[i] != null) {
            tempComments[i].cmt_time = Util.formatTime(new Date(tempComments[i].cmt_time * 1000))
          }
          else break
        }
        for(let i=0;i<20;i++){
          if (tempComments[i] != null) {
            wx.request({
              url: 'https://www.wanyangculture.com/php/show_person.php',
              method: "POST",
              data: {
                uid: tempComments[i].uid
              },
              header: {//请求头
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              success: function (res) {
                console.log("这里是获取评论的评论的相关")
                console.log(res.data.nickname)
              },
              fail: function (err) { },//请求失败
              complete: function (res) {
                tempComments[i].nickname=res.data.nickname
                console.log(tempComments)
                that.setData({
                  reputations: tempComments
                })
              }//请求完成后执行的函数
            })
            let downloaduserid = tempComments[i].uid
            console.log(downloaduserid)
            let url = "https://www.wanyangculture.xyz/userinfo/" + String(downloaduserid) + "avatar" + ".png"
            console.log(url)
            wx.downloadFile({
              url: url,
              success: (res) => {
                console.log(res)
                let image_url = res.tempFilePath
                console.log(res.tempFilePath)
                tempComments[i].avatar = image_url          
              },
              complete:function(){
                that.setData({
                  reputations: tempComments
                })
              }
            })
          }  
        }
        console.log("zhehzhehehhhhhhhhhhhhhhhhhhhhhh")
        console.log(tempComments)
        that.setData({
          reputations: tempComments
        })
      },
      complete:function(){
        console.log(that.data.reputations)
        that.setData({
          reputations: tempComments
        })
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