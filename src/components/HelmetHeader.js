import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_NAME = "Browser Office Suite";
const DEFAULT_DESCRIPTION =
    "A frontend-only browser office suite for editing CSV, Word-style documents, PowerPoint-style slides, and PDFs directly in the browser.";
const DEFAULT_IMAGE = "/logo192.png";

function cleanSiteUrl(value) {
    return String(value || "")
        .trim()
        .replace(/\/+$/, "");
}

function cleanPath(value) {
    const path = String(value || "/").trim();

    if (!path || path === "/") {
        return "/";
    }

    return path.startsWith("/") ? path : `/${path}`;
}

export default function HelmetHeader({
                                         title,
                                         description = DEFAULT_DESCRIPTION,
                                         path = "/",
                                         keywords = "",
                                         image = DEFAULT_IMAGE,
                                         type = "website",
                                         noIndex = false,
                                     }) {
    const siteUrl = cleanSiteUrl(
        process.env.REACT_APP_SITE_URL || "https://your-domain.com"
    );

    const pagePath = cleanPath(path);
    const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const canonicalUrl = `${siteUrl}${pagePath}`;
    const imageUrl = String(image || DEFAULT_IMAGE).startsWith("http")
        ? image
        : `${siteUrl}${image || DEFAULT_IMAGE}`;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: pageTitle,
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Web Browser",
        url: canonicalUrl,
        description,
        image: imageUrl,
    };

    return (
        <Helmet prioritizeSeoTags>
            <html lang="en" />

            <title>{pageTitle}</title>
            <meta name="description" content={description} />

            {keywords ? <meta name="keywords" content={keywords} /> : null}

            <meta
                name="robots"
                content={noIndex ? "noindex, nofollow" : "index, follow"}
            />

            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={imageUrl} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />

            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
}