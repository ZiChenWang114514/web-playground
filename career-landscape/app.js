/* ===========================================================
 * Career Landscape — 交互逻辑 v2
 *   - 气泡图悬停显示薪资/增长锚点与信源编号
 *   - 数据表新增「信源」列
 *   - 信源索引以可展开卡片呈现，用户可溯源
 * =========================================================== */

const state = {
  selectedCategories: new Set(Object.keys(CATEGORY_COLORS)),
  sort: { key: "salary", dir: "desc" }
};

const $filterBox  = document.getElementById("category-filters");
const $tableBody  = document.getElementById("table-body");
const $tableHead  = document.getElementById("table-head");
const $plot       = document.getElementById("plot");
const $sourceBox  = document.getElementById("source-list");

// ----- 1. 侧边栏筛选 -----
function renderFilters() {
  $filterBox.innerHTML = "";
  Object.entries(CATEGORY_COLORS).forEach(([cat, color]) => {
    const wrapper = document.createElement("label");
    wrapper.innerHTML = `
      <input type="checkbox" value="${cat}" ${state.selectedCategories.has(cat) ? "checked" : ""}>
      <span class="color-dot" style="background:${color}"></span>
      <span>${cat}</span>
    `;
    wrapper.querySelector("input").addEventListener("change", (e) => {
      if (e.target.checked) state.selectedCategories.add(cat);
      else                  state.selectedCategories.delete(cat);
      update();
    });
    $filterBox.appendChild(wrapper);
  });

  document.getElementById("btn-all").addEventListener("click", () => {
    state.selectedCategories = new Set(Object.keys(CATEGORY_COLORS));
    renderFilters(); update();
  });
  document.getElementById("btn-none").addEventListener("click", () => {
    state.selectedCategories = new Set();
    renderFilters(); update();
  });
}

function getFiltered() {
  return DOMAIN_DATA.filter(d => state.selectedCategories.has(d.category));
}

// ----- 2. 气泡图 -----
function drawPlot() {
  const filtered = getFiltered();

  const traces = Object.keys(CATEGORY_COLORS).map(cat => {
    const rows = filtered.filter(d => d.category === cat);
    return {
      name: cat,
      type: "scatter",
      mode: "markers+text",
      x: rows.map(d => d.compute),
      y: rows.map(d => d.salary),
      text: rows.map(d => d.field),
      textposition: "top center",
      textfont: { size: 11, color: "#2c2f33" },
      marker: {
        size: rows.map(d => d.growth),
        sizemode: "area",
        sizeref: 0.12,
        sizemin: 8,
        color: CATEGORY_COLORS[cat],
        opacity: 0.78,
        line: { width: 1.2, color: "#ffffff" }
      },
      customdata: rows.map(d => [
        d.growth,
        d.category,
        d.desc,
        d.salaryAnchor,
        d.growthAnchor,
        d.sources.map(s => `[${s}]`).join(" ")
      ]),
      hovertemplate:
        "<b>%{text}</b><br>" +
        "<span style='color:#9aa5b1'>————————————————</span><br>" +
        "学科：%{customdata[1]} &nbsp;·&nbsp; 计算驱动 %{x} &nbsp;·&nbsp; 薪资 %{y} &nbsp;·&nbsp; 增长 %{customdata[0]}<br>" +
        "<i>%{customdata[2]}</i><br>" +
        "<span style='color:#9aa5b1'>———</span><br>" +
        "<b>薪资锚点</b>：%{customdata[3]}<br>" +
        "<b>增长锚点</b>：%{customdata[4]}<br>" +
        "<span style='color:#8b949e;font-size:11px'>信源：%{customdata[5]}</span>" +
        "<extra></extra>"
    };
  });

  const layout = {
    xaxis: {
      title: { text: "◀ 纯湿实验 (0) ——— 纯代码计算驱动 (100) ▶", font: { size: 13 } },
      range: [-5, 108],
      gridcolor: "#eef1f5",
      zerolinecolor: "#d0d7de"
    },
    yaxis: {
      title: { text: "商业化薪资潜力得分", font: { size: 13 } },
      range: [20, 108],
      gridcolor: "#eef1f5",
      zerolinecolor: "#d0d7de"
    },
    hoverlabel: {
      bgcolor: "#1c2128",
      bordercolor: "#1c2128",
      font: { color: "#fff", family: "inherit", size: 12.5 },
      align: "left"
    },
    legend: {
      orientation: "h",
      yanchor: "bottom", y: 1.02,
      xanchor: "right",  x: 1,
      font: { size: 12 }
    },
    margin: { l: 60, r: 30, t: 40, b: 60 },
    plot_bgcolor: "#ffffff",
    paper_bgcolor: "#ffffff",
    shapes: [
      {
        type: "rect", xref: "x", yref: "y",
        x0: 80, x1: 108, y0: 85, y1: 108,
        fillcolor: "#fff4d6", opacity: 0.35,
        line: { width: 0 }, layer: "below"
      }
    ],
    annotations: [
      {
        x: 94, y: 106, xref: "x", yref: "y",
        text: "<b>高计算 × 高薪资</b> · 黄金象限",
        showarrow: false,
        font: { color: "#b38600", size: 11 }
      }
    ]
  };

  Plotly.react($plot, traces, layout, {
    displaylogo: false,
    responsive: true,
    modeBarButtonsToRemove: ["select2d", "lasso2d", "autoScale2d"]
  });
}

// ----- 3. 数据表 -----
function renderTable() {
  const rows = getFiltered().slice();
  const { key, dir } = state.sort;
  const sign = dir === "asc" ? 1 : -1;
  rows.sort((a, b) => {
    const va = a[key], vb = b[key];
    if (typeof va === "number") return (va - vb) * sign;
    return String(va).localeCompare(String(vb), "zh") * sign;
  });

  $tableHead.querySelectorAll("th").forEach(th => {
    const k = th.dataset.key;
    const ind = th.querySelector(".sort-indicator");
    if (!ind) return;
    if (k === key) ind.textContent = dir === "asc" ? "▲" : "▼";
    else           ind.textContent = "▾";
  });

  $tableBody.innerHTML = rows.map(d => `
    <tr>
      <td><strong>${d.field}</strong></td>
      <td><span class="cat-badge" style="background:${CATEGORY_COLORS[d.category]}">${d.category}</span></td>
      <td>${d.compute}</td>
      <td>${d.salary}</td>
      <td>${d.growth}</td>
      <td style="color:#4b5563">${d.desc}</td>
      <td class="src-col">${d.sources.map(s => {
        const src = SOURCE_INDEX[s];
        return src
          ? `<a href="${src.url}" target="_blank" rel="noopener" class="src-ref" title="${src.title} — ${src.publisher} ${src.year}">[${s}]</a>`
          : `<span class="src-ref">[${s}]</span>`;
      }).join(" ")}</td>
    </tr>
  `).join("");

  if (rows.length === 0) {
    $tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:30px;color:#8b949e">
      当前没有勾选任何学科大类，请在左侧面板中选择至少一个。</td></tr>`;
  }
}

// ----- 4. 排序 -----
function bindSortHandlers() {
  $tableHead.querySelectorAll("th[data-key]").forEach(th => {
    th.addEventListener("click", () => {
      const k = th.dataset.key;
      if (state.sort.key === k) state.sort.dir = state.sort.dir === "asc" ? "desc" : "asc";
      else                       state.sort = { key: k, dir: "desc" };
      renderTable();
    });
  });
}

// ----- 5. 信源列表 -----
function renderSources() {
  const entries = Object.entries(SOURCE_INDEX)
    .sort((a, b) => (b[1].year || 0) - (a[1].year || 0));

  $sourceBox.innerHTML = entries.map(([key, s]) => `
    <li>
      <span class="src-key">[${key}]</span>
      <a href="${s.url}" target="_blank" rel="noopener"><strong>${s.title}</strong></a>
      <span class="src-meta"> — ${s.publisher} · ${s.year}</span>
    </li>
  `).join("");
}

function update() {
  drawPlot();
  renderTable();
}

document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  bindSortHandlers();
  renderSources();
  update();
});
