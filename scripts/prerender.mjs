import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  SEO_ROUTES,
  SITE,
  getCanonicalPath,
  getIndexableRoutes,
} from "../src/seo/routeMetadata.js";

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, "dist");
const templatePath = path.join(distDir, "index.html");
const buildDate = new Date().toISOString().slice(0, 10);
const template = await readFile(templatePath, "utf8");

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
  if (route.category === "calculators") {
    return [
      "Enter the temperature value you want to convert.",
      "Review the calculated result immediately.",
      "Copy the result into your document, spreadsheet, or project.",
    ];
  }
  if (route.path === "/archive") {
    return [
      "Enter a document search query and choose useful collection filters.",
      "Review public Archive.org results and available file formats.",
      "Open a compatible document preview or continue to the source item.",
    ];
  }
  if (route.path === "/") {
    return [
      "Choose the editor, viewer, converter, compressor, or utility you need.",
      "Open or create the supported file directly in the browser.",
      "Export the result or continue working with another SuiteOfficeLab tool.",
    ];
  }
  return [
    "Open the tool and select a supported file or enter the requested data.",
    "Use the page controls to edit, convert, inspect, clean, compress, or prepare the content.",
    "Download, print, copy, or export the resulting file when the tool finishes.",
  ];
}

function faqFor(route) {
  const toolName = route.h1.replace(/[?.!]+$/, "");
  return [
    {
      question: `What does ${toolName} do?`,
      answer: route.description,
    },
    {
      question: "Do I need to install a desktop office application?",
      answer: "No desktop office suite is required for the interactive workflow. The tool runs from a modern web browser.",
    },
    {
      question: "Is JavaScript required?",
      answer: "Yes. The statically rendered page explains the tool, while JavaScript powers file selection, editing, conversion, previews, and exports.",
    },
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
  const faqs = faqFor(route);
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: `${SITE.url}/`,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(SITE.image),
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      url: `${SITE.url}/`,
      description: SITE.description,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "WebApplication",
      "@id": `${canonicalUrl}#webapp`,
      name: route.title,
      headline: route.h1,
      url: canonicalUrl,
      description: route.description,
      applicationCategory: route.category === "calculators" ? "UtilitiesApplication" : "BusinessApplication",
      applicationSubCategory: categoryLabel(route.category),
      operatingSystem: "Web Browser",
      browserRequirements: "Requires JavaScript and a modern web browser.",
      isAccessibleForFree: true,
      inLanguage: "en-US",
      image: absoluteUrl(SITE.image),
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  if (canonicalPath !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "SuiteOfficeLab",
          item: `${SITE.url}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: route.h1,
          item: canonicalUrl,
        },
      ],
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
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
      .static-route__wrap{width:min(1120px,100%);margin:0 auto}.static-route__brand{display:inline-flex;gap:10px;align-items:center;color:#9ee8ff;font-weight:900;text-decoration:none}.static-route__eyebrow{margin:48px 0 12px;color:#9ee8ff;font-size:.8rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.static-route h1{max-width:900px;margin:0;font-size:clamp(2.25rem,7vw,5rem);line-height:1.02;letter-spacing:-.045em}.static-route__lead{max-width:850px;margin:24px 0;color:rgba(255,255,255,.78);font-size:clamp(1.05rem,2vw,1.3rem);line-height:1.75}.static-route__grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:18px;margin:34px 0}.static-route__card{padding:24px;border:1px solid rgba(255,255,255,.12);border-radius:20px;background:rgba(10,16,32,.78)}.static-route h2{margin-top:0;font-size:1.3rem}.static-route p,.static-route li{color:rgba(255,255,255,.72);line-height:1.7}.static-route a{color:#9ee8ff}.static-route__links{display:flex;flex-wrap:wrap;gap:10px}.static-route__links a{padding:10px 14px;border:1px solid rgba(158,232,255,.24);border-radius:999px;text-decoration:none;background:rgba(158,232,255,.08)}
    </style>
    <!-- SEO_HEAD_END -->`;
}

function buildStaticContent(route) {
  const related = relatedRoutes(route);
  const steps = howToSteps(route);
  const faqs = faqFor(route);
  const canonicalPath = getCanonicalPath(route);

  return `<main class="static-route" data-prerendered="true" data-route="${escapeHtml(route.path)}">
      <div class="static-route__wrap">
        <a class="static-route__brand" href="/" aria-label="SuiteOfficeLab home">SuiteOfficeLab</a>
        <p class="static-route__eyebrow">${escapeHtml(categoryLabel(route.category))}</p>
        <h1>${escapeHtml(route.h1)}</h1>
        <p class="static-route__lead">${escapeHtml(route.description)}</p>
        <div class="static-route__grid">
          <section class="static-route__card">
            <h2>What this browser tool provides</h2>
            <p>${escapeHtml(categoryCopy(route.category))}</p>
            <p>The interactive application loads on this same canonical URL: <a href="${escapeHtml(canonicalPath)}">${escapeHtml(absoluteUrl(canonicalPath))}</a>.</p>
          </section>
          <section class="static-route__card">
            <h2>How to use it</h2>
            <ol>${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
          </section>
        </div>
        <section class="static-route__card">
          <h2>Frequently asked questions</h2>
          ${faqs.map((faq) => `<h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p>`).join("")}
        </section>
        <section class="static-route__card" style="margin-top:18px">
          <h2>Related SuiteOfficeLab tools</h2>
          <nav class="static-route__links" aria-label="Related tools">
            ${related.map((item) => `<a href="${escapeHtml(item.path)}">${escapeHtml(item.h1)}</a>`).join("")}
          </nav>
        </section>
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
