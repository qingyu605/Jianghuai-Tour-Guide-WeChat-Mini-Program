// app.js
App({
  onLaunch() {
    // 初始化本地存储
    if (!wx.getStorageSync('favorites')) {
      wx.setStorageSync('favorites', []);
    }
    if (!wx.getStorageSync('savedRoutes')) {
      wx.setStorageSync('savedRoutes', []);
    }
    
    // 检查版本更新
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success(res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
      }
    })
  },
  
  globalData: {
    userInfo: null,
    location: null,
    nearbyAttractions: null
  }
})
