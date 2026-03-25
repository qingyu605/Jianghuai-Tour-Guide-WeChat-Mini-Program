Page({
  data: {
    allowTextSelect: true
  },

  clearTextSelection() {
    if (!this.data.allowTextSelect) return;
    this.setData({ allowTextSelect: false });
    clearTimeout(this._textSelectTimer);
    this._textSelectTimer = setTimeout(() => this.setData({ allowTextSelect: true }), 40);
  },

  onShareAppMessage() {
    return {
      title: '江淮风景线｜隐私与服务政策',
      path: '/pages/policy/policy'
    };
  },

  onUnload() {
    clearTimeout(this._textSelectTimer);
  }
});
