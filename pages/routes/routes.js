const dataUtil = require('../../utils/data.js');
const status = require('../../utils/status.js');

Page({
  data: {
    routes: [],
    routeTips: [
      '首次到访建议优先选择 3 天以内短线产品',
      '跨城线路建议提前确认高铁与酒店资源',
      '可先收藏路线后再按日程二次调整'
    ],
    crowdRecommend: [
      { id: 1, title: '亲子家庭', desc: '节奏舒缓、步行强度较低线路' },
      { id: 2, title: '历史文化爱好者', desc: '城市人文与博物馆聚合线路' },
      { id: 3, title: '摄影旅行者', desc: '自然风光与晨昏景观线路' }
    ],
    isLoading: true,
    allowTextSelect: true
  },

  onLoad() {
    this.loadRoutes();
  },

  onPullDownRefresh() {
    this.loadRoutes(() => {
      wx.stopPullDownRefresh();
      status.success('路线库已刷新');
    });
  },

  loadRoutes(done) {
    const startAt = Date.now();
    this.setData({
      routes: dataUtil.getRouteList(),
      isLoading: true
    });
    status.runWithMinDuration(startAt, () => {
      this.setData({ isLoading: false });
      if (typeof done === 'function') done();
    });
  },

  navigateToRouteDetail(e) {
    wx.navigateTo({ url: `/pages/routes/detail?id=${e.currentTarget.dataset.id}` });
  },

  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) {
      status.info('该景点暂无详情');
      return;
    }
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` });
  },

  onShareAppMessage() {
    return {
      title: '江淮风景线｜商用精品路线库',
      path: '/pages/routes/routes'
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
