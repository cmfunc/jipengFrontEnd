// app.js
const worker = wx.createWorker('workers/request/index.js') // 文件名指定 worker 的入口文件路径，绝对路径

App({
  // 小程序初始化
  onLaunch() {
    // 登录
    wx.login({
      timeout: 5000,
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        if (res.code) {
          wx.request({
            url: 'http://localhost:7777/v1/login', // TODO 修改为域名
            method: "POST",
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log("调用本地服务器成功")
              console.log(res)
            },
          })
        } else {
          console.log('登陆失败！' + res.errMsg)
        }
        worker.postMessage({
          msg: 'hello worker'
        })
      },
      fail: res => {
        console.log(res)
      },
      complete: res => {
        // console.log(res)
      }
    })
  },
  // 小程序切前台
  onShow() {

  },
  // 小程序切后台
  onHide() {

  },
})