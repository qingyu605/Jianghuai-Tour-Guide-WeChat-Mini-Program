const app = getApp();
const status = require('../../utils/status.js');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    favorites: [],
    savedRoutes: [],
    stats: {
      favoriteCount: 0,
      routeCount: 0
    },
    serviceTips: [
      '登录后可在多次访问中持续管理收藏与路线',
      '保存路线后建议按出行日期提前核验交通与票务',
      '隐私与权限说明可在“隐私与政策”中查看'
    ],
    faqList: [
      { id: 1, q: '收藏和路线会丢失吗？', a: '默认保存在本机，如更换设备请提前截图或记录。' },
      { id: 2, q: '路线支持离线吗？', a: '基础浏览可用，地图与外部能力建议联网使用。' },
      { id: 3, q: '如何快速找到附近景点？', a: '首页点击“附近景点”，并确保定位权限已开启。' }
    ],
    isLoading: true,
    allowTextSelect: true
  },

  onLoad(options) {
    this.loadPageData();
  },

  onShow() {
    this.loadPageData();
  },

  onPullDownRefresh() {
    this.loadPageData(() => {
      wx.stopPullDownRefresh();
      status.success('个人中心已刷新');
    });
  },

  loadPageData(done) {
    const startAt = Date.now();
    this.setData({ isLoading: true });
    this.checkUserInfo();
    this.loadFavorites();
    this.loadSavedRoutes();
    this.setData({
      stats: {
        favoriteCount: this.data.favorites.length,
        routeCount: this.data.savedRoutes.length
      }
    });
    status.runWithMinDuration(startAt, () => {
      this.setData({ isLoading: false });
      if (typeof done === 'function') done();
    });
  },

  checkUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {};
    const hasUserInfo = Object.keys(userInfo).length > 0;
    this.setData({ userInfo, hasUserInfo });
    if (hasUserInfo) app.globalData.userInfo = userInfo;
  },

  onGetUserProfile() {
    wx.getUserProfile({
      desc: '用于展示您的昵称和头像',
      success: (res) => {
        wx.setStorageSync('userInfo', res.userInfo);
        this.setData({ userInfo: res.userInfo, hasUserInfo: true });
        app.globalData.userInfo = res.userInfo;
        status.success('登录成功');
      },
      fail: () => status.info('你取消了登录授权')
    });
  },

  loadFavorites() {
    const favorites = wx.getStorageSync('favorites') || [];
    favorites.sort((a, b) => b.addTime - a.addTime);
    this.setData({
      favorites: favorites.map(item => ({ ...item, addTimeText: this.formatTime(item.addTime) }))
    });
  },

  loadSavedRoutes() {
    const savedRoutes = wx.getStorageSync('savedRoutes') || [];
    savedRoutes.sort((a, b) => b.saveTime - a.saveTime);
    this.setData({
      savedRoutes: savedRoutes.map(item => ({ ...item, saveTimeText: this.formatTime(item.saveTime) }))
    });
  },

  navigateToDetail(e) {
    wx.navigateTo({ url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}` });
  },

  navigateToRouteDetail(e) {
    wx.navigateTo({ url: `/pages/routes/detail?id=${e.currentTarget.dataset.id}` });
  },

  deleteFavorite(e) {
    const id = e.currentTarget.dataset.id;
    const favorites = (wx.getStorageSync('favorites') || []).filter(item => item.id !== id);
    wx.setStorageSync('favorites', favorites);
    this.loadPageData();
    status.info('收藏已移除');
  },

  deleteRoute(e) {
    const id = e.currentTarget.dataset.id;
    const routes = (wx.getStorageSync('savedRoutes') || []).filter(item => item.id !== id);
    wx.setStorageSync('savedRoutes', routes);
    this.loadPageData();
    status.info('路线已移除');
  },

  formatTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}-${`${date.getDate()}`.padStart(2, '0')}`;
  },

  navigateToAttractions() {
    app.globalData.attractionListMode = 'all';
    wx.switchTab({ url: '/pages/attractions/attractions' });
  },

  navigateToRoutes() {
    wx.switchTab({ url: '/pages/routes/routes' });
  },

  navigateToFavoritesPage() {
    wx.navigateTo({ url: '/pages/my/favorites' });
  },

  navigateToSavedRoutesPage() {
    wx.navigateTo({ url: '/pages/my/saved_routes' });
  },

  navigateToAbout() {
    wx.navigateTo({ url: '/pages/about/about' });
  },

  navigateToPolicy() {
    wx.navigateTo({ url: '/pages/policy/policy' });
  },

  onShareAppMessage() {
    return { title: '江淮风景线｜我的行程资产', path: '/pages/my/my' };
  },

  clearTextSelection() {
    if (!this.data.allowTextSelect) return;
    this.setData({ allowTextSelect: false });
    clearTimeout(this._textSelectTimer);
    this._textSelectTimer = setTimeout(() => this.setData({ allowTextSelect: true }), 40);
  },

  onUnload() {
    clearTimeout(this._textSelectTimer);
  }
});
