import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    Collapse,
    CircularProgress,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    Stack,
    Switch,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import SlideshowRoundedIcon from "@mui/icons-material/SlideshowRounded";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import HelmetHeader from "../components/HelmetHeader";
import { AppNavBar, GradientPage } from "../components/components";

const ARCHIVE_SEARCH_BATCH_SIZE = 100;
const ARCHIVE_VISIBLE_RESULT_BATCH_SIZE = 12;
const ARCHIVE_INITIAL_VISIBLE_FILES_PER_ITEM = 6;
const ARCHIVE_FILE_BATCH_SIZE = 12;
const ARCHIVE_BROWSER_STORAGE_KEY = "suiteofficelab.archive.browser.session.v1";
const SCRAPEWEBSITE_ARCHIVE_PROXY_URL = "https://scrapewebsite.pages.dev/api/archiveproxy";
const ARCHIVE_PROXY_STORAGE_KEY = "suiteofficelab.archive.useProxy.v1";

const GLASS_CARD_SX = {
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 4,
    background: "rgba(255,255,255,.055)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 28px 90px rgba(0,0,0,.35)",
};

const SOFT_CARD_SX = {
    border: "1px solid rgba(255,255,255,.1)",
    background: "rgba(255,255,255,.04)",
    backdropFilter: "blur(14px)",
};

const DOCUMENT_EXTENSIONS = [
    ".pdf",
    ".doc",
    ".docx",
    ".rtf",
    ".odt",
    ".ppt",
    ".pptx",
    ".odp",
    ".xls",
    ".xlsx",
    ".ods",
    ".csv",
    ".tsv",
    ".txt",
    ".md",
    ".epub",
];

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"];

const SKIP_EXTENSIONS = [
    ".zip",
    ".rar",
    ".7z",
    ".tar",
    ".gz",
    ".torrent",
    ".xml",
    ".sqlite",
    ".mp3",
    ".m4a",
    ".wav",
    ".ogg",
    ".flac",
    ".mp4",
    ".mov",
    ".avi",
    ".mkv",
    ".webm",
];

const OFFICE_COLLECTION_OPTIONS = [
    {
        id: "opensource",
        label: "Community Texts",
        description: "Broad user-uploaded documents and text items.",
    },
    {
        id: "texts",
        label: "Archive Texts",
        description: "Archive.org's broad texts and documents collection.",
    },
    {
        id: "americana",
        label: "American Libraries",
        description: "Books, scans, public documents, and research material.",
    },
    {
        id: "internetarchivebooks",
        label: "Internet Archive Books",
        description: "Digitized books and document scans.",
    },
    {
        id: "university_of_toronto",
        label: "University of Toronto",
        description: "Academic scans, books, and research texts.",
    },
    {
        id: "gutenberg",
        label: "Project Gutenberg",
        description: "Public-domain books and text documents.",
    },
    {
        id: "additional_collections",
        label: "Additional Collections",
        description: "Mixed public Archive collections with documents.",
    },
    {
        id: "opensource_media",
        label: "Open Source Media",
        description: "Mixed uploads where document files can appear.",
    },
    {
        id: "magazine_rack",
        label: "Magazine Rack",
        description: "Magazines, PDFs, periodicals, and scans.",
    },
    {
        id: "manuals",
        label: "Manuals",
        description: "Manuals and technical documents.",
    },
    {
        id: "computermanuals",
        label: "Computer Manuals",
        description: "Software, hardware, and technical manual scans.",
    },
    {
        id: "governmentpublications",
        label: "Government Publications",
        description: "Government documents, reports, and public records.",
    },
    {
        id: "usgovernmentdocuments",
        label: "US Government Docs",
        description: "Federal reports, publications, hearings, records, and public documents.",
    },
    {
        id: "fedlink",
        label: "FEDLINK",
        description: "Federal library scans, reports, books, and public documentation.",
    },
    {
        id: "prelinger_library",
        label: "Prelinger Library",
        description: "Research scans, ephemera, reference books, and historical documents.",
    },
    {
        id: "biodiversity",
        label: "Biodiversity Heritage",
        description: "Scientific books, journals, field reports, and scanned research material.",
    },
    {
        id: "medicalheritagelibrary",
        label: "Medical Heritage",
        description: "Medical books, public-health documents, journals, and historic scans.",
    },
    {
        id: "nasa",
        label: "NASA",
        description: "NASA reports, technical documents, public records, and research PDFs.",
    },
    {
        id: "mitlibraries",
        label: "MIT Libraries",
        description: "Academic books, technical documents, theses, and research scans.",
    },
    {
        id: "library_of_congress",
        label: "Library of Congress",
        description: "Public collections with books, documents, scans, and archival material.",
    },
    {
        id: "folkscanomy",
        label: "Folksonomy Texts",
        description: "User-tagged text uploads where PDFs and office documents can appear.",
    },
    {
        id: "community_texts",
        label: "Community Texts Mirror",
        description: "Community document uploads and scanned text items.",
    },
    {
        id: "opensource_documents",
        label: "Open Source Documents",
        description: "Mixed open document uploads, PDFs, templates, and text files.",
    },
    {
        id: "californiarevealed",
        label: "California Revealed",
        description: "Historical records, newsletters, reports, books, and community archives.",
    },
    {
        id: "journals",
        label: "Journals",
        description: "Journal scans, periodicals, papers, and research-style documents.",
    },
    {
        id: "additional_collections_texts",
        label: "More Text Collections",
        description: "Additional text-heavy Archive collections for broader document discovery.",
    },
];

const DEFAULT_SELECTED_COLLECTIONS = ["texts", "opensource"];

const QUERY_STOP_WORDS = new Set([
    "a",
    "an",
    "and",
    "archive",
    "archives",
    "book",
    "books",
    "document",
    "documents",
    "download",
    "file",
    "files",
    "for",
    "from",
    "in",
    "of",
    "office",
    "or",
    "pdf",
    "ppt",
    "pptx",
    "presentation",
    "spreadsheet",
    "the",
    "to",
    "with",
    "word",
    "xlsx",
]);

function normalizeText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
}

function readJsonStorage(key, fallback) {
    if (typeof window === "undefined" || !window.localStorage) return fallback;

    try {
        const raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function writeJsonStorage(key, value) {
    if (typeof window === "undefined" || !window.localStorage) return false;

    try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
}

function readArchiveProxySetting() {
    if (typeof window === "undefined" || !window.localStorage) return false;

    try {
        return window.localStorage.getItem(ARCHIVE_PROXY_STORAGE_KEY) === "true";
    } catch {
        return false;
    }
}

function writeArchiveProxySetting(value) {
    if (typeof window === "undefined" || !window.localStorage) return false;

    try {
        window.localStorage.setItem(ARCHIVE_PROXY_STORAGE_KEY, value ? "true" : "false");
        return true;
    } catch {
        return false;
    }
}

function makeArchivePageCursor(pageNumber) {
    return `page:${Math.max(1, Number(pageNumber) || 1)}`;
}

function getArchivePageFromCursor(cursor = "") {
    const text = String(cursor || "").trim();
    if (!text) return 1;

    const match = text.match(/^page:(\d+)$/i);
    if (match) return Math.max(1, Number(match[1]) || 1);

    return Math.max(1, Number(text) || 1);
}

function sanitizeArchiveQuery(value) {
    return normalizeText(value)
        .replace(/[^\w\s'"@:./-]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 140);
}

function cleanArchiveRequestText(value) {
    return normalizeText(getArchiveSearchTextFromInput(value))
        .replace(/https?:\/\/\S+/gi, " ")
        .replace(/\b(?:AND|OR|NOT)\b/gi, " ")
        .replace(/\b(?:mediatype|collection|title|creator|subject|description|identifier|date):\s*"[^"]*"/gi, " ")
        .replace(/\b(?:mediatype|collection|title|creator|subject|description|identifier|date):[^\s)]+/gi, " ")
        .replace(/[()[\]{}<>]/g, " ")
        .replace(/[\u201c\u201d]/g, '"')
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/\s+/g, " ")
        .trim();
}

function getSterileArchiveQuery(value) {
    return sanitizeArchiveQuery(cleanArchiveRequestText(value))
        .replace(/[:/]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function escapeArchivePhrase(value) {
    return String(value || "")
        .replace(/["]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function escapeArchiveToken(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "")
        .trim();
}

function sanitizeCollectionId(value) {
    return String(value || "")
        .trim()
        .replace(/^collection:/i, "")
        .replace(/^https?:\/\/archive\.org\/details\//i, "")
        .split(/[/?#\s]/)[0]
        .replace(/[^a-zA-Z0-9_.-]/g, "")
        .slice(0, 80);
}

function normalizeCollectionIds(value) {
    const source = Array.isArray(value) ? value : [];

    return Array.from(
        new Set(source.map(sanitizeCollectionId).filter(Boolean))
    );
}

function normalizeArray(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value.map(String).filter(Boolean);
    return [String(value)].filter(Boolean);
}

function getLowerFileName(name = "") {
    return String(name || "").toLowerCase().split("?")[0].split("#")[0];
}

function getFileExtension(name = "") {
    const clean = getLowerFileName(name);
    const match = clean.match(/(\.[a-z0-9]+)$/i);
    return match ? match[1] : "";
}

function isDocumentFile(name = "") {
    const lower = getLowerFileName(name);
    return DOCUMENT_EXTENSIONS.some((extension) => lower.endsWith(extension));
}

function isImageFile(name = "") {
    const lower = getLowerFileName(name);
    return IMAGE_EXTENSIONS.some((extension) => lower.endsWith(extension));
}

function isSkipFile(name = "") {
    const lower = getLowerFileName(name);
    return SKIP_EXTENSIONS.some((extension) => lower.endsWith(extension));
}

function isArchiveContainerInternalPath(name = "") {
    return /\.(zip|rar|7z|tar|gz)\//i.test(String(name || ""));
}

function encodeArchivePath(path) {
    return String(path || "")
        .split("/")
        .map((part) => encodeURIComponent(part))
        .join("/");
}

function buildDownloadUrl(identifier, fileName) {
    return `https://archive.org/download/${encodeURIComponent(identifier)}/${encodeArchivePath(fileName)}`;
}

function buildDetailsUrl(identifier) {
    return `https://archive.org/details/${encodeURIComponent(identifier)}`;
}

function buildArchiveImageServiceUrl(identifier) {
    return `https://archive.org/services/img/${encodeURIComponent(identifier)}`;
}

function isArchiveHost(host = "") {
    const lower = String(host || "").toLowerCase();

    return (
        lower === "archive.org" ||
        lower === "www.archive.org" ||
        /^ia\d+\.us\.archive\.org$/.test(lower)
    );
}

function shouldUseArchiveProxyForUrl(url, useArchiveProxy) {
    if (!useArchiveProxy) return false;

    try {
        const parsedUrl = new URL(url);
        return parsedUrl.protocol === "https:" && isArchiveHost(parsedUrl.hostname);
    } catch {
        return false;
    }
}

function buildArchiveProxyUrl(url, useArchiveProxy) {
    if (!shouldUseArchiveProxyForUrl(url, useArchiveProxy)) return url;
    return `${SCRAPEWEBSITE_ARCHIVE_PROXY_URL}?url=${encodeURIComponent(url)}`;
}

function buildArchiveProxyFallbackUrl(url) {
    if (!shouldUseArchiveProxyForUrl(url, true)) return "";
    return `${SCRAPEWEBSITE_ARCHIVE_PROXY_URL}?url=${encodeURIComponent(url)}`;
}

function stripUrlPunctuation(value) {
    return String(value || "").replace(/[),.;\]]+$/g, "");
}

function splitJoinedUrls(value) {
    return String(value || "")
        .replace(/(https?:\/\/)/gi, " $1")
        .replace(/\s+/g, " ")
        .trim();
}

function extractUrls(value) {
    const matches = splitJoinedUrls(value).match(/https?:\/\/[^\s<>"']+/gi);
    return matches ? matches.map(stripUrlPunctuation) : [];
}

function decodeArchivePathPart(value) {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}

function normalizeAdvancedSearchQuery(value) {
    return sanitizeArchiveQuery(
        normalizeText(value)
            .replace(/\(?\s*site:archive\.org\s*\)?/gi, " ")
            .replace(/-site:[^\s)]+/gi, " ")
            .replace(/\boffice\b/gi, " ")
            .replace(/\bdocument\b/gi, " ")
            .replace(/\bdownload\b/gi, " ")
            .replace(/\bview\b/gi, " ")
            .replace(/\bOR\b/gi, " ")
            .replace(/\bAND\b/gi, " ")
            .replace(/[()"]/g, " ")
    );
}

function parseArchiveTarget(rawUrl) {
    try {
        const url = new URL(rawUrl);
        const host = url.hostname.toLowerCase();
        if (!isArchiveHost(host)) return null;

        const parts = url.pathname
            .split("/")
            .filter(Boolean)
            .map(decodeArchivePathPart);

        if (
            (host === "archive.org" || host === "www.archive.org") &&
            parts[0] === "advancedsearch.php"
        ) {
            const q = normalizeAdvancedSearchQuery(url.searchParams.get("q") || "");
            if (!q) return null;

            return {
                type: "advancedSearch",
                query: q,
                originalUrl: rawUrl,
            };
        }

        let identifier = "";
        let fileName = "";

        if (
            (host === "archive.org" || host === "www.archive.org") &&
            parts[0] === "details" &&
            parts[1]
        ) {
            return {
                type: "item",
                identifier: parts[1],
                originalUrl: rawUrl,
                detailsUrl: buildDetailsUrl(parts[1]),
            };
        }

        if (
            (host === "archive.org" || host === "www.archive.org") &&
            parts[0] === "download" &&
            parts.length >= 2
        ) {
            identifier = parts[1];
            fileName = parts.slice(2).join("/");
        }

        if (/^ia\d+\.us\.archive\.org$/.test(host)) {
            const itemsIndex = parts.indexOf("items");

            if (itemsIndex >= 0 && parts.length >= itemsIndex + 2) {
                identifier = parts[itemsIndex + 1];
                fileName = parts.slice(itemsIndex + 2).join("/");
            }
        }

        if (!identifier) return null;

        if (fileName && isDocumentFile(fileName) && !isSkipFile(fileName)) {
            return {
                type: "documentFile",
                identifier,
                fileName,
                originalUrl: rawUrl,
                downloadUrl: buildDownloadUrl(identifier, fileName),
                detailsUrl: buildDetailsUrl(identifier),
                containerInternal: isArchiveContainerInternalPath(fileName),
            };
        }

        return {
            type: "item",
            identifier,
            originalUrl: rawUrl,
            detailsUrl: buildDetailsUrl(identifier),
        };
    } catch {
        return null;
    }
}

function extractArchiveTargets(value) {
    const seen = new Set();

    return extractUrls(value)
        .map(parseArchiveTarget)
        .filter(Boolean)
        .filter((target) => {
            const key =
                target.type === "advancedSearch"
                    ? `search:${target.query}`
                    : `${target.type}:${target.identifier}:${target.fileName || ""}`;

            if (seen.has(key)) return false;

            seen.add(key);
            return true;
        });
}

function getArchiveSearchTextFromInput(value) {
    const target = extractArchiveTargets(value).find(
        (item) => item.type === "advancedSearch"
    );

    return target?.query || value;
}

function getArchiveQueryTokens(value) {
    const safeQuery = getSterileArchiveQuery(value)
        .toLowerCase()
        .replace(/https?:\/\/\S+/g, " ");
    const rawTokens = safeQuery
        .split(/[^a-z0-9]+/i)
        .map((token) => token.trim().toLowerCase())
        .filter((token) => token.length >= 2);
    const meaningfulTokens = rawTokens.filter((token) => !QUERY_STOP_WORDS.has(token));

    return Array.from(new Set(meaningfulTokens.length ? meaningfulTokens : rawTokens)).slice(
        0,
        10
    );
}

function tokenAppearsInText(text, token) {
    const escaped = String(token || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (!escaped) return false;

    return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i").test(
        String(text || "")
    );
}

function compactArchiveMatchText(value) {
    return String(value || "")
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "");
}

function archiveTokensAppearInText(text, tokens = []) {
    const normalizedText = String(text || "");
    const compactText = compactArchiveMatchText(normalizedText);

    return tokens.reduce((count, token) => {
        const safeToken = String(token || "").trim();
        const compactToken = compactArchiveMatchText(safeToken);
        if (!safeToken) return count;

        return tokenAppearsInText(normalizedText, safeToken) ||
        (compactToken && compactText.includes(compactToken))
            ? count + 1
            : count;
    }, 0);
}

function archivePhraseAppearsInText(text, tokens = []) {
    const compactPhrase = tokens.map(compactArchiveMatchText).join("");
    if (!compactPhrase || compactPhrase.length < 4) return false;

    return compactArchiveMatchText(text).includes(compactPhrase);
}

function getCandidateSearchText(item = {}, metadata = {}, files = []) {
    return [
        item.identifier,
        item.title,
        item.creator,
        item.subject,
        item.description,
        item.collection,
        metadata.identifier,
        metadata.title,
        metadata.creator,
        metadata.subject,
        metadata.description,
        metadata.collection,
        ...files.map((file) => file?.name || ""),
        ...files.map((file) => file?.format || ""),
    ]
        .flat()
        .map(String)
        .join(" ")
        .toLowerCase();
}

function getHighSignalSearchText(item = {}, metadata = {}, files = []) {
    return [
        item.identifier,
        item.title,
        item.creator,
        item.subject,
        metadata.identifier,
        metadata.title,
        metadata.creator,
        metadata.subject,
        ...files.map((file) => file?.name || ""),
    ]
        .flat()
        .map(String)
        .join(" ")
        .toLowerCase();
}

function getQueryRelevance({ query, queryTokens, item, metadata, files }) {
    const tokens =
        Array.isArray(queryTokens) && queryTokens.length
            ? queryTokens
            : getArchiveQueryTokens(query);

    if (!tokens.length) {
        return {
            matches: true,
            highSignalMatchedCount: 0,
            fullMatchedCount: 0,
            missingTokens: [],
        };
    }

    const highSignalHaystack = getHighSignalSearchText(item, metadata, files);
    const fullHaystack = getCandidateSearchText(item, metadata, files);
    const highSignalMatchedCount = archiveTokensAppearInText(highSignalHaystack, tokens);
    const fullMatchedCount = archiveTokensAppearInText(fullHaystack, tokens);
    const highSignalPhraseMatch = archivePhraseAppearsInText(highSignalHaystack, tokens);
    const fullPhraseMatch = archivePhraseAppearsInText(fullHaystack, tokens);
    const missingTokens = tokens.filter((token) => !tokenAppearsInText(fullHaystack, token));
    let matches;

    if (tokens.length === 1) {
        matches = highSignalMatchedCount === 1 || highSignalPhraseMatch;
    } else {
        matches =
            highSignalMatchedCount === tokens.length ||
            highSignalPhraseMatch ||
            (fullMatchedCount === tokens.length &&
                fullPhraseMatch &&
                highSignalMatchedCount >= Math.min(2, tokens.length));
    }

    return {
        matches,
        highSignalMatchedCount,
        fullMatchedCount,
        missingTokens,
    };
}

function buildArchiveSearchQuery(query, selectedCollections) {
    const safeQuery = getSterileArchiveQuery(query);
    const tokens = getArchiveQueryTokens(safeQuery);
    const phrase = escapeArchivePhrase(safeQuery);
    const collections = normalizeCollectionIds(selectedCollections);
    const collectionClause = collections
        .map((collection) => `collection:${collection}`)
        .join(" OR ");
    const fields = ["title", "creator", "subject", "description", "identifier"];
    const phraseClause = phrase
        ? fields.map((field) => `${field}:"${phrase}"`).join(" OR ")
        : "";
    const tokenClause = tokens.length
        ? tokens
            .map((token) => {
                const safeToken = escapeArchiveToken(token);
                if (!safeToken) return "";

                return `(${fields
                    .map((field) => `${field}:${safeToken}`)
                    .join(" OR ")})`;
            })
            .filter(Boolean)
            .join(" AND ")
        : "";
    const queryClause = [
        phraseClause && `(${phraseClause})`,
        tokenClause && `(${tokenClause})`,
    ]
        .filter(Boolean)
        .join(" OR ");

    return [
        "mediatype:texts",
        collectionClause ? `(${collectionClause})` : "",
        `(${queryClause || safeQuery})`,
    ]
        .filter(Boolean)
        .join(" AND ");
}

function buildSearchSignature(query, selectedCollections, useArchiveProxy = false) {
    return JSON.stringify({
        query: getSterileArchiveQuery(query),
        collections: normalizeCollectionIds(selectedCollections).sort(),
        useArchiveProxy: Boolean(useArchiveProxy),
    });
}

async function fetchJson(url, options = {}) {
    const useArchiveProxy = Boolean(options.useArchiveProxy);
    const requestUrl = buildArchiveProxyUrl(url, useArchiveProxy);
    const fallbackUrl = !useArchiveProxy ? buildArchiveProxyFallbackUrl(url) : "";
    const requestOptions = {
        method: "GET",
        signal: options.signal,
        headers: {
            Accept: "application/json",
        },
    };

    let response;

    try {
        response = await fetch(requestUrl, requestOptions);
    } catch (error) {
        if (fallbackUrl && !isAbortError(error)) {
            response = await fetch(fallbackUrl, requestOptions);
        } else {
            throw error;
        }
    }

    if (!response.ok) {
        if (
            fallbackUrl &&
            response.url !== fallbackUrl &&
            (response.status === 401 || response.status === 403 || response.status === 404)
        ) {
            const fallbackResponse = await fetch(fallbackUrl, requestOptions);

            if (fallbackResponse.ok) {
                return fallbackResponse.json();
            }

            response = fallbackResponse;
        }

        let extra = "";

        try {
            const data = await response.json();
            extra = data?.error ? `: ${data.error}` : "";
        } catch {
            extra = "";
        }

        throw new Error(`Request failed with HTTP ${response.status}${extra}`);
    }

    return response.json();
}

async function searchArchiveItems(
    query,
    selectedCollections,
    cursor = "",
    signal,
    useArchiveProxy = false
) {
    const archiveQuery = buildArchiveSearchQuery(query, selectedCollections);
    const pageNumber = getArchivePageFromCursor(cursor);
    const params = new URLSearchParams({
        q: archiveQuery,
        rows: String(ARCHIVE_SEARCH_BATCH_SIZE),
        page: String(pageNumber),
        output: "json",
    });

    [
        "identifier",
        "title",
        "creator",
        "collection",
        "date",
        "downloads",
        "description",
        "subject",
    ].forEach((field) => params.append("fl[]", field));

    params.append("sort[]", "downloads desc");
    params.append("sort[]", "identifier asc");

    const data = await fetchJson(`https://archive.org/advancedsearch.php?${params}`, {
        signal,
        useArchiveProxy,
    });
    const response = data?.response || {};
    const docs = Array.isArray(response.docs) ? response.docs : [];
    const start = Number(response.start || (pageNumber - 1) * ARCHIVE_SEARCH_BATCH_SIZE);
    const numFound = Number(response.numFound || docs.length);
    const hasMorePages = start + docs.length < numFound && docs.length > 0;

    return {
        ...data,
        archiveQuery,
        items: docs,
        cursor: hasMorePages ? makeArchivePageCursor(pageNumber + 1) : "",
        page: pageNumber,
        start,
        numFound,
        hasMorePages,
    };
}

async function fetchArchiveMetadata(identifier, signal, useArchiveProxy = false) {
    return fetchJson(`https://archive.org/metadata/${encodeURIComponent(identifier)}`, {
        signal,
        useArchiveProxy,
    });
}

function formatSize(value) {
    const bytes = Number(value);
    if (!Number.isFinite(bytes) || bytes <= 0) return "";

    const units = ["B", "KB", "MB", "GB"];
    const index = Math.min(
        units.length - 1,
        Math.floor(Math.log(bytes) / Math.log(1024))
    );

    return `${(bytes / Math.pow(1024, index)).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function getDocumentKind(file = {}) {
    const extension = getFileExtension(file.name);
    const format = String(file.format || "").toLowerCase();

    if (extension === ".pdf" || format.includes("pdf")) return "PDF";
    if (extension === ".doc" || extension === ".docx" || format.includes("word")) return "Word";
    if (extension === ".ppt" || extension === ".pptx" || format.includes("powerpoint")) return "PowerPoint";
    if (
        extension === ".xls" ||
        extension === ".xlsx" ||
        extension === ".csv" ||
        extension === ".tsv" ||
        format.includes("excel") ||
        format.includes("spreadsheet")
    ) {
        return "Spreadsheet";
    }
    if (extension === ".epub") return "EPUB";
    if (extension === ".txt" || extension === ".md" || extension === ".rtf") return "Text";
    if (extension === ".odt") return "OpenDocument Text";
    if (extension === ".ods") return "OpenDocument Sheet";
    if (extension === ".odp") return "OpenDocument Slides";

    return "Document";
}

function getDocumentIcon(kind) {
    if (kind === "PDF") return <PictureAsPdfRoundedIcon fontSize="small" />;
    if (kind === "Word" || kind === "Text" || kind === "OpenDocument Text") {
        return <DescriptionRoundedIcon fontSize="small" />;
    }
    if (kind === "PowerPoint" || kind === "OpenDocument Slides") {
        return <SlideshowRoundedIcon fontSize="small" />;
    }
    if (kind === "Spreadsheet" || kind === "OpenDocument Sheet") {
        return <TableChartRoundedIcon fontSize="small" />;
    }

    return <InsertDriveFileRoundedIcon fontSize="small" />;
}

function getFileLabel(file = {}) {
    const pieces = [];
    if (file.kind) pieces.push(file.kind);
    if (file.format) pieces.push(file.format);
    if (file.size) pieces.push(formatSize(file.size));

    return pieces.filter(Boolean).join(" - ") || "document file";
}

function getItemCollections(item = {}, metadata = {}) {
    return [
        ...normalizeArray(item.collection),
        ...normalizeArray(metadata.collection),
    ];
}

function itemHasSelectedCollection(item = {}, metadata = {}, selected = []) {
    const selectedSet = new Set(normalizeCollectionIds(selected));
    const collections = getItemCollections(item, metadata);

    return collections.some((collection) => selectedSet.has(collection));
}

function getArchiveImageScore(file = {}) {
    const lowerName = getLowerFileName(file.name);
    const format = String(file.format || "").toLowerCase();
    let score = 10;

    if (/\b(cover|front|folder|artwork|poster|thumb|title)\b/i.test(lowerName)) score += 100;
    if (lowerName.includes("__ia_thumb")) score += 90;
    if (format.includes("item tile")) score += 86;
    if (format.includes("jpeg thumb") || format.includes("thumbnail")) score += 80;
    if (lowerName.endsWith(".jpg") || lowerName.endsWith(".jpeg")) score += 12;
    if (lowerName.endsWith(".webp")) score += 10;
    if (lowerName.endsWith(".png")) score += 4;
    if (lowerName.endsWith(".gif")) score -= 20;

    const size = Number(file.size);
    if (Number.isFinite(size) && size > 0) {
        if (size < 1500) score -= 45;
        if (size > 5000) score += 8;
        if (size > 25000) score += 6;
        if (size > 2500000) score -= 12;
    }

    return score;
}

function getArchiveItemImages(identifier, metadata = {}, files = [], useArchiveProxy = false) {
    const title = metadata.title || identifier || "Archive item";
    const metadataImages = (Array.isArray(files) ? files : [])
        .filter((file) => file?.name)
        .filter((file) => isImageFile(file.name))
        .filter((file) => !isArchiveContainerInternalPath(file.name))
        .map((file) => {
            const directUrl = buildDownloadUrl(identifier, file.name);
            const imageUrl = buildArchiveProxyUrl(directUrl, useArchiveProxy);

            return {
                name: file.name,
                url: imageUrl,
                imageUrl,
                directUrl,
                alt: `${title} Archive thumbnail`,
                proxied: Boolean(useArchiveProxy),
                score: getArchiveImageScore(file),
            };
        })
        .sort((a, b) => b.score - a.score);

    if (metadataImages.length) return dedupeArchiveImages(metadataImages).slice(0, 1);

    const serviceImageUrl = buildArchiveImageServiceUrl(identifier);

    return [
        {
            name: "Archive item thumbnail",
            url: buildArchiveProxyUrl(serviceImageUrl, useArchiveProxy),
            imageUrl: buildArchiveProxyUrl(serviceImageUrl, useArchiveProxy),
            directUrl: serviceImageUrl,
            alt: `${title} Archive thumbnail`,
            proxied: Boolean(useArchiveProxy),
            score: 1,
        },
    ];
}

function getDocumentFiles(identifier, files, useArchiveProxy = false) {
    const documentFiles = (Array.isArray(files) ? files : [])
        .filter((file) => file?.name)
        .filter((file) => isDocumentFile(file.name))
        .filter((file) => !isSkipFile(file.name))
        .filter((file) => !isArchiveContainerInternalPath(file.name))
        .map((file) => {
            const directDownloadUrl = buildDownloadUrl(identifier, file.name);
            const proxiedDownloadUrl = buildArchiveProxyFallbackUrl(directDownloadUrl);
            const downloadUrl = useArchiveProxy
                ? proxiedDownloadUrl || directDownloadUrl
                : directDownloadUrl;
            const fallbackDownloadUrl = useArchiveProxy
                ? directDownloadUrl
                : proxiedDownloadUrl;
            const kind = getDocumentKind(file);

            return {
                name: file.name,
                format: file.format || "",
                size: file.size || "",
                source: file.source || "",
                kind,
                extension: getFileExtension(file.name),
                url: downloadUrl,
                downloadUrl,
                fallbackDownloadUrl,
                proxiedDownloadUrl,
                directDownloadUrl,
                proxied: Boolean(useArchiveProxy),
            };
        });

    return dedupeArchiveFiles(documentFiles).sort((a, b) => {
        const order = ["PDF", "Word", "PowerPoint", "Spreadsheet", "Text", "EPUB"];
        return order.indexOf(a.kind) - order.indexOf(b.kind);
    });
}

function isAbortError(error) {
    return (
        error?.name === "AbortError" ||
        error?.code === 20 ||
        String(error?.message || "").toLowerCase().includes("abort")
    );
}

function createAbortError() {
    try {
        return new DOMException("Search aborted", "AbortError");
    } catch {
        const error = new Error("Search aborted");
        error.name = "AbortError";
        return error;
    }
}

function throwIfSearchAborted(signal) {
    if (signal?.aborted) throw createAbortError();
}

async function buildArchiveDocumentResultFromMetadata({
                                                          identifier,
                                                          forcedFiles = [],
                                                          selectedCollections,
                                                          signal,
                                                          useArchiveProxy = false,
                                                          allowDirectUrlResult = false,
                                                      }) {
    const metadataData = await fetchArchiveMetadata(identifier, signal, useArchiveProxy);
    const metadata = metadataData.metadata || {};
    const metadataFiles = Array.isArray(metadataData.files) ? metadataData.files : [];
    const itemLike = {
        identifier,
        title: metadata.title || identifier,
        creator: metadata.creator || "",
        collection: metadata.collection || [],
        description: metadata.description || "",
        subject: metadata.subject || "",
    };
    const inSelectedCollection = itemHasSelectedCollection(
        itemLike,
        metadata,
        selectedCollections
    );

    if (!inSelectedCollection && !allowDirectUrlResult) return null;

    const metadataDocumentFiles = getDocumentFiles(identifier, metadataFiles, useArchiveProxy);
    const documentFiles = forcedFiles.length
        ? dedupeArchiveFiles([...forcedFiles, ...metadataDocumentFiles])
        : metadataDocumentFiles;

    if (!documentFiles.length) return null;

    return {
        identifier,
        title: metadata.title || identifier,
        creator: metadata.creator || "",
        date: metadata.date || "",
        description: normalizeText(metadata.description || "")
            .replace(/<[^>]*>/g, "")
            .slice(0, 300),
        collection: Array.from(new Set(getItemCollections(itemLike, metadata))),
        directUrlResult: Boolean(allowDirectUrlResult),
        queryMatched: true,
        queryRelevance: {
            matches: true,
            highSignalMatchedCount: 0,
            fullMatchedCount: 0,
            missingTokens: [],
        },
        downloads: "",
        detailsUrl: buildDetailsUrl(identifier),
        images: getArchiveItemImages(identifier, metadata, metadataFiles, useArchiveProxy),
        files: documentFiles,
    };
}

async function loadDirectArchiveDocumentLinks({
                                                  query,
                                                  selectedCollections,
                                                  signal,
                                                  useArchiveProxy = false,
                                                  onResult = null,
                                              }) {
    const targets = extractArchiveTargets(query);
    const directTargets = targets.filter(
        (target) => target.type === "documentFile" || target.type === "item"
    );

    if (!directTargets.length) return null;

    const grouped = new Map();

    for (const target of directTargets) {
        if (!grouped.has(target.identifier)) {
            grouped.set(target.identifier, {
                identifier: target.identifier,
                forcedFiles: [],
            });
        }

        if (target.type === "documentFile") {
            const proxiedDownloadUrl = buildArchiveProxyFallbackUrl(target.downloadUrl);
            const downloadUrl = useArchiveProxy
                ? proxiedDownloadUrl || target.downloadUrl
                : target.downloadUrl;
            const fallbackDownloadUrl = useArchiveProxy
                ? target.downloadUrl
                : proxiedDownloadUrl;
            const kind = getDocumentKind({ name: target.fileName });

            grouped.get(target.identifier).forcedFiles.push({
                name: target.fileName,
                format: "",
                size: "",
                source: "direct archive url",
                kind,
                extension: getFileExtension(target.fileName),
                url: downloadUrl,
                downloadUrl,
                fallbackDownloadUrl,
                proxiedDownloadUrl,
                directDownloadUrl: target.downloadUrl,
                originalUrl: target.originalUrl,
                proxied: Boolean(useArchiveProxy),
            });
        }
    }

    const results = [];

    for (const group of grouped.values()) {
        try {
            const result = await buildArchiveDocumentResultFromMetadata({
                identifier: group.identifier,
                forcedFiles: group.forcedFiles,
                selectedCollections,
                signal,
                useArchiveProxy,
                allowDirectUrlResult: true,
            });

            if (result) {
                results.push(result);

                if (typeof onResult === "function") {
                    onResult(result, {
                        accepted: results.length,
                        inspected: results.length,
                        totalCandidates: grouped.size,
                    });
                }
            }
        } catch (err) {
            if (isAbortError(err)) throw err;
        }
    }

    return {
        cursor: "",
        results,
        directLinkMode: true,
    };
}

async function searchArchiveDocuments({
                                          query,
                                          cursor = "",
                                          batchStartIndex = 0,
                                          selectedCollections,
                                          signal,
                                          useArchiveProxy = false,
                                          onResult = null,
                                      }) {
    const safeQuery = getSterileArchiveQuery(query);
    const queryTokens = getArchiveQueryTokens(safeQuery);
    const collectionIds = normalizeCollectionIds(selectedCollections);

    if (!safeQuery) throw new Error("Type a search query first.");
    if (!collectionIds.length) {
        throw new Error("Choose at least one Archive collection or add a custom collection ID.");
    }

    const searchData = await searchArchiveItems(
        safeQuery,
        collectionIds,
        cursor,
        signal,
        useArchiveProxy
    );

    throwIfSearchAborted(signal);

    const items = Array.isArray(searchData.items) ? searchData.items : [];
    const results = [];
    const seenIdentifiers = new Set();
    const safeBatchStartIndex = Math.max(0, Number(batchStartIndex) || 0);

    for (const item of items.slice(0, ARCHIVE_SEARCH_BATCH_SIZE)) {
        if (!item.identifier) continue;
        if (seenIdentifiers.has(item.identifier)) continue;

        seenIdentifiers.add(item.identifier);

        try {
            throwIfSearchAborted(signal);

            const metadataData = await fetchArchiveMetadata(
                item.identifier,
                signal,
                useArchiveProxy
            );

            throwIfSearchAborted(signal);

            const metadata = metadataData.metadata || {};
            const files = Array.isArray(metadataData.files) ? metadataData.files : [];
            const queryRelevance = getQueryRelevance({
                query: safeQuery,
                queryTokens,
                item,
                metadata,
                files,
            });

            if (!itemHasSelectedCollection(item, metadata, collectionIds)) continue;

            const documentFiles = getDocumentFiles(item.identifier, files, useArchiveProxy);
            if (!documentFiles.length) continue;

            const nextResult = {
                identifier: item.identifier,
                title: metadata.title || item.title || item.identifier,
                creator: metadata.creator || item.creator || "",
                date: metadata.date || item.date || "",
                description: normalizeText(metadata.description || item.description || "")
                    .replace(/<[^>]*>/g, "")
                    .slice(0, 300),
                collection: Array.from(new Set(getItemCollections(item, metadata))),
                directUrlResult: false,
                queryMatched: queryRelevance.matches,
                queryRelevance,
                downloads: item.downloads || "",
                detailsUrl: buildDetailsUrl(item.identifier),
                images: getArchiveItemImages(
                    item.identifier,
                    metadata,
                    files,
                    useArchiveProxy
                ),
                files: documentFiles,
            };

            results.push(nextResult);

            if (typeof onResult === "function") {
                onResult(nextResult, {
                    accepted: results.length,
                    inspected: safeBatchStartIndex + seenIdentifiers.size,
                    batchInspected: seenIdentifiers.size,
                    batchStartIndex: safeBatchStartIndex,
                    totalCandidates: safeBatchStartIndex + items.length,
                    batchCandidateCount: items.length,
                });
            }
        } catch (err) {
            if (isAbortError(err)) throw err;
        }
    }

    return {
        cursor: searchData.cursor || "",
        requestedCursor: cursor || "",
        batchStartIndex: safeBatchStartIndex,
        batchCandidateCount: items.length,
        inspectedCandidateCount: safeBatchStartIndex + items.length,
        hasMoreArchivePages: Boolean(searchData.cursor),
        page: searchData.page || getArchivePageFromCursor(cursor),
        totalArchiveCandidates: searchData.numFound || safeBatchStartIndex + items.length,
        archiveQuery: searchData.archiveQuery,
        results: dedupeArchiveResults(results),
    };
}

function makeArchiveResultKey(item = {}) {
    return String(item?.identifier || item?.detailsUrl || item?.title || "");
}

function makeArchiveFileKey(file = {}) {
    return String(file?.downloadUrl || file?.url || file?.directDownloadUrl || file?.name || "");
}

function makeArchiveImageKey(image = {}) {
    return String(image?.imageUrl || image?.url || image?.directUrl || image?.name || "");
}

function dedupeArchiveImages(images = []) {
    const seen = new Set();
    const uniqueImages = [];

    for (const image of Array.isArray(images) ? images : []) {
        const key = makeArchiveImageKey(image);
        if (!key || seen.has(key)) continue;

        seen.add(key);
        uniqueImages.push(image);
    }

    return uniqueImages;
}

function dedupeArchiveFiles(files = []) {
    const seen = new Set();
    const uniqueFiles = [];

    for (const file of Array.isArray(files) ? files : []) {
        const key = makeArchiveFileKey(file);
        if (!key || seen.has(key)) continue;

        seen.add(key);
        uniqueFiles.push(file);
    }

    return uniqueFiles;
}

function dedupeArchiveResults(items = []) {
    const seen = new Set();
    const uniqueItems = [];

    for (const item of Array.isArray(items) ? items : []) {
        const key = makeArchiveResultKey(item);
        if (!key || seen.has(key)) continue;

        seen.add(key);
        uniqueItems.push({
            ...item,
            images: dedupeArchiveImages(item.images),
            files: dedupeArchiveFiles(item.files),
        });
    }

    return uniqueItems;
}

function stampArchiveResults(items = [], searchSignature = "") {
    return dedupeArchiveResults(items).map((item) => ({
        ...item,
        searchSignature,
        queryMatched: item.queryMatched !== false,
        images: dedupeArchiveImages(item.images).map((image) => ({
            ...image,
            searchSignature,
        })),
        files: dedupeArchiveFiles(item.files).map((file) => ({
            ...file,
            searchSignature,
        })),
    }));
}

function mergeArchiveResults(current = [], incoming = []) {
    return dedupeArchiveResults([...current, ...incoming]);
}

function countMatchingResultsForSignature(items = [], searchSignature = "") {
    return (Array.isArray(items) ? items : []).filter((item) => {
        if (searchSignature && item.searchSignature !== searchSignature) return false;
        return item.queryMatched !== false;
    }).length;
}

function getDefaultSession() {
    return {
        query: "public domain report",
        selectedCollections: DEFAULT_SELECTED_COLLECTIONS,
        customCollections: [],
        customCollectionInput: "",
        useArchiveProxy: readArchiveProxySetting(),
        nextCursor: "",
        status: "",
        error: "",
        loading: false,
        lastSearchSignature: "",
        lastSubmittedSearch: {
            query: "",
            selectedCollections: DEFAULT_SELECTED_COLLECTIONS,
            useArchiveProxy: readArchiveProxySetting(),
            cursor: "",
            signature: "",
            loadedCandidateCount: 0,
            batchCount: 0,
        },
        activeSearch: null,
        savedAt: "",
    };
}

function sanitizeSavedSession(value) {
    const fallback = getDefaultSession();
    const parsed = value && typeof value === "object" ? value : {};
    const selectedCollections = normalizeCollectionIds(parsed.selectedCollections);
    const lastSubmittedSearch =
        parsed.lastSubmittedSearch && typeof parsed.lastSubmittedSearch === "object"
            ? parsed.lastSubmittedSearch
            : fallback.lastSubmittedSearch;
    const nextQuery = String(parsed.query || fallback.query);
    const nextSelectedCollections = selectedCollections.length
        ? selectedCollections
        : fallback.selectedCollections;
    const nextUseArchiveProxy = Boolean(parsed.useArchiveProxy);
    const nextSignature = buildSearchSignature(
        nextQuery,
        nextSelectedCollections,
        nextUseArchiveProxy
    );
    const savedSubmittedSignature = String(lastSubmittedSearch.signature || "");
    const savedSignatureIsCurrent =
        savedSubmittedSignature && savedSubmittedSignature === nextSignature;

    return {
        ...fallback,
        query: nextQuery,
        selectedCollections: nextSelectedCollections,
        customCollections: normalizeCollectionIds(parsed.customCollections),
        customCollectionInput: String(parsed.customCollectionInput || ""),
        useArchiveProxy: nextUseArchiveProxy,
        nextCursor: "",
        status: "",
        error: "",
        loading: false,
        lastSearchSignature: "",
        lastSubmittedSearch: {
            query: savedSignatureIsCurrent ? String(lastSubmittedSearch.query || "") : "",
            selectedCollections:
                savedSignatureIsCurrent && Array.isArray(lastSubmittedSearch.selectedCollections)
                    ? normalizeCollectionIds(lastSubmittedSearch.selectedCollections)
                    : nextSelectedCollections,
            useArchiveProxy: savedSignatureIsCurrent
                ? Boolean(lastSubmittedSearch.useArchiveProxy)
                : nextUseArchiveProxy,
            cursor: "",
            signature: savedSignatureIsCurrent ? savedSubmittedSignature : "",
            loadedCandidateCount: 0,
            batchCount: 0,
        },
        activeSearch: null,
        savedAt: String(parsed.savedAt || ""),
    };
}

function readBrowserSession() {
    return sanitizeSavedSession(readJsonStorage(ARCHIVE_BROWSER_STORAGE_KEY, {}));
}

function writeBrowserSession(session) {
    return writeJsonStorage(
        ARCHIVE_BROWSER_STORAGE_KEY,
        sanitizeSavedSession({
            ...session,
            savedAt: new Date().toISOString(),
        })
    );
}

function clearBrowserSession() {
    if (typeof window === "undefined" || !window.localStorage) return false;

    try {
        window.localStorage.removeItem(ARCHIVE_BROWSER_STORAGE_KEY);
        return true;
    } catch {
        return false;
    }
}

const ArchiveDocumentFileRow = React.memo(function ArchiveDocumentFileRow({
                                                                              file,
                                                                              onCopyText,
                                                                          }) {
    const initialUrl = file.downloadUrl || file.url || file.directDownloadUrl || "";
    const fallbackUrl =
        file.fallbackDownloadUrl && file.fallbackDownloadUrl !== initialUrl
            ? file.fallbackDownloadUrl
            : "";
    const [activeUrl, setActiveUrl] = useState(initialUrl);
    const [usedFallback, setUsedFallback] = useState(false);

    useEffect(() => {
        setActiveUrl(initialUrl);
        setUsedFallback(false);
    }, [initialUrl]);

    function switchToFallback() {
        if (!fallbackUrl || activeUrl === fallbackUrl) return;

        setActiveUrl(fallbackUrl);
        setUsedFallback(true);
    }

    return (
        <Box
            sx={{
                ...SOFT_CARD_SX,
                p: 1.5,
                borderRadius: 3,
            }}
        >
            <Stack spacing={1}>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                >
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
                        {getDocumentIcon(file.kind)}

                        <Box sx={{ minWidth: 0 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 900,
                                    wordBreak: "break-word",
                                }}
                            >
                                {file.name}
                            </Typography>

                            <Typography variant="caption" color="text.secondary">
                                {getFileLabel(file)}
                                {file.proxied ? " - proxied" : ""}
                                {usedFallback ? " - fallback proxy active" : ""}
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Chip size="small" label={file.kind || "Document"} color="primary" />
                        {fallbackUrl && !usedFallback && (
                            <Chip size="small" label="proxy fallback ready" color="warning" />
                        )}
                        {usedFallback && (
                            <Chip size="small" label="using proxy fallback" color="success" />
                        )}
                    </Stack>
                </Stack>

                {file.kind === "PDF" && (
                    <Box
                        component="iframe"
                        title={file.name}
                        src={activeUrl}
                        loading="lazy"
                        onError={switchToFallback}
                        sx={{
                            width: "100%",
                            height: { xs: 280, md: 420 },
                            border: "1px solid rgba(255,255,255,.12)",
                            borderRadius: 2,
                            bgcolor: "rgba(0,0,0,.22)",
                        }}
                    />
                )}

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                    <Button
                        href={activeUrl}
                        target="_blank"
                        rel="noreferrer"
                        size="small"
                        variant="outlined"
                        endIcon={<OpenInNewRoundedIcon />}
                    >
                        Open document
                    </Button>

                    <Button
                        href={activeUrl}
                        target="_blank"
                        rel="noreferrer"
                        download
                        size="small"
                        variant="outlined"
                        startIcon={<FileDownloadRoundedIcon />}
                    >
                        Download
                    </Button>

                    <Button
                        type="button"
                        size="small"
                        variant="text"
                        startIcon={<ContentCopyRoundedIcon />}
                        onClick={() => onCopyText(activeUrl)}
                    >
                        Copy link
                    </Button>

                    {fallbackUrl && activeUrl !== fallbackUrl && (
                        <Button
                            type="button"
                            size="small"
                            variant="contained"
                            color="warning"
                            onClick={switchToFallback}
                        >
                            Use proxy fallback
                        </Button>
                    )}

                </Stack>
            </Stack>
        </Box>
    );
});

const ArchiveDocumentResultCard = React.memo(function ArchiveDocumentResultCard({
                                                                                    item,
                                                                                    visibleFileLimit,
                                                                                    offQuery = false,
                                                                                    onShowMoreFiles,
                                                                                    onShowAllFiles,
                                                                                    onCollapseFiles,
                                                                                    onCopyText,
                                                                                }) {
    const files = Array.isArray(item.files) ? item.files : [];
    const visibleFiles = files.slice(0, visibleFileLimit);
    const hiddenFileCount = Math.max(files.length - visibleFiles.length, 0);

    return (
        <Card
            variant="outlined"
            sx={{
                ...GLASS_CARD_SX,
                borderRadius: 4,
                overflow: "hidden",
                borderColor: offQuery ? "warning.main" : "divider",
                opacity: offQuery ? 0.9 : 1,
            }}
        >
            <CardContent>
                <Stack spacing={1.5}>
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={1}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", md: "center" }}
                    >
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 950 }}>
                                {item.title}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {item.creator || "Unknown creator"}
                                {item.date ? ` - ${item.date}` : ""}
                                {item.downloads ? ` - ${item.downloads} downloads` : ""}
                            </Typography>

                            <Typography variant="caption" color="text.secondary">
                                Loaded {files.length} office/document file(s) from this Archive item.
                                {hiddenFileCount
                                    ? ` Showing ${visibleFiles.length} right now for smoother rendering.`
                                    : ""}
                            </Typography>

                            {offQuery && (
                                <Typography
                                    variant="caption"
                                    color="warning.main"
                                    sx={{ display: "block", mt: 0.5 }}
                                >
                                    This item did not strongly match the current query in title,
                                    creator, identifier, subject, or file names.
                                </Typography>
                            )}
                        </Box>

                        <Button
                            href={item.detailsUrl}
                            target="_blank"
                            rel="noreferrer"
                            endIcon={<OpenInNewRoundedIcon />}
                        >
                            Archive page
                        </Button>
                    </Stack>

                    {!!item.images?.[0] && (
                        <Card
                            variant="outlined"
                            sx={{
                                ...SOFT_CARD_SX,
                                borderRadius: 3,
                                overflow: "hidden",
                            }}
                        >
                            <Box
                                component="img"
                                src={item.images[0].imageUrl || item.images[0].url}
                                alt={item.images[0].alt || `${item.title} Archive thumbnail`}
                                loading="lazy"
                                decoding="async"
                                referrerPolicy="no-referrer"
                                onError={(event) => {
                                    event.currentTarget.style.display = "none";
                                }}
                                sx={{
                                    width: "100%",
                                    height: { xs: 180, sm: 240 },
                                    objectFit: "contain",
                                    objectPosition: "center",
                                    display: "block",
                                    bgcolor: "rgba(0,0,0,.22)",
                                }}
                            />
                        </Card>
                    )}

                    {item.description && (
                        <Typography variant="body2" color="text.secondary">
                            {item.description}
                        </Typography>
                    )}

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {(Array.isArray(item.collection) ? item.collection : [])
                            .slice(0, 8)
                            .map((collection) => (
                                <Chip key={collection} label={collection} size="small" />
                            ))}
                    </Stack>

                    <Divider />

                    <Stack spacing={1.5}>
                        {visibleFiles.map((file) => (
                            <ArchiveDocumentFileRow
                                key={file.downloadUrl || file.url || file.name}
                                file={file}
                                onCopyText={onCopyText}
                            />
                        ))}

                        {hiddenFileCount > 0 && (
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                                <Button
                                    type="button"
                                    size="small"
                                    variant="outlined"
                                    onClick={() => onShowMoreFiles(item.identifier)}
                                >
                                    Show {Math.min(ARCHIVE_FILE_BATCH_SIZE, hiddenFileCount)} more files
                                </Button>

                                <Button
                                    type="button"
                                    size="small"
                                    variant="text"
                                    onClick={() => onShowAllFiles(item.identifier)}
                                >
                                    Show all {files.length} files
                                </Button>
                            </Stack>
                        )}

                        {visibleFiles.length > ARCHIVE_INITIAL_VISIBLE_FILES_PER_ITEM && (
                            <Button
                                type="button"
                                size="small"
                                variant="text"
                                onClick={() => onCollapseFiles(item.identifier)}
                                sx={{ alignSelf: "flex-start" }}
                            >
                                Collapse file list
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
});

export default function Archive() {
    const restoredSessionRef = useRef(null);

    if (restoredSessionRef.current === null) {
        restoredSessionRef.current = readBrowserSession();
    }

    const restoredSession = restoredSessionRef.current;

    const [query, setQuery] = useState(restoredSession.query || "public domain report");
    const [results, setResults] = useState([]);
    const [nextCursor, setNextCursor] = useState(restoredSession.nextCursor || "");
    const [status, setStatus] = useState(restoredSession.status || "");
    const [error, setError] = useState(restoredSession.error || "");
    const [loading, setLoading] = useState(false);
    const [selectedCollections, setSelectedCollections] = useState(
        normalizeCollectionIds(
            restoredSession.selectedCollections || DEFAULT_SELECTED_COLLECTIONS
        )
    );
    const [customCollections, setCustomCollections] = useState(
        normalizeCollectionIds(restoredSession.customCollections)
    );
    const [customCollectionInput, setCustomCollectionInput] = useState(
        restoredSession.customCollectionInput || ""
    );
    const [useArchiveProxy, setUseArchiveProxy] = useState(
        Boolean(restoredSession.useArchiveProxy)
    );
    const [copiedUrl, setCopiedUrl] = useState("");
    const [activeSearch, setActiveSearch] = useState(null);
    const [visibleResultLimit, setVisibleResultLimit] = useState(
        ARCHIVE_VISIBLE_RESULT_BATCH_SIZE
    );
    const [expandedFileLimits, setExpandedFileLimits] = useState({});
    const [showOffQueryResults, setShowOffQueryResults] = useState(false);
    const [lastSearchSignature, setLastSearchSignature] = useState(
        restoredSession.lastSearchSignature || ""
    );

    const searchRunRef = useRef(0);
    const abortControllerRef = useRef(null);
    const sessionSaveTimerRef = useRef(null);
    const latestSearchInputRef = useRef({
        query: restoredSession.query || "public domain report",
        selectedCollections:
            restoredSession.selectedCollections || DEFAULT_SELECTED_COLLECTIONS,
        customCollections: restoredSession.customCollections || [],
        customCollectionInput: restoredSession.customCollectionInput || "",
        useArchiveProxy: Boolean(restoredSession.useArchiveProxy),
    });
    const browserSessionRef = useRef(restoredSession);
    const lastSubmittedSearchRef = useRef({
        ...(restoredSession.lastSubmittedSearch || {}),
        query: restoredSession.lastSubmittedSearch?.query || "",
        selectedCollections:
            restoredSession.lastSubmittedSearch?.selectedCollections ||
            restoredSession.selectedCollections ||
            DEFAULT_SELECTED_COLLECTIONS,
        useArchiveProxy: Boolean(restoredSession.lastSubmittedSearch?.useArchiveProxy),
        cursor: restoredSession.lastSubmittedSearch?.cursor || "",
        signature: restoredSession.lastSubmittedSearch?.signature || "",
        loadedCandidateCount: Number(
            restoredSession.lastSubmittedSearch?.loadedCandidateCount || 0
        ),
        batchCount: Number(restoredSession.lastSubmittedSearch?.batchCount || 0),
    });

    const currentSearchSignature = useMemo(() => {
        return buildSearchSignature(query, selectedCollections, useArchiveProxy);
    }, [query, selectedCollections, useArchiveProxy]);

    const hasUnsubmittedSearchChanges = useMemo(() => {
        return Boolean(
            lastSearchSignature && currentSearchSignature !== lastSearchSignature
        );
    }, [currentSearchSignature, lastSearchSignature]);

    const activeResults = useMemo(() => {
        if (!lastSearchSignature) return results;
        return results.filter((item) => item.searchSignature === lastSearchSignature);
    }, [results, lastSearchSignature]);

    const matchingResults = useMemo(() => {
        return activeResults.filter((item) => item.queryMatched !== false);
    }, [activeResults]);

    const offQueryResults = useMemo(() => {
        return activeResults.filter((item) => item.queryMatched === false);
    }, [activeResults]);

    const visibleMatchingResults = useMemo(() => {
        return matchingResults.slice(0, visibleResultLimit);
    }, [matchingResults, visibleResultLimit]);

    const totalDocumentFiles = useMemo(() => {
        return activeResults.reduce((total, item) => {
            return total + (Array.isArray(item.files) ? item.files.length : 0);
        }, 0);
    }, [activeResults]);

    const selectedCollectionSet = useMemo(() => {
        return new Set(selectedCollections);
    }, [selectedCollections]);

    const nextLoadStart = Math.max(
        1,
        Number(lastSubmittedSearchRef.current?.loadedCandidateCount || 0) + 1
    );
    const nextLoadEnd = nextLoadStart + ARCHIVE_SEARCH_BATCH_SIZE - 1;

    const archiveQueryPreview = useMemo(() => {
        const safeQuery = getSterileArchiveQuery(query);
        if (!safeQuery || !selectedCollections.length) return "";
        return buildArchiveSearchQuery(safeQuery, selectedCollections);
    }, [query, selectedCollections]);

    useEffect(() => {
        latestSearchInputRef.current = {
            query,
            selectedCollections: [...selectedCollections],
            customCollections: [...customCollections],
            customCollectionInput,
            useArchiveProxy,
        };
    }, [query, selectedCollections, customCollections, customCollectionInput, useArchiveProxy]);

    useEffect(() => {
        const snapshot = {
            query,
            selectedCollections: [...selectedCollections],
            customCollections: [...customCollections],
            customCollectionInput,
            useArchiveProxy,
            nextCursor,
            status,
            error,
            loading,
            lastSearchSignature,
            lastSubmittedSearch: lastSubmittedSearchRef.current,
            activeSearch,
        };

        browserSessionRef.current = snapshot;
        scheduleBrowserSessionWrite(snapshot);
    }, [
        query,
        selectedCollections,
        customCollections,
        customCollectionInput,
        useArchiveProxy,
        nextCursor,
        status,
        error,
        loading,
        lastSearchSignature,
        activeSearch,
    ]);

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();

            if (sessionSaveTimerRef.current) {
                window.clearTimeout(sessionSaveTimerRef.current);
            }
        };
    }, []);

    function scheduleBrowserSessionWrite(snapshot, delay = 300) {
        if (typeof window === "undefined") {
            writeBrowserSession(snapshot);
            return;
        }

        if (sessionSaveTimerRef.current) {
            window.clearTimeout(sessionSaveTimerRef.current);
        }

        sessionSaveTimerRef.current = window.setTimeout(() => {
            sessionSaveTimerRef.current = null;
            writeBrowserSession(snapshot);
        }, delay);
    }

    function resetRenderWindows() {
        setVisibleResultLimit(ARCHIVE_VISIBLE_RESULT_BATCH_SIZE);
        setExpandedFileLimits({});
        setShowOffQueryResults(false);
    }

    function stopActiveSearchAndClearResults(nextStatus = "") {
        abortControllerRef.current?.abort();
        searchRunRef.current += 1;

        lastSubmittedSearchRef.current = {
            query: "",
            selectedCollections: [...selectedCollections],
            useArchiveProxy,
            cursor: "",
            signature: "",
            loadedCandidateCount: 0,
            batchCount: 0,
        };

        setLoading(false);
        setResults([]);
        setNextCursor("");
        setLastSearchSignature("");
        setCopiedUrl("");
        setActiveSearch(null);
        resetRenderWindows();
        clearBrowserSession();
        setStatus(nextStatus || "");
    }

    function stopActiveSearchAndKeepResults(nextStatus = "") {
        abortControllerRef.current?.abort();
        searchRunRef.current += 1;

        setLoading(false);
        setNextCursor("");
        setCopiedUrl("");
        setActiveSearch(null);
        setStatus(nextStatus || "");
    }

    function getVisibleFileLimit(item) {
        return (
            expandedFileLimits[item.identifier] ||
            ARCHIVE_INITIAL_VISIBLE_FILES_PER_ITEM
        );
    }

    function showMoreFilesForItem(identifier) {
        setExpandedFileLimits((current) => ({
            ...current,
            [identifier]:
                (current[identifier] || ARCHIVE_INITIAL_VISIBLE_FILES_PER_ITEM) +
                ARCHIVE_FILE_BATCH_SIZE,
        }));
    }

    function showAllFilesForItem(identifier) {
        const item = activeResults.find((result) => result.identifier === identifier);
        const fileCount = Array.isArray(item?.files) ? item.files.length : 0;

        setExpandedFileLimits((current) => ({
            ...current,
            [identifier]: Math.max(fileCount, ARCHIVE_INITIAL_VISIBLE_FILES_PER_ITEM),
        }));
    }

    function collapseFilesForItem(identifier) {
        setExpandedFileLimits((current) => ({
            ...current,
            [identifier]: ARCHIVE_INITIAL_VISIBLE_FILES_PER_ITEM,
        }));
    }

    function handleQueryChange(event) {
        const nextQuery = event.target.value;

        setQuery(nextQuery);
        setError("");
        stopActiveSearchAndKeepResults(
            nextQuery.trim()
                ? "New query typed. Press Search Archive Documents when ready."
                : ""
        );
    }

    function toggleCollection(collectionId) {
        const safeId = sanitizeCollectionId(collectionId);
        if (!safeId) return;

        const nextSelected = selectedCollections.includes(safeId)
            ? selectedCollections.filter((id) => id !== safeId)
            : normalizeCollectionIds([...selectedCollections, safeId]);

        setSelectedCollections(nextSelected);
        stopActiveSearchAndKeepResults(
            `Collection filters changed. The next query will include ${nextSelected.length} collection filter(s).`
        );
    }

    function addCustomCollection(event) {
        event?.preventDefault?.();
        event?.stopPropagation?.();

        const safeId = sanitizeCollectionId(customCollectionInput);

        if (!safeId) {
            setError("Enter an Archive collection ID like texts, manuals, or magazine_rack.");
            return;
        }

        const nextCustomCollections = normalizeCollectionIds([
            ...customCollections,
            safeId,
        ]);
        const nextSelectedCollections = normalizeCollectionIds([
            ...selectedCollections,
            safeId,
        ]);

        setCustomCollections(nextCustomCollections);
        setSelectedCollections(nextSelectedCollections);
        setCustomCollectionInput("");
        setError("");
        stopActiveSearchAndKeepResults(
            `Added custom collection "${safeId}" and checked it for the next Archive document query.`
        );
    }

    function removeCustomCollection(collectionId) {
        const safeId = sanitizeCollectionId(collectionId);

        setCustomCollections((current) =>
            normalizeCollectionIds(current).filter((id) => id !== safeId)
        );
        setSelectedCollections((current) =>
            normalizeCollectionIds(current).filter((id) => id !== safeId)
        );
        stopActiveSearchAndKeepResults(
            `Removed custom collection "${safeId}". Press Search Archive Documents when ready.`
        );
    }

    function resetCollections() {
        setSelectedCollections(DEFAULT_SELECTED_COLLECTIONS);
        stopActiveSearchAndKeepResults(
            "Collection filters reset. Press Search Archive Documents when ready."
        );
    }

    function handleArchiveProxyChange(event) {
        const enabled = event.target.checked;

        setUseArchiveProxy(enabled);
        writeArchiveProxySetting(enabled);
        stopActiveSearchAndKeepResults(
            enabled
                ? "Archive proxy enabled. Press Search Archive Documents when ready."
                : "Archive proxy disabled. Press Search Archive Documents when ready."
        );
    }

    async function copyText(value) {
        try {
            await navigator.clipboard.writeText(value);
            setCopiedUrl(value);
            window.setTimeout(() => setCopiedUrl(""), 1400);
        } catch {
            setError("Could not copy to clipboard in this browser.");
        }
    }

    async function runSearch(loadMore = false, options = {}) {
        const isLoadMore = Boolean(loadMore);
        const keepExistingResults = Boolean(options.keepExistingResults);
        const submittedSearch = lastSubmittedSearchRef.current;
        const visibleSignature = buildSearchSignature(
            query,
            selectedCollections,
            useArchiveProxy
        );

        if (isLoadMore && submittedSearch.signature !== visibleSignature) {
            setNextCursor("");
            setError("");
            setStatus(
                "Search input changed. Press Search Archive Documents to start a fresh search instead of reusing an old cursor."
            );
            return;
        }

        const searchSource = isLoadMore
            ? submittedSearch
            : {
                query,
                selectedCollections: [...selectedCollections],
                useArchiveProxy,
                cursor: "",
                loadedCandidateCount: 0,
                batchCount: 0,
                signature: visibleSignature,
            };
        const queryForRequest = searchSource.query;
        const collectionsForRequest = normalizeCollectionIds(searchSource.selectedCollections);
        const proxyForRequest = Boolean(searchSource.useArchiveProxy);
        const cursorForRequest = isLoadMore ? searchSource.cursor || nextCursor || "" : "";
        const batchStartIndex = isLoadMore
            ? Math.max(0, Number(searchSource.loadedCandidateCount || 0))
            : 0;
        const currentBatchCount = Math.max(0, Number(searchSource.batchCount || 0));
        const safeQuery = getSterileArchiveQuery(queryForRequest);
        const requestSignature = buildSearchSignature(
            queryForRequest,
            collectionsForRequest,
            proxyForRequest
        );
        const archiveRouteLabel = proxyForRequest
            ? " through scrapewebsite /api/archiveproxy"
            : " directly from Archive.org";

        if (!safeQuery) {
            setError("Type a search query first.");
            setStatus("");
            return;
        }

        if (!collectionsForRequest.length) {
            setError("Choose at least one Archive collection or add a custom collection ID.");
            setStatus("");
            return;
        }

        if (isLoadMore && !cursorForRequest) {
            setError("");
            setStatus(
                "No more Archive document pages are available for this search. Run a fresh search or change the query to fetch a different set."
            );
            return;
        }

        const searchId = searchRunRef.current + 1;
        searchRunRef.current = searchId;
        abortControllerRef.current?.abort();

        const controller = new AbortController();
        abortControllerRef.current = controller;
        const activeSearchSnapshot = {
            isLoadMore,
            keepExistingResults,
            safeQuery,
            routeLabel: archiveRouteLabel,
            startedAt: new Date().toISOString(),
        };

        lastSubmittedSearchRef.current = {
            query: queryForRequest,
            selectedCollections: collectionsForRequest,
            useArchiveProxy: proxyForRequest,
            cursor: cursorForRequest,
            loadedCandidateCount: batchStartIndex,
            batchCount: currentBatchCount,
            signature: requestSignature,
        };

        try {
            setLoading(true);
            setActiveSearch(activeSearchSnapshot);
            setLastSearchSignature(requestSignature);
            setError("");
            setCopiedUrl("");

            if (!isLoadMore && !keepExistingResults) {
                resetRenderWindows();
                setResults([]);
                setNextCursor("");
            }

            setStatus(
                isLoadMore
                    ? `Loading Archive document candidates ${batchStartIndex + 1}-${batchStartIndex + ARCHIVE_SEARCH_BATCH_SIZE} for "${safeQuery}" from ${collectionsForRequest.length} collection filter(s)${archiveRouteLabel}...`
                    : `Searching Archive documents for "${safeQuery}" in ${collectionsForRequest.length} selected collection filter(s)${archiveRouteLabel}...`
            );

            const handleIncrementalResult = (result, progress = {}) => {
                if (controller.signal.aborted || searchId !== searchRunRef.current) return;

                const stampedResult = stampArchiveResults([result], requestSignature);
                if (!stampedResult.length) return;

                const progressBatchStart = Math.max(
                    0,
                    Number(progress.batchStartIndex || 0)
                );
                const progressInspected = Math.max(
                    progressBatchStart,
                    Number(progress.inspected || progress.accepted || 0)
                );
                const progressTotal = Math.max(
                    progressInspected,
                    Number(progress.totalCandidates || progressInspected)
                );

                setResults((current) => {
                    return isLoadMore || keepExistingResults
                        ? mergeArchiveResults(current, stampedResult)
                        : mergeArchiveResults(
                            current.filter(
                                (item) => item.searchSignature === requestSignature
                            ),
                            stampedResult
                        );
                });

                setStatus(
                    `Loaded ${progress.accepted || 1} Archive document item(s) for "${safeQuery}"; inspected candidates ${progressBatchStart + 1}-${progressInspected} of at least ${progressTotal}.`
                );
            };

            const directData = !isLoadMore
                ? await loadDirectArchiveDocumentLinks({
                    query: queryForRequest,
                    selectedCollections: collectionsForRequest,
                    signal: controller.signal,
                    useArchiveProxy: proxyForRequest,
                    onResult: handleIncrementalResult,
                })
                : null;

            const data = directData?.results?.length
                ? directData
                : await searchArchiveDocuments({
                    query: queryForRequest,
                    cursor: cursorForRequest,
                    batchStartIndex,
                    selectedCollections: collectionsForRequest,
                    signal: controller.signal,
                    useArchiveProxy: proxyForRequest,
                    onResult: handleIncrementalResult,
                });

            if (controller.signal.aborted || searchId !== searchRunRef.current) return;

            if (!isLoadMore) {
                const latestInput = latestSearchInputRef.current;
                const latestSignature = buildSearchSignature(
                    latestInput.query,
                    latestInput.selectedCollections,
                    latestInput.useArchiveProxy
                );

                if (requestSignature !== latestSignature) return;
            }

            const incomingResults = stampArchiveResults(
                Array.isArray(data.results) ? data.results : [],
                requestSignature
            );
            const nextCursorValue = data.cursor || "";
            const nextLoadedCandidateCount = data.directLinkMode
                ? 0
                : Number(
                    data.inspectedCandidateCount ??
                    batchStartIndex + Number(data.batchCandidateCount || 0)
                );
            const nextBatchCount = data.directLinkMode ? 0 : currentBatchCount + 1;

            lastSubmittedSearchRef.current = {
                query: queryForRequest,
                selectedCollections: collectionsForRequest,
                useArchiveProxy: proxyForRequest,
                cursor: nextCursorValue,
                loadedCandidateCount: nextLoadedCandidateCount,
                batchCount: nextBatchCount,
                signature: requestSignature,
            };

            setLastSearchSignature(requestSignature);
            setNextCursor(nextCursorValue);

            setResults((current) => {
                let nextResults;

                if (data.directLinkMode && !isLoadMore && !keepExistingResults) {
                    nextResults = incomingResults;
                } else if (isLoadMore || keepExistingResults) {
                    nextResults = mergeArchiveResults(current, incomingResults);
                } else {
                    nextResults = incomingResults;
                }

                if (isLoadMore && incomingResults.length) {
                    const nextMatchingCount = countMatchingResultsForSignature(
                        nextResults,
                        requestSignature
                    );
                    const incomingMatchingCount = countMatchingResultsForSignature(
                        incomingResults,
                        requestSignature
                    );

                    if (incomingMatchingCount > 0) {
                        setVisibleResultLimit((currentLimit) =>
                            Math.max(currentLimit, nextMatchingCount)
                        );
                    } else {
                        setShowOffQueryResults(true);
                    }
                }

                return nextResults;
            });

            setStatus(
                data.directLinkMode
                    ? `Loaded ${incomingResults.length} direct Archive document item(s)${archiveRouteLabel}.`
                    : incomingResults.length
                        ? isLoadMore
                            ? `Added ${incomingResults.length} more Archive document item(s) from candidates ${batchStartIndex + 1}-${nextLoadedCandidateCount} using ${collectionsForRequest.length} selected collection filter(s)${archiveRouteLabel}. ${nextCursorValue ? "Load More will fetch the next 100-candidate page." : "Archive did not return another page, so this is the last page for now."}`
                            : `Found ${incomingResults.length} Archive document item(s) from the first ${nextLoadedCandidateCount || ARCHIVE_SEARCH_BATCH_SIZE} candidates using ${collectionsForRequest.length} selected collection filter(s)${archiveRouteLabel}.`
                        : nextCursorValue
                            ? `No document files found in candidates ${batchStartIndex + 1}-${nextLoadedCandidateCount} for "${safeQuery}" using the selected collection filters${archiveRouteLabel}. Press Load More to fetch the next 100-candidate page.`
                            : `No Archive PDF, Word, PowerPoint, spreadsheet, or text files found for "${safeQuery}" using the selected collection filters${archiveRouteLabel}.`
            );
        } catch (err) {
            if (isAbortError(err)) return;
            if (searchId !== searchRunRef.current) return;

            setError(err?.message || "Archive document search failed.");
            setStatus("");

            if (!isLoadMore && !keepExistingResults) {
                setResults([]);
                setNextCursor("");
            }
        } finally {
            if (searchId === searchRunRef.current) {
                setLoading(false);
                setActiveSearch(null);

                if (abortControllerRef.current === controller) {
                    abortControllerRef.current = null;
                }
            }
        }
    }

    function clearResults() {
        stopActiveSearchAndClearResults("Results cleared.");
        setError("");

        lastSubmittedSearchRef.current = {
            query: "",
            selectedCollections: [...selectedCollections],
            useArchiveProxy,
            cursor: "",
            loadedCandidateCount: 0,
            batchCount: 0,
            signature: "",
        };
    }

    function preventPageRefresh(event) {
        event?.preventDefault?.();
        event?.stopPropagation?.();
    }

    function handleSearchSubmit(event) {
        preventPageRefresh(event);
        runSearch(false);
    }

    function handleSearchButtonClick(event) {
        preventPageRefresh(event);
        runSearch(false);
    }

    function handleLoadMoreButtonClick(event) {
        preventPageRefresh(event);
        runSearch(true);
    }

    return (
        <GradientPage>
            <HelmetHeader
                title="Archive Documents"
                path="/archive"
                description="Search Archive.org document collections for PDFs, Word files, PowerPoint files, spreadsheets, CSV files, EPUBs, and text documents directly in OfficeSuiteLab."
                keywords="Archive documents, PDF archive search, DOCX archive search, PowerPoint archive search, spreadsheet archive search, OfficeSuiteLab archive"
            />
            <AppNavBar />

            <Box
                component="main"
                sx={{
                    width: "100%",
                    maxWidth: 1240,
                    mx: "auto",
                    px: { xs: 2, md: 4 },
                    py: { xs: 3, md: 5 },
                }}
                onSubmit={preventPageRefresh}
            >
                <Stack spacing={3}>
                    <Box>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <LibraryBooksRoundedIcon color="primary" />
                            <Typography variant="h3" sx={{ fontWeight: 950 }}>
                                Archive Documents
                            </Typography>
                        </Stack>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ maxWidth: 900, mt: 1 }}
                        >
                            Search Archive.org for browser-friendly office documents:
                            PDFs, Word files, PowerPoint files, spreadsheets, CSVs, EPUBs,
                            text files, manuals, reports, books, and public-domain scans.
                        </Typography>
                    </Box>

                    <Alert severity="info">
                        This page uses Archive.org public JSON endpoints from the browser. It only
                        lists document-style files and does not verify copyright or license status.
                        Check rights before redistributing any file.
                    </Alert>

                    <Card
                        sx={{
                            ...GLASS_CARD_SX,
                        }}
                    >
                        <CardContent component="form" noValidate onSubmit={handleSearchSubmit}>
                            <Stack spacing={2.5}>
                                <TextField
                                    label="Search Archive documents"
                                    value={query}
                                    onChange={handleQueryChange}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            preventPageRefresh(event);
                                            runSearch(false);
                                        }
                                    }}
                                    placeholder="public domain report, business template, manuals, spreadsheet, presentation..."
                                    fullWidth
                                    helperText="Search for document topics. Results are filtered to PDF, DOC/DOCX, PPT/PPTX, XLS/XLSX, CSV, EPUB, and text-style files."
                                    inputProps={{
                                        enterKeyHint: "search",
                                        autoComplete: "off",
                                    }}
                                />

                                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        size="large"
                                        startIcon={
                                            loading ? (
                                                <CircularProgress size={18} color="inherit" />
                                            ) : (
                                                <SearchRoundedIcon />
                                            )
                                        }
                                        disabled={loading}
                                        onClick={handleSearchButtonClick}
                                    >
                                        Search Archive Documents
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outlined"
                                        size="large"
                                        disabled={loading || !nextCursor || hasUnsubmittedSearchChanges}
                                        onClick={handleLoadMoreButtonClick}
                                    >
                                        {nextCursor
                                            ? `Load More ${nextLoadStart}-${nextLoadEnd}`
                                            : "No More Pages"}
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="text"
                                        size="large"
                                        startIcon={<RestartAltRoundedIcon />}
                                        disabled={loading}
                                        onClick={clearResults}
                                    >
                                        Clear
                                    </Button>
                                </Stack>

                                {!!archiveQueryPreview && (
                                    <Alert severity="success">
                                        Archive query includes {selectedCollections.length} selected collection
                                        filter(s): {selectedCollections.join(", ")}
                                    </Alert>
                                )}

                                <Divider />

                                <Box>
                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        spacing={1}
                                        justifyContent="space-between"
                                        alignItems={{ xs: "flex-start", sm: "center" }}
                                        sx={{ mb: 1 }}
                                    >
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                                Document collection filters
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Checked collections are added directly to the Archive query as
                                                collection filters.
                                            </Typography>
                                        </Box>

                                        <Button type="button" size="small" onClick={resetCollections}>
                                            Reset collections
                                        </Button>
                                    </Stack>

                                    <Grid container spacing={1}>
                                        {OFFICE_COLLECTION_OPTIONS.map((collection) => {
                                            const checked = selectedCollectionSet.has(collection.id);

                                            return (
                                                <Grid item xs={12} sm={6} md={4} key={collection.id}>
                                                    <Card
                                                        variant="outlined"
                                                        sx={{
                                                            ...SOFT_CARD_SX,
                                                            borderRadius: 3,
                                                            height: "100%",
                                                            opacity: checked ? 1 : 0.68,
                                                            borderColor: checked ? "primary.main" : "divider",
                                                        }}
                                                    >
                                                        <CardContent sx={{ py: 1.5 }}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={checked}
                                                                        onChange={() => toggleCollection(collection.id)}
                                                                    />
                                                                }
                                                                label={
                                                                    <Box>
                                                                        <Typography
                                                                            variant="body2"
                                                                            sx={{ fontWeight: 900 }}
                                                                        >
                                                                            {collection.label}
                                                                        </Typography>
                                                                        <Typography
                                                                            variant="caption"
                                                                            color="text.secondary"
                                                                        >
                                                                            collection:{collection.id}
                                                                        </Typography>
                                                                    </Box>
                                                                }
                                                            />

                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                                sx={{ display: "block", mt: 0.5 }}
                                                            >
                                                                {collection.description}
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                </Box>

                                <Divider />

                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
                                        Custom Archive collection
                                    </Typography>

                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        spacing={1}
                                        sx={{ mb: 1.5 }}
                                    >
                                        <TextField
                                            label="Custom collection ID"
                                            value={customCollectionInput}
                                            onChange={(event) =>
                                                setCustomCollectionInput(event.target.value)
                                            }
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter") {
                                                    addCustomCollection(event);
                                                }
                                            }}
                                            placeholder="Example: manuals, magazine_rack, gutenberg"
                                            fullWidth
                                            helperText="Use the Archive collection identifier. It will be added as collection:your_id."
                                            inputProps={{
                                                enterKeyHint: "done",
                                                autoComplete: "off",
                                            }}
                                        />

                                        <Button
                                            type="button"
                                            variant="contained"
                                            startIcon={<AddRoundedIcon />}
                                            onClick={addCustomCollection}
                                            sx={{ minWidth: 150, alignSelf: { sm: "flex-start" } }}
                                        >
                                            Add
                                        </Button>
                                    </Stack>

                                    {!customCollections.length && (
                                        <Alert severity="info">
                                            Add a custom collection ID, then leave its checkbox enabled to include
                                            it in the document search.
                                        </Alert>
                                    )}

                                    {!!customCollections.length && (
                                        <Grid container spacing={1}>
                                            {customCollections.map((collectionId) => {
                                                const checked = selectedCollectionSet.has(collectionId);

                                                return (
                                                    <Grid item xs={12} sm={6} md={4} key={collectionId}>
                                                        <Card
                                                            variant="outlined"
                                                            sx={{
                                                                ...SOFT_CARD_SX,
                                                                borderRadius: 3,
                                                                borderColor: checked
                                                                    ? "primary.main"
                                                                    : "divider",
                                                            }}
                                                        >
                                                            <CardContent sx={{ py: 1.5 }}>
                                                                <Stack
                                                                    direction="row"
                                                                    spacing={1}
                                                                    alignItems="flex-start"
                                                                    justifyContent="space-between"
                                                                >
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={checked}
                                                                                onChange={() =>
                                                                                    toggleCollection(collectionId)
                                                                                }
                                                                            />
                                                                        }
                                                                        label={
                                                                            <Box>
                                                                                <Typography
                                                                                    variant="body2"
                                                                                    sx={{ fontWeight: 900 }}
                                                                                >
                                                                                    Custom collection
                                                                                </Typography>
                                                                                <Typography
                                                                                    variant="caption"
                                                                                    color="text.secondary"
                                                                                    sx={{ wordBreak: "break-word" }}
                                                                                >
                                                                                    collection:{collectionId}
                                                                                </Typography>
                                                                            </Box>
                                                                        }
                                                                    />

                                                                    <Tooltip title="Remove custom collection">
                                                                        <IconButton
                                                                            type="button"
                                                                            size="small"
                                                                            onClick={() =>
                                                                                removeCustomCollection(collectionId)
                                                                            }
                                                                        >
                                                                            <DeleteOutlineRoundedIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Stack>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                );
                                            })}
                                        </Grid>
                                    )}
                                </Box>

                                <Divider />

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={useArchiveProxy}
                                            onChange={handleArchiveProxyChange}
                                        />
                                    }
                                    label="Use scrapewebsite /api/archiveproxy for querying, metadata, thumbnails, PDF previews, and document downloads"
                                />

                                <Alert severity={useArchiveProxy ? "warning" : "info"}>
                                    {useArchiveProxy
                                        ? `Proxy mode is on. Search JSON, metadata JSON, thumbnail images, PDF preview URLs, and document download URLs route through ${SCRAPEWEBSITE_ARCHIVE_PROXY_URL}. This can help with CORS and Archive links that fail directly, but it may be slower.`
                                        : "Proxy mode is off. Search JSON, metadata JSON, thumbnails, PDF previews, and document links use Archive.org directly."}
                                </Alert>
                            </Stack>
                        </CardContent>
                    </Card>

                    {status && <Alert severity="success">{status}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                    {copiedUrl && <Alert severity="info">Copied document link.</Alert>}

                    {!!activeResults.length && (
                        <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
                            <Chip label={`${matchingResults.length} matching item(s)`} color="primary" />
                            <Chip
                                label={`${offQueryResults.length} hidden off-query item(s)`}
                                color={offQueryResults.length ? "warning" : "default"}
                            />
                            <Chip label={`${totalDocumentFiles} document file(s) loaded`} />
                            <Chip label={`Collections: ${selectedCollections.length}`} />
                            <Chip label={`Proxy: ${useArchiveProxy ? "on" : "off"}`} />
                            <Chip
                                label={
                                    nextCursor
                                        ? `Next page: ${nextLoadStart}-${nextLoadEnd}`
                                        : "Next page: none"
                                }
                            />
                        </Stack>
                    )}

                    <Stack spacing={2}>
                        {visibleMatchingResults.map((item) => (
                            <ArchiveDocumentResultCard
                                key={item.identifier}
                                item={item}
                                visibleFileLimit={getVisibleFileLimit(item)}
                                onShowMoreFiles={showMoreFilesForItem}
                                onShowAllFiles={showAllFilesForItem}
                                onCollapseFiles={collapseFilesForItem}
                                onCopyText={copyText}
                            />
                        ))}
                    </Stack>

                    {matchingResults.length > visibleMatchingResults.length && (
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={() =>
                                setVisibleResultLimit(
                                    (current) => current + ARCHIVE_VISIBLE_RESULT_BATCH_SIZE
                                )
                            }
                            sx={{ alignSelf: "center" }}
                        >
                            Show{" "}
                            {Math.min(
                                ARCHIVE_VISIBLE_RESULT_BATCH_SIZE,
                                matchingResults.length - visibleMatchingResults.length
                            )}{" "}
                            more matching results
                        </Button>
                    )}

                    {!!offQueryResults.length && (
                        <Card
                            variant="outlined"
                            sx={{ ...GLASS_CARD_SX, borderColor: "warning.main" }}
                        >
                            <CardContent>
                                <Stack spacing={1.5}>
                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        spacing={1}
                                        justifyContent="space-between"
                                        alignItems={{ xs: "flex-start", sm: "center" }}
                                    >
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                                Results not strongly matching this query
                                            </Typography>

                                            <Typography variant="body2" color="text.secondary">
                                                Hidden by default so topic searches stay clean. Open this only
                                                when you want to inspect broad Archive matches.
                                            </Typography>
                                        </Box>

                                        <Button
                                            type="button"
                                            variant={showOffQueryResults ? "contained" : "outlined"}
                                            color="warning"
                                            onClick={() => setShowOffQueryResults((value) => !value)}
                                        >
                                            {showOffQueryResults
                                                ? "Hide off-query results"
                                                : `View ${offQueryResults.length} off-query result(s)`}
                                        </Button>
                                    </Stack>

                                    <Collapse in={showOffQueryResults} timeout="auto" unmountOnExit>
                                        <Stack spacing={2} sx={{ mt: 1.5 }}>
                                            {offQueryResults.map((item) => (
                                                <ArchiveDocumentResultCard
                                                    key={item.identifier}
                                                    item={item}
                                                    offQuery
                                                    visibleFileLimit={getVisibleFileLimit(item)}
                                                    onShowMoreFiles={showMoreFilesForItem}
                                                    onShowAllFiles={showAllFilesForItem}
                                                    onCollapseFiles={collapseFilesForItem}
                                                    onCopyText={copyText}
                                                />
                                            ))}
                                        </Stack>
                                    </Collapse>
                                </Stack>
                            </CardContent>
                        </Card>
                    )}

                    {!activeResults.length && !loading && (
                        <Card variant="outlined" sx={{ ...GLASS_CARD_SX }}>
                            <CardContent>
                                <Stack spacing={1}>
                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                        Try searches like:
                                    </Typography>

                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                        {[
                                            "public domain report",
                                            "business plan template",
                                            "computer manual",
                                            "government report pdf",
                                            "spreadsheet budget",
                                            "presentation template",
                                            "magazine archive",
                                        ].map((suggestion) => (
                                            <Chip
                                                key={suggestion}
                                                label={suggestion}
                                                onClick={() => {
                                                    setQuery(suggestion);
                                                    setError("");
                                                    stopActiveSearchAndKeepResults(
                                                        "Suggestion selected. Press Search Archive Documents when ready."
                                                    );
                                                }}
                                                clickable
                                            />
                                        ))}
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    )}
                </Stack>
            </Box>
        </GradientPage>
    );
}
