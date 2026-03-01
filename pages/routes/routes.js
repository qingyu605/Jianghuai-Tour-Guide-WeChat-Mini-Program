const dataUtil = require('../../utils/data.js');

Page({
  data: {
    routes: [],
    routeDetail: null
  },
  
  onLoad(options) {
    // 如果有id参数，显示路线详情
    if (options.id) {
      const id = parseInt(options.id);
      const routeDetail = dataUtil.routes.find(route => route.id === id);
      
      if (routeDetail) {
        this.setData({
          routeDetail: routeDetail
        });
        
        // 设置页面标题
        wx.setNavigationBarTitle({
          title: routeDetail.name
        });
      } else {
        wx.showToast({
          title: '路线不存在',
          icon: 'none',
          success: () => {
            setTimeout(() => {
              wx.navigateBack();
            }, 1500);
          }
        });
      }
    } else {
      // 显示路线列表
      this.setData({
        routes: dataUtil.routes
      });
    }
  },
  
  // 跳转到路线详情
  navigateToRouteDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/routes/routes?id=${id}`
    });
  },
  
  // 跳转到景点详情
  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id;
    if (id) {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      });
    }
  },
  
  // 保存路线
  saveRoute() {
    // 获取已保存的路线
    let savedRoutes = wx.getStorageSync('savedRoutes') || [];
    
    // 检查是否已保存
    const isAlreadySaved = savedRoutes.some(route => route.id === this.data.routeDetail.id);
    
    if (isAlreadySaved) {
      wx.showToast({
        title: '已保存此路线',
        icon: 'none'
      });
      return;
    }
    
    // 添加到保存列表
    savedRoutes.push({
      id: this.data.routeDetail.id,
      name: this.data.routeDetail.name,
      image: this.data.routeDetail.image,
      days: this.data.routeDetail.days,
      saveTime: new Date().getTime()
    });
    
    // 保存到本地存储
    wx.setStorageSync('savedRoutes', savedRoutes);
    
    wx.showToast({
      title: '路线保存成功',
      icon: 'success'
    });
  },
  
  // 分享功能
  onShareAppMessage() {
    const route = this.data.routeDetail;
    return {
      title: `推荐路线：${route.name}`,
      path: `/pages/routes/routes?id=${route.id}`,
      imageUrl: route.image
    };
  }
});
