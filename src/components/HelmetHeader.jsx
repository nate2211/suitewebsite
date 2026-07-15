import React from "react";
import { Helmet } from "react-helmet-async";
import { SITE, getCanonicalPath, getSeoRoute } from "../seo/routeMetadata.js";

const DEFAULT_DESCRIPTION = SITE.description;
const DEFAULT_IMAGE = SITE.image;

function cleanSiteUrl(value) {
    return String(value || SITE.url).trim().replace(/\/+$/, "");
}

function cleanPath(value) {
    const path = String(value || "/").trim();
    if (!path || path === "/") return "/";
    return path.startsWith("/") ? path : `/${path}`;
}

function absoluteUrl(siteUrl, value) {
    const source = String(value || DEFAULT_IMAGE);
    if (/^https?:\/\//i.test(source)) return source;
    return `${siteUrl}${source.startsWith("/") ? source : `/${source}`}`;
}

function pageTitle(title) {
    const clean = String(title || "").trim();
    if (!clean) return SITE.name;
    return clean.includes(SITE.name) ? clean : `${clean} | ${SITE.name}`;
}

export default function HelmetHeader({
    title,
    description = DEFAULT_DESCRIPTION,
    path = "/",
    canonicalPath,
    keywords = "",
    image = DEFAULT_IMAGE,
    type = "website",
    noIndex = false,
    jsonLd,
}) {
    const configuredSiteUrl = cleanSiteUrl(
        import.meta.env.VITE_SITE_URL || SITE.url
    );

    const requestedPath =
        typeof window !== "undefined" && window.location?.pathname
            ? cleanPath(window.location.pathname)
            : cleanPath(path);
    const route = getSeoRoute(requestedPath);
    const fallbackRoute = getSeoRoute(cleanPath(path));
    const resolvedRoute = route?.path === requestedPath ? route : fallbackRoute;
    const resolvedCanonicalPath = cleanPath(
        canonicalPath || getCanonicalPath(resolvedRoute) || path
    );
    const canonicalUrl = `${configuredSiteUrl}${
        resolvedCanonicalPath === "/" ? "/" : resolvedCanonicalPath
    }`;
    const imageUrl = absoluteUrl(configuredSiteUrl, image);
    const resolvedTitle = pageTitle(title || resolvedRoute?.title);
    const resolvedDescription = description || resolvedRoute?.description || DEFAULT_DESCRIPTION;
    const shouldNoIndex = noIndex || resolvedRoute?.index === false;

    const baseSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${configuredSiteUrl}/#organization`,
                name: SITE.name,
                url: `${configuredSiteUrl}/`,
                logo: {
                    "@type": "ImageObject",
                    url: imageUrl,
                },
            },
            {
                "@type": "WebSite",
                "@id": `${configuredSiteUrl}/#website`,
                name: SITE.name,
                url: `${configuredSiteUrl}/`,
                description: SITE.description,
                inLanguage: "en-US",
                publisher: { "@id": `${configuredSiteUrl}/#organization` },
            },
            {
                "@type": "WebApplication",
                "@id": `${canonicalUrl}#webapp`,
                name: title || resolvedRoute?.title || SITE.name,
                url: canonicalUrl,
                description: resolvedDescription,
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web Browser",
                browserRequirements: "Requires JavaScript and a modern web browser.",
                isAccessibleForFree: true,
                image: imageUrl,
                offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                },
                publisher: { "@id": `${configuredSiteUrl}/#organization` },
            },
        ],
    };

    const schemas = [baseSchema, ...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [])];

    return (
        <Helmet prioritizeSeoTags>
            <html lang="en" />

            <title>{resolvedTitle}</title>
            <meta name="description" content={resolvedDescription} />
            {keywords ? <meta name="keywords" content={keywords} /> : null}
            <meta name="author" content={SITE.name} />
            <meta name="application-name" content={SITE.name} />
            <meta
                name="robots"
                content={
                    shouldNoIndex
                        ? "noindex, follow"
                        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                }
            />
            <meta
                name="googlebot"
                content={
                    shouldNoIndex
                        ? "noindex, follow"
                        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                }
            />

            <link rel="canonical" href={canonicalUrl} />
            <link rel="alternate" hrefLang="en" href={canonicalUrl} />
            <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

            <meta property="og:type" content={type} />
            <meta property="og:locale" content={SITE.locale} />
            <meta property="og:site_name" content={SITE.name} />
            <meta property="og:title" content={resolvedTitle} />
            <meta property="og:description" content={resolvedDescription} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:alt" content={`${SITE.name} browser office tools`} />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={resolvedTitle} />
            <meta name="twitter:description" content={resolvedDescription} />
            <meta name="twitter:image" content={imageUrl} />

            {schemas.map((schema, index) => (
                <script type="application/ld+json" key={`schema-${index}`}>
                    {JSON.stringify(schema)}
                </script>
            ))}
        </Helmet>
    );
}
