Page({
  data: {
    allowTextSelect: true
  },

  clearTextSelection() {
    if (!this.data.allowTextSelect) return;
    this.setData({ allowTextSelect: false });
    clearTimeout(this._textSelectTimer);
    this._textSelectTimer = setTimeout(() => {
      this.setData({ allowTextSelect: true });
    }, 40);
  },

  onUnload() {
    clearTimeout(this._textSelectTimer);
  }
});
