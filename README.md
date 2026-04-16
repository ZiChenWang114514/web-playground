# web-playground

Personal homepage + interactive web experiments of **王子宸 (Zichen Wang)**.

> Live site: https://zichenwang114514.github.io/web-playground/

## 🏠 Structure

- **Root (`/`)** — personal homepage. All user-editable content lives in [`profile.config.js`](./profile.config.js).
- **`career-landscape/`** — sub-experiment #1: 15-domain career bubble chart with cited 2025-2026 market data.
- **`assets/`** — static assets (avatar, CV PDF, etc.).

Each sub-folder is a **self-contained static site**, so any folder can be deleted without affecting the others.

## ✏️ Updating the personal homepage

Everything you see on the homepage comes from a single config file:

```
web-playground/profile.config.js
```

Search for `⚠️ TODO` — those are the fields that need your input (name preference, advisor, publications, CV link, etc.). The file is heavily commented and no build step is required — save and refresh.

## 🚀 Run locally

```bash
cd web-playground
python3 -m http.server 8000
# open http://localhost:8000/
```

Since everything is static, any simple HTTP server works.

## 🆕 Adding a new experiment

1. `mkdir <new-site>` under the repo root.
2. Build a self-contained site inside (`index.html` + assets).
3. Add a new entry to the `PROJECTS` array in `profile.config.js`.
4. Commit & push. GitHub Pages serves it at `/<new-site>/`.
