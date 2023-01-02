// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    wx.getSetting({
      success(res){
        if (!res.authSetting['scope.userLocation']){
          wx.authorize({
            scope: 'scope.userLocation',
            success(){
              wx.getLocation({
                altitude: true,
                isHighAccuracy:true,
                highAccuracyExpireTime:4000,
                fail:(res)=>{
                  console.log("获取到精确位置信息:")
                  console.log(res)
                },
                success:(res)=>{
                  console.log("获取到精确位置信息:")
                  console.log(res)
                  mapCtx = wx.createMapContext('userLocationMap')
                  
                },
                complete:(res)=>{
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
