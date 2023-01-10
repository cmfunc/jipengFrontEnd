// index.js
var utils = require('../../utils/util.js')
// 获取小程序全局唯一的App实例
const app = getApp()
// 定义默认头像
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


Page({
  data: {
    markers: [{
        id: 0,
        latitude: 39.984933,
        longitude: 116.495513,
        title: "他的位置",
        iconPath: "https://img0.baidu.com/it/u=1250551608,2180019998&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1672851600&t=36caed8db317a8fc4b37d31771de629a",
        width: "80px",
        height: "80px",
      },
      {
        id: 1,
        latitude: 39.986804,
        longitude: 116.495933,
        title: "你的位置",
        iconPath: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202104%2F22%2F20210422220415_2e4bd.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1675341823&t=d91faff48888046b8185b9b8ed611267",
        width: "40px",
        height: "40px",
        callout: {
          content: "177.24.61.17",
          color: "rgb(255,255,255)", //文字颜色
          borderWidth: 2,
          borderColor: "#07C160", //边框颜色
          bgColor: "#07C160",
          padding: "2", //文本边缘留白
          borderRadius: 8,
          display: "ALWAYS",
        },
        label: {
          content: "在这里，我在这里，快来找我丸！",
          fontSize: 14,
          color: "rgb(250,227,191)",
          bgColor: "rgb(38,38,38)",
          borderRadius: 5,
        },
      }
    ],
    userLocationMapInfo: {
      latitude: 39.984933,
      longitude: 116.495513,
    },
    setting: {
      skew: 0,
      rotate: 0,
      showLocation: false,
      showScale: false,
      subKey: '',
      layerStyle: 1,
      enableZoom: true,
      enableScroll: true,
      enableRotate: false,
      showCompass: false,
      enable3D: true,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: true
    },
    polyline: {}, //路线
    avatarUrl: defaultAvatarUrl,
  },
  // 页面加载
  onLoad(query) {
    console.log(query)
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.getLocation({
                altitude: true,
                isHighAccuracy: true,
                highAccuracyExpireTime: 4000,
                fail: (res) => {
                  console.log(res)
                },
                success: (res) => {
                  console.log(res)
                  var mapCtx = wx.createMapContext('userLocationMap')
                },
                complete: (res) => {
                  console.log(res)
                }
              })
            }
          })
        }
      }
    })
    // 设置地图
    this.setData({
      'setting': {
        showLocation: true,
        showScale: true,
      }
    })
    // 开始监听实时地理位置变化事件
    wx.startLocationUpdateBackground({
      success: (res) => {
        console.log(res)
      },
    })
    wx.startLocationUpdate()
  },
  // 拉取其他用户位置信息
  fetchOtherUserGeo: function () {
    // 通过接口拉取数据

    // 刷新markers数据
    // 最后将自己的数据append进入
    // 自己的markers需要绑定点击事件，并且跳转到个人页进行信息修改和展示

  },
  // 跳转用户详情页
  navigateToUserDetail: function () {
    // 判断当前点击的如果是自己
    wx.navigateTo({
      url: '/pages/user/user',
    })
    // 当前点击的其他人
  },
  // 页面切入前台
  onShow() {
    wx.onLocationChange((result) => {
      // 上传用户位置变化
      console.log('用户位置变化', result)
      // TODO 此处，在点击地图时，自动请求服务端接口，获取
      this.setData({
        'markers[0].latitude': '39.985311',
      })
      this.setData({
        'markers[0].longitude': '116.493597',
      })
    })
    this.setData({})
  },
  // 页面渲染完成
  onReady() {},
  // 页面切入后台
  onHide() {},
  // 页面卸载
  onUnload() {},
  // 页面垂直滑动事件
  onPageScroll(scrollPram) {
    console.log(scrollPram.scrollTop)
  },
  // 点击转发按钮
  onShareAppMessage() {
    return {
      title: "激碰",
      path: "/pages/index/index",
    }
  },
  // 分享朋友圈
  onShareTimeline() {},
  // 组建处理函数
  viewTap: function () {
    console.log('view tap')
    // TODO 点击marker后，获取两个坐标点信息，页面添加路线规划信息；
    this.navigateToUserDetail()
  },
})