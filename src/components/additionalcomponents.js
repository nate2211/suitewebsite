import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import JSZip from "jszip";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Grid,
    LinearProgress,
    MenuItem,
    Paper,
    Select,
    Slider,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SlideshowRoundedIcon from "@mui/icons-material/SlideshowRounded";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import TransformRoundedIcon from "@mui/icons-material/TransformRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import AspectRatioRoundedIcon from "@mui/icons-material/AspectRatioRounded";

import {
    AppNavBar,
    GradientPage,
    SectionHeader,
} from "./components";

import HelmetHeader from "./HelmetHeader";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const SITE_URL = "https://suiteofficelab.com";

const TOOL_PRESETS = {
    "office-tools": {
        slug: "office-tools",
        title: "Additional Office Tools",
        h1: "Additional browser office tools",
        shortTitle: "Office Tools",
        eyebrow: "Additional Tools",
        icon: <AutoAwesomeRoundedIcon />,
        mode: "index",
        description:
            "Use focused browser tools to view, convert, compress, clean, export, and sign office files directly from browser-based pages.",
        keywords:
            "browser office tools, view PDF online, view Word document, view PowerPoint, view CSV, PDF to DOCX, DOCX to PDF, convert PDF, convert CSV, compress video, compress MP4, compress MOV, compress ZIP, sign PDF online",
    },

    "convert-pdf": {
        slug: "convert-pdf",
        title: "Convert PDF Online",
        h1: "Convert PDF online",
        shortTitle: "Convert PDF",
        eyebrow: "PDF Converter",
        icon: <TransformRoundedIcon />,
        mode: "convertPdf",
        accept: ".pdf,application/pdf",
        description:
            "Upload a PDF and convert it to DOCX, TXT, PNG page previews, or a browser-generated PDF copy directly from the frontend.",
        keywords:
            "convert PDF online, PDF to DOCX, PDF to Word, PDF to text, PDF to PNG, browser PDF converter, frontend PDF converter",
    },

    "convert-word": {
        slug: "convert-word",
        title: "Convert Word Document Online",
        h1: "Convert Word documents online",
        shortTitle: "Convert Word",
        eyebrow: "Word Converter",
        icon: <TransformRoundedIcon />,
        mode: "convertWord",
        accept:
            ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        description:
            "Upload a DOCX file, convert it to PDF, HTML, plain text, or a browser-generated DOCX copy directly from the browser.",
        keywords:
            "convert Word document online, DOCX to PDF, DOCX to HTML, DOCX to text, browser Word converter, frontend DOCX converter",
    },

    "view-pdf": {
        slug: "view-pdf",
        title: "View PDF Online",
        h1: "View PDF online",
        shortTitle: "View PDF",
        eyebrow: "PDF Viewer",
        icon: <PictureAsPdfRoundedIcon />,
        mode: "viewPdf",
        accept: ".pdf,application/pdf",
        description:
            "Upload and view PDF pages in the browser with page navigation, zoom controls, and direct file handling.",
        keywords:
            "view PDF online, browser PDF viewer, PDF page preview, frontend PDF reader",
    },

    "view-word": {
        slug: "view-word",
        title: "View Word Document Online",
        h1: "View Word documents online",
        shortTitle: "View Word",
        eyebrow: "Word Viewer",
        icon: <DescriptionRoundedIcon />,
        mode: "viewWord",
        accept:
            ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        description:
            "Upload a DOCX file and preview headings, paragraphs, lists, and tables as browser-readable HTML.",
        keywords:
            "view Word document online, DOCX viewer, browser Word viewer, preview DOCX online",
    },

    "view-powerpoint": {
        slug: "view-powerpoint",
        title: "View PowerPoint Online",
        h1: "View PowerPoint files online",
        shortTitle: "View PowerPoint",
        eyebrow: "PowerPoint Viewer",
        icon: <SlideshowRoundedIcon />,
        mode: "viewPowerPoint",
        accept:
            ".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation",
        description:
            "Upload a PPTX file and view extracted slide text, slide numbers, and speaker-note style content in the browser.",
        keywords:
            "view PowerPoint online, PPTX viewer, browser presentation viewer, view slides online",
    },

    "view-csv": {
        slug: "view-csv",
        title: "View CSV Online",
        h1: "View CSV files online",
        shortTitle: "View CSV",
        eyebrow: "CSV Viewer",
        icon: <TableChartRoundedIcon />,
        mode: "viewCsv",
        accept: ".csv,text/csv,.tsv,text/tab-separated-values",
        description:
            "Upload a CSV file and preview rows, columns, and spreadsheet-style table data directly in the browser.",
        keywords:
            "view CSV online, CSV viewer, browser CSV viewer, spreadsheet preview, CSV table viewer",
    },

    "sign-document": {
        slug: "sign-document",
        title: "Sign Document Online",
        h1: "Sign documents online",
        shortTitle: "Sign Document",
        eyebrow: "Document Signing",
        icon: <BorderColorRoundedIcon />,
        mode: "signDocument",
        accept: ".pdf,application/pdf",
        description:
            "Upload a PDF, draw a professional signature with mouse, pen, touch, or drawing tablet input, drag it on top of the rendered PDF, resize it, and export a signed document.",
        keywords:
            "sign PDF online, sign document online, draw signature, move signature on PDF, resize signature, mouse signature, pen signature, browser PDF signing",
    },

    "compress-video": {
        slug: "compress-video",
        title: "Compress Video Online",
        h1: "Compress video online",
        shortTitle: "Compress Video",
        eyebrow: "Video Compressor",
        icon: <TransformRoundedIcon />,
        mode: "compressVideo",
        accept: "video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm",
        description:
            "Upload MP4, MOV, or WEBM videos and create a smaller browser-generated MP4 for sharing, email, LMS upload, or instructor upload.",
        keywords:
            "compress video online, reduce video file size, compress MP4, compress MOV, compress webcam video, video compressor for upload",
    },

    "compress-mp4": {
        slug: "compress-mp4",
        title: "Compress MP4 Online",
        h1: "Compress MP4 files online",
        shortTitle: "Compress MP4",
        eyebrow: "MP4 Compressor",
        icon: <TransformRoundedIcon />,
        mode: "compressVideo",
        accept: "video/mp4,.mp4",
        description:
            "Upload an MP4 video and reduce its file size with browser video compression settings for resolution, frame rate, audio bitrate, and video quality.",
        keywords:
            "compress MP4 online, reduce MP4 file size, MP4 compressor, compress video for upload, smaller MP4 file",
    },

    "compress-mov": {
        slug: "compress-mov",
        title: "Compress MOV Online",
        h1: "Compress MOV files online",
        shortTitle: "Compress MOV",
        eyebrow: "MOV Compressor",
        icon: <TransformRoundedIcon />,
        mode: "compressVideo",
        accept: "video/quicktime,.mov",
        description:
            "Upload a MOV file from iPhone, Mac, QuickTime, or webcam recording workflows and create a smaller MP4 copy for instructor upload.",
        keywords:
            "compress MOV online, reduce MOV file size, QuickTime video compressor, iPhone MOV compressor, MOV to MP4 compressor",
    },

    "compress-zip": {
        slug: "compress-zip",
        title: "Compress ZIP File Online",
        h1: "Compress ZIP files online",
        shortTitle: "Compress ZIP",
        eyebrow: "ZIP Compressor",
        icon: <TransformRoundedIcon />,
        mode: "compressZip",
        accept: ".zip,application/zip,application/x-zip-compressed",
        description:
            "Upload a ZIP file, remove common junk files, rebuild it with maximum DEFLATE compression, and export an optimized ZIP copy.",
        keywords:
            "compress ZIP online, reduce ZIP file size, optimize ZIP file, clean ZIP file, browser ZIP compressor",
    },

    "convert-csv": {
        slug: "convert-csv",
        title: "Convert CSV Online",
        h1: "Convert CSV files online",
        shortTitle: "Convert CSV",
        eyebrow: "CSV Converter",
        icon: <TableChartRoundedIcon />,
        mode: "convertCsv",
        accept: ".csv,text/csv,.tsv,text/tab-separated-values,.json,application/json,text/plain",
        description:
            "Upload CSV, TSV, or JSON data and convert it to JSON, cleaned CSV, PDF table output, or delimiter-adjusted spreadsheet data.",
        keywords:
            "convert CSV online, CSV converter, CSV to JSON, JSON to CSV, CSV to PDF, clean CSV file",
    },

    "csv-to-json": {
        slug: "csv-to-json",
        title: "CSV to JSON Converter",
        h1: "Convert CSV to JSON",
        shortTitle: "CSV to JSON",
        eyebrow: "CSV Converter",
        icon: <TableChartRoundedIcon />,
        mode: "csvToJson",
        accept: ".csv,text/csv,.tsv,text/tab-separated-values",
        description:
            "Upload a CSV file and convert rows into structured JSON objects using the first row as field names.",
        keywords:
            "CSV to JSON, convert CSV to JSON online, spreadsheet to JSON, CSV JSON converter",
    },

    "json-to-csv": {
        slug: "json-to-csv",
        title: "JSON to CSV Converter",
        h1: "Convert JSON to CSV",
        shortTitle: "JSON to CSV",
        eyebrow: "JSON Converter",
        icon: <TableChartRoundedIcon />,
        mode: "jsonToCsv",
        accept: ".json,application/json,text/plain",
        description:
            "Upload JSON arrays or objects and convert them into CSV rows that can be opened in spreadsheet software.",
        keywords:
            "JSON to CSV, convert JSON to CSV online, JSON spreadsheet converter, JSON CSV export",
    },

    "csv-cleaner": {
        slug: "csv-cleaner",
        title: "CSV Cleaner Online",
        h1: "Clean CSV files online",
        shortTitle: "CSV Cleaner",
        eyebrow: "CSV Cleaner",
        icon: <TableChartRoundedIcon />,
        mode: "csvCleaner",
        accept: ".csv,text/csv,.tsv,text/tab-separated-values",
        description:
            "Upload a CSV file, trim extra spaces, remove blank rows, normalize row widths, and export a cleaned CSV copy.",
        keywords:
            "CSV cleaner online, clean CSV file, remove blank CSV rows, trim CSV spaces, fix CSV rows",
    },

    "remove-duplicate-csv-rows": {
        slug: "remove-duplicate-csv-rows",
        title: "Remove Duplicate CSV Rows",
        h1: "Remove duplicate CSV rows",
        shortTitle: "Remove CSV Duplicates",
        eyebrow: "CSV Cleaner",
        icon: <TableChartRoundedIcon />,
        mode: "csvDuplicates",
        accept: ".csv,text/csv,.tsv,text/tab-separated-values",
        description:
            "Upload a CSV file, detect duplicate rows, remove repeated entries, and export a deduplicated CSV file.",
        keywords:
            "remove duplicate CSV rows, deduplicate CSV online, CSV duplicate remover, remove repeated spreadsheet rows",
    },

    "csv-delimiter-converter": {
        slug: "csv-delimiter-converter",
        title: "CSV Delimiter Converter",
        h1: "Convert CSV delimiters",
        shortTitle: "CSV Delimiter",
        eyebrow: "CSV Converter",
        icon: <TableChartRoundedIcon />,
        mode: "csvDelimiter",
        accept: ".csv,text/csv,.tsv,text/tab-separated-values",
        description:
            "Upload CSV or TSV files and export the same rows using comma, semicolon, tab, or pipe delimiters.",
        keywords:
            "CSV delimiter converter, convert CSV to TSV, comma to semicolon CSV, tab delimited converter",
    },

    "csv-to-pdf": {
        slug: "csv-to-pdf",
        title: "CSV to PDF Converter",
        h1: "Convert CSV to PDF",
        shortTitle: "CSV to PDF",
        eyebrow: "CSV Converter",
        icon: <TableChartRoundedIcon />,
        mode: "csvToPdf",
        accept: ".csv,text/csv,.tsv,text/tab-separated-values",
        description:
            "Upload a CSV file and export a browser-generated PDF copy with readable spreadsheet-style row data.",
        keywords:
            "CSV to PDF, convert CSV to PDF online, spreadsheet to PDF, CSV table PDF converter",
    },
};

const DEFAULT_SLUG = "office-tools";
const FFMPEG_CORE_BASE_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd";

function getSlug(pathname) {
    const clean = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
    return TOOL_PRESETS[clean] ? clean : DEFAULT_SLUG;
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function baseName(fileName, fallback = "file") {
    return String(fileName || fallback).replace(/\.[^.]+$/i, "") || fallback;
}

function formatBytes(bytes) {
    const size = Number(bytes) || 0;

    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / 1024 / 1024).toFixed(1)} MB`;

    return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
}

function downloadBytes(filename, bytes, type) {
    downloadBlob(new Blob([bytes], { type }), filename);
}

function downloadText(filename, text, type = "text/plain;charset=utf-8") {
    downloadBlob(new Blob([text], { type }), filename);
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function stripHtml(html) {
    const element = document.createElement("div");
    element.innerHTML = html;
    return element.innerText || element.textContent || "";
}

function xmlEscape(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
}

function parseDelimited(text, delimiter = ",") {
    const rows = [];
    let row = [];
    let cell = "";
    let quote = false;

    for (let i = 0; i < text.length; i += 1) {
        const char = text[i];
        const next = text[i + 1];

        if (char === '"' && quote && next === '"') {
            cell += '"';
            i += 1;
            continue;
        }

        if (char === '"') {
            quote = !quote;
            continue;
        }

        if (char === delimiter && !quote) {
            row.push(cell);
            cell = "";
            continue;
        }

        if ((char === "\n" || char === "\r") && !quote) {
            if (char === "\r" && next === "\n") i += 1;

            row.push(cell);
            rows.push(row);
            row = [];
            cell = "";
            continue;
        }

        cell += char;
    }

    row.push(cell);
    rows.push(row);

    const width = Math.max(1, ...rows.map((item) => item.length));

    return rows
        .filter((item) => item.some((value) => String(value).trim() !== ""))
        .map((item) => {
            const next = [...item];

            while (next.length < width) {
                next.push("");
            }

            return next;
        });
}

function detectDelimiter(text) {
    const candidates = [",", "\t", ";", "|"];
    const sample = String(text || "").split(/\r?\n/).slice(0, 12).join("\n");

    let best = ",";
    let bestScore = -1;

    candidates.forEach((delimiter) => {
        const rows = parseDelimited(sample, delimiter);
        const totalColumns = rows.reduce((sum, row) => sum + row.length, 0);
        const uniqueWidths = new Set(rows.map((row) => row.length)).size;
        const score = totalColumns - uniqueWidths * 0.25;

        if (score > bestScore) {
            best = delimiter;
            bestScore = score;
        }
    });

    return best;
}

function parseCsv(text) {
    return parseDelimited(text, detectDelimiter(text));
}

function rowsToDelimited(rows, delimiter = ",") {
    return rows
        .map((row) =>
            row
                .map((cell) => {
                    const value = String(cell ?? "");
                    const needsQuotes =
                        value.includes(delimiter) ||
                        value.includes('"') ||
                        value.includes("\n") ||
                        value.includes("\r");

                    const escaped = value.replaceAll('"', '""');

                    return needsQuotes ? `"${escaped}"` : escaped;
                })
                .join(delimiter)
        )
        .join("\n");
}

function normalizeCsvRows(rows) {
    const width = Math.max(1, ...rows.map((row) => row.length));

    return rows
        .map((row) => {
            const next = row.map((cell) => String(cell ?? "").trim());

            while (next.length < width) {
                next.push("");
            }

            return next;
        })
        .filter((row) => row.some((cell) => cell !== ""));
}

function dedupeCsvRows(rows) {
    const seen = new Set();

    return rows.filter((row, index) => {
        if (index === 0) return true;

        const key = JSON.stringify(row.map((cell) => String(cell ?? "").trim().toLowerCase()));

        if (seen.has(key)) return false;

        seen.add(key);
        return true;
    });
}

function uniqueHeaders(headers) {
    const used = new Map();

    return headers.map((header, index) => {
        const clean = String(header || `column_${index + 1}`)
            .trim()
            .replace(/\s+/g, "_")
            .replace(/[^\w-]/g, "")
            .toLowerCase();

        const base = clean || `column_${index + 1}`;
        const count = used.get(base) || 0;

        used.set(base, count + 1);

        return count ? `${base}_${count + 1}` : base;
    });
}

function rowsToJson(rows) {
    if (!rows.length) return [];

    const headers = uniqueHeaders(rows[0]);

    return rows.slice(1).map((row) => {
        const item = {};

        headers.forEach((header, index) => {
            item[header] = row[index] ?? "";
        });

        return item;
    });
}

function flattenJsonValue(value) {
    if (value === null || value === undefined) return "";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
}

function jsonToRowsFromText(text) {
    const parsed = JSON.parse(text);
    const records = Array.isArray(parsed) ? parsed : [parsed];

    if (!records.length) {
        return [["value"]];
    }

    if (records.every((item) => item && typeof item === "object" && !Array.isArray(item))) {
        const headers = Array.from(
            records.reduce((set, item) => {
                Object.keys(item).forEach((key) => set.add(key));
                return set;
            }, new Set())
        );

        return [
            headers,
            ...records.map((item) => headers.map((header) => flattenJsonValue(item[header]))),
        ];
    }

    return [["value"], ...records.map((item) => [flattenJsonValue(item)])];
}

function getDelimiterLabel(delimiter) {
    if (delimiter === "\t") return "Tab";
    if (delimiter === ";") return "Semicolon";
    if (delimiter === "|") return "Pipe";
    return "Comma";
}

function getRowsStats(rows) {
    const rowCount = Math.max(0, rows.length - 1);
    const columnCount = rows[0]?.length || 0;
    const emptyCells = rows.reduce(
        (sum, row) => sum + row.filter((cell) => String(cell ?? "").trim() === "").length,
        0
    );

    return { rowCount, columnCount, emptyCells };
}

function getNodesByLocalName(root, localName) {
    return Array.from(root.getElementsByTagName("*")).filter(
        (node) => node.localName === localName
    );
}

function getDirectChildrenByLocalName(node, localName) {
    return Array.from(node?.children || []).filter((child) => child.localName === localName);
}

function docxRunToHtml(run) {
    const props = getDirectChildrenByLocalName(run, "rPr")[0];

    const bold = getDirectChildrenByLocalName(props, "b").length > 0;
    const italic = getDirectChildrenByLocalName(props, "i").length > 0;
    const underline = getDirectChildrenByLocalName(props, "u").length > 0;

    let text = getDirectChildrenByLocalName(run, "t")
        .map((node) => escapeHtml(node.textContent || ""))
        .join("");

    if (!text) return "";

    if (bold) text = `<strong>${text}</strong>`;
    if (italic) text = `<em>${text}</em>`;
    if (underline) text = `<u>${text}</u>`;

    return text;
}

function docxParagraphToHtml(paragraph) {
    const runs = getDirectChildrenByLocalName(paragraph, "r");
    const inner = runs.map((run) => docxRunToHtml(run)).join("");

    return inner.trim() ? `<p>${inner}</p>` : "<p><br /></p>";
}

function docxTableToHtml(table) {
    const rows = getDirectChildrenByLocalName(table, "tr");

    return `
<table>
    <tbody>
        ${rows
        .map((row) => {
            const cells = getDirectChildrenByLocalName(row, "tc");

            return `
<tr>
    ${cells
                .map((cell) => {
                    const paragraphs = getDirectChildrenByLocalName(cell, "p");
                    const html = paragraphs.map((paragraph) => docxParagraphToHtml(paragraph)).join("");
                    return `<td>${html || "<p><br /></p>"}</td>`;
                })
                .join("")}
</tr>`;
        })
        .join("")}
    </tbody>
</table>`;
}

async function docxToHtml(file) {
    const buffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(buffer);
    const documentFile = zip.file("word/document.xml");

    if (!documentFile) {
        throw new Error("word/document.xml was not found.");
    }

    const xmlText = await documentFile.async("text");
    const xml = new DOMParser().parseFromString(xmlText, "application/xml");
    const body = getNodesByLocalName(xml, "body")[0];

    if (!body) {
        return "<p>Document body was empty.</p>";
    }

    return Array.from(body.children || [])
        .map((child) => {
            if (child.localName === "p") return docxParagraphToHtml(child);
            if (child.localName === "tbl") return docxTableToHtml(child);
            return "";
        })
        .join("\n");
}

async function pptxToSlides(file) {
    const buffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(buffer);

    const slideFiles = Object.keys(zip.files)
        .filter((name) => /^ppt\/slides\/slide\d+\.xml$/i.test(name))
        .sort((a, b) => {
            const aNum = Number(a.match(/slide(\d+)\.xml/i)?.[1] || 0);
            const bNum = Number(b.match(/slide(\d+)\.xml/i)?.[1] || 0);
            return aNum - bNum;
        });

    const slides = [];

    for (const slideName of slideFiles) {
        const xmlText = await zip.file(slideName).async("text");
        const xml = new DOMParser().parseFromString(xmlText, "application/xml");
        const textNodes = getNodesByLocalName(xml, "t");
        const text = textNodes.map((node) => node.textContent || "").join("\n").trim();

        slides.push({
            name: slideName,
            title: text.split("\n").find(Boolean) || slideName,
            text: text || "No readable text found on this slide.",
        });
    }

    return slides;
}

async function renderPdfPageToCanvas(pdf, pageNumber, scale = 1.4) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);

    await page.render({
        canvasContext: ctx,
        viewport,
    }).promise;

    return canvas;
}

async function extractPdfText(pdf) {
    const pages = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();
        const text = content.items.map((item) => item.str).join(" ");

        pages.push({
            pageNumber,
            text,
        });
    }

    return pages;
}

function wrapText(text, font, fontSize, maxWidth) {
    const words = String(text || "").replace(/\s+/g, " ").split(" ");
    const lines = [];
    let current = "";

    words.forEach((word) => {
        const test = current ? `${current} ${word}` : word;
        const width = font.widthOfTextAtSize(test, fontSize);

        if (width > maxWidth && current) {
            lines.push(current);
            current = word;
        } else {
            current = test;
        }
    });

    if (current) {
        lines.push(current);
    }

    return lines.length ? lines : [""];
}

async function textToPdfBytes({ title, text }) {
    const pdf = await PDFDocument.create();
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);

    const pageWidth = 612;
    const pageHeight = 792;
    const margin = 54;
    const fontSize = 11;
    const lineHeight = 16;
    const maxWidth = pageWidth - margin * 2;

    let page = pdf.addPage([pageWidth, pageHeight]);
    let y = pageHeight - margin;

    page.drawText(title || "Converted Document", {
        x: margin,
        y,
        size: 18,
        font: boldFont,
        color: rgb(0.06, 0.09, 0.16),
    });

    y -= 34;

    const paragraphs = String(text || "")
        .split(/\n{2,}/)
        .map((item) => item.trim())
        .filter(Boolean);

    const drawLine = (line) => {
        if (y < margin + lineHeight) {
            page = pdf.addPage([pageWidth, pageHeight]);
            y = pageHeight - margin;
        }

        page.drawText(line, {
            x: margin,
            y,
            size: fontSize,
            font,
            color: rgb(0.08, 0.1, 0.14),
        });

        y -= lineHeight;
    };

    paragraphs.forEach((paragraph) => {
        const lines = wrapText(paragraph, font, fontSize, maxWidth);

        lines.forEach(drawLine);
        y -= 8;
    });

    return pdf.save();
}

async function rowsToPdfBytes({ title, rows }) {
    const pdf = await PDFDocument.create();
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);

    const pageWidth = 792;
    const pageHeight = 612;
    const margin = 36;
    const fontSize = 8.5;
    const lineHeight = 14;
    const usableWidth = pageWidth - margin * 2;

    let page = pdf.addPage([pageWidth, pageHeight]);
    let y = pageHeight - margin;

    const addPageIfNeeded = () => {
        if (y < margin + lineHeight) {
            page = pdf.addPage([pageWidth, pageHeight]);
            y = pageHeight - margin;
        }
    };

    page.drawText(title || "CSV Export", {
        x: margin,
        y,
        size: 18,
        font: boldFont,
        color: rgb(0.06, 0.09, 0.16),
    });

    y -= 26;

    const previewRows = rows.slice(0, 500);
    const maxColumns = Math.min(8, previewRows[0]?.length || 1);
    const colWidth = usableWidth / maxColumns;

    previewRows.forEach((row, rowIndex) => {
        addPageIfNeeded();

        const isHeader = rowIndex === 0;

        for (let columnIndex = 0; columnIndex < maxColumns; columnIndex += 1) {
            const raw = String(row[columnIndex] ?? "");
            const text = raw.length > 34 ? `${raw.slice(0, 34)}...` : raw;

            page.drawText(text, {
                x: margin + columnIndex * colWidth,
                y,
                size: fontSize,
                font: isHeader ? boldFont : font,
                color: rgb(0.08, 0.1, 0.14),
            });
        }

        y -= lineHeight;
    });

    return pdf.save();
}

async function pdfExtractedTextToDocxBytes({ title, pages }) {
    const zip = new JSZip();

    const documentXml = buildDocxDocumentXml({
        title,
        paragraphs: pages.flatMap((page) => [
            `Page ${page.pageNumber}`,
            page.text || "No selectable text found on this page.",
        ]),
    });

    zip.file("[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
    <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
    <Default Extension="xml" ContentType="application/xml"/>
    <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
    <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
    <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`);

    zip.folder("_rels").file(".rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
    <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
    <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`);

    zip.folder("word").file("document.xml", documentXml);
    zip.folder("word").folder("_rels").file("document.xml.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>`);

    zip.folder("docProps").file("core.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties
    xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:dcterms="http://purl.org/dc/terms/"
    xmlns:dcmitype="http://purl.org/dc/dcmitype/"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <dc:title>${xmlEscape(title || "Converted PDF")}</dc:title>
    <dc:creator>SuiteOfficeLab</dc:creator>
    <cp:lastModifiedBy>SuiteOfficeLab</cp:lastModifiedBy>
</cp:coreProperties>`);

    zip.folder("docProps").file("app.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
    xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
    <Application>SuiteOfficeLab</Application>
</Properties>`);

    return zip.generateAsync({
        type: "uint8array",
        compression: "DEFLATE",
    });
}

async function htmlTextToDocxBytes({ title, html }) {
    const text = stripHtml(html);
    const paragraphs = text
        .split(/\n+/)
        .map((item) => item.trim())
        .filter(Boolean);

    const zip = new JSZip();

    zip.file("[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
    <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
    <Default Extension="xml" ContentType="application/xml"/>
    <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`);

    zip.folder("_rels").file(".rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

    zip.folder("word").file("document.xml", buildDocxDocumentXml({ title, paragraphs }));
    zip.folder("word").folder("_rels").file("document.xml.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>`);

    return zip.generateAsync({
        type: "uint8array",
        compression: "DEFLATE",
    });
}

function buildDocxDocumentXml({ title, paragraphs }) {
    const bodyParagraphs = [
        title || "Converted Document",
        ...(paragraphs && paragraphs.length ? paragraphs : ["No text was available to convert."]),
    ]
        .map((paragraph, index) => {
            const isTitle = index === 0;

            return `<w:p>
    <w:pPr>
        ${isTitle ? '<w:pStyle w:val="Title"/>' : ""}
        <w:spacing w:after="180"/>
    </w:pPr>
    <w:r>
        <w:rPr>
            ${isTitle ? "<w:b/>" : ""}
            <w:sz w:val="${isTitle ? "36" : "24"}"/>
        </w:rPr>
        <w:t xml:space="preserve">${xmlEscape(paragraph)}</w:t>
    </w:r>
</w:p>`;
        })
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document
    xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing"
    xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
    xmlns:w10="urn:schemas-microsoft-com:office:word"
    xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
    xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"
    xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup"
    xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk"
    xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml"
    xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
    mc:Ignorable="w14 wp14">
    <w:body>
        ${bodyParagraphs}
        <w:sectPr>
            <w:pgSz w:w="12240" w:h="15840"/>
            <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
        </w:sectPr>
    </w:body>
</w:document>`;
}

function buildHtmlDocument({ title, body }) {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(title)}</title>
<style>
body{font-family:Arial,sans-serif;background:#f3f4f6;padding:42px;color:#111827;}
main{max-width:920px;margin:0 auto;background:white;padding:54px;box-shadow:0 20px 80px rgba(0,0,0,.15);}
table{border-collapse:collapse;width:100%;margin:18px 0;}
td,th{border:1px solid #9ca3af;padding:8px;}
p{line-height:1.7;}
</style>
</head>
<body>
<main>${body}</main>
</body>
</html>`;
}

function buildJsonLd(preset) {
    const url = `${SITE_URL}/${preset.slug}`;

    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: preset.title,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web Browser",
        url,
        description: preset.description,
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
    };
}

function isZipJunkFile(path) {
    const normalized = String(path || "").replaceAll("\\", "/");

    return (
        normalized.includes("__MACOSX/") ||
        normalized.endsWith(".DS_Store") ||
        normalized.endsWith("Thumbs.db") ||
        normalized.endsWith("desktop.ini") ||
        normalized.includes("/.Spotlight-V100/") ||
        normalized.includes("/.Trashes/")
    );
}

function getVideoInputName(fileName) {
    const clean = String(fileName || "input.mp4").replace(/[^\w.-]/g, "_");
    const extension = clean.match(/\.[^.]+$/)?.[0] || ".mp4";
    return `input${extension}`;
}

export function AdditionalOfficeToolPage() {
    const location = useLocation();
    const slug = getSlug(location.pathname);
    const preset = TOOL_PRESETS[slug];

    if (preset.mode === "index") {
        return <OfficeToolsIndex preset={preset} />;
    }

    return <FocusedOfficeTool preset={preset} />;
}

function OfficeToolsIndex({ preset }) {
    const tools = Object.values(TOOL_PRESETS).filter((tool) => tool.mode !== "index");

    return (
        <GradientPage>
            <HelmetHeader
                title={preset.title}
                path="/office-tools"
                description={preset.description}
                keywords={preset.keywords}
                jsonLd={buildJsonLd(preset)}
            />

            <AppNavBar />

            <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
                <Stack spacing={3} sx={{ maxWidth: 980, mb: 4 }}>
                    <Chip
                        icon={<AutoAwesomeRoundedIcon />}
                        label="SuiteOfficeLab focused tools"
                        sx={pillSx}
                    />

                    <Typography
                        component="h1"
                        sx={{
                            fontSize: { xs: 40, md: 72 },
                            lineHeight: 0.95,
                            letterSpacing: "-0.065em",
                            fontWeight: 950,
                        }}
                    >
                        View, convert, compress, clean, and sign files from focused browser pages.
                    </Typography>

                    <Typography sx={{ color: "rgba(255,255,255,.7)", fontSize: 18, lineHeight: 1.75 }}>
                        These pages are made for direct SEO URLs. Convert PDF to DOCX, convert DOCX
                        to PDF, export PDF text, view documents, clean CSV files, convert CSV to JSON,
                        compress MP4 or MOV files for upload, optimize ZIP files, and sign PDF documents.
                    </Typography>
                </Stack>

                <Grid container spacing={2.5}>
                    {tools.map((tool) => (
                        <Grid item xs={12} sm={6} lg={3} key={tool.slug}>
                            <Card
                                component={RouterLink}
                                to={`/${tool.slug}`}
                                sx={toolCardSx}
                            >
                                <CardContent sx={{ p: 2.75 }}>
                                    <Stack spacing={2}>
                                        <Box sx={iconBoxSx}>{tool.icon}</Box>

                                        <Box>
                                            <Typography variant="h5" sx={{ fontWeight: 950, mb: 1 }}>
                                                {tool.shortTitle}
                                            </Typography>

                                            <Typography sx={{ color: "rgba(255,255,255,.68)", lineHeight: 1.65 }}>
                                                {tool.description}
                                            </Typography>
                                        </Box>

                                        <Typography sx={{ color: "#9ee8ff", fontWeight: 950, fontSize: 13 }}>
                                            /{tool.slug}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </GradientPage>
    );
}

function FocusedOfficeTool({ preset }) {
    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);
    const signatureCanvasRef = useRef(null);
    const drawingRef = useRef(false);
    const dragRef = useRef(null);
    const ffmpegRef = useRef(null);

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [status, setStatus] = useState("Select a file to begin.");

    const [pdfDoc, setPdfDoc] = useState(null);
    const [pdfBytes, setPdfBytes] = useState(null);
    const [pdfExtractedPages, setPdfExtractedPages] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [zoom, setZoom] = useState(1.35);
    const [canvasSize, setCanvasSize] = useState({ width: 1, height: 1 });

    const [htmlPreview, setHtmlPreview] = useState("");
    const [textPreview, setTextPreview] = useState("");
    const [csvRows, setCsvRows] = useState([]);
    const [slides, setSlides] = useState([]);

    const [zipStats, setZipStats] = useState(null);
    const [optimizedZipBlob, setOptimizedZipBlob] = useState(null);

    const [videoUrl, setVideoUrl] = useState("");
    const [compressedVideoUrl, setCompressedVideoUrl] = useState("");
    const [compressedVideoBlob, setCompressedVideoBlob] = useState(null);
    const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
    const [ffmpegProgress, setFfmpegProgress] = useState(0);
    const [ffmpegLog, setFfmpegLog] = useState("");
    const [videoSettings, setVideoSettings] = useState({
        height: 720,
        crf: 28,
        fps: 30,
        videoBitrate: 1800,
        audioBitrate: 128,
    });

    const [signatureDataUrl, setSignatureDataUrl] = useState("");
    const [signature, setSignature] = useState({
        x: 120,
        y: 120,
        width: 180,
        page: 1,
        color: "#111827",
        lineWidth: 3,
    });

    const isPdfMode =
        preset.mode === "viewPdf" ||
        preset.mode === "convertPdf" ||
        preset.mode === "signDocument";

    const isWordMode = preset.mode === "viewWord" || preset.mode === "convertWord";
    const isCsvMode =
        preset.mode === "viewCsv" ||
        preset.mode === "convertCsv" ||
        preset.mode === "csvToJson" ||
        preset.mode === "jsonToCsv" ||
        preset.mode === "csvCleaner" ||
        preset.mode === "csvDuplicates" ||
        preset.mode === "csvDelimiter" ||
        preset.mode === "csvToPdf";

    const isVideoMode = preset.mode === "compressVideo";
    const isZipMode = preset.mode === "compressZip";

    const pageOptions = useMemo(() => {
        return Array.from({ length: pageCount || 1 }, (_, index) => index + 1);
    }, [pageCount]);

    const csvStats = useMemo(() => getRowsStats(csvRows), [csvRows]);

    const signatureDisplay = useMemo(() => {
        const width = Math.max(20, signature.width * zoom);
        const height = width * (260 / 900);

        return {
            left: signature.x * zoom,
            top: signature.y * zoom,
            width,
            height,
        };
    }, [signature, zoom]);

    useEffect(() => {
        if (pdfDoc && isPdfMode) {
            renderActivePdfPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pdfDoc, pageNumber, zoom]);

    useEffect(() => {
        return () => {
            removeSignatureDragListeners();

            if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
            }

            if (compressedVideoUrl) {
                URL.revokeObjectURL(compressedVideoUrl);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function resetStateForNewFile(nextFile) {
        setFile(nextFile);
        setFileName(nextFile?.name || "");
        setStatus(nextFile ? `Loaded ${nextFile.name}` : "Select a file to begin.");

        setHtmlPreview("");
        setTextPreview("");
        setCsvRows([]);
        setSlides([]);

        setPdfDoc(null);
        setPdfBytes(null);
        setPdfExtractedPages([]);
        setPageNumber(1);
        setPageCount(0);
        setCanvasSize({ width: 1, height: 1 });

        setZipStats(null);
        setOptimizedZipBlob(null);

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        if (compressedVideoUrl) {
            URL.revokeObjectURL(compressedVideoUrl);
        }

        setVideoUrl("");
        setCompressedVideoUrl("");
        setCompressedVideoBlob(null);
        setFfmpegProgress(0);
        setFfmpegLog("");
    }

    async function handleUpload(event) {
        const nextFile = event.target.files?.[0];

        if (!nextFile) return;

        resetStateForNewFile(nextFile);

        try {
            if (isPdfMode) {
                const bytes = await nextFile.arrayBuffer();
                const loadedPdf = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;

                setPdfBytes(bytes);
                setPdfDoc(loadedPdf);
                setPageCount(loadedPdf.numPages);
                setSignature((current) => ({
                    ...current,
                    page: 1,
                }));

                if (preset.mode === "convertPdf") {
                    const pages = await extractPdfText(loadedPdf);
                    setPdfExtractedPages(pages);
                    setTextPreview(
                        pages
                            .map((page) => `Page ${page.pageNumber}\n${page.text}`)
                            .join("\n\n")
                    );
                    setStatus(
                        `PDF loaded with ${loadedPdf.numPages} page(s). Text is ready for DOCX/TXT export.`
                    );
                } else {
                    setStatus(`PDF loaded with ${loadedPdf.numPages} page(s).`);
                }

                return;
            }

            if (isWordMode) {
                const html = await docxToHtml(nextFile);
                const text = stripHtml(html).trim();

                setHtmlPreview(html);
                setTextPreview(text);
                setStatus(
                    "DOCX loaded. You can export it as PDF, HTML, TXT, or a simplified DOCX copy."
                );
                return;
            }

            if (preset.mode === "viewPowerPoint") {
                const parsedSlides = await pptxToSlides(nextFile);

                setSlides(parsedSlides);
                setStatus(`PPTX loaded with ${parsedSlides.length} readable slide(s).`);
                return;
            }

            if (isCsvMode) {
                const text = await nextFile.text();

                if (preset.mode === "jsonToCsv" || nextFile.name.toLowerCase().endsWith(".json")) {
                    const rows = jsonToRowsFromText(text);
                    setCsvRows(rows);
                    setTextPreview(rowsToDelimited(rows));
                    setStatus(`JSON loaded and converted to ${rows.length} CSV row(s).`);
                } else {
                    const rows = parseCsv(text);
                    setCsvRows(rows);
                    setTextPreview(text);
                    setStatus(`CSV loaded with ${rows.length} row(s) and ${rows[0]?.length || 0} column(s).`);
                }

                return;
            }

            if (isZipMode) {
                const zip = await JSZip.loadAsync(await nextFile.arrayBuffer());
                const entries = Object.values(zip.files);
                const junk = entries.filter((entry) => isZipJunkFile(entry.name));
                const files = entries.filter((entry) => !entry.dir);

                setZipStats({
                    fileCount: files.length,
                    junkCount: junk.length,
                    originalSize: nextFile.size,
                });

                setStatus(
                    `ZIP loaded with ${files.length} file(s). ${junk.length} common junk file(s) can be removed.`
                );
                return;
            }

            if (isVideoMode) {
                const url = URL.createObjectURL(nextFile);
                setVideoUrl(url);
                setStatus(
                    `${nextFile.name} loaded at ${formatBytes(nextFile.size)}. Choose compression settings, then export compressed MP4.`
                );
            }
        } catch (error) {
            console.error(error);
            setStatus("Could not read this file. It may be encrypted, damaged, too large, or unsupported.");
        } finally {
            event.target.value = "";
        }
    }

    async function ensureFfmpegLoaded() {
        if (ffmpegLoaded && ffmpegRef.current) {
            return ffmpegRef.current;
        }

        setStatus("Loading FFmpeg.wasm core. This can take a moment the first time.");
        setFfmpegProgress(0);

        const ffmpeg = new FFmpeg();

        ffmpeg.on("log", ({ message }) => {
            setFfmpegLog(message);
        });

        ffmpeg.on("progress", ({ progress }) => {
            const percent = Math.round(clamp(progress || 0, 0, 1) * 100);
            setFfmpegProgress(percent);
        });

        await ffmpeg.load({
            coreURL: await toBlobURL(`${FFMPEG_CORE_BASE_URL}/ffmpeg-core.js`, "text/javascript"),
            wasmURL: await toBlobURL(`${FFMPEG_CORE_BASE_URL}/ffmpeg-core.wasm`, "application/wasm"),
        });

        ffmpegRef.current = ffmpeg;
        setFfmpegLoaded(true);
        setStatus("FFmpeg loaded. Ready to compress video.");

        return ffmpeg;
    }

    async function compressVideoWithFfmpeg() {
        if (!file) {
            setStatus("Upload a video first.");
            return;
        }

        try {
            const ffmpeg = await ensureFfmpegLoaded();
            const inputName = getVideoInputName(file.name);
            const outputName = `${baseName(file.name, "compressed-video")}-compressed.mp4`;

            setStatus("Writing video into FFmpeg memory.");
            setFfmpegProgress(1);

            try {
                await ffmpeg.deleteFile(inputName);
            } catch {
                // ignore missing file
            }

            try {
                await ffmpeg.deleteFile(outputName);
            } catch {
                // ignore missing file
            }

            await ffmpeg.writeFile(inputName, await fetchFile(file));

            setStatus("Compressing video to MP4. Large videos may take a while in-browser.");

            const vf = `scale='min(1280,iw)':-2`;

            await ffmpeg.exec([
                "-i",
                inputName,
                "-vf",
                vf,
                "-r",
                String(videoSettings.fps),
                "-c:v",
                "libx264",
                "-preset",
                "veryfast",
                "-crf",
                String(videoSettings.crf),
                "-b:v",
                `${videoSettings.videoBitrate}k`,
                "-maxrate",
                `${videoSettings.videoBitrate}k`,
                "-bufsize",
                `${videoSettings.videoBitrate * 2}k`,
                "-c:a",
                "aac",
                "-b:a",
                `${videoSettings.audioBitrate}k`,
                "-movflags",
                "+faststart",
                outputName,
            ]);

            const data = await ffmpeg.readFile(outputName);
            const blob = new Blob([data.buffer], { type: "video/mp4" });
            const url = URL.createObjectURL(blob);

            if (compressedVideoUrl) {
                URL.revokeObjectURL(compressedVideoUrl);
            }

            setCompressedVideoBlob(blob);
            setCompressedVideoUrl(url);

            const original = file.size;
            const next = blob.size;
            const saved = original > 0 ? Math.max(0, 100 - (next / original) * 100) : 0;

            setStatus(
                `Compressed MP4 ready. Original: ${formatBytes(original)}. New: ${formatBytes(next)}. Estimated reduction: ${saved.toFixed(1)}%.`
            );
            setFfmpegProgress(100);

            try {
                await ffmpeg.deleteFile(inputName);
                await ffmpeg.deleteFile(outputName);
            } catch {
                // cleanup is best effort
            }
        } catch (error) {
            console.error(error);
            setStatus(
                "Video compression failed. Try a shorter video, lower resolution, or lower bitrate. Very large videos can exceed browser memory."
            );
        }
    }

    function downloadCompressedVideo() {
        if (!compressedVideoBlob) {
            setStatus("Compress the video first.");
            return;
        }

        downloadBlob(compressedVideoBlob, `${baseName(fileName, "video")}-compressed.mp4`);
    }

    async function optimizeZipFile() {
        if (!file) {
            setStatus("Upload a ZIP first.");
            return;
        }

        try {
            setStatus("Reading ZIP and rebuilding with maximum compression.");

            const originalZip = await JSZip.loadAsync(await file.arrayBuffer());
            const outputZip = new JSZip();

            let copiedCount = 0;
            let removedJunk = 0;

            for (const entry of Object.values(originalZip.files)) {
                if (entry.dir) continue;

                if (isZipJunkFile(entry.name)) {
                    removedJunk += 1;
                    continue;
                }

                const bytes = await entry.async("uint8array");
                outputZip.file(entry.name, bytes, {
                    binary: true,
                    compression: "DEFLATE",
                    compressionOptions: {
                        level: 9,
                    },
                });

                copiedCount += 1;
            }

            const output = await outputZip.generateAsync({
                type: "blob",
                compression: "DEFLATE",
                compressionOptions: {
                    level: 9,
                },
            });

            setOptimizedZipBlob(output);

            const original = file.size;
            const next = output.size;
            const saved = original > 0 ? Math.max(0, 100 - (next / original) * 100) : 0;

            setStatus(
                `Optimized ZIP ready. Kept ${copiedCount} file(s), removed ${removedJunk} junk file(s). Original: ${formatBytes(original)}. New: ${formatBytes(next)}. Reduction: ${saved.toFixed(1)}%.`
            );
        } catch (error) {
            console.error(error);
            setStatus("Could not optimize this ZIP file. It may be encrypted, damaged, or too large for browser memory.");
        }
    }

    function downloadOptimizedZip() {
        if (!optimizedZipBlob) {
            setStatus("Optimize the ZIP first.");
            return;
        }

        downloadBlob(optimizedZipBlob, `${baseName(fileName, "optimized")}-optimized.zip`);
    }

    async function renderActivePdfPage() {
        if (!pdfDoc || !canvasRef.current) return;

        const canvas = await renderPdfPageToCanvas(pdfDoc, pageNumber, zoom);
        const target = canvasRef.current;
        const ctx = target.getContext("2d");

        target.width = canvas.width;
        target.height = canvas.height;
        target.style.width = `${canvas.width}px`;
        target.style.height = `${canvas.height}px`;

        ctx.clearRect(0, 0, target.width, target.height);
        ctx.drawImage(canvas, 0, 0);

        setCanvasSize({
            width: canvas.width,
            height: canvas.height,
        });
    }

    async function exportPdfText() {
        if (!pdfDoc) {
            setStatus("Upload a PDF first.");
            return;
        }

        const pages = pdfExtractedPages.length ? pdfExtractedPages : await extractPdfText(pdfDoc);
        const text = pages.map((page) => `Page ${page.pageNumber}\n${page.text}`).join("\n\n");
        const name = baseName(fileName, "converted-pdf");

        downloadText(`${name}.txt`, text);
        setStatus("PDF text exported.");
    }

    async function exportPdfToDocx() {
        if (!pdfDoc) {
            setStatus("Upload a PDF first.");
            return;
        }

        const pages = pdfExtractedPages.length ? pdfExtractedPages : await extractPdfText(pdfDoc);
        const name = baseName(fileName, "converted-pdf");

        const docxBytes = await pdfExtractedTextToDocxBytes({
            title: `${name} converted from PDF`,
            pages,
        });

        downloadBytes(
            `${name}.docx`,
            docxBytes,
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );

        setStatus("PDF converted to a text-based DOCX file.");
    }

    async function exportPdfPagePng() {
        if (!pdfDoc) {
            setStatus("Upload a PDF first.");
            return;
        }

        const canvas = await renderPdfPageToCanvas(pdfDoc, pageNumber, 2);
        const name = baseName(fileName, "pdf-page");

        canvas.toBlob((blob) => {
            if (!blob) return;
            downloadBlob(blob, `${name}-page-${pageNumber}.png`);
            setStatus("PDF page PNG exported.");
        }, "image/png");
    }

    async function exportPdfCopy() {
        if (!pdfBytes) {
            setStatus("Upload a PDF first.");
            return;
        }

        const pdf = await PDFDocument.load(pdfBytes);
        const output = await pdf.save();
        const name = baseName(fileName, "document");

        downloadBytes(`${name}-copy.pdf`, output, "application/pdf");
        setStatus("Browser-generated PDF copy exported.");
    }

    function exportWordHtml() {
        if (!htmlPreview) {
            setStatus("Upload a DOCX first.");
            return;
        }

        const name = baseName(fileName, "converted-word");
        const html = buildHtmlDocument({
            title: name,
            body: htmlPreview,
        });

        downloadText(`${name}.html`, html, "text/html;charset=utf-8");
        setStatus("Word document converted to HTML.");
    }

    function exportWordText() {
        if (!textPreview) {
            setStatus("Upload a DOCX first.");
            return;
        }

        const name = baseName(fileName, "converted-word");

        downloadText(`${name}.txt`, textPreview);
        setStatus("Word document converted to TXT.");
    }

    async function exportWordPdf() {
        if (!textPreview) {
            setStatus("Upload a DOCX first.");
            return;
        }

        const name = baseName(fileName, "converted-word");
        const bytes = await textToPdfBytes({
            title: `${name} converted from DOCX`,
            text: textPreview,
        });

        downloadBytes(`${name}.pdf`, bytes, "application/pdf");
        setStatus("DOCX converted to a browser-generated PDF.");
    }

    async function exportWordDocxCopy() {
        if (!htmlPreview) {
            setStatus("Upload a DOCX first.");
            return;
        }

        const name = baseName(fileName, "converted-word");
        const bytes = await htmlTextToDocxBytes({
            title: `${name} converted copy`,
            html: htmlPreview,
        });

        downloadBytes(
            `${name}-copy.docx`,
            bytes,
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );

        setStatus("Simplified DOCX copy exported.");
    }

    function exportCsvAsJson() {
        if (!csvRows.length) {
            setStatus("Upload a CSV first.");
            return;
        }

        const json = JSON.stringify(rowsToJson(csvRows), null, 2);
        downloadText(`${baseName(fileName, "csv-data")}.json`, json, "application/json;charset=utf-8");
        setStatus("CSV converted to JSON.");
    }

    function exportJsonAsCsv() {
        if (!csvRows.length) {
            setStatus("Upload JSON first.");
            return;
        }

        downloadText(`${baseName(fileName, "json-data")}.csv`, rowsToDelimited(csvRows));
        setStatus("JSON converted to CSV.");
    }

    function exportCleanCsv() {
        if (!csvRows.length) {
            setStatus("Upload a CSV first.");
            return;
        }

        const cleaned = normalizeCsvRows(csvRows);
        downloadText(`${baseName(fileName, "cleaned")}-cleaned.csv`, rowsToDelimited(cleaned));
        setCsvRows(cleaned);
        setStatus(`CSV cleaned. Exported ${cleaned.length} row(s).`);
    }

    function exportDedupeCsv() {
        if (!csvRows.length) {
            setStatus("Upload a CSV first.");
            return;
        }

        const cleaned = normalizeCsvRows(csvRows);
        const deduped = dedupeCsvRows(cleaned);
        const removed = cleaned.length - deduped.length;

        downloadText(`${baseName(fileName, "deduped")}-deduped.csv`, rowsToDelimited(deduped));
        setCsvRows(deduped);
        setStatus(`Duplicate rows removed. Removed ${removed} duplicate row(s).`);
    }

    function exportDelimitedCsv(delimiter) {
        if (!csvRows.length) {
            setStatus("Upload a CSV first.");
            return;
        }

        const extension = delimiter === "\t" ? "tsv" : "csv";
        const label = getDelimiterLabel(delimiter).toLowerCase();

        downloadText(
            `${baseName(fileName, "converted")}-${label}.${extension}`,
            rowsToDelimited(csvRows, delimiter),
            delimiter === "\t" ? "text/tab-separated-values;charset=utf-8" : "text/csv;charset=utf-8"
        );

        setStatus(`CSV exported using ${getDelimiterLabel(delimiter)} delimiter.`);
    }

    async function exportCsvPdf() {
        if (!csvRows.length) {
            setStatus("Upload a CSV first.");
            return;
        }

        const bytes = await rowsToPdfBytes({
            title: `${baseName(fileName, "csv")} table export`,
            rows: csvRows,
        });

        downloadBytes(`${baseName(fileName, "csv")}.pdf`, bytes, "application/pdf");
        setStatus("CSV exported as a browser-generated PDF.");
    }

    function ensureSignatureCanvas() {
        const canvas = signatureCanvasRef.current;

        if (!canvas) return null;

        if (canvas.width !== 900 || canvas.height !== 260) {
            canvas.width = 900;
            canvas.height = 260;
        }

        return canvas;
    }

    function signaturePoint(event) {
        const canvas = signatureCanvasRef.current;
        const rect = canvas.getBoundingClientRect();

        return {
            x: ((event.clientX - rect.left) / rect.width) * canvas.width,
            y: ((event.clientY - rect.top) / rect.height) * canvas.height,
        };
    }

    function startSignature(event) {
        const canvas = ensureSignatureCanvas();
        const ctx = canvas.getContext("2d");
        const point = signaturePoint(event);

        drawingRef.current = true;
        ctx.strokeStyle = signature.color;
        ctx.lineWidth = signature.lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
    }

    function drawSignature(event) {
        if (!drawingRef.current) return;

        const canvas = ensureSignatureCanvas();
        const ctx = canvas.getContext("2d");
        const point = signaturePoint(event);

        ctx.strokeStyle = signature.color;
        ctx.lineWidth = signature.lineWidth;
        ctx.lineTo(point.x, point.y);
        ctx.stroke();

        setSignatureDataUrl(canvas.toDataURL("image/png"));
    }

    function stopSignature() {
        if (!drawingRef.current) return;

        drawingRef.current = false;

        const canvas = signatureCanvasRef.current;

        if (canvas) {
            setSignatureDataUrl(canvas.toDataURL("image/png"));
            setStatus("Signature captured. Drag it on the PDF preview or resize it before export.");
        }
    }

    function clearSignature() {
        const canvas = signatureCanvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setSignatureDataUrl("");
        setStatus("Signature cleared.");
    }

    function moveSignatureToPage() {
        setSignature((current) => ({
            ...current,
            page: pageNumber,
        }));

        setStatus(`Signature moved to page ${pageNumber}.`);
    }

    function centerSignature() {
        setSignature((current) => {
            const width = current.width;
            const height = width * (260 / 900);
            const pdfWidth = canvasSize.width / zoom;
            const pdfHeight = canvasSize.height / zoom;

            return {
                ...current,
                x: Math.max(0, Math.round((pdfWidth - width) / 2)),
                y: Math.max(0, Math.round((pdfHeight - height) / 2)),
                page: pageNumber,
            };
        });

        setStatus("Signature centered on the current page.");
    }

    function startSignatureOverlayDrag(mode, event) {
        if (!signatureDataUrl) return;

        event.preventDefault();
        event.stopPropagation();

        dragRef.current = {
            mode,
            startClientX: event.clientX,
            startClientY: event.clientY,
            startX: signature.x,
            startY: signature.y,
            startWidth: signature.width,
        };

        window.addEventListener("pointermove", handleSignatureOverlayDrag);
        window.addEventListener("pointerup", stopSignatureOverlayDrag);
    }

    function handleSignatureOverlayDrag(event) {
        const drag = dragRef.current;

        if (!drag) return;

        const dx = (event.clientX - drag.startClientX) / zoom;
        const dy = (event.clientY - drag.startClientY) / zoom;
        const pdfWidth = canvasSize.width / zoom;
        const pdfHeight = canvasSize.height / zoom;

        setSignature((current) => {
            if (drag.mode === "resize") {
                const nextWidth = clamp(drag.startWidth + dx, 40, pdfWidth);
                const nextHeight = nextWidth * (260 / 900);

                return {
                    ...current,
                    width: Math.round(nextWidth),
                    x: clamp(current.x, 0, Math.max(0, pdfWidth - nextWidth)),
                    y: clamp(current.y, 0, Math.max(0, pdfHeight - nextHeight)),
                    page: pageNumber,
                };
            }

            const width = current.width;
            const height = width * (260 / 900);

            return {
                ...current,
                x: Math.round(clamp(drag.startX + dx, 0, Math.max(0, pdfWidth - width))),
                y: Math.round(clamp(drag.startY + dy, 0, Math.max(0, pdfHeight - height))),
                page: pageNumber,
            };
        });
    }

    function stopSignatureOverlayDrag() {
        removeSignatureDragListeners();
        dragRef.current = null;
    }

    function removeSignatureDragListeners() {
        window.removeEventListener("pointermove", handleSignatureOverlayDrag);
        window.removeEventListener("pointerup", stopSignatureOverlayDrag);
    }

    async function exportSignedPdf() {
        if (!pdfBytes) {
            setStatus("Upload a PDF first.");
            return;
        }

        if (!signatureDataUrl) {
            setStatus("Draw a signature first.");
            return;
        }

        const pdf = await PDFDocument.load(pdfBytes);
        const signatureImage = await pdf.embedPng(signatureDataUrl);
        const pages = pdf.getPages();
        const pageIndex = Math.max(0, Math.min(pages.length - 1, signature.page - 1));
        const page = pages[pageIndex];

        const pageWidth = page.getWidth();
        const pageHeight = page.getHeight();

        const width = clamp(Number(signature.width) || 180, 20, pageWidth);
        const height = width * (260 / 900);
        const x = clamp(Number(signature.x) || 0, 0, Math.max(0, pageWidth - width));
        const yFromTop = Number(signature.y) || 0;
        const y = clamp(pageHeight - yFromTop - height, 0, Math.max(0, pageHeight - height));

        page.drawImage(signatureImage, {
            x,
            y,
            width,
            height,
        });

        const output = await pdf.save();
        const name = baseName(fileName, "signed-document");

        downloadBytes(`${name}-signed.pdf`, output, "application/pdf");
        setStatus("Signed PDF exported with the rendered signature placement.");
    }

    return (
        <GradientPage>
            <HelmetHeader
                title={preset.title}
                path={`/${preset.slug}`}
                description={preset.description}
                keywords={preset.keywords}
                jsonLd={buildJsonLd(preset)}
            />

            <AppNavBar />

            <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
                <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
                    <Box sx={{ color: "#9ee8ff" }}>{preset.icon}</Box>

                    <Typography
                        variant="overline"
                        sx={{
                            color: "#9ee8ff",
                            fontWeight: 950,
                            letterSpacing: 1.6,
                        }}
                    >
                        {preset.eyebrow}
                    </Typography>
                </Stack>

                <SectionHeader title={preset.h1} description={preset.description} />

                <input
                    ref={fileInputRef}
                    hidden
                    type="file"
                    accept={preset.accept}
                    onChange={handleUpload}
                />

                <Grid container spacing={2.5}>
                    <Grid item xs={12} lg={3.4}>
                        <Paper sx={sidePanelSx}>
                            <Stack spacing={2}>
                                <Button
                                    variant="contained"
                                    startIcon={<UploadFileRoundedIcon />}
                                    onClick={() => fileInputRef.current?.click()}
                                    sx={primaryButtonSx}
                                >
                                    Select File
                                </Button>

                                <Chip label={fileName || "No file selected"} sx={pillSx} />

                                <Typography sx={{ color: "rgba(255,255,255,.68)", lineHeight: 1.65 }}>
                                    {status}
                                </Typography>

                                <Divider sx={{ borderColor: "rgba(255,255,255,.12)" }} />

                                {isPdfMode && (
                                    <>
                                        <Stack direction="row" spacing={1}>
                                            <Button
                                                fullWidth
                                                disabled={pageNumber <= 1}
                                                onClick={() => setPageNumber((value) => Math.max(1, value - 1))}
                                                sx={smallButtonSx}
                                            >
                                                Prev
                                            </Button>

                                            <Button
                                                fullWidth
                                                disabled={pageNumber >= pageCount}
                                                onClick={() =>
                                                    setPageNumber((value) => Math.min(pageCount, value + 1))
                                                }
                                                sx={smallButtonSx}
                                            >
                                                Next
                                            </Button>
                                        </Stack>

                                        <Select
                                            value={pageNumber}
                                            onChange={(event) => setPageNumber(Number(event.target.value))}
                                            fullWidth
                                            sx={selectSx}
                                        >
                                            {pageOptions.map((page) => (
                                                <MenuItem key={page} value={page}>
                                                    Page {page}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                        <Typography sx={{ color: "#dff8ff", fontWeight: 900 }}>
                                            Zoom
                                        </Typography>

                                        <Slider
                                            min={0.7}
                                            max={2.4}
                                            step={0.05}
                                            value={zoom}
                                            onChange={(_, value) => setZoom(value)}
                                        />
                                    </>
                                )}

                                {preset.mode === "convertPdf" && (
                                    <>
                                        <Button startIcon={<ArticleRoundedIcon />} onClick={exportPdfToDocx} sx={primaryButtonSx}>
                                            Export PDF to DOCX
                                        </Button>

                                        <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportPdfText} sx={smallButtonSx}>
                                            Export PDF Text
                                        </Button>

                                        <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportPdfPagePng} sx={smallButtonSx}>
                                            Export Current Page PNG
                                        </Button>

                                        <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportPdfCopy} sx={smallButtonSx}>
                                            Export PDF Copy
                                        </Button>
                                    </>
                                )}

                                {preset.mode === "convertWord" && (
                                    <>
                                        <Button startIcon={<PictureAsPdfRoundedIcon />} onClick={exportWordPdf} sx={primaryButtonSx}>
                                            Export DOCX to PDF
                                        </Button>

                                        <Button startIcon={<ArticleRoundedIcon />} onClick={exportWordDocxCopy} sx={smallButtonSx}>
                                            Export DOCX Copy
                                        </Button>

                                        <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportWordHtml} sx={smallButtonSx}>
                                            Export HTML
                                        </Button>

                                        <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportWordText} sx={smallButtonSx}>
                                            Export TXT
                                        </Button>
                                    </>
                                )}

                                {isCsvMode && (
                                    <>
                                        <Stack spacing={0.75}>
                                            <Typography sx={{ color: "#dff8ff", fontWeight: 950 }}>
                                                CSV stats
                                            </Typography>
                                            <Typography sx={{ color: "rgba(255,255,255,.65)", fontSize: 13 }}>
                                                Rows: {csvStats.rowCount} • Columns: {csvStats.columnCount} • Empty cells: {csvStats.emptyCells}
                                            </Typography>
                                        </Stack>

                                        {(preset.mode === "convertCsv" || preset.mode === "csvToJson") && (
                                            <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportCsvAsJson} sx={primaryButtonSx}>
                                                Export CSV to JSON
                                            </Button>
                                        )}

                                        {(preset.mode === "convertCsv" || preset.mode === "jsonToCsv") && (
                                            <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportJsonAsCsv} sx={primaryButtonSx}>
                                                Export JSON to CSV
                                            </Button>
                                        )}

                                        {(preset.mode === "convertCsv" || preset.mode === "csvCleaner") && (
                                            <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportCleanCsv} sx={smallButtonSx}>
                                                Clean & Export CSV
                                            </Button>
                                        )}

                                        {(preset.mode === "convertCsv" || preset.mode === "csvDuplicates") && (
                                            <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportDedupeCsv} sx={smallButtonSx}>
                                                Remove Duplicates
                                            </Button>
                                        )}

                                        {(preset.mode === "convertCsv" || preset.mode === "csvDelimiter") && (
                                            <>
                                                <Button onClick={() => exportDelimitedCsv(",")} sx={smallButtonSx}>
                                                    Export Comma CSV
                                                </Button>

                                                <Button onClick={() => exportDelimitedCsv(";")} sx={smallButtonSx}>
                                                    Export Semicolon CSV
                                                </Button>

                                                <Button onClick={() => exportDelimitedCsv("\t")} sx={smallButtonSx}>
                                                    Export Tab TSV
                                                </Button>

                                                <Button onClick={() => exportDelimitedCsv("|")} sx={smallButtonSx}>
                                                    Export Pipe CSV
                                                </Button>
                                            </>
                                        )}

                                        {(preset.mode === "convertCsv" || preset.mode === "csvToPdf") && (
                                            <Button startIcon={<PictureAsPdfRoundedIcon />} onClick={exportCsvPdf} sx={smallButtonSx}>
                                                Export CSV to PDF
                                            </Button>
                                        )}
                                    </>
                                )}

                                {isVideoMode && (
                                    <>
                                        <Typography sx={{ color: "#dff8ff", fontWeight: 950 }}>
                                            Output resolution height
                                        </Typography>
                                        <Select
                                            value={videoSettings.height}
                                            onChange={(event) =>
                                                setVideoSettings((current) => ({
                                                    ...current,
                                                    height: Number(event.target.value),
                                                }))
                                            }
                                            fullWidth
                                            sx={selectSx}
                                        >
                                            <MenuItem value={1080}>1080p</MenuItem>
                                            <MenuItem value={720}>720p Recommended</MenuItem>
                                            <MenuItem value={480}>480p Small Upload</MenuItem>
                                            <MenuItem value={360}>360p Tiny File</MenuItem>
                                        </Select>

                                        <Typography sx={{ color: "#dff8ff", fontWeight: 950 }}>
                                            Quality CRF: {videoSettings.crf}
                                        </Typography>
                                        <Slider
                                            min={20}
                                            max={36}
                                            step={1}
                                            value={videoSettings.crf}
                                            onChange={(_, value) =>
                                                setVideoSettings((current) => ({
                                                    ...current,
                                                    crf: value,
                                                }))
                                            }
                                        />

                                        <Typography sx={{ color: "#dff8ff", fontWeight: 950 }}>
                                            Video bitrate: {videoSettings.videoBitrate} kbps
                                        </Typography>
                                        <Slider
                                            min={500}
                                            max={6000}
                                            step={100}
                                            value={videoSettings.videoBitrate}
                                            onChange={(_, value) =>
                                                setVideoSettings((current) => ({
                                                    ...current,
                                                    videoBitrate: value,
                                                }))
                                            }
                                        />

                                        <Typography sx={{ color: "#dff8ff", fontWeight: 950 }}>
                                            Frame rate
                                        </Typography>
                                        <Select
                                            value={videoSettings.fps}
                                            onChange={(event) =>
                                                setVideoSettings((current) => ({
                                                    ...current,
                                                    fps: Number(event.target.value),
                                                }))
                                            }
                                            fullWidth
                                            sx={selectSx}
                                        >
                                            <MenuItem value={30}>30 FPS Recommended</MenuItem>
                                            <MenuItem value={24}>24 FPS Smaller</MenuItem>
                                            <MenuItem value={15}>15 FPS Very Small</MenuItem>
                                        </Select>

                                        <Typography sx={{ color: "#dff8ff", fontWeight: 950 }}>
                                            Audio bitrate: {videoSettings.audioBitrate} kbps
                                        </Typography>
                                        <Slider
                                            min={64}
                                            max={192}
                                            step={32}
                                            value={videoSettings.audioBitrate}
                                            onChange={(_, value) =>
                                                setVideoSettings((current) => ({
                                                    ...current,
                                                    audioBitrate: value,
                                                }))
                                            }
                                        />

                                        <Button startIcon={<TransformRoundedIcon />} onClick={compressVideoWithFfmpeg} sx={primaryButtonSx}>
                                            Compress to MP4
                                        </Button>

                                        <Button
                                            startIcon={<FileDownloadRoundedIcon />}
                                            onClick={downloadCompressedVideo}
                                            disabled={!compressedVideoBlob}
                                            sx={smallButtonSx}
                                        >
                                            Download Compressed MP4
                                        </Button>

                                        {(ffmpegProgress > 0 || ffmpegLog) && (
                                            <Box>
                                                <LinearProgress
                                                    variant={ffmpegProgress > 0 ? "determinate" : "indeterminate"}
                                                    value={ffmpegProgress}
                                                    sx={{ mb: 1, borderRadius: 999 }}
                                                />
                                                <Typography sx={{ color: "rgba(255,255,255,.62)", fontSize: 12 }}>
                                                    {ffmpegProgress}% {ffmpegLog ? `• ${ffmpegLog}` : ""}
                                                </Typography>
                                            </Box>
                                        )}
                                    </>
                                )}

                                {isZipMode && (
                                    <>
                                        {zipStats && (
                                            <Typography sx={{ color: "rgba(255,255,255,.68)", lineHeight: 1.65 }}>
                                                Files: {zipStats.fileCount} • Junk files: {zipStats.junkCount} • Original: {formatBytes(zipStats.originalSize)}
                                            </Typography>
                                        )}

                                        <Typography sx={{ color: "rgba(255,255,255,.58)", lineHeight: 1.65, fontSize: 13 }}>
                                            ZIP, MP4, MOV, JPG, PNG, and PDF files are often already compressed.
                                            Rebuilding may help most when the ZIP contains text, CSV, docs, or junk files.
                                        </Typography>

                                        <Button startIcon={<TransformRoundedIcon />} onClick={optimizeZipFile} sx={primaryButtonSx}>
                                            Optimize ZIP
                                        </Button>

                                        <Button
                                            startIcon={<FileDownloadRoundedIcon />}
                                            onClick={downloadOptimizedZip}
                                            disabled={!optimizedZipBlob}
                                            sx={smallButtonSx}
                                        >
                                            Download Optimized ZIP
                                        </Button>
                                    </>
                                )}

                                {preset.mode === "signDocument" && (
                                    <>
                                        <Divider sx={{ borderColor: "rgba(255,255,255,.12)" }} />

                                        <Typography sx={{ color: "#dff8ff", fontWeight: 950 }}>
                                            Signature placement
                                        </Typography>

                                        <TextField
                                            label="Signature page"
                                            type="number"
                                            value={signature.page}
                                            onChange={(event) =>
                                                setSignature((current) => ({
                                                    ...current,
                                                    page: clamp(Number(event.target.value) || 1, 1, pageCount || 1),
                                                }))
                                            }
                                            sx={textFieldSx}
                                        />

                                        <TextField
                                            label="X position"
                                            type="number"
                                            value={signature.x}
                                            onChange={(event) =>
                                                setSignature((current) => ({
                                                    ...current,
                                                    x: Number(event.target.value),
                                                }))
                                            }
                                            sx={textFieldSx}
                                        />

                                        <TextField
                                            label="Y position from top"
                                            type="number"
                                            value={signature.y}
                                            onChange={(event) =>
                                                setSignature((current) => ({
                                                    ...current,
                                                    y: Number(event.target.value),
                                                }))
                                            }
                                            sx={textFieldSx}
                                        />

                                        <TextField
                                            label="Signature width"
                                            type="number"
                                            value={signature.width}
                                            onChange={(event) =>
                                                setSignature((current) => ({
                                                    ...current,
                                                    width: Math.max(20, Number(event.target.value) || 20),
                                                }))
                                            }
                                            sx={textFieldSx}
                                        />

                                        <Typography sx={{ color: "#dff8ff", fontWeight: 900 }}>
                                            Scale / resize
                                        </Typography>

                                        <Slider
                                            min={40}
                                            max={520}
                                            value={signature.width}
                                            onChange={(_, value) =>
                                                setSignature((current) => ({
                                                    ...current,
                                                    width: value,
                                                }))
                                            }
                                        />

                                        <TextField
                                            label="Ink color"
                                            type="color"
                                            value={signature.color}
                                            onChange={(event) =>
                                                setSignature((current) => ({
                                                    ...current,
                                                    color: event.target.value,
                                                }))
                                            }
                                            InputLabelProps={{ shrink: true }}
                                            sx={textFieldSx}
                                        />

                                        <Typography sx={{ color: "#dff8ff", fontWeight: 900 }}>
                                            Ink thickness
                                        </Typography>

                                        <Slider
                                            min={1}
                                            max={12}
                                            value={signature.lineWidth}
                                            onChange={(_, value) =>
                                                setSignature((current) => ({
                                                    ...current,
                                                    lineWidth: value,
                                                }))
                                            }
                                        />

                                        <Stack direction="row" spacing={1}>
                                            <Button fullWidth startIcon={<DragIndicatorRoundedIcon />} onClick={centerSignature} sx={smallButtonSx}>
                                                Center
                                            </Button>

                                            <Button fullWidth startIcon={<PictureAsPdfRoundedIcon />} onClick={moveSignatureToPage} sx={smallButtonSx}>
                                                Use Page
                                            </Button>
                                        </Stack>

                                        <Button startIcon={<ClearRoundedIcon />} onClick={clearSignature} sx={smallButtonSx}>
                                            Clear Signature
                                        </Button>

                                        <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportSignedPdf} sx={primaryButtonSx}>
                                            Export Signed PDF
                                        </Button>
                                    </>
                                )}

                                <Button
                                    component={RouterLink}
                                    to="/office-tools"
                                    endIcon={<OpenInNewRoundedIcon />}
                                    sx={smallButtonSx}
                                >
                                    All Additional Tools
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} lg={8.6}>
                        <Paper sx={previewPanelSx}>
                            {isPdfMode && (
                                <Box sx={canvasWrapSx}>
                                    {pdfDoc ? (
                                        <Box
                                            sx={{
                                                width: canvasSize.width,
                                                height: canvasSize.height,
                                                position: "relative",
                                            }}
                                        >
                                            <canvas
                                                ref={canvasRef}
                                                style={{
                                                    display: "block",
                                                    borderRadius: 12,
                                                    boxShadow: "0 24px 80px rgba(0,0,0,.35)",
                                                }}
                                            />

                                            {preset.mode === "signDocument" &&
                                                signatureDataUrl &&
                                                signature.page === pageNumber && (
                                                    <Box
                                                        onPointerDown={(event) => startSignatureOverlayDrag("move", event)}
                                                        sx={{
                                                            position: "absolute",
                                                            left: signatureDisplay.left,
                                                            top: signatureDisplay.top,
                                                            width: signatureDisplay.width,
                                                            height: signatureDisplay.height,
                                                            border: "2px solid rgba(158,232,255,.95)",
                                                            borderRadius: 1.5,
                                                            background: "rgba(158,232,255,.06)",
                                                            cursor: "move",
                                                            touchAction: "none",
                                                            boxShadow: "0 12px 30px rgba(0,0,0,.24)",
                                                        }}
                                                    >
                                                        <Box
                                                            component="img"
                                                            src={signatureDataUrl}
                                                            alt="Rendered signature placement"
                                                            draggable={false}
                                                            sx={{
                                                                width: "100%",
                                                                height: "100%",
                                                                display: "block",
                                                                objectFit: "contain",
                                                                pointerEvents: "none",
                                                            }}
                                                        />

                                                        <Box
                                                            sx={{
                                                                position: "absolute",
                                                                left: 6,
                                                                top: 6,
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 0.5,
                                                                px: 0.7,
                                                                py: 0.35,
                                                                borderRadius: 999,
                                                                color: "#061019",
                                                                fontSize: 11,
                                                                fontWeight: 950,
                                                                background: "linear-gradient(135deg, #9ee8ff, #b38cff)",
                                                                pointerEvents: "none",
                                                            }}
                                                        >
                                                            <DragIndicatorRoundedIcon sx={{ fontSize: 14 }} />
                                                            Drag
                                                        </Box>

                                                        <Box
                                                            onPointerDown={(event) => startSignatureOverlayDrag("resize", event)}
                                                            sx={{
                                                                position: "absolute",
                                                                right: -11,
                                                                bottom: -11,
                                                                width: 26,
                                                                height: 26,
                                                                borderRadius: "9px",
                                                                display: "grid",
                                                                placeItems: "center",
                                                                color: "#061019",
                                                                background: "linear-gradient(135deg, #9ee8ff, #b38cff)",
                                                                border: "2px solid #061019",
                                                                cursor: "nwse-resize",
                                                                touchAction: "none",
                                                            }}
                                                        >
                                                            <AspectRatioRoundedIcon sx={{ fontSize: 16 }} />
                                                        </Box>
                                                    </Box>
                                                )}
                                        </Box>
                                    ) : (
                                        <EmptyState text="Upload a PDF to preview it." />
                                    )}
                                </Box>
                            )}

                            {isWordMode && (
                                <Box sx={documentPreviewSx}>
                                    {htmlPreview ? (
                                        <Box dangerouslySetInnerHTML={{ __html: htmlPreview }} />
                                    ) : (
                                        <EmptyState text="Upload a DOCX file to preview or convert it to PDF, HTML, TXT, or DOCX." />
                                    )}
                                </Box>
                            )}

                            {preset.mode === "viewPowerPoint" && (
                                <Stack spacing={2}>
                                    {slides.length > 0 ? (
                                        slides.map((slide, index) => (
                                            <Card key={slide.name} sx={slideCardSx}>
                                                <CardContent>
                                                    <Typography variant="overline" sx={{ color: "#9ee8ff", fontWeight: 950 }}>
                                                        Slide {index + 1}
                                                    </Typography>

                                                    <Typography variant="h5" sx={{ fontWeight: 950, mb: 1 }}>
                                                        {slide.title}
                                                    </Typography>

                                                    <Typography
                                                        component="pre"
                                                        sx={{
                                                            whiteSpace: "pre-wrap",
                                                            color: "rgba(255,255,255,.74)",
                                                            lineHeight: 1.6,
                                                            fontFamily: "inherit",
                                                        }}
                                                    >
                                                        {slide.text}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <EmptyState text="Upload a PPTX file to view extracted slide text." />
                                    )}
                                </Stack>
                            )}

                            {isCsvMode && (
                                csvRows.length > 0 ? (
                                    <TableContainer sx={{ maxHeight: "72vh", background: "white" }}>
                                        <Table stickyHeader size="small">
                                            <TableHead>
                                                <TableRow>
                                                    {csvRows[0].map((cell, index) => (
                                                        <TableCell
                                                            key={index}
                                                            sx={{
                                                                background: "#eef2ff",
                                                                color: "#111827",
                                                                fontWeight: 950,
                                                            }}
                                                        >
                                                            {cell || `Column ${index + 1}`}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {csvRows.slice(1, 501).map((row, rowIndex) => (
                                                    <TableRow key={rowIndex}>
                                                        {row.map((cell, cellIndex) => (
                                                            <TableCell
                                                                key={cellIndex}
                                                                sx={{
                                                                    color: "#111827",
                                                                    borderColor: "#d1d5db",
                                                                }}
                                                            >
                                                                {cell}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                ) : (
                                    <EmptyState text="Upload a CSV, TSV, or JSON file to preview and convert it." />
                                )
                            )}

                            {isVideoMode && (
                                <Stack spacing={2}>
                                    {videoUrl ? (
                                        <>
                                            <Card sx={slideCardSx}>
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ fontWeight: 950, mb: 1 }}>
                                                        Original video
                                                    </Typography>
                                                    <Box
                                                        component="video"
                                                        src={videoUrl}
                                                        controls
                                                        sx={{
                                                            width: "100%",
                                                            maxHeight: 420,
                                                            borderRadius: 3,
                                                            background: "black",
                                                        }}
                                                    />
                                                    <Typography sx={{ color: "rgba(255,255,255,.66)", mt: 1 }}>
                                                        Original size: {formatBytes(file?.size || 0)}
                                                    </Typography>
                                                </CardContent>
                                            </Card>

                                            {compressedVideoUrl && (
                                                <Card sx={slideCardSx}>
                                                    <CardContent>
                                                        <Typography variant="h6" sx={{ fontWeight: 950, mb: 1 }}>
                                                            Compressed MP4 preview
                                                        </Typography>
                                                        <Box
                                                            component="video"
                                                            src={compressedVideoUrl}
                                                            controls
                                                            sx={{
                                                                width: "100%",
                                                                maxHeight: 420,
                                                                borderRadius: 3,
                                                                background: "black",
                                                            }}
                                                        />
                                                        <Typography sx={{ color: "rgba(255,255,255,.66)", mt: 1 }}>
                                                            Compressed size: {formatBytes(compressedVideoBlob?.size || 0)}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </>
                                    ) : (
                                        <EmptyState text="Upload an MP4, MOV, or WEBM video to compress it into a smaller MP4 for upload." />
                                    )}
                                </Stack>
                            )}

                            {isZipMode && (
                                <Stack spacing={2}>
                                    {zipStats ? (
                                        <Card sx={slideCardSx}>
                                            <CardContent>
                                                <Typography variant="h5" sx={{ fontWeight: 950, mb: 1 }}>
                                                    ZIP ready for optimization
                                                </Typography>
                                                <Typography sx={{ color: "rgba(255,255,255,.72)", lineHeight: 1.75 }}>
                                                    Files found: {zipStats.fileCount}
                                                    <br />
                                                    Common junk files: {zipStats.junkCount}
                                                    <br />
                                                    Original size: {formatBytes(zipStats.originalSize)}
                                                    <br />
                                                    Optimized size: {optimizedZipBlob ? formatBytes(optimizedZipBlob.size) : "Not exported yet"}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ) : (
                                        <EmptyState text="Upload a ZIP file to clean junk entries and rebuild it with maximum compression." />
                                    )}
                                </Stack>
                            )}

                            {preset.mode === "signDocument" && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 950, mb: 1 }}>
                                        Draw your signature
                                    </Typography>

                                    <Typography sx={{ color: "rgba(255,255,255,.65)", mb: 2 }}>
                                        Use a mouse, touch screen, stylus, or USB drawing tablet. After
                                        drawing, the signature appears on top of the PDF preview. Drag the
                                        signature to move it, use the corner handle to resize it, or adjust
                                        X/Y/width from the side controls.
                                    </Typography>

                                    <Box
                                        sx={{
                                            background: "white",
                                            borderRadius: 3,
                                            overflow: "hidden",
                                            border: "1px solid rgba(255,255,255,.16)",
                                            touchAction: "none",
                                        }}
                                    >
                                        <canvas
                                            ref={signatureCanvasRef}
                                            width={900}
                                            height={260}
                                            onPointerDown={startSignature}
                                            onPointerMove={drawSignature}
                                            onPointerUp={stopSignature}
                                            onPointerLeave={stopSignature}
                                            style={{
                                                width: "100%",
                                                height: 260,
                                                display: "block",
                                                cursor: "crosshair",
                                            }}
                                        />
                                    </Box>
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </GradientPage>
    );
}

function EmptyState({ text }) {
    return (
        <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 380, textAlign: "center" }}
        >
            <VisibilityRoundedIcon sx={{ fontSize: 70, color: "#9ee8ff" }} />
            <Typography variant="h5" sx={{ fontWeight: 950 }}>
                Select a file to begin
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,.68)", maxWidth: 520 }}>
                {text}
            </Typography>
        </Stack>
    );
}

const pillSx = {
    width: "fit-content",
    color: "#dff8ff",
    fontWeight: 950,
    border: "1px solid rgba(158,232,255,.25)",
    background: "rgba(158,232,255,.08)",
    "& .MuiChip-icon": {
        color: "#9ee8ff",
    },
};

const toolCardSx = {
    height: "100%",
    textDecoration: "none",
    color: "white",
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 24px 70px rgba(0,0,0,.28)",
    transition: "transform 180ms ease, border-color 180ms ease",
    "&:hover": {
        transform: "translateY(-4px)",
        borderColor: "rgba(158,232,255,.38)",
    },
};

const iconBoxSx = {
    width: 54,
    height: 54,
    borderRadius: "18px",
    display: "grid",
    placeItems: "center",
    color: "#9ee8ff",
    background: "rgba(158,232,255,.12)",
    border: "1px solid rgba(158,232,255,.18)",
};

const sidePanelSx = {
    p: 2,
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.12)",
    backdropFilter: "blur(18px)",
    position: { lg: "sticky" },
    top: 94,
};

const previewPanelSx = {
    minHeight: "76vh",
    p: 2,
    background: "rgba(255,255,255,.055)",
    border: "1px solid rgba(255,255,255,.12)",
    backdropFilter: "blur(18px)",
    overflow: "hidden",
};

const canvasWrapSx = {
    minHeight: "70vh",
    overflow: "auto",
    display: "grid",
    placeItems: "start center",
    background:
        "linear-gradient(45deg, rgba(255,255,255,.045) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,.045) 25%, transparent 25%)",
    backgroundSize: "26px 26px",
    borderRadius: 3,
    p: 2,
};

const documentPreviewSx = {
    minHeight: "70vh",
    maxWidth: 900,
    mx: "auto",
    p: { xs: 3, md: 6 },
    background: "white",
    color: "#111827",
    borderRadius: 2,
    lineHeight: 1.7,
    boxShadow: "0 24px 80px rgba(0,0,0,.28)",
    "& table": {
        borderCollapse: "collapse",
        width: "100%",
        my: 2,
    },
    "& td, & th": {
        border: "1px solid #9ca3af",
        p: 1,
    },
};

const slideCardSx = {
    background: "rgba(255,255,255,.06)",
    color: "white",
    border: "1px solid rgba(255,255,255,.12)",
};

const primaryButtonSx = {
    color: "#061019",
    fontWeight: 950,
    background: "linear-gradient(135deg, #9ee8ff 0%, #b38cff 100%)",
    "&:hover": {
        background: "linear-gradient(135deg, #c8f4ff 0%, #cbb2ff 100%)",
    },
    "&.Mui-disabled": {
        color: "rgba(6,16,25,.5)",
        opacity: 0.6,
    },
};

const smallButtonSx = {
    color: "white",
    border: "1px solid rgba(255,255,255,.16)",
    justifyContent: "flex-start",
    fontWeight: 850,
};

const selectSx = {
    color: "white",
    background: "rgba(0,0,0,.22)",
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255,255,255,.16)",
    },
    "& .MuiSvgIcon-root": {
        color: "#9ee8ff",
    },
};

const textFieldSx = {
    "& .MuiInputLabel-root": {
        color: "rgba(255,255,255,.65)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#9ee8ff",
    },
    "& .MuiOutlinedInput-root": {
        color: "white",
        background: "rgba(0,0,0,.22)",
        "& fieldset": {
            borderColor: "rgba(255,255,255,.16)",
        },
        "&:hover fieldset": {
            borderColor: "rgba(158,232,255,.35)",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#9ee8ff",
        },
    },
};