const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    activeTab: 'favorites',
    favorites: [],
    savedRoutes: []
  },
  
  onLoad(options) {
    // 如果有tab参数，切换到对应标签页
    if (options.tab) {
      this.setData({
        activeTab: options.tab
      });
    }
    
    // 检查用户登录状态
    this.checkUserInfo();
    
    // 加载收藏和路线数据
    this.loadFavorites();
    this.loadSavedRoutes();
  },
  
  onShow() {
    // 页面显示时刷新数据
    this.loadFavorites();
    this.loadSavedRoutes();
  },
  
  // 检查用户信息
  checkUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {};
    if (Object.keys(userInfo).length > 0) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      });
      app.globalData.userInfo = userInfo;
    } else {
      this.setData({
        hasUserInfo: false
      });
    }
  },
  
  // 获取用户信息
  onGetUserInfo(e) {
    if (e.detail.userInfo) {
      // 保存用户信息
      wx.setStorageSync('userInfo', e.detail.userInfo);
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      app.globalData.userInfo = e.detail.userInfo;
    }
  },
  
  // 切换标签页
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },
  
  // 加载收藏列表
  loadFavorites() {
    const favorites = wx.getStorageSync('favorites') || [];
    // 按添加时间排序（最新的在前）
    favorites.sort((a, b) => b.addTime - a.addTime);
    this.setData({
      favorites: favorites
    });
  },
  
  // 加载保存的路线
  loadSavedRoutes() {
    const savedRoutes = wx.getStorageSync('savedRoutes') || [];
    // 按保存时间排序（最新的在前）
    savedRoutes.sort((a, b) => b.saveTime - a.saveTime);
    this.setData({
      savedRoutes: savedRoutes
    });
  },
  
  // 跳转到景点详情
  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  },
  
  // 跳转到路线详情
  navigateToRouteDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/routes/routes?id=${id}`
    });
  },
  
  // 删除收藏
  deleteFavorite(e) {
    const id = e.currentTarget.dataset.id;
    let favorites = wx.getStorageSync('favorites') || [];
    
    // 过滤掉要删除的收藏
    favorites = favorites.filter(item => item.id !== id);
    
    // 保存到本地存储
    wx.setStorageSync('favorites', favorites);
    
    // 更新页面数据
    this.setData({
      favorites: favorites
    });
    
    wx.showToast({
      title: '已取消收藏',
      icon: 'none'
    });
  },
  
  // 删除保存的路线
  deleteRoute(e) {
    const id = e.currentTarget.dataset.id;
    let savedRoutes = wx.getStorageSync('savedRoutes') || [];
    
    // 过滤掉要删除的路线
    savedRoutes = savedRoutes.filter(item => item.id !== id);
    
    // 保存到本地存储
    wx.setStorageSync('savedRoutes', savedRoutes);
    
    // 更新页面数据
    this.setData({
      savedRoutes: savedRoutes
    });
    
    wx.showToast({
      title: '已删除路线',
      icon: 'none'
    });
  },
  
  // 格式化时间
  formatTime(timestamp) {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  },
  
  // 跳转到景点列表
  navigateToAttractions() {
    wx.navigateTo({
      url: '/pages/attractions/attractions'
    });
  },
  
  // 跳转到路线列表
  navigateToRoutes() {
    wx.navigateTo({
      url: '/pages/routes/routes'
    });
  }
});
