# 小芽 · 幼小衔接工作台

在线使用：<https://g2og4t-dotcom.github.io/sprout-learning-workbench/>

面向 5–7 岁孩子和家长的本地优先学习工作台。覆盖识字、拼音、数学、英语、科普、古诗和逻辑七个模块，包含点读、互动题、掌握进度、每日任务、打卡、小红花奖励和本地备份。

## 本地打开

在本目录启动任意静态网页服务，例如：

```sh
python3 -m http.server 4173
```

然后访问 `http://localhost:4173`。需要通过网页地址打开，PWA 离线缓存无法在直接双击 `index.html` 时启用。

## 安装到设备

- iPhone / iPad：Safari 打开网页，点“分享”→“添加到主屏幕”。
- Mac：Safari 打开网页，点“分享”→“添加到程序坞”。

首次打开时需要联网获取应用文件，完成后可离线使用。学习记录只保存在当前设备；可在“家长”页面导出或导入 JSON 备份。

## 测试

核心逻辑测试：

```sh
node --test tests/core.test.mjs
```

浏览器冒烟测试需要先在 4173 端口启动静态服务，并安装 Google Chrome：

```sh
node tests/browser-smoke.mjs
```

如 Chrome 不在 macOS 默认路径，可设置 `CHROME_PATH`。
对已发布网站运行时，可设置 `BASE_URL`。

## 文件结构

- `index.html`：应用入口
- `styles.css`：Mac、iPad、iPhone 响应式界面
- `app.mjs`：页面和交互逻辑
- `core.mjs`：可测试的数据与规则
- `content.mjs`：七科学习内容
- `manifest.webmanifest`、`sw.js`：安装和离线能力
- `tests/`：核心与浏览器测试
