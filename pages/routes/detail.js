const dataUtil = require('../../utils/data.js');
const status = require('../../utils/status.js');

Page({
  data: {
    routeDetail: null,
    isLoading: true,
    allowTextSelect: true
  },

  onLoad(options) {
    this.loadDetail(options.id);
  },

  onPullDownRefresh() {
    const route = this.data.routeDetail;
    this.loadDetail(route ? route.id : null, () => {
      wx.stopPullDownRefresh();
      status.success('路线详情已刷新');
    });
  },

  loadDetail(id, done) {
    const startAt = Date.now();
    const routeDetail = dataUtil.getRouteDetail(parseInt(id, 10));
    if (!routeDetail) {
      this.setData({ isLoading: false, routeDetail: null });
      status.warn('路线不存在');
      setTimeout(() => wx.navigateBack(), 1100);
      if (typeof done === 'function') done();
      return;
    }

    this.setData({ routeDetail, isLoading: true });
    wx.setNavigationBarTitle({ title: routeDetail.name });
    status.runWithMinDuration(startAt, () => {
      this.setData({ isLoading: false });
      if (typeof done === 'function') done();
    });
  },

  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return status.info('该景点暂无详情');
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` });
  },

  saveRoute() {
    const route = this.data.routeDetail;
    if (!route) return;
    const savedRoutes = wx.getStorageSync('savedRoutes') || [];
    if (savedRoutes.some(item => item.id === route.id)) {
      status.info('该路线已在我的路线中');
      return;
    }
    savedRoutes.push({
      id: route.id,
      name: route.name,
      image: route.image,
      days: route.days,
      saveTime: Date.now()
    });
    wx.setStorageSync('savedRoutes', savedRoutes);
    status.success('路线已保存');
  },

  onShareAppMessage() {
    const route = this.data.routeDetail || {};
    return {
      title: `江淮风景线｜${route.name || '路线详情'}`,
      path: `/pages/routes/detail?id=${route.id || ''}`,
      imageUrl: route.image
    };
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
