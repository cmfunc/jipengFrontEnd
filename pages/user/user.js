const defaultAvatarUrl = 'https://img.wxcha.com/m00/4c/bd/0fbb00337b0243db2c3f19cb0032758d.jpg?down'


Page({
  data: {
    userinfo: {
      avator: '',
      nickname: '',
      age: 18,
      height: 185,
      weight: 75,
      length: 18
    },
    avatarUrl: defaultAvatarUrl,
    bordcast: '我在这里，来找我约',
    theme: wx.getSystemInfoSync().theme,
  },
  onLoad() {
    wx.onThemeChange((result) => {
      this.setData({
        theme: result.theme
      })
    })
  },
  onShow() {},
  onHide() {},
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })
  },
})