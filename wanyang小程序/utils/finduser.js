var app = getApp()
function findUser(obj) {
  // console.info("准备下载。。。"); 
  let that = this;
  let success = obj.success; //下载成功 
  let fail = obj.fail; //下载失败 
  let urls = obj.urls; //下载地址 数组，支持多个 url下载 [url1,url2] 
  let urlsLength = urls.length; // 有几个url需要下载 
  let test = new Array()
  let personpic = new Array()
  personpic.length = urls.length
  for (let i = 0; i < urlsLength; i++) {
    wx.request({
      url: 'https://www.wanyangculture.com/php/show_person.php',
      data: {
        uid: urls[i].telephone
      },
      header: { //请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'POST',

      success: function (res) {
        //console.dir(res); //一个文件下载保存成功 

        personpic[i] = res.data
        test.push(res.data)
        if (test.length == urlsLength) {
          //如果所有的url 才算成功 
          if (success) {
            success(personpic)
          }
        }
      },
      fail: function (e) {
        console.info("下载失败");
        if (fail) {
          fail(e);
        }
      },
      complete: function (res) {

      },
    })
  }
}

module.exports = {
  findUser: findUser
}