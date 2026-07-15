import { access, readFile } from "node:fs/promises";
import path from "node:path";
import {
  SEO_ROUTES,
  SITE,
  getCanonicalPath,
  getIndexableRoutes,
} from "../src/seo/routeMetadata.js";

const distDir = path.join(process.cwd(), "dist");
const failures = [];

for (const route of SEO_ROUTES) {
  const filePath = route.path === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, `${route.path.replace(/^\//, "")}.html`);
  try {
    await access(filePath);
    const html = await readFile(filePath, "utf8");
    const canonicalPath = getCanonicalPath(route);
    const canonicalUrl = `${SITE.url}${canonicalPath === "/" ? "/" : canonicalPath}`;
    const checks = [
      [html.includes('data-prerendered="true"'), "missing prerendered route content"],
      [html.includes("<h1>"), "missing static h1"],
      [html.includes(`rel="canonical" href="${canonicalUrl}"`), "incorrect canonical URL"],
      [html.includes('type="application/ld+json"'), "missing JSON-LD"],
      [html.includes('src="/assets/'), "missing Vite production asset entry"],
      [!html.includes("%PUBLIC_URL%"), "contains CRA PUBLIC_URL placeholder"],
      [!html.includes("STATIC_ROUTE_CONTENT"), "contains unrendered content marker"],
      [route.index === false ? html.includes('content="noindex, follow"') : html.includes('content="index, follow,'), "incorrect robots directive"],
    ];
    for (const [ok, message] of checks) {
      if (!ok) failures.push(`${route.path}: ${message}`);
    }
  } catch (error) {
    failures.push(`${route.path}: output file missing (${error.message})`);
  }
}

const sitemapPath = path.join(distDir, "sitemap.xml");
const sitemap = await readFile(sitemapPath, "utf8");
for (const route of getIndexableRoutes()) {
  const url = `${SITE.url}${route.path === "/" ? "/" : route.path}`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) failures.push(`${route.path}: absent from sitemap`);
}
for (const route of SEO_ROUTES.filter((item) => item.index === false)) {
  const url = `${SITE.url}${route.path}`;
  if (sitemap.includes(`<loc>${url}</loc>`)) failures.push(`${route.path}: noindex alias appears in sitemap`);
}

if (failures.length) {
  console.error("Static SEO verification failed:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log(`Verified ${SEO_ROUTES.length} static route files, canonical tags, metadata, JSON-LD, robots directives, and sitemap coverage.`);
