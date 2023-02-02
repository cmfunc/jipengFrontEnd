// app.js

App({
  // 全局变量
  globalData: {
    openid: '',
    sessionKey: '',
    avatar: '',
    nickname: '',
    feature: '',
    weixinID: '',
  },
  // 小程序初始化
  onLaunch() {
    let that = this
    // 登录
    wx.login({
      timeout: 5000,
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        if (res.code) {
          wx.request({
            url: 'http://localhost:7777/v1/login',
            method: "POST",
            data: {
              code: res.code,
            },
            header: {
              'content-type': 'application/json'
            },
            success(res) {
              console.log('调用登陆接口成功', res)
              that.globalData.openid = res.data.openid
              that.globalData.sessionKey = res.data.sessionKey
              that.globalData.avatar = res.data.avatar
              that.globalData.nickname = res.data.nickname
              that.globalData.feature = res.data.feature
              that.globalData.weixinID = res.data.weixinID
              console.log('登陆成功', that.globalData)
            },
            fail(res) {
              console.log('调用本地服务器失败', res)
            }
          })
        } else {
          console.log('登陆失败！', res.errMsg)
        }
      },
      fail: res => {
        console.log('wx.login失败', res)
      },
    })
  },
  // 小程序切前台
  onShow() {},
  // 小程序切后台
  onHide() {},
})