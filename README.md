# Ticketless Touring - Frontend

A modern, high-performance web application for booking monument tickets, built with **Vite**, **React**, and **TanStack Query**.

## 🚀 Overview

Ticketless Touring is a seamless platform for exploring historical monuments and booking digital tickets. The application features a robust admin dashboard for monument management, a real-time cart system, and an integrated payment simulation with QR code generation.

## 📦 Installation

Ensure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

## 🚀 Running the App

- **Development Mode**:
  ```bash
  pnpm run dev
  ```
  The app will be available at `http://localhost:5173`.

- **Production Build**:
  ```bash
  pnpm run build
  ```

- **Preview Production Build**:
  ```bash
  pnpm run preview
  ```

## 📁 Project Structure

```text
src/
├── api/             # Centralized Axios clients & interceptors
├── assets/          # Images, logos, and static assets
├── components/      # UI Components (Presentational & Layout)
├── constants/       # Global constants and API endpoints
├── contexts/        # React Contexts (Theme, User)
├── hooks/           # Custom TanStack Query & business logic hooks
├── store/           # Redux Toolkit slices and configuration
└── App.jsx          # Main application setup & routing
```
