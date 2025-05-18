# 🩺 Patient Management System

A simple, front-end only web application to register, manage, and query patient records directly in the browser using **React**, **Vite**, **Tailwind CSS**, **Shadcn/UI**, **PGLite** and **Zod**.

## ✨ Features

- 📋 **Patient Registration & Validation**: Dynamic form built with React Hook Form and validated via Zod schemas to ensure data integrity.
- 🔍 **Patient Search & Query**: Filter and search existing patient records by name, ID, or other metadata in real time.
- ✏️ **Delete Records**: Remove existing patient entries with confirmation dialogs.
- 🎨 **Modern UI**: Beautiful, responsive design powered by Tailwind CSS and shadcn/ui components.
- ⚡ **Blazing-Fast Dev**: Hot module replacement and fast refresh with Vite.
- 🗄️ **Client-Side Persistence**: All data stored locally using pglite — no backend or server needed.
- 🔄 **Offline First**: Continue working even when offline; data persists between sessions.

## 📦 Tech Stack

- **Vite** – Next-generation frontend tooling with instant server start and lightning-fast HMR.
- **React** – Declarative, component-based UI library.
- **TypeScript** – Static typing for better developer experience.
- **Tailwind CSS** – Utility-first CSS framework for rapid UI development.
- **Shadcn/UI** – Accessible, themeable component library built on Radix.
- **PGLite** – In-browser Postgres database powered by WebAssembly for persistent, client-side storage.
- **Zod** – Type-safe schema validation for robust form input handling.
- **React Hook Form** – Performant, flexible form management.

## 🎬 Live Demo

Check out the live demo hosted on Vercel: [patient-registration-system-ash11.vercel.app](https://patient-registration-system-ash11.vercel.app)

## 🖥️ Screenshots

A visual walkthrough of the Patient Management System UI and key features:

### 🏠 Dashboard Overview

📸 A clean, modern dashboard showcasing total patient count and basic analytics.

![Dashboard](https://github.com/user-attachments/assets/64273fa8-5126-42d7-8ffa-80ead263bf21)

---

### 📝 Patient Registration Form

📸 User-friendly form built with React Hook Form and validated with Zod. Includes fields for demographics, contact details, medical history, and insurance.

![Register](https://github.com/user-attachments/assets/f2c27902-24dd-41cc-be85-2cf694e0a2e4)

---

### 📚 Patient Records Table

📸 A table view displaying all registered patients. Includes options to delete entries with confirmation prompts.

![Records](https://github.com/user-attachments/assets/8b3df657-1ff3-4541-8c5e-7d873351654f)

---

### 🧠 In-Browser SQL Editor

📸 A built-in SQL editor powered by PGLite. Allows executing raw queries directly on the client-side database, great for power users.

![SQL Query](https://github.com/user-attachments/assets/bb69db92-82e7-4048-95ab-bac224c0aa1d)

---

## 🛠️ Setup & Development

### 🔧 Prerequisites

- **Node.js** (v22 or above)
- **bun** (recommended) or **npm** / **yarn** / **pnpm**

### 📥 Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/arnavsharma2711/patient-registration-system.git
   cd patient-registration-system
   ```

2. **Install dependencies**

   ```bash
   # Using bun (recommended)
   bun install
   # Or npm / yarn / pnpm
   npm install
   yarn
   pnpm install
   ```

3. **Run development server**

   ```bash
   # Using npm
   npm run dev

   # Yarn
   yarn dev

   # pnpm
   pnpm dev

   # bun
   bun dev
   ```

4. **Open in browser**

   Navigate to `http://localhost:5173` to view the app. Changes will hot-reload.

## 📁 Project Structure

```bash
patient-registration-system/
├── public/               # Static assets and worker.js
├── src/
│   ├── components/       # Reusable UI components (Buttons, Charts, Form fields)
│   ├── pages/            # Page-level components (e.g., Home)
│   ├── lib/              # PGLite setup,constansts and utility functions
│   └── index.css         # Application's CSS
│   ├── App.tsx           # Main application component and routing
│   └── main.tsx          # Entry point
├── bun.lock              # Lockfile for bun
├── package.json          # Project metadata and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation (this file)
```

## ✅ Scripts

- `dev` – Start development server
- `build` – Bundle for production
- `preview` – Preview production build locally

## 💡 Usage

- **Register**: Fill out the form with patient details (name, DOB, contact, insurance, medical history) and submit.
- **Delete**: Click on a patient row to delete the record.
- **Query Records**: Execute SQL queries directly from the browser using a built-in interface to interact with the PGLite database.

## 🚀 Deployment

This project is ready for static hosting. To deploy:

1. `bun run build`
2. Host the contents of the `dist/` folder on any static host (Vercel, Netlify, GitHub Pages).

---

_Built with ❤️ by [arnavsharma2711](https://arnavsharma.dev)_
