# Lanchana Ganesh Naik — Portfolio

A modern, animated personal portfolio built with **React + Vite + Material UI (MUI)** and **Framer Motion**.

## Tech

- **React 18** + **Vite** — fast dev server & build
- **MUI (Material UI) v6** — component library & dark theme
- **Framer Motion** — scroll & entrance animations
- **Emotion** — styling engine (MUI dependency)

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build -> dist/
npm run preview  # preview the production build locally
```

## Editing content

All portfolio content (profile, skills, experience, projects, education) lives in a
single file — edit it and the whole site updates:

```
src/data/resume.js
```

Assets (photo, resume PDF) live in `public/assets/`.

## Structure

```
src/
  data/resume.js        # single source of truth for all content
  theme/theme.js        # MUI dark theme (colors, typography)
  components/
    AnimatedBackground.jsx  # drifting gradient blobs + grid
    ScrollProgress.jsx      # top scroll indicator
    Navbar.jsx              # sticky nav + scroll-spy + mobile drawer
    Hero.jsx                # intro, portrait, stats, floating chips
    TechMarquee.jsx         # infinite tech-stack ribbon
    About.jsx               # summary + education + highlight cards
    Skills.jsx              # animated skill bars by category
    Experience.jsx          # vertical timeline
    Projects.jsx            # filterable project cards
    Contact.jsx             # info + mailto contact form
    Footer.jsx
  App.jsx
  main.jsx
```

## Deploy

The `dist/` output is fully static — deploy to GitHub Pages, Netlify, Vercel, or any
static host. For GitHub Pages under a repo subpath, set `base` in `vite.config.js`.
