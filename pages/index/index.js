const app = getApp();
const dataUtil = require('../../utils/data.js');

Page({
  data: {
    banners: [
      { id: 1, image: "/images/banners/banner1.jpg" },
      { id: 2, image: "/images/banners/banner2.jpg" },
      { id: 3, image: "/images/banners/banner3.jpg" }
    ],
    recommendedAttractions: [],
    hotRoutes: [],
    features: [
      { id: 1, icon: "/images/icons/location.png", name: "附近景点", bindtap: "locateNearby" },
      { id: 2, icon: "/images/icons/route.png", name: "精选路线", bindtap: "navigateToRoutes" },
      { id: 3, icon: "/images/icons/audio.png", name: "语音导览", bindtap: "showAudioGuideTip" },
      { id: 4, icon: "/images/icons/favorite.png", name: "我的收藏", bindtap: "navigateToMyFavorites" }
    ]
  },
  
  onLoad() {
    // 获取推荐景点（取前4个）
    this.setData({
      recommendedAttractions: dataUtil.attractions.slice(0, 4),
      hotRoutes: dataUtil.routes
    });
    
    // 获取定位
    this.getLocation();
  },
  
  // 获取用户位置
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        app.globalData.location = {
          latitude: res.latitude,
          longitude: res.longitude
        };
      },
      fail: (err) => {
        console.log('获取位置失败', err);
      }
    });
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
  
  // 查找附近景点
  locateNearby() {
    if (!app.globalData.location) {
      wx.showToast({
        title: '请先允许获取位置',
        icon: 'none'
      });
      return;
    }
    
    // 计算距离并排序
    const attractions = [...dataUtil.attractions];
    const userLoc = app.globalData.location;
    
    attractions.forEach(attr => {
      attr.distance = this.calculateDistance(
        userLoc.latitude, 
        userLoc.longitude, 
        attr.coordinates.latitude, 
        attr.coordinates.longitude
      );
    });
    
    // 按距离排序
    attractions.sort((a, b) => a.distance - b.distance);
    
    // 存储到全局，供景点列表页使用
    app.globalData.nearbyAttractions = attractions;
    
    // 跳转到景点列表，并标记为附近景点
    wx.navigateTo({
      url: '/pages/attractions/attractions?type=nearby'
    });
  },
  
  // 计算两点之间的距离（公里）
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 地球半径（公里）
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c;
    return distance;
  },
  
  // 角度转弧度
  deg2rad(deg) {
    return deg * (Math.PI/180);
  },
  
  // 跳转到我的收藏
  navigateToMyFavorites() {
    wx.navigateTo({
      url: '/pages/my/my?tab=favorites'
    });
  },
  
  // 显示语音导览提示
  showAudioGuideTip() {
    wx.showModal({
      title: '语音导览',
      content: '在景点详情页中可以使用语音导览功能，为您介绍景点的详细信息。',
      confirmText: '知道了',
      showCancel: false
    });
  }
});
