/* ===========================================================
 * Career Landscape — 交互逻辑
 *   - 侧边栏多选：切换学科大类
 *   - Plotly 气泡图：坐标轴锁死，避免筛选时跳动
 *   - 可排序数据表：跟随筛选实时联动，点击表头排序
 * =========================================================== */

// ----- 状态 -----
const state = {
  selectedCategories: new Set(Object.keys(CATEGORY_COLORS)), // 默认全选
  sort: { key: "salary", dir: "desc" }                       // 默认按薪资降序
};

// ----- DOM 引用 -----
const $filterBox = document.getElementById("category-filters");
const $tableBody = document.getElementById("table-body");
const $tableHead = document.getElementById("table-head");
const $plot      = document.getElementById("plot");

// ----- 1. 渲染侧边栏筛选器 -----
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

// ----- 2. 过滤后的数据集 -----
function getFiltered() {
  return DOMAIN_DATA.filter(d => state.selectedCategories.has(d.category));
}

// ----- 3. 绘制 Plotly 气泡图 -----
//
// 关键工程细节：
//   - 按"大类"分 trace，这样图例点击即可切换显隐（Plotly 原生特性）
//   - hovertemplate 完全自定义：粗体领域名 + 三维数据 + 核心描述
//   - xaxis/yaxis range 锁死，筛选时坐标系不跳动
//   - 气泡 size 用 growth，sizemode=area，观感与真实"面积"成正比
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
        sizeref: 0.12,          // 控制气泡面积缩放 (越小气泡越大)
        sizemin: 8,
        color: CATEGORY_COLORS[cat],
        opacity: 0.78,
        line: { width: 1.2, color: "#ffffff" }
      },
      customdata: rows.map(d => [d.growth, d.desc, d.category]),
      hovertemplate:
        "<b>%{text}</b><br>" +
        "<span style='color:#9aa5b1'>────────────────</span><br>" +
        "学科大类：%{customdata[2]}<br>" +
        "计算驱动度：%{x}<br>" +
        "薪资潜力：%{y}<br>" +
        "未来增长率：%{customdata[0]}<br>" +
        "<br><i>%{customdata[1]}</i>" +
        "<extra></extra>"
    };
  });

  const layout = {
    // 锁定坐标范围，筛选时画面不形变
    xaxis: {
      title: { text: "◀ 纯湿实验 (0) ——— 纯代码计算驱动 (100) ▶", font: { size: 13 } },
      range: [-5, 108],
      gridcolor: "#eef1f5",
      zerolinecolor: "#d0d7de"
    },
    yaxis: {
      title: { text: "商业化薪资潜力得分", font: { size: 13 } },
      range: [30, 108],
      gridcolor: "#eef1f5",
      zerolinecolor: "#d0d7de"
    },
    hoverlabel: {
      bgcolor: "#1c2128",
      bordercolor: "#1c2128",
      font: { color: "#fff", family: "inherit", size: 12.5 }
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
      // 右上角"黄金象限"辅助指引
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

  const config = {
    displaylogo: false,
    responsive: true,
    modeBarButtonsToRemove: ["select2d", "lasso2d", "autoScale2d"]
  };

  Plotly.react($plot, traces, layout, config);
}

// ----- 4. 渲染数据表 -----
function renderTable() {
  const rows = getFiltered().slice();
  const { key, dir } = state.sort;
  const sign = dir === "asc" ? 1 : -1;
  rows.sort((a, b) => {
    const va = a[key], vb = b[key];
    if (typeof va === "number") return (va - vb) * sign;
    return String(va).localeCompare(String(vb), "zh") * sign;
  });

  // Header 排序指示器
  $tableHead.querySelectorAll("th").forEach(th => {
    const k = th.dataset.key;
    const ind = th.querySelector(".sort-indicator");
    if (!ind) return;
    if (k === key) ind.textContent = dir === "asc" ? "▲" : "▼";
    else           ind.textContent = "▾";
  });

  // Body
  $tableBody.innerHTML = rows.map(d => `
    <tr>
      <td><strong>${d.field}</strong></td>
      <td><span class="cat-badge" style="background:${CATEGORY_COLORS[d.category]}">${d.category}</span></td>
      <td>${d.compute}</td>
      <td>${d.salary}</td>
      <td>${d.growth}</td>
      <td style="color:#4b5563">${d.desc}</td>
    </tr>
  `).join("");

  if (rows.length === 0) {
    $tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:30px;color:#8b949e">
      当前没有勾选任何学科大类，请在左侧面板中选择至少一个。</td></tr>`;
  }
}

// ----- 5. 绑定表头排序 -----
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

// ----- 6. 统一刷新 -----
function update() {
  drawPlot();
  renderTable();
}

// ----- 7. 启动 -----
document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  bindSortHandlers();
  update();
});
