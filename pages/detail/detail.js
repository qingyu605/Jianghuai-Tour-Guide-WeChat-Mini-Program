const app = getApp();
const dataUtil = require('../../utils/data.js');

Page({
  data: {
    attraction: null,
    isFavorite: false,
    favorites: [],
    markers: [],
    isPlaying: false,
    audioCtx: null,
    currentImageIndex: 0
  },
  
  onLoad(options) {
    const id = parseInt(options.id);
    // 获取景点详情
    const attraction = dataUtil.getAttractionDetail(id);
    
    if (attraction) {
      this.setData({
        attraction: attraction,
        markers: [{
          id: 1,
          latitude: attraction.coordinates.latitude,
          longitude: attraction.coordinates.longitude,
          title: attraction.name,
          iconPath: '/images/icons/marker.png',
          width: 40,
          height: 40
        }]
      });
      
      // 设置页面标题
      wx.setNavigationBarTitle({
        title: attraction.name
      });
    } else {
      wx.showToast({
        title: '景点不存在',
        icon: 'none',
        success: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      });
    }
    
    // 初始化收藏状态
    this.initFavorites();
    
    // 初始化音频上下文
    this.setData({
      audioCtx: wx.createInnerAudioContext()
    });
    
    // 监听音频播放状态
    this.data.audioCtx.onPlay(() => {
      this.setData({ isPlaying: true });
    });
    
    this.data.audioCtx.onPause(() => {
      this.setData({ isPlaying: false });
    });
    
    this.data.audioCtx.onEnded(() => {
      this.setData({ isPlaying: false });
    });
  },
  
  // 初始化收藏状态
  initFavorites() {
    const favorites = wx.getStorageSync('favorites') || [];
    this.setData({
      favorites: favorites,
      isFavorite: favorites.some(item => item.id === this.data.attraction.id)
    });
  },
  
  // 切换收藏状态
  toggleFavorite() {
    let favorites = [...this.data.favorites];
    const attraction = this.data.attraction;
    const index = favorites.findIndex(item => item.id === attraction.id);
    
    if (index > -1) {
      // 取消收藏
      favorites.splice(index, 1);
      this.setData({ isFavorite: false });
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
      this.setData({ isFavorite: true });
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
      });
    }
    
    // 保存到本地存储
    wx.setStorageSync('favorites', favorites);
    this.setData({ favorites: favorites });
  },
  
  // 播放语音导览
  playAudio() {
    const audioCtx = this.data.audioCtx;
    audioCtx.src = this.data.attraction.audioGuide;
    audioCtx.play();
  },
  
  // 暂停语音导览
  pauseAudio() {
    this.data.audioCtx.pause();
  },
  
  // 打开地图导航
  openLocation() {
    const loc = this.data.attraction.coordinates;
    wx.openLocation({
      latitude: loc.latitude,
      longitude: loc.longitude,
      name: this.data.attraction.name,
      address: this.data.attraction.location,
      scale: 16
    });
  },
  
  // 预览图片
  previewImage(e) {
    const currentImg = e.currentTarget.dataset.img;
    wx.previewImage({
      current: currentImg,
      urls: this.data.attraction.images
    });
  },
  
  // 切换图片
  changeImage(e) {
    const direction = e.currentTarget.dataset.direction;
    const images = this.data.attraction.images;
    let index = this.data.currentImageIndex;
    
    if (direction === 'prev') {
      index = index > 0 ? index - 1 : images.length - 1;
    } else {
      index = index < images.length - 1 ? index + 1 : 0;
    }
    
    this.setData({ currentImageIndex: index });
  },
  
  // 分享功能
  onShareAppMessage() {
    const attraction = this.data.attraction;
    return {
      title: `推荐景点：${attraction.name}`,
      path: `/pages/detail/detail?id=${attraction.id}`,
      imageUrl: attraction.image
    };
  },
  
  onUnload() {
    // 页面卸载时停止音频播放
    this.data.audioCtx.stop();
  }
});
