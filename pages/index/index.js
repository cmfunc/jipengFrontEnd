// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    markers: [{
        id: 0,
        latitude: 39.984933,
        longitude: 116.495513,
      },
      {
        id: 1,
        latitude: 39.986804,
        longitude: 116.495933,
      }
    ],
    userLocationMapInfo: {
      latitude: 39.984933,
      longitude: 116.495513,
    }
  },
  onLoad() {
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
                  console.log("获取到精确位置信息:")
                  console.log(res)
                },
                success: (res) => {
                  console.log("获取到精确位置信息:")
                  console.log(res)
                  mapCtx = wx.createMapContext('userLocationMap')
                  // 默认值
                  const setting = {
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
                    enable3D: false,
                    enableOverlooking: false,
                    enableSatellite: false,
                    enableTraffic: false,
                  }

                  this.setData({
                    // 仅设置的属性会生效，其它的不受影响
                    setting: {
                      enable3D: true,
                      enableTraffic: true
                    }
                  })

                },
                complete: (res) => {
                  console.log("获取到精确位置信息:")
                  console.log(res)
                }
              })
            }
          })
        }
      }
    })
  }
})