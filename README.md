# 💻 Portfolio OS — Interactive Desktop Portfolio

An interactive, Linux-inspired **desktop environment** built with **React**, **TypeScript**, and **Tailwind CSS**.  
Each app (Browser, File Explorer, Dock, etc.) is a modular React component managed by a dynamic window system — just like a real OS.

![screenshot](./src/assets/preview.png) <!-- Optional if you add a screenshot -->

---

## 🧭 Overview

This project serves as both a **personal portfolio** and a **software design experiment** — blending front-end architecture, OS-like UI patterns, and modern web aesthetics.

You can:
- Open, minimize, and drag windows freely.
- Browse projects in a built-in Browser app.
- Explore an aesthetic File Explorer and Dock.
- Enjoy adaptive layouts with unique wallpapers for desktop and phone.

---

## 🧠 Features

- 🪟 **Window Manager**
  - Handles opening, minimizing, focusing, and z-index stacking with persistent positions.
- 🧭 **Dock + Top Bar**
  - Dynamic Dock with pinned apps and real-time window indicators.
- 🌐 **Browser App**
  - Displays internal portfolio pages like *Projects*, *Resume*, and *Welcome*.
- 📂 **File Explorer**
  - Linux-style interface for aesthetic navigation with “Places” and “Network” panes.
- ⚙️ **Modular Feature-Based Architecture**
  - Each OS component is encapsulated within its feature folder.
- 📱 **Responsive**
  - Distinct wallpapers and tailored layouts for desktop and mobile views.

---

## 🚀 Tech Stack

| Category | Tools |
|-----------|--------|
| **Framework** | React + TypeScript |
| **UI** | Tailwind CSS |
| **Icons** | react-icons |
| **Build Tool** | Vite |
| **Deployment** | Vercel |
| **Architecture** | Feature-based, Context-driven window management |

---

## 🧩 Key Pages

| Page | Description |
|------|--------------|
| **Welcome Page** | Opens automatically on boot; greets visitors to the OS. |
| **Projects Page** | Showcases major projects (Portfolio OS, Money Mundo, ViT Classifier, DevBuds, etc.). |
| **Resume Page** | (Optional) Displays your résumé directly in the Browser window. |

---

## 🛠️ Setup & Development

```bash
# 1. Clone the repo
git clone https://github.com/salimaduen/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

Then visit:
👉 http://localhost:5173

---

🧑‍💻 Author

Salomon Aduen
Software Engineer | AI & Systems Enthusiast
linkedin.com/in/salomon-aduen/ | github.com/salimaduen