const app = getApp();
const {
  extend,
  pullUpLoading
} = require("../../pullUpLoading/index.js");
var download = require("../../utils/download.js")
var finduser = require("../../utils/finduser.js")

Page(extend(pullUpLoading, {
  data: {
    hidden: true,
    list: _createData(2),
    index: 1,
    more: true,
    hot: false,
    currentTab: 0,
    books: null,
    current: 0,
    hot_book: null,
    recommend_book: null,
    book_url: null,
    user: null,
    user0: null,
    hotfirst: 0,
    uid: null,
    uid0: null,
  },
  topLoad: function(e) {
    console.log(e);
    var first = this.data.hotfirst + 20;
    this.setData({
      hotfirst: first
    })
    this.reqMore(this, e.currentTarget.dataset.id);
    console.log("请求成功");
  },
  bindDownLoad: function(e) {
    console.log(e);
    this.reqMore(this, e.currentTarget.dataset.id);
    console.log("请求成功");
  },
  changeHidden: function() {
    this.setData({
      hidden: !this.data.hidden
    });
  },
  onLoad() {
    var that = this;
    that.reqMore(that, 0);
    that.reqMore(that, 1);
    that.reqMore(that, 2);
    console.log("page start");
  },
  reqMore: function(that, id) {
    if (id == 0) {
      wx.showNavigationBarLoading();
      that.changeHidden();
      wx.request({
        url: 'https://www.wanyangculture.com/php/hot_book.php',
        method: "POST", //get为默认方法/POST
        header: { //请求头
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: {
          id: 'list_hot',
          fir: that.data.hotfirst
        },
        success: function(res) {
          console.log(res);
          var first = that.data.hotfirst;
          first = 0;
          if (res.data == null) {
            that.setData({
              first:0,
              // hot_book: res.data,
              hotfirst: first
            })
            // wx.showToast({
            //   title: '暂无更多',
            // })
          } else {
            that.setData({
              hot_book: res.data,
            })
          }

          //将图片的url放到数组中
          var book_url_0 = new Array()
          console.log(that.data.hot_book)
          for (var i in that.data.hot_book) {
            let id = that.data.hot_book[i].bookid
            let url = "https://www.wanyangculture.xyz/book/" + String(id) + ".jpg"
            console.log(i)
            book_url_0.push(url)
            console.log(book_url_0)
          }

          //调用封装方法实现多图片的下载，而且在appData中的数据顺序是正确的
          download.downloadSaveFiles({
            urls: book_url_0,
            success: function(res) {
              console.log(book_url_0)
              let hot_book_0 = that.data.hot_book
              console.log(hot_book_0)
              for (var j in hot_book_0) {
                hot_book_0[j].tag = res[j]
              }
              that.setData({
                hot_book: hot_book_0
              })
              console.log(that.data.hot_book)
            },
            fail: function(e) {
              console.info("下载失败");
            }
          })


          //将appData中的值赋给热销书数组中的tag

        },
        fail: function(err) {}, //请求失败
        complete: function() {
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
          that.changeHidden();
        } //请求完成后执行的函数
      })
    } else if (id == 1) {
      wx.showNavigationBarLoading();
      that.changeHidden();
      wx.request({
        url: 'https://www.wanyangculture.com/php/hot_book.php',
        method: "POST", //get为默认方法/POST
        header: { //请求头
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: {
          id: 'list_recommend',
          fir: that.data.hotfirst
        },
        success: function(res) {
          console.log(res);
            var first = that.data.hotfirst;
            first = 0;
            if (res.data == null) {
              that.setData({
                first: 0,
                // hot_book: res.data,
                hotfirst: first
              })
              // wx.showToast({
              //   title: '暂无更多',
              // })
            } else {
              that.setData({
                recommend_book: res.data,
              })
          }


          var book_url_0 = new Array()
          for (var i in that.data.recommend) {
            let id = that.data.recommend_book[i].bookid
            let url = "https://www.wanyangculture.xyz/book/" + String(id) + ".jpg"
            book_url_0.push(url)
          }

          //调用封装方法实现多图片的下载，而且在appData中的数据顺序是正确的
          download.downloadSaveFiles({
            urls: book_url_0,
            success: function(res) {
              let recommend_book_0 = that.data.recommend_book
              for (var j in recommend_book_0) {
                recommend_book_0[j].tag = res[j]
              }
              that.setData({
                recommend_book: recommend_book_0
              })
            },
            fail: function(e) {
              console.info("下载失败");
            }
          })
        },
        fail: function(err) {}, //请求失败
        complete: function() {
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
          that.changeHidden();
        } //请求完成后执行的函数
      })
    }
     else if (id == 2) {
      // -------------------------------------------------------------------------------------
      console.log('211111111111111111111111111111111111111111')
      wx.showNavigationBarLoading();
      that.changeHidden();
      wx.request({
        url: 'https://www.wanyangculture.com/php/hot_person.php',
        method: "POST", //get为默认方法/POST
        header: { //请求头
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: {
          fir: 10,
        },
        success: function(res) {
          that.setData({
            uid: res.data,
            uid0: res.data,
          })
          console.log(res.data)

          if (that.data.uid != "") {
            //将图片的url放到数组中
            console.log("1")
            // --------------------------------------------------------------------------------
            var user_url_0 = new Array()
            for (var i in that.data.uid) {
              let downloaduserid = that.data.uid[i].telephone
              let url = "https://www.wanyangculture.xyz/userinfo/" + String(downloaduserid) + "avatar" + ".png"
              console.log(i)
              user_url_0.push(url)
              console.log(user_url_0)
            }

            //调用封装方法实现多图片的下载，而且在appData中的数据顺序是正确的
            download.downloadSaveFiles({
              urls: user_url_0,
              success: function(res) {
                let user_0 = that.data.uid0
                for (var j in user_0) {
                  user_0[j].tag = res[j]
                }
                console.log(user_0)
                that.setData({
                  uid0: user_0
                })
                console.log(that.data.uid0)
              },
              fail: function(e) {
                console.info("下载失败");
              }
            })
            // ------------------------------------------------------------------------------------


            finduser.findUser({
              urls: that.data.uid,
              success: function(res) {
                let user_0 = that.data.uid0
                for (var j in user_0) {
                  user_0[j].info = res[j]
                }
                console.log(user_0)
                that.setData({
                  uid0: user_0
                })
                console.log(that.data.uid0)
              },
              fail: function(e) {
                console.info("下载失败");
              }
            })

          } else {
            that.setData({
              uid: null
            })
          }
        },
        fail: function(err) {}, //请求失败
        complete: function() {
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
          that.changeHidden();
        } //请求完成后执行的函数
      })
    }
  },

  swichNav: function(e) {
    console.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },

  swiperChange: function(e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })

  },
}));

function _createData(count) {
  let data = new Array(count);
  return data;
}