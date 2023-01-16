// index.js
// 获取小程序全局唯一的App实例
const app = getApp()

let rewardedVideoAd = null

Page({
  data: {
    user: {
      longitude: 0, //用户经度
      latitude: 0, //用户纬度
      mapSetting: {}, //用户地图设置
      mapPolyline: {}, //用户路线
      markers: [], //markers小车
    }, //用户数据
    avatarUrl: 'https://img.wxcha.com/m00/4c/bd/0fbb00337b0243db2c3f19cb0032758d.jpg?down',
    theme: wx.getSystemInfoSync().theme,
  },
  // 页面加载
  onLoad(query) {
    console.log(query)
    // 修改主题
    wx.onThemeChange((result) => {
      this.setData({
        theme: result.theme
      })
    })
    // 开始监听实时地理位置变化事件
    wx.startLocationUpdateBackground({
      success: (res) => {
        console.log(res)
      },
    })
    wx.startLocationUpdate()
  },
  // 页面切入前台
  onShow() {
    wx.onLocationChange((result) => {
      // 上传用户位置变化
      console.log('用户位置变化' + result)
      wx.request({
        url: 'http://localhost:7777/v1/geo',
        method: "POST",
        data: result,
        header: {
          'content-type': 'application/json',
          'openid':app.globalData.openid,
          'sessionKey':app.globalData.sessionKey,
        },
        success(res) {
          console.log('上传用户位置成功' + res)
        },
        fail(res) {
          console.log('上传用户位置失败' + res)
          // 根据状态码，选择重新登陆
        }
      })
      // 修改map组件的经纬度
      this.setData({
        'user.longitude': result.longitude,
        'user.latitude': result.latitude,
      })
      console.log(app.globalData)
    })

  },
  // 页面渲染完成
  onReady() {
    wx.connectSocket({
      url: 'ws://127.0.0.1:7770/ws?user_id='+app.globalData.openid,
      success: function () {
        console.log('socket 连接成功')
      },
      fail: () => {
        console.log('socket 连接失败')
      },
    })
    wx.onSocketOpen((result) => {
      console.log("socket连接打开", result)
      wx.sendSocketMessage({
        data: JSON.stringify({
          user_id: app.globalData.openid,
          type: "im",
          msg: "呼呼",
        }),
        success: function () {
          console.log('socket 发消息 成功')
        },
        fail: () => {
          console.log('socket 发消息 失败')
        },
      })
    })
    wx.onSocketMessage((res) => {
      console.log('接受服务端socket消息', res)
      // 获取marker中的用户，修改marker中的数据
    })
  },
  // 选择用户头像
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })
  },
  // 页面切入后台
  onHide() {
    // 关闭socket
    wx.closeSocket({
      code: 0,
    })
  },
  // 页面卸载
  onUnload() {},
})