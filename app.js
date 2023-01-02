// app.js
App({
  onLaunch() {
    // 登录
    wx.login({
      timeout: 5000,
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        if (res.code){
          wx.request({
            url: 'https://golang-x6pw-24923-6-1316348639.sh.run.tcloudbase.com', // TODO 修改为域名
            data:{
              code:res.code
            }
          })
        }else{
          console.log('登陆失败！'+res.errMsg)
        }
      },
      fail: res => {
        console.log(res)
      },
      complete: res => {
        // console.log(res)
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
