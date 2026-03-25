const dataUtil = require('../../utils/data.js');
const status = require('../../utils/status.js');

Page({
  data: {
    attraction: null,
    isFavorite: false,
    favorites: [],
    currentImageIndex: 0,
    allowTextSelect: true,
    showGuidePanel: false,
    guideText: '',
    isLoading: true
  },

  onLoad(options) {
    this._openGuideDirectly = options && options.guide === 'text';
    this.loadDetail(options.id);
  },

  onPullDownRefresh() {
    const attraction = this.data.attraction;
    this.loadDetail(attraction ? attraction.id : null, () => {
      wx.stopPullDownRefresh();
      status.success('景点详情已刷新');
    });
  },

  loadDetail(id, done) {
    const startAt = Date.now();
    const attraction = dataUtil.getAttractionDetail(parseInt(id, 10));
    if (!attraction) {
      this.setData({ isLoading: false, attraction: null });
      status.warn('景点不存在');
      setTimeout(() => wx.navigateBack(), 1100);
      if (typeof done === 'function') done();
      return;
    }

    this.setData({
      isLoading: true,
      attraction,
      guideText: dataUtil.getAttractionGuideText(attraction.id)
    });
    wx.setNavigationBarTitle({ title: attraction.name });
    this.initFavorites();
    status.runWithMinDuration(startAt, () => {
      this.setData({ isLoading: false });
      if (this._openGuideDirectly) {
        this._openGuideDirectly = false;
        this.showTextGuide();
      }
      if (typeof done === 'function') done();
    });
  },

  initFavorites() {
    const favorites = wx.getStorageSync('favorites') || [];
    const attraction = this.data.attraction;
    this.setData({
      favorites,
      isFavorite: !!attraction && favorites.some(item => item.id === attraction.id)
    });
  },

  toggleFavorite() {
    const attraction = this.data.attraction;
    if (!attraction) return;
    const favorites = wx.getStorageSync('favorites') || [];
    const index = favorites.findIndex(item => item.id === attraction.id);
    if (index > -1) {
      favorites.splice(index, 1);
      status.info('已取消收藏');
      this.setData({ isFavorite: false });
    } else {
      favorites.push({
        id: attraction.id,
        name: attraction.name,
        image: attraction.image,
        location: attraction.location,
        category: attraction.category,
        level: attraction.level,
        addTime: Date.now()
      });
      status.success('已加入收藏');
      this.setData({ isFavorite: true });
    }
    wx.setStorageSync('favorites', favorites);
    this.setData({ favorites });
  },

  showTextGuide() {
    this.setData({
      showGuidePanel: true,
      guideText: dataUtil.getAttractionGuideText(this.data.attraction.id)
    });
  },

  hideTextGuide() {
    this.setData({ showGuidePanel: false });
    this.clearTextSelection();
  },

  onGuidePanelTap() {
    this.clearTextSelection();
  },

  openLocation() {
    const attraction = this.data.attraction;
    if (!attraction || !attraction.coordinates) return status.warn('位置信息不可用');
    const loc = attraction.coordinates;
    wx.openLocation({
      latitude: loc.latitude,
      longitude: loc.longitude,
      name: attraction.name,
      address: attraction.location,
      scale: 16
    });
  },

  previewImage(e) {
    const currentImg = e.currentTarget.dataset.img;
    wx.previewImage({ current: currentImg, urls: this.data.attraction.images });
  },

  onImageSwiperChange(e) {
    this.setData({
      currentImageIndex: e.detail.current
    });
  },

  selectImage(e) {
    const index = parseInt(e.currentTarget.dataset.index, 10);
    if (Number.isNaN(index)) return;
    this.setData({
      currentImageIndex: index
    });
  },

  changeImage(e) {
    const direction = e.currentTarget.dataset.direction;
    const images = this.data.attraction.images;
    let index = this.data.currentImageIndex;
    index = direction === 'prev' ? (index > 0 ? index - 1 : images.length - 1) : (index < images.length - 1 ? index + 1 : 0);
    this.setData({ currentImageIndex: index });
  },

  clearTextSelection() {
    if (!this.data.allowTextSelect) return;
    this.setData({ allowTextSelect: false });
    clearTimeout(this._textSelectTimer);
    this._textSelectTimer = setTimeout(() => this.setData({ allowTextSelect: true }), 40);
  },

  onShareAppMessage() {
    const attraction = this.data.attraction || {};
    return {
      title: `江淮风景线｜${attraction.name || '景点详情'}`,
      path: `/pages/detail/detail?id=${attraction.id || ''}`,
      imageUrl: attraction.image
    };
  },

  onUnload() {
    clearTimeout(this._textSelectTimer);
  }
});
