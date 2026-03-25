const app = getApp();
const dataUtil = require('../../utils/data.js');
const status = require('../../utils/status.js');

Page({
  data: {
    banners: [
      { id: 1, image: "/images/banners/banner1.jpg" },
      { id: 2, image: "/images/banners/banner2.jpg" },
      { id: 3, image: "/images/banners/banner3.jpg" }
    ],
    recommendedAttractions: [],
    hotRoutes: [],
    platformStats: [
      { id: 1, label: '精选景点', value: '6+' },
      { id: 2, label: '推荐路线', value: '3+' },
      { id: 3, label: '覆盖城市', value: '5+' }
    ],
    travelNotices: [
      '节假日出行建议提前预约热门景区门票',
      '山地景区昼夜温差较大，建议备轻薄外套',
      '使用“附近景点”前请先授权定位权限'
    ],
    cityGuides: [
      { id: 1, name: '黄山', desc: '山岳云海与徽州文化', target: 1 },
      { id: 2, name: '南京', desc: '历史人文与城市夜游', target: 4 },
      { id: 3, name: '扬州', desc: '园林湖景与慢节奏漫游', target: 6 }
    ],
    isLoading: true,
    allowTextSelect: true,
    features: [
      { id: 1, icon: "/images/icons/location.png", name: "附近景点", action: "nearby" },
      { id: 2, icon: "/images/icons/route.png", name: "精选路线", action: "routes" },
      { id: 3, icon: "/images/icons/audio.png", name: "语音导览", action: "audio" },
      { id: 4, icon: "/images/icons/favorite.png", name: "我的收藏", action: "favorites" }
    ]
  },

  onLoad() {
    this.loadPageData();
  },

  onPullDownRefresh() {
    this.loadPageData(() => {
      wx.stopPullDownRefresh();
      status.success('首页已刷新');
    });
  },

  loadPageData(done) {
    const startAt = Date.now();
    this.setData({ isLoading: true });
    this.setData({
      recommendedAttractions: dataUtil.attractions.slice(0, 4),
      hotRoutes: dataUtil.getRouteList()
    });
    this.getLocation();
    status.runWithMinDuration(startAt, () => {
      this.setData({ isLoading: false });
      if (typeof done === 'function') done();
    });
  },

  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        app.globalData.location = {
          latitude: res.latitude,
          longitude: res.longitude
        };
      }
    });
  },

  requestLocationAndNearby() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        app.globalData.location = {
          latitude: res.latitude,
          longitude: res.longitude
        };
        this.locateNearby();
      },
      fail: () => {
        wx.showModal({
          title: '需要定位权限',
          content: '开启定位后可为你推荐附近景点，是否前往设置开启？',
          confirmText: '去开启',
          success: (modalRes) => {
            if (!modalRes.confirm) return;
            wx.openSetting({
              success: (settingRes) => {
                if (settingRes.authSetting['scope.userLocation']) {
                  status.success('定位已开启，请重新点击附近景点');
                } else {
                  status.info('未开启定位权限，无法使用附近景点');
                }
              }
            });
          }
        });
      }
    });
  },

  onFeatureTap(e) {
    const action = e.currentTarget.dataset.action;
    if (action === "nearby") return this.locateNearby();
    if (action === "routes") return this.navigateToRoutes();
    if (action === "audio") return this.showAudioGuideTip();
    if (action === "favorites") return this.navigateToMyFavorites();
  },

  navigateToAttractions() {
    app.globalData.attractionListMode = 'all';
    wx.switchTab({ url: '/pages/attractions/attractions' });
  },

  navigateToRoutes() {
    wx.switchTab({ url: '/pages/routes/routes' });
  },

  navigateToDetail(e) {
    wx.navigateTo({ url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}` });
  },

  navigateToRouteDetail(e) {
    wx.navigateTo({ url: `/pages/routes/detail?id=${e.currentTarget.dataset.id}` });
  },

  navigateToCityGuide(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` });
  },

  locateNearby() {
    if (!app.globalData.location) return this.requestLocationAndNearby();

    const attractions = dataUtil.attractions.map((attr) => ({ ...attr }));
    const userLoc = app.globalData.location;
    attractions.forEach((attr) => {
      attr.distance = this.calculateDistance(
        userLoc.latitude,
        userLoc.longitude,
        attr.coordinates.latitude,
        attr.coordinates.longitude
      );
    });
    attractions.sort((a, b) => a.distance - b.distance);
    const nearest = attractions[0];
    if (nearest && nearest.distance < 1) {
      status.success(`最近景点：${nearest.name}（约${nearest.distance.toFixed(1)}公里）`);
    } else if (nearest) {
      status.info(`最近景点：${nearest.name}（约${nearest.distance.toFixed(1)}公里）`);
    }
    app.globalData.nearbyAttractions = attractions;
    app.globalData.attractionListMode = 'nearby';
    wx.switchTab({ url: '/pages/attractions/attractions' });
  },

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  },

  navigateToMyFavorites() {
    app.globalData.myActiveTab = 'favorites';
    wx.switchTab({ url: '/pages/my/my' });
  },

  showAudioGuideTip() {
    const items = dataUtil.attractions.map(item => item.name);
    wx.showActionSheet({
      itemList: items,
      success: (res) => {
        const target = dataUtil.attractions[res.tapIndex];
        if (!target) return;
        wx.navigateTo({
          url: `/pages/detail/detail?id=${target.id}&guide=text`
        });
      }
    });
  },

  clearTextSelection() {
    if (!this.data.allowTextSelect) return;
    this.setData({ allowTextSelect: false });
    clearTimeout(this._textSelectTimer);
    this._textSelectTimer = setTimeout(() => this.setData({ allowTextSelect: true }), 40);
  },

  onShareAppMessage() {
    return {
      title: '江淮风景线｜商用旅游导览',
      path: '/pages/index/index'
    };
  },

  onUnload() {
    clearTimeout(this._textSelectTimer);
  }
});
