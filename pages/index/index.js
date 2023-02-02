// index.js
// 获取小程序全局唯一的App实例
const app = getApp()

Page({
  data: {
    //用户数据
    user: {
      longitude: 0, //用户经度
      latitude: 0, //用户纬度
      mapSetting: {}, //用户地图设置
      mapPolyline: {}, //用户路线
      markers: [], //markers小车
    },
    //用户信息表单
    userinfoForm: {
      avatar: '',
      nickname: '',
      feature: '',
      weixinID: '',
    },
    // 标记位集合
    flags: {
      hiddenUinfoView: false,
    },
    // 默认用户头像
    avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    // 同步IOS、微信的主题色
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
      console.log('用户位置变化' + JSON.stringify(result))
      wx.request({
        url: 'http://localhost:7777/v1/geo',
        method: "POST",
        data: result,
        header: {
          'content-type': 'application/json',
          'openid': app.globalData.openid,
          'sessionKey': app.globalData.sessionKey,
        },
        success(res) {
          console.log('上传用户位置成功' + JSON.stringify(res))
        },
        fail(res) {
          console.log('上传用户位置失败' + JSON.stringify(res))
          // 根据状态码，选择重新登陆
        }
      })
      // 修改map组件的经纬度
      this.setData({
        'user.longitude': result.longitude,
        'user.latitude': result.latitude,
      })
    })
    // 接收socket消息
    wx.onSocketMessage((res) => {
      console.log('接受服务端socket消息', res)
      // 更新marker的customCallout
      // @todo 判断与socket返回的用户的id一直的marker.id

    })
  },
  // 页面渲染完成
  onReady() {
    wx.connectSocket({
      url: 'ws://127.0.0.1:7770/ws?user_id=' + app.globalData.openid,
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
  },
  // 选择用户头像
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })
    // TODO 上传图片信息到云存储
    // 保存 用户头像到data.userinfoForm.avatar
    this.setData({
      'userinfoForm.avatar': avatarUrl,
    })
    console.log("用户提交的头像信息", avatarUrl)
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
  // 用户点击提交个人信息按钮事件处理
  upUserinfo() {
    const that = this
    console.log("form表单数据:", that.data.userinfoForm)
    // 上传服务器
    wx.request({
      url: 'http://localhost:7777/v1/user/info',
      method: "POST",
      data: that.data.userinfoForm,
      header: {
        'content-type': 'application/json',
        'openid': app.globalData.openid,
        'sessionKey': app.globalData.sessionKey,
      },
      success(res) {
        console.log('更新用户信息成功' + JSON.stringify(res))
      },
      fail(res) {
        console.log('更新用户信息失败' + JSON.stringify(res))
        // 根据状态码，选择重新登陆
      }
    })
    // 隐藏用户信息上传组件
    this.setData({
      'flags.hiddenUinfoView': true
    })
  },
  // 用户信息表单内容变化后事件处理
  usernameChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    const that = this
    console.log("用户信息表单内容变化后事件处理", e.detail)
    that.setData({
      'userinfoForm.nickname': e.detail.value
    })
    console.log(that.data.userinfoForm)
  },
  userfeatureChange(e) {
    const that = this
    console.log("用户信息表单内容变化后事件处理", e.detail)
    that.setData({
      'userinfoForm.feature': e.detail.value
    })
    console.log(that.data.userinfoForm)
  },
  userweixinIDChange(e) {
    const that = this
    console.log("用户信息表单内容变化后事件处理", e.detail)
    that.setData({
      'userinfoForm.weixinID': e.detail.value
    })
    console.log(that.data.userinfoForm)
  },
  // 用户点击事件处理
  userTap() {
    const that = this
    // 拉取周围用户最新数据
    wx.request({
      url: 'http://localhost:7777/v1/users/geo',
      method: "GET",
      data: {
        latitude: this.data.user.latitude,
        longitude: this.data.user.longitude,
        diatance: 100, //@todo 由地图缩放进行计算
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'openid': app.globalData.openid,
        'sessionKey': app.globalData.sessionKey,
      },
      success(res) {
        console.log('拉取周围其他用户成功' + JSON.stringify(res))
        // TODO 返回的用户数据更新markers
        that.setData({
          'user.markers': [{
            id: 1,
            latitude: 39.921667,
            longitude: 116.443636,
            iconPath: 'https://pic4.zhimg.com/v2-61056ef3732bdadeb90c6de229a41910_r.jpg?source=1940ef5c', //用户自定义头像
            width: '60px',
            height: '60px',
            callout: {
              content: '一个人在家，好寂寞', //改成动态展示的形式，语音、文字、图片，点击后播放
              display: 'ALWAYS',
            },
            label: {
              content: '172.61.27.16',
              color: '#000000',
              bgColor: '#FF6666',
              fontSize: 16,
              borderColor: '#33CC33',
              borderWidth: 2,
              borderRadius: 4,
              textAlign: 'left',
            },
          }],
        })
        console.log('markers:', that.data.user.markers)
      },
      fail(res) {
        console.log('拉取周围其他用户失败' + res)
        // 根据状态码，选择重新登陆
      }
    })
  },
})