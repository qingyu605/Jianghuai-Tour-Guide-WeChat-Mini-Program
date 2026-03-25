# 江淮旅游导览小程序

一款面向大众用户的微信旅游导览小程序，覆盖景点浏览、路线推荐、收藏管理、地图导航、文字导览等核心能力，支持商用风格页面与真机可用交互。

## 1. 项目简介

本项目定位为“可直接上线”的旅游导览小程序模板，适用于：

- 文旅内容展示
- 城市景点导览
- 路线产品推荐
- 旅游品牌宣传与活动运营

## 2. 功能概览

### 首页（`pages/index`）
- 顶部轮播主视觉
- 导览服务快捷入口（附近景点、精选路线、语音导览、我的收藏）
- 热门景点卡片区
- 热门路线卡片区

### 景点（`pages/attractions`）
- 搜索 + 分类筛选
- 收藏/取消收藏
- 附近景点模式（基于定位排序）

### 景点详情（`pages/detail`）
- 图片轮播与缩略图预览
- 景点介绍 / 游览档案 / 必看点位
- 地图导航
- 文字导览弹层（可复制）

### 路线（`pages/routes`）
- 路线列表
- 路线详情
- 保存到“我的路线”

### 我的（`pages/my`）
- 微信授权登录（`wx.getUserProfile`）
- 收藏景点入口页（独立页面）
- 保存路线入口页（独立页面）
- 使用说明与隐私政策入口

### 说明页面
- 使用说明：`pages/about`
- 隐私与政策：`pages/policy`

## 3. 技术栈

- 微信小程序原生框架
- JavaScript
- WXML / WXSS
- 本地存储（`wx.setStorageSync`）

## 4. 目录结构

```text
.
├── app.js
├── app.json
├── app.wxss
├── pages
│   ├── index
│   ├── attractions
│   ├── detail
│   ├── routes
│   ├── my
│   ├── about
│   └── policy
├── utils
│   ├── data.js
│   └── status.js
├── images
│   ├── attractions
│   ├── banners
│   ├── icons
│   ├── routes
│   └── tab
├── sitemap.json
└── LAUNCH_CHECKLIST.md
```

## 5. 本地运行

1. 安装并打开微信开发者工具  
2. 导入项目根目录  
3. 配置 AppID（没有可使用测试号）  
4. 点击“编译”  
5. 使用“真机预览”联调

## 6. 关键配置说明

### `app.json`
- 页面注册
- tabBar 配置
- 导航栏样式
- 定位权限说明（`scope.userLocation`）

### `utils/data.js`
- 景点与路线基础数据
- 景点导览扩展信息
- 路线景点解析能力

### `utils/status.js`
- 全局统一状态提示
- 骨架屏最短展示时长策略

## 7. 数据与存储

本项目默认使用本地存储：

- `favorites`：收藏景点
- `savedRoutes`：保存路线
- `userInfo`：登录后用户信息（本地）

## 8. GitHub 上传指南

在项目根目录执行（首次上传）：

```bash
git init
git add .
git commit -m "feat: init jianghuai travel mini-program"
git branch -M main
git remote add origin https://github.com/<your-name>/<your-repo>.git
git push -u origin main
```

后续更新：

```bash
git add .
git commit -m "feat: update pages and styles"
git push
```

## 9. 发布前检查

请按根目录文档执行：

- [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md)

重点包括：
- 隐私合规（平台隐私指引一致）
- 真机回归（定位、收藏、路线、导览）
- 文案与商务联系方式复核

## 10. 常见问题

### Q1：为什么“附近景点”不可用？
通常是定位权限未开启。请在微信设置中开启位置权限后重试。

### Q2：为什么收藏和路线在新设备看不到？
当前版本为本地存储方案，不跨设备同步。

### Q3：可以商用吗？
可以作为商用基础模板，但上线前请完成你主体下的资质、隐私与类目审核。

## 11. 许可证

MIT License
