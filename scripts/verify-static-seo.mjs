import { access, readFile } from "node:fs/promises";
import path from "node:path";
import {
  SEO_ROUTES,
  SITE,
  getCanonicalPath,
  getIndexableRoutes,
} from "../src/seo/routeMetadata.js";
import { INFORMATION_PAGES, getToolGuide, CONTACT_EMAIL } from "../src/content/routeGuides.js";

const distDir = path.join(process.cwd(), "dist");
const failures = [];
const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

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
    const guide = getToolGuide(route.path);
    const info = INFORMATION_PAGES[route.path];
    const countWords = (str) => (str.match(/\b[\w'-]+\b/g) || []).length;
    if (guide) {
      checks.push([html.includes(escapeHtml(guide.intro)), "missing original route-specific description"]);
      checks.push([html.includes(escapeHtml(guide.example)), "missing practical example"]);
      checks.push([guide.steps.every((step) => html.includes(escapeHtml(step))), "missing instructions"]);
      checks.push([guide.cautions.every((note) => html.includes(escapeHtml(note))), "missing limitations"]);
      checks.push([countWords(guide.intro + guide.steps.join(" ") + guide.example + guide.cautions.join(" ")) >= 100, "tool guidance is too short"]);
    }
    if (info) {
      checks.push([info.sections.every(([heading, copy]) => html.includes(escapeHtml(heading)) && html.includes(escapeHtml(copy))), "informational page missing substantive sections"]);
      checks.push([countWords(info.sections.map(([,body])=>body).join(" ")) >= 90, "informational page is too short"]);
      checks.push([html.includes(info.title), "informational page title missing"]);
    }
    checks.push([html.includes('href="/privacy"') && html.includes('href="/contact"'), "trust-page navigation missing"]);
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

const notFound = await readFile(path.join(distDir, "404.html"), "utf8");
if (!notFound.includes('content="noindex, follow"')) failures.push("404 must be noindex");
if (!notFound.includes("Page not found")) failures.push("404 content missing");
const privacy = await readFile(path.join(distDir, "privacy.html"), "utf8");
if (!privacy.includes(CONTACT_EMAIL)) failures.push("privacy page missing support email");
if (getIndexableRoutes().length !== new Set(getIndexableRoutes().map(route=>route.path)).size) failures.push("duplicate indexable route paths");
if (failures.length) {
  console.error("Static SEO verification failed:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log(`Verified ${SEO_ROUTES.length} static route files, unique tool guidance, legal pages, metadata, canonical tags, 404, and sitemap coverage.`);
