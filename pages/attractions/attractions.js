const app = getApp();
const dataUtil = require('../../utils/data.js');
const status = require('../../utils/status.js');

Page({
  data: {
    attractions: [],
    filteredAttractions: [],
    categories: [
      { id: 1, name: '全部' },
      { id: 2, name: '自然风光' },
      { id: 3, name: '历史文化' },
      { id: 4, name: '古村落' },
      { id: 5, name: '宗教文化' },
      { id: 6, name: '文化休闲' }
    ],
    selectedCategory: '全部',
    searchKeyword: '',
    pageTitle: '景点导览',
    travelTips: [
      '优先选择工作日或错峰时段游览热门景区',
      '山地/古镇景区建议穿防滑舒适鞋',
      '长线行程建议提前查看天气与交通管制信息'
    ],
    quickGuides: [
      { id: 1, title: '亲子出游', text: '优先选择步行强度较低、设施完善景区' },
      { id: 2, title: '长者友好', text: '建议优先有接驳车与平缓步道的路线' },
      { id: 3, title: '摄影打卡', text: '黄金时段多为清晨与日落前后' }
    ],
    favorites: [],
    isLoading: true,
    allowTextSelect: true
  },

  onLoad() {
    this.loadPageData();
  },

  onShow() {
    this.reloadFavorites();
    this.applyFilters();
  },

  onPullDownRefresh() {
    this.loadPageData(() => {
      wx.stopPullDownRefresh();
      status.success('景点列表已刷新');
    });
  },

  loadPageData(done) {
    const startAt = Date.now();
    this.reloadFavorites();
    const mode = app.globalData.attractionListMode || 'all';
    const nearbyList = app.globalData.nearbyAttractions || [];
    const useNearby = mode === 'nearby' && nearbyList.length > 0;
    this.setData({
      isLoading: true,
      attractions: useNearby ? nearbyList : dataUtil.attractions,
      pageTitle: useNearby ? '附近景点' : '景点导览',
      selectedCategory: '全部',
      searchKeyword: ''
    }, () => {
      this.applyFilters();
      status.runWithMinDuration(startAt, () => {
        this.setData({ isLoading: false });
        if (typeof done === 'function') done();
      });
    });
  },

  reloadFavorites() {
    this.setData({ favorites: wx.getStorageSync('favorites') || [] });
  },

  applyFilters() {
    const keyword = this.data.searchKeyword.trim().toLowerCase();
    const category = this.data.selectedCategory;
    const favoriteIds = new Set(this.data.favorites.map(item => item.id));
    const filtered = this.data.attractions
      .filter((item) => {
        if (category !== '全部' && item.category !== category) return false;
        if (!keyword) return true;
        return item.name.toLowerCase().includes(keyword) ||
          item.location.toLowerCase().includes(keyword) ||
          item.description.toLowerCase().includes(keyword);
      })
      .map((item) => ({
        ...item,
        isFavorite: favoriteIds.has(item.id),
        distanceText: typeof item.distance === 'number' ? `${item.distance.toFixed(1)} 公里` : ''
      }));
    this.setData({ filteredAttractions: filtered });
  },

  selectCategory(e) {
    this.setData({ selectedCategory: e.currentTarget.dataset.category }, () => this.applyFilters());
  },

  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value }, () => this.applyFilters());
  },

  clearSearch() {
    this.setData({ searchKeyword: '' }, () => this.applyFilters());
  },

  navigateToDetail(e) {
    wx.navigateTo({ url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}` });
  },

  toggleFavorite(e) {
    const id = e.currentTarget.dataset.id;
    const attraction = dataUtil.getAttractionDetail(id);
    if (!attraction) return;

    let favorites = wx.getStorageSync('favorites') || [];
    const index = favorites.findIndex(item => item.id === id);
    if (index > -1) {
      favorites.splice(index, 1);
      status.info('已取消收藏');
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
    }
    wx.setStorageSync('favorites', favorites);
    this.setData({ favorites }, () => this.applyFilters());
  },

  onShareAppMessage() {
    return { title: '江淮风景线｜精选景点导览', path: '/pages/attractions/attractions' };
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
