# Our Little Universe

一份可直接部署到 GitHub Pages 的静态爱情纪念网站。使用原生 HTML、CSS、JavaScript，不需要安装框架或后端。

## 目录结构

```text
our-little-universe/
├── index.html
├── photos.html
├── timeline.html
├── letter.html
├── css/
│   └── style.css
├── js/
│   ├── content.js
│   └── main.js
└── assets/
    ├── images/
    │   └── photo-01.jpg
    └── music/
        └── （将背景音乐放在这里）
```

## 当前已录入的真实内容

- 网站名：Our Little Universe
- 首页标题：喜欢你，是一件幸福开心的事。
- 首页副标题：彼此相拥，共同前行
- 相伴日期：2026-11-04
- 时间轴：2026.11.04 表白成功
- 照片：当前收到的 1 张照片，暂时同时用于首页封面和照片墙
- 情书：根据提供的想法整理的初稿

## 如何替换或增加照片

1. 将照片复制到 `assets/images/` 目录，例如 `photo-02.jpg`。
2. 打开 `js/content.js`。
3. 在 `photos` 数组中增加一项，示例：

```javascript
{
  id: 2,
  src: "assets/images/photo-02.jpg",
  alt: "一起散步的照片",
  date: "2026-11-10",
  title: "一起散步",
  description: "那天的风很温柔。",
  category: "daily"
}
```

4. `category` 可使用 `portrait`、`couple`、`daily`、`travel`。分类名称可以在 `photoCategories` 中修改。
5. 想更换首页封面，修改 `homeCover.src`、`homeCover.alt` 和 `homeCover.caption`。

照片建议使用 JPG 或 WebP。竖版照片更适合当前拍立得式布局。建议图片适当压缩，单张尽量控制在 1–2 MB 左右。

## 如何增加时间轴事件

在 `js/content.js` 的 `timeline` 数组中追加：

```javascript
{
  date: "2026.12.01",
  title: "第一次一起旅行",
  description: "写一段真实的小故事。",
  image: "assets/images/photo-02.jpg"
}
```

如果暂时没有对应照片，`image` 留空字符串即可。

## 如何修改情书

在 `js/content.js` 修改 `letter` 中的 `date`、`greeting`、`paragraphs` 和 `signature`。`paragraphs` 数组中每一项会单独显示为一段。

## 如何添加背景音乐

1. 准备一首 MP3 文件。
2. 将它命名为 `our-song.mp3`，放入 `assets/music/` 目录。
3. 打开 `js/content.js`，把：

```javascript
music: {
  enabled: false,
  src: "assets/music/our-song.mp3"
}
```

改为：

```javascript
music: {
  enabled: true,
  src: "assets/music/our-song.mp3"
}
```

浏览器通常不允许网页未经用户操作就自动播放声音，因此需要点击页面右上角的音乐按钮开始播放。请使用自己拥有播放/分享权限的音乐文件。

## 如何部署到 GitHub Pages

1. 在 GitHub 新建一个仓库，例如 `our-little-universe`。
2. 上传本目录中的全部文件和文件夹（注意是上传 `index.html` 所在目录里的内容）。
3. 打开仓库 `Settings` → `Pages`。
4. 在 `Build and deployment` 中选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/ (root)`，保存。
6. 等待 GitHub Pages 发布完成，访问页面显示的地址。

## 隐私提醒

GitHub Pages 是公开网页。任何获得网站链接的人都可能查看其中的照片和文字，不适合放置双方不愿公开给链接持有者的私人内容。若希望严格私密，需要使用带访问控制的托管方式，而不是公开 Pages。

## 备注

- 所有主要文案、日期、照片列表和音乐路径集中在 `js/content.js`。
- 当前只有 1 张真实照片，后续可以继续追加，不需要重做页面结构。
- 纪念日天数由浏览器本地日期计算；网站不会收集或上传访客数据。
