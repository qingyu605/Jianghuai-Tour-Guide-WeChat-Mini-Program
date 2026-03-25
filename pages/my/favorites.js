const status = require('../../utils/status.js');

Page({
  data: {
    favorites: [],
    isLoading: true,
    allowTextSelect: true
  },

  onLoad() {
    this.loadFavorites();
  },

  onShow() {
    this.loadFavorites();
  },

  onPullDownRefresh() {
    this.loadFavorites(() => {
      wx.stopPullDownRefresh();
      status.success('收藏列表已刷新');
    });
  },

  loadFavorites(done) {
    const startAt = Date.now();
    const favorites = wx.getStorageSync('favorites') || [];
    favorites.sort((a, b) => b.addTime - a.addTime);
    this.setData({
      favorites: favorites.map(item => ({
        ...item,
        addTimeText: this.formatTime(item.addTime)
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

  navigateToDetail(e) {
    wx.navigateTo({ url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}` });
  },

  deleteFavorite(e) {
    const id = e.currentTarget.dataset.id;
    const favorites = (wx.getStorageSync('favorites') || []).filter(item => item.id !== id);
    wx.setStorageSync('favorites', favorites);
    status.info('收藏已移除');
    this.loadFavorites();
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
