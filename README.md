# web-playground

> 王子宸 (Wang Zichen) 的前端 / 可视化实验场。
> A personal playground for building various interactive web pages and data visualizations — each sub-folder is a self-contained mini-site deployable on GitHub Pages.

## 🧪 Live Experiments

| # | Project | Tech | Preview |
|---|---------|------|---------|
| 1 | **[career-landscape](./career-landscape)** — 就业景气全景图谱 | `HTML` · `Plotly.js` · Vanilla JS | [Open](https://zichenwang114514.github.io/web-playground/career-landscape/) |

> ⚠️ Live preview links become active once GitHub Pages is enabled on this repo (Settings → Pages → Source: `main` / root).

## 📐 Design principles

- **Static-only.** Every sub-site is pure HTML / CSS / JS so it can be hosted for free on GitHub Pages — no server, no build step, no framework churn.
- **One folder = one website.** Sub-projects do not share state or dependencies; deleting a folder cleanly removes a site.
- **Dependencies via CDN.** Visualisation libraries (Plotly.js, D3, etc.) are loaded from public CDNs to keep the repo lean.

## 🚀 Run locally

Since everything is static, any of these will work:

```bash
# Option A — Python's built-in server
cd web-playground
python3 -m http.server 8000
# then visit http://localhost:8000/

# Option B — Node (npx)
npx http-server -p 8000

# Option C — Just double-click any index.html
```

## 📂 Repository layout

```
web-playground/
├── index.html              # Landing page listing all experiments
├── README.md
├── .gitignore
└── career-landscape/       # Experiment 1: multi-domain bubble chart
    ├── index.html
    ├── style.css
    ├── app.js
    └── data.js
```

## 🆕 Adding a new experiment

1. `mkdir <new-project>` under the repo root.
2. Build a self-contained site inside (`index.html` + assets).
3. Add a card to the root `index.html` and a row to the table above.
4. Commit & push. GitHub Pages serves it at `/<new-project>/`.
