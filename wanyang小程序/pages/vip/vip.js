var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic:1,
    money:0,
    test:'active',
    bottom:1,
    flag:1,
    pic1:0,
    pic2:1,
    type:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    
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
  picreact:function(e){
    this.data.pic=this.data.pic?0:1
    // this.data.money=this.data.money?0:1
    this.setData({
      pic:this.data.pic,
      // money:this.data.money
    })
  }, 

  avtipage1:function(){
    this.data.flag = 1,
      // this.data.bottom = this.data.bottom?0:1
    this.setData({
      flag: this.data.flag,
      // bottom: this.data.bottom
    })
    //flag=0 pic1=1
    if(this.data.pic1==1){
      this.data.money=60;
      this.setData({
        money:this.data.money
      })
    }
    else if(this.data.pic1==0){
      this.data.money = 360;
      this.setData({
        money: this.data.money
      })
    }
  },
  avtipage2: function () {
    this.data.flag = 0,
    // this.data.bottom = this.data.bottom ? 0 : 1
    this.setData({
      flag: this.data.flag,
      // bottom: this.data.bottom
    })
    if (this.data.pic2 == 0) {
      this.data.money = 540;
      this.setData({
        money: this.data.money
      })
    }
    else if (this.data.pic2 == 1) {
      this.data.money = 90;
      this.setData({
        money: this.data.money
      })
    }
  
  },

  avtipic1:function(){
    this.data.pic1=0,
    this.setData({
      pic1:this.data.pic1
    })
    this.data.money = 360;
    this.setData({
      money: this.data.money,
      type:2
    })

    
  },
  avtipic2: function () {
    this.data.pic1 = 1,
      this.setData({
        pic1: this.data.pic1
      })
    this.data.money = 60;
    this.setData({
      money: this.data.money,
      type: 1
    })
  },
   avtipic3: function () {
    this.data.pic2 = 0,
      this.setData({
        pic2: this.data.pic2
      })
     this.data.money = 540;
     this.setData({
       money: this.data.money,
       type:4
     })
  },
   avtipic4: function () {
    this.data.pic2 = 1,
      this.setData({
        pic2: this.data.pic2
      })
     this.data.money = 90;
     this.setData({
       money: this.data.money,
       type: 3
     })
  },
  choose:function(){
    wx.request({
      url: 'https://www.wanyangculture.com/php/vip_charge.php',
      method: "POST",
      data: {
        uid: app.appData.userinfo[0].phonenum,
        money: this.data.money,
        type: this.data.type,  //后面要改成400 
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // -2是type不匹配，0是余额不足，1充值成功，-1充值失败
        //这里逻辑有问题，type置回去了，但是余额不够充值的
        console.log("vipvipvipvipvipvipvipvipvipvipvip")
        console.log(res)

      if(res.data==0){
        wx.showToast({
          title: '余额不足请充值',
          icon: 'false',
          duration: 2000
        })
       
      }
      else if(res.data==-2){
        wx.showToast({
                title: '套餐冲突',
                icon: 'false',
                duration: 2000
              })
      }
      else if(res.data==1){
        wx.showToast({
                title: '充值成功',
                icon: 'success',
                duration: 2000
              })
      }
      else if(res.data==-1){
        wx.showToast({
          title: '充值失败',
          icon: 'false',
          duration: 2000
        })
      }
      else {
        wx.showToast({
          title: '系统错误',
          icon: 'false',
          duration: 2000
        })
        }
      },
      fail: function (err) { },//请求失败
      complete: function (res) {
      }//请求完成后执行的函数
    })
  }

})