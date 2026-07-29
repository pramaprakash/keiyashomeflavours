<!-- BEGIN:nextjs-agent-rules -->
# Next.js 16 (App Router) & Project Instructions

This project (**Keiya's Home Flavours**) is built on Next.js 16 with React 19, TypeScript, and Tailwind CSS v4 using the App Router.

## Project Vision & Domain Specifications
- **Visitor Experience & Pages (Read-Only)**:
  - **Attractive & Catchy Home Page (`/`)**: Features a high-impact hero banner with video highlights, vibrant food imagery, curated recipe carousels, category filters, and an interactive search bar.
  - **Dedicated Recipe Detail Pages (`/recipes/[id]`)**: Every published recipe has its own dedicated page complete with a cinema-style video player, jump-to-timestamp step controls, ingredient checklist, and cooking metrics (prep time, difficulty, servings).
  - Visitors have no edit, upload, or account management privileges.
- **Admin Management & Privileges**:
  - Admin users have exclusive privileges to create recipes, upload videos, and directly input all recipe details (`/admin`).
  - Admin has full edit privileges to enter or modify titles, video streaming links, cover images, cooking metrics, flavor profiles, chef stories, ingredients, quantities, timestamps, and step-by-step instructions.

## Project Structure & Architecture
- **Framework**: Next.js 16 with React 19 (`app` directory pattern in `src/app`).
- **Styling**: Tailwind CSS v4 with PostCSS.
- **Routing**: `src/app/` contains routes (`page.tsx`, `layout.tsx`, sub-routes `/recipes/[id]`, `/admin`).
- **Components**: UI components reside in `src/components/`.
- **Utilities**: Helper functions and shared logic reside in `src/utils/`.

## Key Coding Conventions & Rules
1. **App Router Conventions**:
   - Default to React Server Components (RSC) unless interactivity (state, effects, handlers) requires `'use client'`.
   - Keep client components at the leaves of the tree when possible to maximize server rendering.
   - Refer to local Next.js docs under `node_modules/next/dist/docs/` for specific API guidance when needed.

2. **TypeScript & Safety**:
   - Use strict TypeScript types. Avoid using `any`.
   - Prop definitions should be explicitly typed.

3. **Styling & UI**:
   - Use Tailwind CSS v4 classes for styling.
   - Ensure rich aesthetics, smooth micro-animations, curated color palettes, and responsive design across mobile and desktop breakpoints.

4. **Development Commands**:
   - Dev Server: `npm run dev`
   - Production Build: `npm run build`
   - Linting: `npm run lint`
<!-- END:nextjs-agent-rules -->
