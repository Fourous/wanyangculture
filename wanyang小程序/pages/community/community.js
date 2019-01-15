var Util = require('../../utils/util.js')
var app = getApp()
var hostDomain = 'https://www.wanyangculture.com'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: null,
    current: 0,
    collectStatu: null,
    mark:true,
    collectcom:true,
    x:null,
    y:null,
    z:null,
    commentid:0,
    imagebook:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetComments()
  },

  //获得相关书评数据
  GetComments: function () {
    var that = this
    wx.showLoading({
      title: '书评加载中',
      mask: true,
      duration: 1000
    })
    //调用获取书评接口获得最新书评
    //需要提供uid参数
    wx.request({
      url: hostDomain + '/php/show_new_comment.php',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        uid: app.appData.userinfo[0].phonenum
      },
      success: (res) => {
        //显示第一条书评对于当前用户的收藏状态
        let tempComments = res.data
        console.log(tempComments)
        that.setData({
          collectStatu: (tempComments[0].state) == 0 ? 0 : 1
        })
        //将时间戳格式的时间转化为年月日的格式
        for (let i = 0; i < 5; i++) {
          if (tempComments[i] != null) {
            var tempArray = Util.formatTime(new Date(tempComments[i].comment_time * 1000))
            that.setData({
              x:tempArray[0],
              y:tempArray[1],
              z:tempArray[2]
            })
          }
          else break
        }
        
        //下载全部书评配图，图片名字格式为uid.jpg
        // let downloadComment_uid = tempComments[0].commentid
        // let url = "https://www.wanyangculture.xyz/user/" + String(downloadComment_uid) + ".jpg"
        // wx.downloadFile({
        //   url: url,
        //   success: (res) => {
        //     let temp = res.tempFilePath
        //     let current = that.data.current
        //     tempComments[current].img_url = temp
        //     console.log(tempComments)
        //     that.setData({
        //       comments: tempComments
        //     })
        //   }
        // })
        // wx.hideLoading()
        for(let i =0; i<5;i++){
          let downloadComment_uid = tempComments[i].commentid
          let url = "https://www.wanyangculture.xyz/user/" + String(downloadComment_uid) + ".jpg"
          wx.downloadFile({
          url: url,
          success: (res) => {
            let temp = res.tempFilePath
            let current = that.data.current
            tempComments[i].img_url = temp
            console.log(tempComments)
            that.setData({
              comments: tempComments
            })
          }
        })
          
        }
        
        console.log("这里是评论"+that.data.comments);
      }
    })
  },


  //滑动事件的触发函数，需要一直更新current，用于表示相应书评信息的数组下标
  handleChange: function (e) {
    var that = this
    let current = e.detail.current
    let commentCount = this.data.comments.length
    if (current == commentCount) {
      this.GetComments()
      //刷新返回第一个item
      this.setData({
        current: 0
      })
    }
    //更新当前的下标,更新书评的收藏状态
    else {
      this.setData({
        current: current,
        collectStatu: that.data.comments[current].state
      })

      // let tempComments = that.data.comments
      // let downloadComment_uid = tempComments[current].commentid
      // let url = "https://www.wanyangculture.xyz/user/" + String(downloadComment_uid) + ".jpg"
      // that.setData({
      //   commentid: downloadComment_uid
      // })
      // wx.downloadFile({
      //   url: url,
      //   success: (res) => {
      //     let temp = res.tempFilePath
      //     let current = that.data.current
      //     tempComments[current].img_url = temp
      //     that.setData({
      //       comments: tempComments
      //     })
      //   }
      // })
    }
  },

  //收藏按钮触发事件
  bindCollectTap: function () {
    var that = this
    let uid = app.appData.userinfo[0].phonenum   //当前用户id
    let current = this.data.current
    let comment_uid = this.data.comments[current].uid  //书评作者id
    let commentid = this.data.comments[current].commentid
    console.log(comment_uid)
    console.log(commentid)
    console.log(this.data.collectStatu)
    //收藏书评
    
    if (this.data.collectStatu == 0) {
      wx.request({
        url: hostDomain + '/php/collect_comment.php',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          uid: uid,
          commentid: commentid
        },
        method: 'POST',
        success: (res) => {
          console.log(res)
          if (res.data == "1") {
            wx.showToast({
              title: '收藏成功',
            })
            let tempComment = that.data.comment
            tempComment[current].state = 1
            that.setData({
              collectStatu: 1,
              comment: tempComment
            })
          }
          else {
            wx.showToast({
              title: '请不要重复收藏',
            })
          }
        }
      })
    }
    //取消收藏书评
    else if (this.data.collectStatu == 1) {
      wx.request({
        url: hostDomain + '/php/cancel_collect_comment.php',
        data: {
          uid: uid,
          commentid: commentid
        },
        method: 'POST',
        success: (res) => {
          console.log(res)
          if (res.data == 1) {
            wx.showToast({
              title: '取消收藏成功',
            })
            let tempComment = that.data.comment
            tempComment[current].state = 0
            that.setData({
              collectStatu: 0,
              comment: tempComment
            })
          }
          else {
            wx.showToast({
              title: '还未收藏本书评',
            })
          }
        }
      })
    }
    //同时上传服务器收藏状态更新状态

  },

  bindEditBtnTap: function () {
    wx.navigateTo({
      url: '../commentWriting/commentWriting',
    })
  },

  bindAuthorTap: function () {
    let tempComemnt = this.data.comments
    let current = this.data.current
    let col_uid = tempComemnt[current].uid
    wx.navigateTo({
      url: '../commentuserdetail/commentuserdetail?col_uid=' + col_uid,
    })
  },

  bindReputationTap: function () {
    let tempComemnt = this.data.comments
    let current = this.data.current
    let commentid = tempComemnt[current].commentid
    wx.navigateTo({
      url: '../commentComment/commentComment?commentid=' + commentid,
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
    var that = this
    let uid = app.appData.userinfo[0].phonenum   //当前用户id
    let current = this.data.current
    let comment_uid = this.data.comments[current].uid  //书评作者id
    let commentid = this.data.comments[current].commentid
    wx.request({
      url: hostDomain + '/php/show_comment_guanzhu.php',
      data: {
        uid: uid,
        commentid: commentid
      },
      method: 'POST',
      success: (res) => {
        console.log("这是收藏的相关")
        console.log(res)
        if (res.data == 1) {
          let tempComment = that.data.comment
          // tempComment[current].state = 0
          tempComment[current].collectcom = true
          that.setData({
            // collectStatu: 0,

            comment: tempComment
          })
        }
        else {
          console.log("未收藏状态")
        }
      }
    })
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
  // onShareAppMessage: function () {

  // },
  mark:function(){
    console.log("mark")
    // var that=this
    // this.data.mark = this.data.mark ? false : true;
    this.data.mark=this.data.mark?false:true
    this.setData({
      mark:this.data.mark
    })
    console.log(this.data.mark)
  },
  collectcom:function(){
    var that = this
    that.data.collectcom = that.data.collectcom ? false : true;
    that.setData({
      collectcom: that.data.collectcom
    })
  },
  onShareAppMessage:function(res){
    var that=this;
    let tempComemnt = that.data.comments
    let current = that.data.current
    let commentid = tempComemnt[current].commentid
    let url = "https://www.wanyangculture.xyz/user/" + String(commentid ) + ".jpg"
    wx.downloadFile({
      url: url,
      success: (res) => {
        let temp = res.tempFilePath
        that.setData({
          imagebook: temp
        })
      }
    })
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
      console.log(res.target);
      return {
        title: '万洋文化',
        path: '/pages/commentde/commentde?id=' + commentid ,
        imageUrl: that.data.imagebook,
        success: (res) => {
          console.log("转发成功", res);
          wx.showToast({
            title: '转发成功',
            icon: 'success',
            duration: 1000
          })
          console.log(that.data.commentid)
        },
        fail: (res) => {
          console.log("转发失败", res);
          wx.showToast({
            title: '转发失败',
            icon: 'false',
            duration: 1000
          })
        }
      }
    }
    else {
      console.log("来自右上角转发菜单")
      return {
        title: '万洋文化',
        path: '/pages/logs/logs',
        imageUrl: "/pages/images/deer.png",
        success: (res) => {
          console.log("转发成功", res);
          wx.showToast({
            title: '转发成功',
            icon: 'success',
            duration: 1000
          })
        },
        fail: (res) => {
          console.log("转发失败", res);
          wx.showToast({
            title: '转发失败',
            icon: 'false',
            duration: 1000
          })
        }
      }
    }

  },

})