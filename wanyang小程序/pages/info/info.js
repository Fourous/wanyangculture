var app = getApp();
const uploadImage = require('../../utils/UploadAliyun.js');
var download = require("../../utils/download.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    currentTab: 0,
    booklist: [
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      }
    ],
    items: [
      { name: 'male', value: '男' },
      { name: 'famale', value: '女' },
    ],
    signature: null,
    nickname: null,
    phonenum: null,
    phonenumSta: null,
    weixinnum: null,
    weixinnumSta: null,
    username: null,
    sex: null,
    birthday: null,
    localplace: null,
    email:null,
    tempFilePaths: null,
    image: '../images/pig.png',
    imageback:'../images/top.png'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    let downloaduserid = app.appData.userinfo[0].phonenum
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
        if (app.appData.userinfo[0].Sta == false) {
          var avatarwx = this.data.userInfo.avatarUrl
          that.setData({
            image: avatarwx
          })
        } else {
          if(res.statusCode==200){
            that.setData({
              imageback: image_urlback
            })
          }
         
        }
      }
    }),
    wx.request({
      url: 'https://www.wanyangculture.com/php/show_lend.php',
      method: "POST",//get为默认方法/POST
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        uid: app.appData.userinfo[0].phonenum
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app.appData.userinfo[0].phonenum)
    var that = this
    
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

        app.appData.userinfo[0].username = res.data.nickname
        app.appData.userinfo[0].signature = res.data.signature
        app.appData.userinfo[0].weixinnum = res.data.wechat
        app.appData.userinfo[0].sex = res.data.sex
        app.appData.userinfo[0].birthday = res.data.birthday
        app.appData.userinfo[0].localplace = res.data.address
        app.appData.userinfo[0].email = res.data.email
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
          username: app.appData.userinfo[0].username,
          phonenum: app.appData.userinfo[0].phonenum,
          weixinnum: app.appData.userinfo[0].weixinnum,
          weixinnumSta: app.appData.userinfo[0].weixinnumSta,
          phonenumSta: app.appData.userinfo[0].phonenumSta,
          signature: app.appData.userinfo[0].signature,
          sex: app.appData.userinfo[0].sex,
          birthday: app.appData.userinfo[0].birthday,
          localplace: app.appData.userinfo[0].localplace,
          email: app.appData.userinfo[0].email = res.data.email,
        })
        if (app.appData.userinfo[0].nickname == null) {
          that.setData({
            nickname: '用户' + app.appData.userinfo[0].phonenum
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
        if(res.statusCode==200){
          if (app.appData.userinfo[0].Sta == false) {
            var avatarwx = this.data.userInfo.avatarUrl
            that.setData({
              image: avatarwx
            })
          } else {
            that.setData({
              image: image_url
            })
          }
        }

      }
    })
  },
  changuser:function(){
    console.log("jfklafjklakljfjakljf")
    wx.navigateTo({
      url: '../changuser/changuser',
    })
  },
  changeuserbackinfo:function () {
    var that = this
    var uid = app.appData.userinfo[0].phonenum
    console.log("tabtabtabtabtab")
  console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjhlfjalkfjaklfjlakjfjkajfjajfkj")
    wx.chooseImage({
      success: function (res) {
        let image = res.tempFilePaths[0];
        // let tempImgs = that.data.imgs;
        // tempImgs[0] = image;
        that.setData({
          imageback: image,
          imgs:image
        })
        uploadImage ({
          fileName: uid + 'back' + '.png',
          filePath: that.data.imgs,
          dir: 'userback/',   //阿里云上保存照片的目录
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
      },
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

  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value,e)
    app.appData.userinfo[0].sex = e.detail.value
  },

  edit: function () {
    wx.navigateTo({
      url: '../edit/edit',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

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
  tobookdetail:function(e){
    console.log(e)
    console.log(e.currentTarget.dataset.id)
   var bookid = e.currentTarget.dataset.id
   console.log(bookid)
    wx.navigateTo({
    url: '../book/book?id='+bookid,
})
  }
})