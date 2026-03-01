const app = getApp();
const dataUtil = require('../../utils/data.js');

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
    pageTitle: '全部景点',
    favorites: []
  },
  
  onLoad(options) {
    // 获取收藏列表
    this.setData({
      favorites: wx.getStorageSync('favorites') || []
    });
    
    // 判断是否是附近景点页面
    if (options.type === 'nearby' && app.globalData.nearbyAttractions) {
      this.setData({
        attractions: app.globalData.nearbyAttractions,
        filteredAttractions: app.globalData.nearbyAttractions,
        pageTitle: '附近景点'
      });
    } else {
      // 加载所有景点
      this.setData({
        attractions: dataUtil.attractions,
        filteredAttractions: dataUtil.attractions
      });
    }
  },
  
  // 选择分类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      selectedCategory: category,
      searchKeyword: ''
    });
    
    // 筛选景点
    const filtered = dataUtil.getAttractionsByCategory(category);
    this.setData({
      filteredAttractions: filtered
    });
  },
  
  // 搜索输入
  onSearchInput(e) {
    const keyword = e.detail.value;
    this.setData({
      searchKeyword: keyword
    });
    
    // 搜索筛选
    const filtered = dataUtil.searchAttractions(keyword);
    this.setData({
      filteredAttractions: filtered
    });
  },
  
  // 清除搜索
  clearSearch() {
    this.setData({
      searchKeyword: '',
      filteredAttractions: dataUtil.getAttractionsByCategory(this.data.selectedCategory)
    });
  },
  
  // 跳转到景点详情
  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  },
  
  // 切换收藏状态
  toggleFavorite(e) {
    const id = e.currentTarget.dataset.id;
    let favorites = [...this.data.favorites];
    const attraction = this.data.attractions.find(item => item.id === id);
    
    if (!attraction) return;
    
    const index = favorites.findIndex(item => item.id === id);
    
    if (index > -1) {
      // 取消收藏
      favorites.splice(index, 1);
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      });
    } else {
      // 添加收藏
      favorites.push({
        id: attraction.id,
        name: attraction.name,
        image: attraction.image,
        location: attraction.location,
        category: attraction.category,
        level: attraction.level,
        addTime: new Date().getTime()
      });
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
      });
    }
    
    // 保存到本地存储
    wx.setStorageSync('favorites', favorites);
    this.setData({ favorites: favorites });
  },
  
  // 判断是否为收藏
  isFavorite(id) {
    return this.data.favorites.some(item => item.id === id);
  }
});
