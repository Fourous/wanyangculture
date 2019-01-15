// pages/testscan/testscan.js
var app = getApp();
var hostDomain = 'https://www.wanyangculture.com'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    box_id:'',
    door_id:'',
    uid:'',
    doorsta:null,
    setinter:'',
    moneypay:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      box_id:options.box_id,
      door_id:options.door_id,
      uid:options.uid
    })
    console.log(this.data.box_id)
    console.log(this.data.door_id)
    console.log(this.data.uid)
  },
pushorder:function(){
  var that=this
  wx.request({
    url: hostDomain + "/php/check_state.php",
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    data: {
      box_id: that.data.box_id,
      door_id: that.data.door_id,
    },
    method: "POST",
    success: (res) => {
      console.log(res)
      // that.checkdoorsta()
    },
    fail: function (res) {
      console.log(res);
    }
  })
},
paynum:function(){
  var that=this
  console.log("在此计算账单")
  wx.request({
    url: hostDomain + "/php/paybook.php",
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    data: {
      uid: app.appData.userinfo[0].phonenum
    },
    method: "POST",
    success: (res) => {
    console.log(res)
    },
    fail: function (res) {
      console.log(res);
    }
  })
},

  bindtap:function(){
    var that = this
    wx.request({
          url: hostDomain +"/php/open_door.php",
          header:{
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data:{
            box_id: that.data.box_id,
            door_id: that.data.door_id,
            uid: that.data.uid
          },
          method:"POST",
          success: (res)=>{
          //定时函数
            wx.showToast({
              title: '开门中',
              icon: 'loading',
              duration: 8000
            }) 
            setTimeout(function (){
            //等待4S再查询
              that.data.setinter=setInterval(function () {
                wx.request({
                  url: hostDomain + "/php/check_doorsta.php",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                  },
                  data: {
                    boxid: that.data.box_id,
                    cpdid: that.data.door_id,
                    uid: that.data.uid
                  },
                  method: "POST",
                  success: (res) => {
                    console.log(res)
                    that.setData({
                      doorsta: res.data
                    })
                    if (that.data.doorsta == '0') {
                    //发送指令
                      that.pushorder()
                      wx.showToast({
                        title: '开门中',
                        icon: 'loading',
                        duration: 4000
                      })             
                    }
                    else if (that.data.doorsta=='1'){
                      clearInterval(that.data.setinter)
                      //开始计算pay值
                      that.paynum();
                      var pages = getCurrentPages()
                      var tempPage = pages[pages.length - 2]
                      wx.navigateBack({
                      })
                      //这理请求是否有账单
                      // that.payment();
                      // if(that.data.moneypay>0){
                      //   wx.navigateTo({
                      //     url: '../peplepay/peplepay?moneypay='+that.data.moneypay,
                      //   })
                      // }
                      
                    }
                  },
                  fail: function (res) {
                    console.log(res);
                  }
                })
              }, 4000);
            }, 3000)
          }, 
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
    var that = this
    clearInterval(that.data.setinter)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that=this
    clearInterval(that.data.setinter)
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