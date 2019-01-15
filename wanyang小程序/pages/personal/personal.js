var app = getApp();

Page({

 
  /**
   * 页面的初始数据
   */
  data: {
    nickname: null,
    userInfo:{

    },
    balance:0,
    integral:0,
    credit: 0,
    image: '../images/pig.png',
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res.data
        })
      },
    })
    console.log("333333333333333333333333333")
    console.log(that.data.userInfo.nickName)
    wx.request({
      url: 'https://www.wanyangculture.com/php/show_person.php',
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
          info: res.data
        })
        console.log("usertypeeeeeeeeeeeeeeeeeee")
        console.log(res.data.usertype)
        switch (res.data.usertype){
            case "0":{
            that.setData({
              biaoqian:"普通用户"
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
        app.appData.userinfo[0].nickname = res.data.nickname
        if (app.appData.userinfo[0].Sta == false) {
          var nickname = that.data.userInfo.nickName
          that.setData({
            nickname: nickname
          })
        } else {
          that.setData({
            nickname: app.appData.userinfo[0].nickname
          })
        }
        console.log(that.data.info.nickname)
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
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
        
        if (app.appData.userinfo[0].Sta == false) {
          var avatarwx = this.data.userInfo.avatarUrl
          that.setData({
            image: avatarwx
          })
        } else {
          if (res.statusCode == 200) {
            that.setData({
              image: image_url
            })
          }
          
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
    var that=this
    // https://www.wanyangculture.com/php/getbdic.php
    this.onLoad();
    if (app.appData.userinfo[0].Sta == true){
      wx.request({
        url: 'https://www.wanyangculture.com/php/getbdic.php',
        method: "POST",//get为默认方法/POST
        header: {//请求头
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: {
          uid: app.appData.userinfo[0].phonenum
        },
        success: function (res) {
          console.log("zhelishiqian")
          console.log(res.data);
          var list = res.data;
          // that.setData({
          //   list: res.data
          // })
          console.log(list[0]);
          console.log(list[1]);
          console.log(list[2]);
          console.log(list[3]);
          console.log(list[4]);
          that.setData({
            balance: list[1],
            integral: list[3],
            credit: list[4]
          })

        }
      })
    }


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
  avatartab:function(){
    if (app.appData.userinfo[0].Sta == false) {
      wx.navigateTo({
        url: '../logs/logs'
      })
    }
    else {
      wx.navigateTo({
        url: '/pages/info/info',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
},
  tobalance:function(){
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
      wx.navigateTo({
        url: '/pages/wallet/wallet',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  wallet: function () {
    if (app.appData.userinfo[0].Sta == false) {
      // wx.navigateTo({
      //   url: '../register/register'
      // })
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
    else{
      wx.navigateTo({
        url: '/pages/wallet/wallet',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  borrow: function () {
    if (app.appData.userinfo[0].Sta == false) {
      // wx.navigateTo({
      //   url: '../register/register'
      // })
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
    }else {
      wx.navigateTo({
        url: '/pages/borrow/borrow',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    
  },

  share: function () {
    if (app.appData.userinfo[0].Sta == false) {
      // wx.navigateTo({
      //   url: '../register/register'
      // })
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
      wx.navigateTo({
        //url: '../personoption/sharebook/sharebook',
        url: '../donatedBookDetail/donatedBookDetail',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    
  },

  collectbook: function () {
    if (app.appData.userinfo[0].Sta == false) {
      // wx.navigateTo({
      //   url: '../register/register'
      // })
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
    } else{
      wx.navigateTo({
        url: '../collect/collect',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    
  },
  collectbookcom: function () {
    if (app.appData.userinfo[0].Sta == false) {
      // wx.navigateTo({
      //   url: '../register/register'
      // })
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
    } else{
      wx.navigateTo({
        url: '../personoption/collectbookcom/collectbookcom',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
   
  },

  friend: function () {
    wx.navigateTo({
      url: '/pages/friend/friend',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  follow: function () {
    if (app.appData.userinfo[0].Sta == false) {
      // wx.navigateTo({
      //   url: '../register/register'
      // })
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
    } else{
      wx.navigateTo({
        url: '../follow/follow',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    
  },

  clear: function () {
    if (app.appData.userinfo[0].Sta == false) {
      // wx.navigateTo({
      //   url: '../register/register'
      // })
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
    } else{
      wx.navigateTo({
        url: '/pages/clear/clear',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      // wx.navigateTo({
      //   url: '/pages/ commentde/ commentde',
      //   success: function (res) { },
      //   fail: function (res) { },
      //   complete: function (res) { },
      // })
    }
    
  },

  contact: function () {

    wx.navigateTo({
      url: '/pages/contact/contact',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  sharemybook:function(){
    if (app.appData.userinfo[0].Sta == false) {
      // wx.navigateTo({
      //   url: '../register/register'
      // })
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
    } else{
      wx.navigateTo({
        url: '../personoption/sharemybook/sharemybook',
      })
    }
    
  },
  sharemyfri:function(){
    
  },

  usercommit:function(){
    wx.navigateTo({
      url: '../personoption/usercommit/usercommit',
    })
  },

  suggestion: function () {
    wx.navigateTo({
      url: '/pages/suggestion/suggestion',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  logout:function(){
    
    app.appData.userinfo[0].username = null
    app.appData.userinfo[0].phonenum = null
    app.appData.userinfo[0].signature = null
    app.appData.userinfo[0].weixinnum = null
    app.appData.userinfo[0].sex = null
    app.appData.userinfo[0].birthday = null
    app.appData.userinfo[0].localplace = null
    app.appData.userinfo[0].nickname = null
    app.appData.userinfo[0].password = null 
    app.appData.userinfo[0].Sta = false 
    app.appData.userinfo[0].phonenumSta = true
    app.appData.userinfo[0].weixinnumSta = true
    
    wx.redirectTo({
      url: '../logs/logs',
    })
  },
contactimg:function() {
  wx.navigateTo({
    url: '../contactimg/contactimg',
  })
},
  onShareAppMessage: (res) => {
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
      console.log(res.target);
    }
    else {
      console.log("来自右上角转发菜单")
    }
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
  },

})