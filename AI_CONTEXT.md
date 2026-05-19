# Project Context: Marbrerie Pythagore

This document provides a comprehensive overview of the **Marbrerie Pythagore** project, designed to give an AI assistant the necessary context to understand and contribute to the codebase effectively.

## 🏢 Project Overview
- **Name**: Marbrerie Pythagore
- **Business**: A stonemasonry company based in Brittany (France), specializing in high-end stone fabrication, particularly kitchen and bathroom worktops.
- **Goal**: A modern, high-performance showcase website with administrative features and client engagement tools.

## 🛠️ Technology Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: 
  - [Tailwind CSS](https://tailwindcss.com/) for layout and styling
  - [Framer Motion](https://www.framer.com/motion/) & [animate.css](https://animate.style/) for animations
- **UI Components**: 
  - [Radix UI](https://www.radix-ui.com/) & [Headless UI](https://headlessui.com/)
  - [Splide](https://splidejs.com/) for carousels
  - [Lucide React](https://lucide.dev/) & [Tabler Icons](https://tabler-icons.io/) for iconography
- **Maps**: [Leaflet](https://leafletjs.com/) with `react-leaflet`
- **Analytics & Performance**: Vercel Analytics, Vercel Speed Insights, Google Analytics
- **Security**: Google ReCaptcha v3

## 📁 Project Structure
- `src/app/`: Contains the application routes (App Router).
  - `admin/`: Back-office for administrative tasks.
  - `blog/`: Articles and news section.
  - `components/`: Reusable UI components.
    - `ui/`: Core design system components.
    - `home/`, `services/`, `product/`: Domain-specific components.
  - `datas/`: Static data and configuration (e.g., `metadata.js`).
  - `lib/`: Application-specific utility functions.
- `public/`: Static assets (images, fonts, etc.).
- `root/`: Configuration files (`next.config.mjs`, `tailwind.config.js`, etc.).

## 🔑 Key Features
- **Responsive Showcase**: High-quality visual presentation of materials and expertise.
- **Administrative Dashboard**: Protected routes for content management.
- **Dynamic Maps**: Store locations and service areas shown via Leaflet.
- **Engagement Tools**: 
  - Contact forms with ReCaptcha protection.
  - ChatBot component for client assistance.
  - Google Reviews integration.
- **SEO Optimized**: Centralized metadata management in `src/app/datas/metadata.js`.

## 📝 Coding Standards & Patterns
- **App Router**: Uses server and client components appropriately (check for `"use client"` directive).
- **Animations**: Heavy use of Framer Motion for a premium feel.
- **Data Fetching**: Primarily `axios` for API interactions.
- **Modularity**: Components are broken down by domain and functionality.

## 🚀 Current Focus
- Performance optimization (Vercel Speed Insights).
- Content management and blog stabilization.
- Enhancing the mobile experience and PWA features.
