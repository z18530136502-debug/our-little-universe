/*
 * 网站内容配置文件
 * 以后替换照片、日期、文案和音乐时，优先修改本文件即可。
 * 图片放在 assets/images/ 目录；音乐放在 assets/music/ 目录。
 */
const siteContent = {
  siteName: "Our Little Universe",

  // 首页文案与相伴日期（格式：YYYY-MM-DD）
  homeTitle: "喜欢你，是一件幸福开心的事。",
  homeSubtitle: "彼此相拥，共同前行",
  togetherSince: "2026-11-04",

  // 背景音乐：把音乐文件命名为 our-song.mp3，放入 assets/music/。
  // 如果暂时没有音乐文件，保持 enabled: false；有文件后改为 true。
  music: {
    enabled: true,
    src: "assets/music/our-song.mp3"
  },

  // 首页封面照片。当前先使用已收到的这一张，后续可替换路径。
  homeCover: {
    src: "assets/images/photo-01.jpg",
    alt: "花园中的一张生活照片",
    caption: "Little moments, lovely memories."
  },

  // 照片墙：目前只有这一张。后续按同样格式继续添加对象即可。
  photoCategories: [
    { id: "all", name: "全部" },
    { id: "portrait", name: "生活写真" },
    { id: "couple", name: "我们的合照" },
    { id: "daily", name: "日常点滴" },
    { id: "travel", name: "一起出发" }
  ],
  photos: [
    {
      id: 1,
      src: "assets/images/photo-01.jpg",
      alt: "花园中的生活照片",
      date: "待补充",
      title: "花与她",
      description: "把美好的瞬间，留在这一页。",
      category: "portrait"
    }
  ],

  // 时间轴：目前只录入已经确认的真实事件，不虚构其他经历。
  timeline: [
    {
      date: "2026.11.04",
      title: "表白成功",
      description: "故事从这一天正式开始。喜欢你，是一件幸福开心的事。",
      image: ""
    }
  ],

  // 情书内容：根据你提供的想法整理，之后可以继续修改。
  letter: {
    date: "写于我们的纪念日",
    greeting: "亲爱的你：",
    paragraphs: [
      "你的每一份好，我都记得。",
      "我喜欢你的好，也珍惜我们相处的每一个瞬间。对你好，从来不是一件需要刻意坚持的事情，而是一件让我觉得幸福和快乐的事。",
      "希望往后的日子里，我们继续彼此相拥、共同前行，把平凡的日子过成属于我们的小小宇宙。"
    ],
    signature: "一直认真喜欢你的人"
  }
};
