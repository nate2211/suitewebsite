# SuiteOfficeLab Vite + Static SEO Build

This package preserves the existing SuiteOfficeLab React editors, viewers, converters, Archive browser, visual design, and routes while replacing Create React App with Vite.

## What changed

- Vite development and production builds replace `react-scripts`.
- Every public route receives a physical static HTML file such as `dist/csv.html`; Cloudflare serves it at the clean canonical URL `/csv`.
- Each route includes a unique title, description, canonical URL, robots directives, Open Graph metadata, Twitter metadata, an H1, explanatory copy, internal links, FAQ content, and Schema.org JSON-LD before JavaScript runs.
- Duplicate alias URLs are prerendered with `noindex, follow` and canonicalize to their primary tool pages.
- `sitemap.xml` and `robots.txt` are regenerated on every production build.
- Cloudflare asset caching headers and a static `404.html` are included.
- Large libraries are split into reusable production chunks.

Static rendering and stronger metadata make pages easier for search engines to discover and understand, but no technical change can guarantee a particular Google Search Console position or ranking.

## Requirements

- Node.js 20.19 or newer
- npm 10 or newer recommended

## Install and run

```bash
npm install
npm run dev
```

The Vite development server uses `http://localhost:3000`.

## Production build

```bash
npm run build
```

The command performs three stages:

1. Builds the interactive React app with Vite.
2. Statically renders all configured routes into `dist/`.
3. Verifies route HTML, canonical tags, JSON-LD, robots directives, Vite assets, and sitemap coverage.

Preview the finished output with:

```bash
npm run preview
```

## Cloudflare deployment

`wrangler.toml` points Cloudflare assets to `./dist`, drops trailing slashes for canonical URLs, and serves the generated `404.html` for unknown paths.

```bash
npm run build
npx wrangler deploy
```

For Cloudflare Pages, use:

- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `20.19.0` or newer

## Adding a route

When adding a new React Router route, add corresponding metadata to `src/seo/routeMetadata.js`. The production build will then create its static route file and sitemap entry automatically.

## Environment configuration

The production site URL defaults to `https://suiteofficelab.com`. To override it in browser-generated metadata, copy `.env.example` to `.env.local` and set `VITE_SITE_URL`.

## Package contents

This archive intentionally excludes `node_modules`, prior CRA build output, Git history, and IDE metadata. Run `npm install` after copying the files into the destination directory.
