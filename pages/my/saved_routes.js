const status = require('../../utils/status.js');

Page({
  data: {
    savedRoutes: [],
    isLoading: true,
    allowTextSelect: true
  },

  onLoad() {
    this.loadSavedRoutes();
  },

  onShow() {
    this.loadSavedRoutes();
  },

  onPullDownRefresh() {
    this.loadSavedRoutes(() => {
      wx.stopPullDownRefresh();
      status.success('路线列表已刷新');
    });
  },

  loadSavedRoutes(done) {
    const startAt = Date.now();
    const savedRoutes = wx.getStorageSync('savedRoutes') || [];
    savedRoutes.sort((a, b) => b.saveTime - a.saveTime);
    this.setData({
      savedRoutes: savedRoutes.map(item => ({
        ...item,
        saveTimeText: this.formatTime(item.saveTime)
      })),
      isLoading: true
    });
    status.runWithMinDuration(startAt, () => {
      this.setData({ isLoading: false });
      if (typeof done === 'function') done();
    });
  },

  formatTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}-${`${date.getDate()}`.padStart(2, '0')}`;
  },

  navigateToRouteDetail(e) {
    wx.navigateTo({ url: `/pages/routes/detail?id=${e.currentTarget.dataset.id}` });
  },

  deleteRoute(e) {
    const id = e.currentTarget.dataset.id;
    const savedRoutes = (wx.getStorageSync('savedRoutes') || []).filter(item => item.id !== id);
    wx.setStorageSync('savedRoutes', savedRoutes);
    status.info('路线已移除');
    this.loadSavedRoutes();
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
