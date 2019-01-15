var app = getApp();
var hostDomain = 'https://www.wanyangculture.com'

var download = require("../../utils/download.js")
Page({
  data: {
    currentTab: 0,
    items: [
      { name: 'male', value: '男' },
      { name: 'famale', value: '女' },
    ],
    nickname: null,
    phonenum: null,
    phonenumSta: null,
    weixinnum: null,
    weixinnumSta: null,
    username: null,
    sex: null,
    birthday: null,
    localplace: null,
    signature: null,
    follow: true,
    col_uid: null,
    imageback:"../images/logo.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      col_uid: options.col_uid
    })
    console.log(this.data.col_uid)
    var that = this
    wx.request({
      url: 'https://www.wanyangculture.com/php/show_person_guanzhu.php',
      method: "POST",
      data: {
        uid: app.appData.userinfo[0].phonenum,
        col_uid: that.data.col_uid
      },
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res)
        if (res.data == 1) {
          //显示关注
          that.setData({
            follow: false
          })
        } else {
          that.setData({
            follow: true
          })
        }

      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })

    wx.request({
      url: 'https://www.wanyangculture.com/php/guanzhu_num.php',
      method: "POST",
      data: {
        uid: that.data.col_uid
      },
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log("显示关注的人数")
        console.log(res)
        console.log(res.data)
        var num=res.data
        console.log(num[0])
        console.log(num[1])
        that.setData({
          gnum:num[1],
          bnum:num[0]
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
    // wx.request({
    //   url: 'https://www.wanyangculture.com/php/show_lend.php',
    //   method: "POST",//get为默认方法/POST
    //   header: {//请求头
    //     'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //   },
    //   data: {
    //     uid: options.col_uid

    //   },
    //   success: function (res) {
    //     console.log(res);
    //     that.setData({
    //       list: res.data
    //     })


    //     var book_url_0 = new Array()
    //     for (var i in that.data.list) {
    //       let id = that.data.list[i].bookid
    //       let url = "https://www.wanyangculture.xyz/book/" + String(id) + ".jpg"
    //       book_url_0.push(url)
    //     }

    //     //调用封装方法实现多图片的下载，而且在appData中的数据顺序是正确的
    //     download.downloadSaveFiles({
    //       urls: book_url_0,
    //       success: function (res) {
    //         that.setData({
    //           bookpicture: res
    //         })
    //       },
    //       fail: function (e) {
    //         console.info("下载失败");
    //       }
    //     })

    //   },
    //   fail: function (err) { },//请求失败
    //   complete: function () { }//请求完成后执行的函数
    // })
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

    wx.request({
      url: 'https://www.wanyangculture.com/php/show_person.php',
      method: "POST",
      data: {
        uid: that.data.col_uid
      },
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log("ffffffffffffffffffffffffffffffffffff")
        let info = res.data
        console.log(info)
        switch (res.data.usertype) {
          case "0": {
            that.setData({
              biaoqian: "普通用户"
            });
            break;
          }

          case "1":
            {
              that.setData({
                biaoqian: "杂志月卡"
              });
              break;
            }
          case "2":
            {
              that.setData({
                biaoqian: "杂志年卡"
              });
              break;
            }
          case "3":
            {
              that.setData({
                biaoqian: "全品类月卡"
              });
              break;
            }
          case "4":
            {
              that.setData({
                biaoqian: "全品类年卡"
              });
              break;
            }
        }
        that.setData({
          nickname: info.nickname,
          username: that.data.col_uid,
          phonenum: that.data.col_uid,
          weixinnum: info.wechat,
          sex: info.sex,
          birthday: info.birthday,
          localplace: info.address,
          signature: info.signature
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })

    let downloaduserid = that.data.col_uid
    console.log(downloaduserid)
    let url = "https://www.wanyangculture.xyz/userinfo/" + String(downloaduserid) + "avatar" + ".png"
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
      },
      fail:function(){
        console.log("false")
      }
    }),
    // let downloaduserid = app.appData.userinfo[0].phonenum
    console.log(downloaduserid)
    let urlback = "https://www.wanyangculture.xyz/userback/" + String(downloaduserid) + "back" + ".png"
    console.log(urlback)
    wx.downloadFile({
      url: urlback,
      success: (res) => {
        console.log("this is success")
        console.log(res)
        let image_urlback = res.tempFilePath
        console.log(res.tempFilePath)
          that.setData({
            imageback: image_urlback
          })
      
      }
    }),
    wx.request({
      url: 'https://www.wanyangculture.com/php/show_lend.php',
      method: "POST",//get为默认方法/POST
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        uid: that.data.col_uid
      },
      success: function (res) {
        console.log(res);
        that.setData({
          list: res.data
        })
        var book_url_0 = new Array()
        for (var i in that.data.list) {
          let id = that.data.list[i].bookid
          let url = "https://www.wanyangculture.xyz/book/" + String(id) + ".jpg"
          book_url_0.push(url)
        }

        //调用封装方法实现多图片的下载，而且在appData中的数据顺序是正确的
        download.downloadSaveFiles({
          urls: book_url_0,
          success: function (res) {
            that.setData({
              bookpicture: res
            })
          },
          fail: function (e) {
            console.info("下载失败");
          }
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
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
  onShareAppMessage: function () {

  },
  
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  // 点击标题切换当前页时改变样式
  switchNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  follow: function () {
    var that = this
    console.log(that.data.col_uid)
    let uid = app.appData.userinfo[0].phonenum
    console.log(uid)
    if (app.appData.userinfo[0].Sta == false) {
      wx.showToast({
        title: '您还未注册',
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
      that.data.follow = that.data.follow ? false : true
      // var uid = app.appData.userinfo[0].phonenum;
      wx.request({
        url: 'https://www.wanyangculture.com/php/change_collect_person.php',
        method: "POST",//get为默认方法/POST
        header: {//请求头
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: {
          uid: app.appData.userinfo[0].phonenum,
          col_uid: that.data.col_uid
        },
        success: function (res) {
          console.log(res.data);
          if (res.data == 0) {
            wx.showToast({
              title: '取消关注成功',
              icon: 'success',
              duration: 1000,
              // mask: true
            })
          } else if (res.data == 2) {
            console.log("shoushoushoushsou")
            wx.showToast({
              title: '关注成功',
              icon: 'success',
              duration: 1000,
              // mask: true
            })
          }
        },
        fail: function (res) { },
        complete: function (res) {
          that.setData({
            follow: that.data.follow
          });
        },
      })
    }
   
    //当前用户未关注的情况
    // if (this.data.followState == '未关注') {
    //   wx.request({
    //     url: hostDomain + '/php/collect_person.php',
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //     },
    //     data: {
    //       uid: uid,
    //       col_uid: that.data.col_uid
    //     },
    //     method: 'POST',
    //     success: (res) => {
    //       //关注成功
    //       console.log(res)
    //       if (res.data == "1") {
    //         wx.showToast({
    //           title: '关注成功',
    //         })
    //       }
    //       else {
    //         wx.showToast({
    //           title: '该用户已关注！',
    //         })
    //       }
    //       that.setData({
    //         followState: '已关注'
    //       })
    //     }
    //   })
    // }
    // //已关注当前用户的情况
    // else {
    //   wx.request({
    //     url: hostDomain + '/php/cancel_collect_person.php',
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //     },
    //     data: {
    //       uid: uid,
    //       col_uid: that.data.col_uid
    //     },
    //     method: 'POST',
    //     success: (res) => {
    //       console.log(res)
    //       if (res.data == "1") {
    //         wx.showToast({
    //           title: '取消关注成功',
    //         })
    //       }
    //       else {
    //         wx.showToast({
    //           title: '还未关注该用户',
    //         })
    //       }
    //       that.setData({
    //         followState: '未关注'
    //       })
    //     }
    //   })
    // }

  }
})