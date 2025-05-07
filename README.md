# 🪟 React‑Windows‑Clone

A **2025‑grade recreation of the Windows 11 desktop** right in your browser. Built with **React 19 + TypeScript**, styled using **Tailwind CSS v4**, and powered by **Zustand** & **TanStack Query** for slick state management.

![screenshot](public/assets/desktop-preview.png)

---

## ✨ Features

- Draggable & resizable windows with smooth **Framer Motion** animations
- Translucent taskbar and acrylic “Aero Glass” wallpaper blur (CSS `backdrop-filter`)
- Start menu, File Explorer, and Notepad micro‑apps
- Fast dev experience via **Vite 5** and optional **Bun** runtime
- **PWA installable** – runs full‑screen like a native OS
- Ready for **Tauri** wrapping to ship a real desktop executable

---

## 🖥️ Tech Stack

| Layer        | Tech                                           |
| ------------ | ---------------------------------------------- |
| UI Framework | React 19, TypeScript 5.5                       |
| Styling      | Tailwind CSS v4, shadcn/ui, Lucide icons       |
| Animations   | Framer Motion 11                               |
| State        | Zustand 5 (local), TanStack Query 5.7 (server) |
| Build Tool   | Vite 5 (HMR) / Bun 1.2+                        |
| Testing      | Vitest 2, Playwright 1.45                      |
| Packaging    | Vercel Edge / Netlify, Tauri 2                 |

---

## 🚀 Quick Start

```bash
# 1 · Clone repo
git clone https://github.com/mahannajafi/windows10.git
cd windows10

# 2 · Install deps (pnpm recommended)
pnpm i   # or: bun install

# 3 · Run dev server
pnpm dev # or: bun run dev

# 4 · Open <http://localhost:5173>
```

> **Node ≥ 20 or Bun ≥ 1.2** required (for Web‑Crypto support).

### Build for production

```bash
pnpm build        # outputs to /dist
pnpm preview      # local static server
```

---

## 📂 Project Structure

```
src/
├─ app/             # entry points & global providers
├─ shared/          # reusable UI & helpers
├─ entities/        # domain models (Window, File, …)
├─ features/        # user‑facing apps (taskbar, explorer, notepad)
├─ workers/         # Web Workers / WASM helpers
└─ styles/          # tailwind.css and layers
```

See [`docs/folder-structure.md`](docs/folder-structure.md) for full details.

---

## 🛠️ Useful Scripts

| Script          | Purpose                   |
| --------------- | ------------------------- |
| `pnpm dev`      | Start dev server with HMR |
| `pnpm build`    | Production build (Vite)   |
| `pnpm preview`  | Serve built files locally |
| `pnpm test`     | Run unit tests (Vitest)   |
| `pnpm test:e2e` | Playwright E2E suite      |

---

## 🗺️ Roadmap

- [ ] Window snapping & tiling (Win‑11 style)
- [ ] Task View (virtual desktops) animation
- [ ] File System Access API integration
- [ ] Theming: light/dark & high‑contrast
- [ ] Multi‑monitor support (🔮)

See the [issues](https://github.com/mahannajafi/windows10/issues) tab for up‑to‑date tasks.

---

## 🤝 Contributing

1. Fork the project & create your branch: `git checkout -b feat/awesome`
2. Commit your changes: `git commit -m "feat: add awesome feature"`
3. Push to your branch: `git push origin feat/awesome`
4. Open a Pull Request 🍻

All contributions—code, documentation, design—are welcome!

---

## 📄 License

This project is licensed under the **MIT License** – see the [`LICENSE`](LICENSE) file for details.

---

## 🙏 Acknowledgements

- Microsoft Windows 11 for inspiration
- Radix UI & shadcn/ui for accessible component primitives
- TanStack & Framer Motion teams for incredible OSS

---

> **Made with ❤️ and ☕ by [@mahannajafi](https://github.com/mahannajafi)**
