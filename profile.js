/* =====================================================================
 * profile.js  —— 从 profile.config.js 读取数据并渲染整个个人主页
 * 不需要修改本文件。所有可视内容在 profile.config.js 中配置。
 * ===================================================================== */

// ---- 小工具 ----
const $ = (sel) => document.querySelector(sel);
const el = (tag, attrs = {}, html = "") => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "dataset") Object.assign(node.dataset, v);
    else if (k in node) node[k] = v;
    else node.setAttribute(k, v);
  }
  if (html) node.innerHTML = html;
  return node;
};

// 把文本里的 "⚠️ TODO" 高亮
const highlightTodo = (text) =>
  String(text).replace(/⚠️\s*TODO[^<\n]*/g, (m) => `<span class="todo">${m}</span>`);

// 图标（Unicode，避免引入 iconfont）
const ICONS = {
  email:    "✉",
  github:   "",   // 用 SVG 更好看，但简单起见用 Unicode
  scholar:  "🎓",
  orcid:    "🆔",
  linkedin: "in",
  twitter:  "𝕏",
  cv:       "📄",
  website:  "🌐"
};


// =====================================================================
// 1. Hero (头像 + 名字 + tagline + tags + contacts)
// =====================================================================
function renderHero() {
  $("#avatar").src = PROFILE.avatar;
  $("#name-zh").textContent = PROFILE.name.zh;
  $("#name-en").textContent = PROFILE.name.en;
  $("#tagline").innerHTML = highlightTodo(PROFILE.tagline);
  $("#title-line").innerHTML = highlightTodo(PROFILE.title);
  $("#location").textContent = PROFILE.location;

  // tags
  const tagsBox = $("#hero-tags");
  tagsBox.innerHTML = "";
  PROFILE.tags.forEach(t => tagsBox.appendChild(el("span", { class: "tag" }, t)));

  // contacts
  const cBox = $("#contacts");
  cBox.innerHTML = "";
  CONTACTS.forEach(c => {
    const li = el("li");
    const icon = ICONS[c.type] || "🔗";
    const isTodoHref = typeof c.href === "string" && c.href.includes("TODO");
    const href = isTodoHref ? "#" : c.href;
    const value = highlightTodo(c.value);
    li.innerHTML = `<a href="${href}" target="_blank" rel="noopener">
      <span class="icon">${icon}</span>
      <span>${c.label}: <strong>${value}</strong></span>
    </a>`;
    cBox.appendChild(li);
  });
}


// =====================================================================
// 2. About
// =====================================================================
function renderAbout() {
  const box = $("#bio");
  box.innerHTML = "";
  PROFILE.bio.forEach(p => {
    box.appendChild(el("p", {}, highlightTodo(p)));
  });
}


// =====================================================================
// 3. Research Interests
// =====================================================================
function renderInterests() {
  const box = $("#interests");
  box.innerHTML = "";
  RESEARCH_INTERESTS.forEach(r => {
    const card = el("div", { class: "interest-card" });
    card.innerHTML = `
      <div class="emoji">${r.emoji}</div>
      <h3>${highlightTodo(r.title)}</h3>
      <p>${highlightTodo(r.desc)}</p>
    `;
    box.appendChild(card);
  });
}


// =====================================================================
// 4. News
// =====================================================================
function renderNews() {
  const box = $("#news");
  box.innerHTML = "";
  NEWS.forEach(n => {
    const li = el("li");
    li.innerHTML = `
      <span class="date">${highlightTodo(n.date)}</span>
      <span class="text">${highlightTodo(n.text)}</span>
    `;
    box.appendChild(li);
  });
}


// =====================================================================
// 5. Projects
// =====================================================================
function renderProjects() {
  const box = $("#projects");
  box.innerHTML = "";
  PROJECTS.forEach(p => {
    const isExternal = p.link.startsWith("http");
    const a = el("a", {
      class: "project-card",
      href: p.link,
      target: isExternal ? "_blank" : "_self",
      rel: isExternal ? "noopener" : ""
    });
    a.innerHTML = `
      <div class="emoji">${p.emoji}</div>
      <h3>${p.title}</h3>
      <p>${highlightTodo(p.tagline)}</p>
      <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
    `;
    box.appendChild(a);
  });
}


// =====================================================================
// 6. Publications
// =====================================================================
function renderPubs() {
  const box = $("#pubs");
  box.innerHTML = "";

  // 判断是否全是 TODO
  const allTodo = PUBLICATIONS.every(p =>
    Object.values(p).some(v => String(v).includes("TODO"))
  );

  if (allTodo) {
    box.innerHTML = `<li style="color:var(--muted);font-size:14px">
      <span class="todo">⚠️ TODO: 在 profile.config.js 的 PUBLICATIONS 数组中填入你的论文。</span>
    </li>`;
    return;
  }

  PUBLICATIONS.forEach(p => {
    const li = el("li");
    // authors 支持 **粗体**
    const authors = String(p.authors || "").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    const title = p.link && !p.link.includes("TODO")
      ? `<a class="pub-title" href="${p.link}" target="_blank" rel="noopener">${highlightTodo(p.title)}</a>`
      : `<span class="pub-title">${highlightTodo(p.title)}</span>`;
    li.innerHTML = `
      <span class="authors">${highlightTodo(authors)}</span>
      ${title}
      <span class="venue">${highlightTodo(p.venue || "")}</span>
      ${p.note ? `<span class="note">${highlightTodo(p.note)}</span>` : ""}
    `;
    box.appendChild(li);
  });
}


// =====================================================================
// 7. Education + Awards
// =====================================================================
function renderEduAwards() {
  const eduBox = $("#education");
  eduBox.innerHTML = "";
  EDUCATION.forEach(e => {
    const li = el("li");
    li.innerHTML = `
      <div class="head">
        <span>${highlightTodo(e.institution)}</span>
        <span class="period">${highlightTodo(e.period)}</span>
      </div>
      <div class="sub">${highlightTodo(e.degree)}</div>
      ${e.note ? `<div class="sub">${highlightTodo(e.note)}</div>` : ""}
    `;
    eduBox.appendChild(li);
  });

  const awardBox = $("#awards");
  awardBox.innerHTML = "";
  AWARDS.forEach(a => {
    const li = el("li");
    li.innerHTML = `
      <div class="head">
        <span>${highlightTodo(a.title)}</span>
        <span class="period">${highlightTodo(a.year)}</span>
      </div>
      <div class="sub">${highlightTodo(a.org)}</div>
    `;
    awardBox.appendChild(li);
  });
}


// =====================================================================
// 启动
// =====================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderAbout();
  renderInterests();
  renderNews();
  renderProjects();
  renderPubs();
  renderEduAwards();

  // 在页脚显示最后更新时间
  const now = new Date().toISOString().slice(0, 10);
  const footerDate = $("#footer-date");
  if (footerDate) footerDate.textContent = now;
});
