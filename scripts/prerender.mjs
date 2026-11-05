import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  SEO_ROUTES,
  SITE,
  getCanonicalPath,
  getIndexableRoutes,
} from "../src/seo/routeMetadata.js";
import { CONTACT_EMAIL, INFORMATION_PAGES, getToolGuide } from "../src/content/routeGuides.js";

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, "dist");
const templatePath = path.join(distDir, "index.html");
const buildDate = new Date().toISOString().slice(0, 10);
let template = await readFile(templatePath, "utf8");
// A second prerender without rebuilding must not silently retain the previous
// route body. Vite normally recreates the template for every production build.
if (!template.includes("<!-- STATIC_ROUTE_CONTENT -->") && template.includes('data-prerendered="true"')) {
  template = template.replace(/<div id="root">[\s\S]*?<\/div>(?=\s*<\/body>)/,
    '<div id="root"><!-- STATIC_ROUTE_CONTENT --></div>');
}
if (!template.includes("<!-- STATIC_ROUTE_CONTENT -->")) {
  throw new Error("Vite index.html lacks the expected #root static-content marker");
}

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const escapeJson = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");

const absoluteUrl = (pathname = "/") => {
  const clean = pathname === "/" ? "/" : `/${String(pathname).replace(/^\/+|\/+$/g, "")}`;
  return `${SITE.url}${clean}`;
};

function formatTitle(route) {
  return route.title.includes(SITE.name)
    ? route.title
    : `${route.title} | ${SITE.name}`;
}

function categoryLabel(category) {
  return {
    home: "Browser office suite",
    office: "Office utility",
    data: "CSV and data tool",
    documents: "Document tool",
    media: "Media tool",
    archives: "Archive and file tool",
    calculators: "Browser calculator",
    editorial: "Office learning guide",
    site: "Site information",
  }[category] || "Browser office tool";
}

function categoryCopy(category) {
  return {
    home: "Open focused editors and converters for documents, spreadsheets, presentations, PDFs, images, archives, audio, and video.",
    office: "Use a focused browser workflow for common office-file tasks without installing a full desktop office suite.",
    data: "Work with structured rows, columns, delimiters, and data exports from an interactive browser interface.",
    documents: "Open a document-focused workflow for viewing, editing, converting, printing, or exporting common office formats.",
    media: "Process supported audio or video files from a focused browser tool with downloadable output when the operation completes.",
    archives: "Inspect, search, or optimize supported archive and document collections from a browser-based workflow.",
    calculators: "Enter a value and receive an immediate conversion result in the browser.",
  }[category] || "Use this focused SuiteOfficeLab browser tool for a common file workflow.";
}

function howToSteps(route) {
  return getToolGuide(route.path)?.steps || [];
}

function faqFor(route) {
  const guide = getToolGuide(route.path);
  if (!guide) return [];
  return [
    {question: `What is a useful example for ${route.h1.toLowerCase()}?`, answer: guide.example},
    {question: `What should I check when using this tool?`, answer: guide.cautions.join(" ")},
  ];
}

function relatedRoutes(route) {
  const indexable = getIndexableRoutes().filter((candidate) => candidate.path !== route.path);
  const sameCategory = indexable.filter((candidate) => candidate.category === route.category);
  const preferred = [
    ...sameCategory,
    ...indexable.filter((candidate) => ["/", "/office-tools", "/pdf", "/csv", "/word", "/powerpoint"].includes(candidate.path)),
    ...indexable,
  ];
  return [...new Map(preferred.map((candidate) => [candidate.path, candidate])).values()].slice(0, 8);
}

function schemaGraph(route) {
  const canonicalPath = getCanonicalPath(route);
  const canonicalUrl = absoluteUrl(canonicalPath);
  const isGuide = route.category === "editorial";
  const isSite = route.category === "site";
  const item = (isGuide || isSite) ? {
    "@type": isGuide ? "Article" : "WebPage",
    "@id": `${canonicalUrl}#content`,
    headline: route.h1,
    name: route.title,
    description: route.description,
    mainEntityOfPage: canonicalUrl,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE.url}/#organization` },
  } : {
    "@type": "WebApplication",
    "@id": `${canonicalUrl}#webapp`,
    name: route.title,
    url: canonicalUrl,
    description: route.description,
    applicationCategory: route.category === "calculators" ? "UtilitiesApplication" : "BusinessApplication",
    applicationSubCategory: categoryLabel(route.category),
    operatingSystem: "Web Browser",
    browserRequirements: "Requires JavaScript and a modern web browser.",
    isAccessibleForFree: true,
    inLanguage: "en-US",
    image: absoluteUrl(SITE.image),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": `${SITE.url}/#organization` },
  };
  const graph = [
    {"@type":"Organization", "@id":`${SITE.url}/#organization`, name:SITE.name, url:`${SITE.url}/`, logo:{"@type":"ImageObject",url:absoluteUrl(SITE.image),width:512,height:512}},
    {"@type":"WebSite", "@id":`${SITE.url}/#website`, name:SITE.name,url:`${SITE.url}/`,description:SITE.description,inLanguage:"en-US",publisher:{"@id":`${SITE.url}/#organization`}},
    item,
  ];
  if (canonicalPath !== "/") graph.push({
    "@type":"BreadcrumbList", "@id":`${canonicalUrl}#breadcrumb`,
    itemListElement:[
      {"@type":"ListItem",position:1,name:SITE.name,item:`${SITE.url}/`},
      {"@type":"ListItem",position:2,name:route.h1,item:canonicalUrl},
    ],
  });
  return {"@context":"https://schema.org","@graph":graph};
}

function buildHead(route) {
  const canonicalPath = getCanonicalPath(route);
  const canonicalUrl = absoluteUrl(canonicalPath);
  const title = formatTitle(route);
  const robots = route.index === false
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const schema = schemaGraph(route);

  return `<!-- SEO_HEAD_START -->
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />
    <meta name="keywords" content="${escapeHtml(route.keywords || "browser office tools")}" />
    <meta name="author" content="${SITE.name}" />
    <meta name="robots" content="${robots}" />
    <meta name="googlebot" content="${robots}" />
    <meta name="bingbot" content="${robots}" />
    <meta name="generator" content="Vite static route prerender" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="en" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="${SITE.locale}" />
    <meta property="og:site_name" content="${SITE.name}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${absoluteUrl(SITE.image)}" />
    <meta property="og:image:width" content="512" />
    <meta property="og:image:height" content="512" />
    <meta property="og:image:alt" content="${SITE.name} browser office tools" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta name="twitter:image" content="${absoluteUrl(SITE.image)}" />
    <script type="application/ld+json">${escapeJson(schema)}</script>
    <style id="static-route-style">
      .static-route{min-height:100vh;padding:clamp(28px,5vw,72px);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#fff;background:radial-gradient(circle at top left,rgba(158,232,255,.18),transparent 35%),radial-gradient(circle at top right,rgba(179,140,255,.18),transparent 35%),linear-gradient(135deg,#050711 0%,#080d1c 45%,#0a1024 100%)}
      .static-route__wrap{width:min(1120px,100%);margin:0 auto}.static-route__brand{display:inline-flex;gap:10px;align-items:center;color:#9ee8ff;font-weight:900;text-decoration:none}.static-route__eyebrow{margin:48px 0 12px;color:#9ee8ff;font-size:.8rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.static-route h1{max-width:900px;margin:0;font-size:clamp(2.25rem,7vw,5rem);line-height:1.02;letter-spacing:-.045em}.static-route__lead{max-width:850px;margin:24px 0;color:rgba(255,255,255,.78);font-size:clamp(1.05rem,2vw,1.3rem);line-height:1.75}.static-route__grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:18px;margin:34px 0}.static-route__card{padding:24px;border:1px solid rgba(255,255,255,.12);border-radius:20px;background:rgba(10,16,32,.78)}.static-route h2{margin-top:0;font-size:1.3rem}.static-route p,.static-route li{color:rgba(255,255,255,.72);line-height:1.7}.static-route a{color:#9ee8ff}.static-route__links{display:flex;flex-wrap:wrap;gap:10px}.static-route__links a{padding:10px 14px;border:1px solid rgba(158,232,255,.24);border-radius:999px;text-decoration:none;background:rgba(158,232,255,.08)}.static-route__article{max-width:840px}.static-route__article section{margin:32px 0}.static-route__article p{line-height:1.85}.static-route__footer{border-top:1px solid rgba(255,255,255,.15);padding:32px 0;margin-top:50px}.static-route__footer a{margin-right:14px}
    </style>
    <!-- SEO_HEAD_END -->`;
}

function buildStaticContent(route) {
  const linked = (paths) => `<nav class="static-route__links" aria-label="Related resources">${paths.map(path => {
    const item = SEO_ROUTES.find(candidate => candidate.path === path);
    return `<a href="${escapeHtml(path)}">${escapeHtml(item?.title || path)}</a>`;
  }).join("")}</nav>`;
  const info = INFORMATION_PAGES[route.path];
  const guide = getToolGuide(route.path);
  const related = relatedRoutes(route);
  let mainContent;
  if (info) {
    mainContent = `<article class="static-route__article">
      ${info.sections.map(([heading, copy]) => `<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(copy)}</p></section>`).join("")}
      ${route.path === "/contact" ? `<p>Email: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>` : ""}
      <section><h2>Related resources</h2>${linked(info.links || [])}</section>
    </article>`;
  } else if (guide) {
    mainContent = `<article>
      <section class="static-route__card" style="margin:24px 0">
        <h2>What this tool is for</h2><p>${escapeHtml(guide.intro)}</p>
      </section>
      <div class="static-route__grid">
        <section class="static-route__card"><h2>How to use it</h2><ol>${guide.steps.map(step=>`<li>${escapeHtml(step)}</li>`).join("")}</ol></section>
        <section class="static-route__card"><h2>Example workflow</h2><p>${escapeHtml(guide.example)}</p></section>
      </div>
      <section class="static-route__card"><h2>Important limitations</h2><ul>${guide.cautions.map(note=>`<li>${escapeHtml(note)}</li>`).join("")}</ul></section>
      <section class="static-route__card" style="margin-top:20px"><h2>Related tools</h2>${linked(related.map(item=>item.path))}</section>
      <section class="static-route__card" style="margin-top:20px"><h2>Learn more</h2>${linked(["/guides/file-conversion-checklist","/guides/csv-data-quality","/guides/pdf-redaction-and-signing","/guides/word-pdf-conversion","/guides/video-compression-basics"])}</section>
    </article>`;
  } else {
    mainContent = `<p>The requested page is not available. Visit the homepage or browse the current office tools.</p>${linked(["/", "/office-tools", "/contact"])}`;
  }
  return `<main class="static-route" data-prerendered="true" data-route="${escapeHtml(route.path)}">
    <div class="static-route__wrap">
      <a class="static-route__brand" href="/" aria-label="SuiteOfficeLab home">SuiteOfficeLab</a>
      <nav class="static-route__links" aria-label="Main navigation" style="margin-top:15px"><a href="/office-tools">Office tools</a><a href="/guides/csv-data-quality">Learning guides</a><a href="/about">About</a><a href="/contact">Contact</a></nav>
      <p class="static-route__eyebrow">${escapeHtml(categoryLabel(route.category))}</p>
      <h1>${escapeHtml(route.h1)}</h1>
      <p class="static-route__lead">${escapeHtml(route.description)}</p>
      ${mainContent}
      <footer class="static-route__footer"><p>SuiteOfficeLab provides browser tools and original documentation. Review exported files before relying on them.</p>
        <nav aria-label="Footer navigation"><a href="/about">About</a><a href="/contact">Contact</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></nav>
      </footer>
    </div>
  </main>`;
}

function renderRoute(route) {
  const withHead = template.replace(
    /<!-- SEO_HEAD_START -->[\s\S]*?<!-- SEO_HEAD_END -->/,
    buildHead(route)
  );
  return withHead.replace(
    '<div id="root"><!-- STATIC_ROUTE_CONTENT --></div>',
    `<div id="root">${buildStaticContent(route)}</div>`
  );
}

for (const route of SEO_ROUTES) {
  const outputPath = route.path === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, `${route.path.replace(/^\//, "")}.html`);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, renderRoute(route), "utf8");
}

const indexableRoutes = getIndexableRoutes();
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexableRoutes.map((route) => `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${route.changefreq || "monthly"}</changefreq>
    <priority>${Number(route.priority ?? 0.8).toFixed(2)}</priority>
  </url>`).join("\n")}
</urlset>
`;

await writeFile(path.join(distDir, "sitemap.xml"), sitemap, "utf8");
await writeFile(
  path.join(distDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`,
  "utf8"
);

const notFoundRoute = {
  ...SEO_ROUTES[0],
  path: "/404",
  canonicalPath: "/",
  title: "Page Not Found",
  h1: "Page not found",
  description: "The requested SuiteOfficeLab page could not be found. Use the browser office suite navigation to open an available editor or file tool.",
  index: false,
};
await writeFile(path.join(distDir, "404.html"), renderRoute(notFoundRoute), "utf8");

// Remove Vite's source template marker from any unexpected leftover copy.
const rootHtml = await readFile(templatePath, "utf8");
if (rootHtml.includes("STATIC_ROUTE_CONTENT")) {
  await rm(templatePath);
  await writeFile(templatePath, renderRoute(SEO_ROUTES[0]), "utf8");
}

console.log(`Statically rendered ${SEO_ROUTES.length} routes (${indexableRoutes.length} indexable) into dist/.`);
