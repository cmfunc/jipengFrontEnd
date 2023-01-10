const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


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