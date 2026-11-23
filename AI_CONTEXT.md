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

## 📦 Catalogue de stock (cache serveur, 19/10/2026)
- Les routes `src/app/api/stock/*` (produits, catégories, couleurs, finitions, motifs, épaisseurs, garanties) lisent stock **uniquement** via `src/app/lib/stockCatalog.js` (`unstable_cache`, 10 min, étiquette `catalog`) : une erreur n'est jamais mise en cache, et la dernière version connue reste servie si stock tombe. Ne pas réintroduire d'appel direct du navigateur à stock ni d'`axios` (il contourne le cache de Next).
- Rafraîchissement immédiat : `PUT /api/webhook/internal/catalog/changed`, relayé par la Gateway (consommateur `website`). Seul le jeton machine de stock est accepté (`src/app/lib/machineToken.js` : RS256, expiration, `is_machine`, `client_id`).
- Variables : `AUTH_PASSPORT_PUBLIC_KEY` (clé publique d'auth-api, PEM ; `\n` ou retours à la ligne), `STOCK_MACHINE_CLIENT_ID` (client machine de stock). Côté Gateway : `WEBSITE_URL` (adresse interne du site).

## 🔐 Espace d'administration et api-marbrerie-pythagore (23/11/2026)
- **Connexion sans parcours PKCE** : `/login` envoie identifiant (e-mail ou nom d'utilisateur) et mot de passe à `POST /api/auth/login` (serveur du site, BFF), qui obtient les jetons d'auth-api par la Gateway (`authenticate/api/login`, password grant, `user_type` pythagore, client OAuth du site dont le secret reste côté serveur). Seuls les administrateurs entrent (rôles admin et super-admin : claim `is_super_admin` d'auth-api, rôles de sa liste `super_admin_roles`) ; sinon le jeton est révoqué et la réponse est 403.
- **Session** : cookies chiffrés httpOnly `site_session` / `site_refresh` (`src/app/lib/session/`, repris d'extranet-front-v2 : AES-256-GCM, renouvellement 2 min avant l'expiration, un seul renouvellement à la fois) ; `GET /api/auth/session`, `POST /api/auth/logout` (révoque le jeton de cette session). `src/proxy.js` n'ouvre `/admin` qu'avec une session déchiffrable. Ne jamais réintroduire de route qui pose un cookie arbitraire (`/api/cookies`, supprimée) ni de jeton dans `localStorage` (seul le nom affiché y est).
- **Toute communication avec api-marbrerie-pythagore passe par le BFF puis la Gateway** : navigateur → `/api/web-api/{chemin}` (ce site) → `{NEXT_API_GATEWAY_URL}/web-api/{chemin}` → api-marbrerie-pythagore `api/{chemin}`. Lectures et formulaires publics sans session ; avec une session, son jeton est joint. Écritures (blog, étiquettes, offres d'emploi) refusées par l'API sans compte administrateur interne. Reste en direct : les adresses d'images (`src/app/api/services/imageService.js`, `NEXT_PUBLIC_API_URL`).
- **Variables (serveur)** : `NEXT_API_GATEWAY_URL` (se termine par `/api`), `SITE_SESSION_SECRET` (32 caractères au moins, propre au site), `SITE_OAUTH_CLIENT_ID` / `SITE_OAUTH_CLIENT_SECRET` (client password grant confidentiel d'auth-api, dédié au site). Ne sont plus utilisées : `API_URL`, `NEXT_PUBLIC_API_GATEWAY_URL`.
- Tests : `npm test` (`tests/site-session.test.mjs`, `tests/machine-token.test.mjs`).

## 📝 Coding Standards & Patterns
- **App Router**: Uses server and client components appropriately (check for `"use client"` directive).
- **Animations**: Heavy use of Framer Motion for a premium feel.
- **Data Fetching**: Primarily `axios` for API interactions.
- **Modularity**: Components are broken down by domain and functionality.

## 🚀 Current Focus
- Performance optimization (Vercel Speed Insights).
- Content management and blog stabilization.
- Enhancing the mobile experience and PWA features.
