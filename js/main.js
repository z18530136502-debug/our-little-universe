/* 全站交互：开场动画、日期计数、照片墙、时间轴、情书和音乐 */
document.addEventListener("DOMContentLoaded", () => {
  applyConfiguredContent();
  initIntro();
  initCounters();
  initPhotos();
  initTimeline();
  initLetter();
  initMusic();
});

// 将配置文件中的统一文案注入页面，避免在多个 HTML 文件中重复修改。
function applyConfiguredContent() {
  document.querySelectorAll("[data-content='siteName']").forEach(el => el.textContent = siteContent.siteName);
  document.querySelectorAll("[data-content='homeTitle']").forEach(el => el.textContent = siteContent.homeTitle);
  document.querySelectorAll("[data-content='homeSubtitle']").forEach(el => el.textContent = siteContent.homeSubtitle);

  const cover = document.querySelector(".cover-photo img");
  const caption = document.querySelector(".cover-photo figcaption");
  if (cover && siteContent.homeCover) {
    cover.src = siteContent.homeCover.src;
    cover.alt = siteContent.homeCover.alt;
  }
  if (caption && siteContent.homeCover) caption.textContent = siteContent.homeCover.caption;
}

// 首页爱心开场：首次进入显示；点击后播放放大与光芒扩散动画。
function initIntro() {
  const screen = document.getElementById("introScreen");
  const button = document.getElementById("heartLaunch");
  const shell = document.getElementById("siteShell");
  if (!screen || !button || !shell) return;

  // 每次打开首页都展示开场，便于作为纪念网站的仪式感入口。
  button.addEventListener("click", () => {
    if (screen.classList.contains("is-leaving")) return;
    screen.classList.add("is-leaving");
    document.body.classList.add("site-entered");
    window.setTimeout(() => {
      screen.hidden = true;
      shell.classList.add("is-visible");
      shell.scrollIntoView({ behavior: "instant", block: "start" });
    }, 850);
  });
}

// 计算已相伴天数与距离下一个周年纪念日的天数。
function initCounters() {
  const togetherEl = document.getElementById("togetherDays");
  const anniversaryEl = document.getElementById("anniversaryDays");
  if (!togetherEl || !anniversaryEl) return;

  const [year, month, day] = siteContent.togetherSince.split("-").map(Number);
  const start = new Date(year, month - 1, day);
  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const days = Math.max(0, Math.floor((todayDate - start) / 86400000));
  togetherEl.textContent = days.toLocaleString("zh-CN");

  let next = new Date(today.getFullYear(), month - 1, day);
  if (next <= todayDate) next = new Date(today.getFullYear() + 1, month - 1, day);
  anniversaryEl.textContent = Math.ceil((next - todayDate) / 86400000);
}

// 按配置生成照片卡片和分类按钮。
function initPhotos() {
  const grid = document.getElementById("photoGrid");
  const filters = document.getElementById("photoFilters");
  if (!grid || !filters) return;

  let activeCategory = "all";
  const renderFilters = () => {
    filters.innerHTML = "";
    siteContent.photoCategories.forEach(category => {
      const button = document.createElement("button");
      button.className = `filter-button${activeCategory === category.id ? " active" : ""}`;
      button.textContent = category.name;
      button.addEventListener("click", () => {
        activeCategory = category.id;
        renderFilters();
        renderGrid();
      });
      filters.appendChild(button);
    });
  };

  const renderGrid = () => {
    grid.innerHTML = "";
    const visible = siteContent.photos.filter(photo => activeCategory === "all" || photo.category === activeCategory);
    visible.forEach((photo, index) => {
      const card = document.createElement("button");
      card.className = `photo-card photo-card-${index % 4}`;
      card.type = "button";
      card.innerHTML = `<img src="${escapeAttribute(photo.src)}" alt="${escapeAttribute(photo.alt || photo.title)}" loading="lazy"><span class="photo-card-caption"><b>${escapeHtml(photo.title)}</b><small>${escapeHtml(photo.date || "")}</small></span>`;
      card.addEventListener("click", () => openLightbox(photo));
      grid.appendChild(card);
    });
    if (!visible.length) grid.innerHTML = '<p class="empty-state">这一类回忆还在慢慢收集。</p>';
  };

  function openLightbox(photo) {
    const box = document.getElementById("lightbox");
    const image = document.getElementById("lightboxImage");
    const caption = document.getElementById("lightboxCaption");
    if (!box || !image || !caption) return;
    image.src = photo.src;
    image.alt = photo.alt || photo.title;
    caption.textContent = `${photo.title}${photo.date && photo.date !== "待补充" ? " · " + photo.date : ""}${photo.description ? " — " + photo.description : ""}`;
    box.classList.add("is-open");
    box.setAttribute("aria-hidden", "false");
  }

  const close = () => {
    const box = document.getElementById("lightbox");
    if (box) {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
    }
  };
  document.getElementById("lightboxClose")?.addEventListener("click", close);
  document.getElementById("lightbox")?.addEventListener("click", event => {
    if (event.target.id === "lightbox") close();
  });
  document.addEventListener("keydown", event => { if (event.key === "Escape") close(); });

  renderFilters();
  renderGrid();
}

// 生成爱情时间轴；只有配置中存在的真实事件才会显示。
function initTimeline() {
  const container = document.getElementById("timelineList");
  if (!container) return;
  container.innerHTML = "";
  siteContent.timeline.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = `timeline-item${index % 2 ? " reverse" : ""}`;
    const image = item.image ? `<img src="${escapeAttribute(item.image)}" alt="${escapeAttribute(item.title)}" loading="lazy">` : "";
    article.innerHTML = `<div class="timeline-dot"></div><div class="timeline-card"><p class="timeline-date">${escapeHtml(item.date)}</p><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.description)}</p>${image}</div>`;
    container.appendChild(article);
  });
}

// 信封打开后显示情书正文。
function initLetter() {
  const trigger = document.getElementById("openLetter");
  const paper = document.getElementById("letterPaper");
  if (!trigger || !paper) return;
  trigger.addEventListener("click", () => {
    if (trigger.classList.contains("opened")) return;
    trigger.classList.add("opened");
    document.getElementById("envelopeHint").textContent = "这封信，写给最喜欢的你";
    window.setTimeout(() => {
      paper.hidden = false;
      paper.classList.add("paper-visible");
      paper.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 550);
  });
  const letter = siteContent.letter;
  document.getElementById("letterDate").textContent = letter.date;
  document.getElementById("letterGreeting").textContent = letter.greeting;
  const body = document.getElementById("letterBody");
  letter.paragraphs.forEach(paragraph => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    body.appendChild(p);
  });
  document.getElementById("letterSignature").textContent = letter.signature;
}

// 背景音乐需要用户主动点击播放，符合浏览器自动播放策略。
function initMusic() {
  const audio = document.getElementById("backgroundMusic");
  const buttons = document.querySelectorAll(".music-toggle");
  if (!audio || !buttons.length || !siteContent.music.enabled) {
    buttons.forEach(button => {
      button.title = "添加音乐文件并在 js/content.js 中启用音乐";
      button.addEventListener("click", () => alert("请先将音乐文件放入 assets/music/，并在 js/content.js 中将 music.enabled 改为 true。"));
    });
    return;
  }
  audio.src = siteContent.music.src;
  buttons.forEach(button => button.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        buttons.forEach(item => { item.classList.add("playing"); item.querySelector("span").textContent = "暂停音乐"; });
      } else {
        audio.pause();
        buttons.forEach(item => { item.classList.remove("playing"); item.querySelector("span").textContent = "播放音乐"; });
      }
    } catch (error) {
      alert("音乐暂时无法播放，请检查音乐文件路径和格式。");
    }
  }));
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}
function escapeAttribute(value) { return escapeHtml(value); }
