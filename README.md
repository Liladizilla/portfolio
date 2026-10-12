# Charis Chara — Portfolio

A static developer portfolio published with GitHub Pages.

**Live site:** https://liladizilla.github.io/portfolio/

## Direction

The site follows a quiet-workshop editorial direction: warm neutral surfaces, strong typography, one terracotta accent, real project screenshots, and restrained interactions. It avoids decorative mock interfaces, gradients, glows, and status-badge clutter.

## Site structure

- `index.html` — homepage, four featured projects, project index, about, and contact.
- `case-studies/` — detailed engineering notes for AdizillaAI, CharisOS, and Synced 3D Multiview.
- `styles.css` — shared design tokens, responsive layout, theme support, and case-study styles.
- `script.js` — theme toggle, mobile navigation, screenshot fallbacks, and small interactions.
- `case-study.js` — reading progress and active section navigation.
- `404.html` — custom not-found page.
- `sitemap.xml` and `robots.txt` — basic search discovery metadata.

## Deployment

GitHub Pages publishes the repository's `main` branch from the repository root. Pushes to `main` are published automatically; no build step or package installation is required.

Pages settings: **Settings → Pages → Deploy from a branch → main → / (root)**.

## Project media

The featured project images are screenshots of the public live applications or source repositories. They are loaded from a screenshot service so the page can show real project evidence without committing large screenshots. If a screenshot service is unavailable, the page displays a clear fallback and the project links remain available.

## Accessibility and interaction

- Keyboard-visible focus styles and a skip link.
- Light and dark themes, with system preference as the default.
- Responsive project layout and a scrollable project index on narrow screens.
- Mobile navigation toggle.
- Reduced-motion support.
- Case-study section navigation and reading progress.

The case studies deliberately avoid unverified usage, latency, or performance metrics.
