const MIN_SKELETON_MS = 220;

function toast(title, icon = 'none', duration = 1800) {
  wx.showToast({
    title,
    icon,
    duration
  });
}

function success(title = '操作成功') {
  toast(title, 'success');
}

function info(title = '请稍候') {
  toast(title, 'none');
}

function warn(title = '请检查后重试') {
  toast(title, 'none');
}

function runWithMinDuration(startAt, callback, minMs = MIN_SKELETON_MS) {
  const elapsed = Date.now() - startAt;
  const wait = elapsed < minMs ? minMs - elapsed : 0;
  setTimeout(callback, wait);
}

module.exports = {
  MIN_SKELETON_MS,
  success,
  info,
  warn,
  runWithMinDuration
};
