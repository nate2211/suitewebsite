import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import JSZip from "jszip";
import { heicTo, isHeic } from "heic-to";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import pdfWorkerUrl from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";
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
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import { AppNavBar, GradientPage, SectionHeader } from "./components.jsx";
import HelmetHeader from "./HelmetHeader.jsx";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const SITE_URL = "https://suiteofficelab.com";
const FFMPEG_CORE_BASE_URL =
    "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd";

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
            "Use focused browser tools to view, convert, compress, clean, print, export, and sign office files directly from browser-based pages.",
        keywords:
            "browser office tools, view PDF online, print PDF online, print Word online, convert PDF to JPG, JPG to PDF, HEIC to JPG, MP3 to WAV, WAV to MP3, CSV converter",
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
            "Upload a PDF and convert it to DOCX, TXT, PNG page previews, JPG page images, or a browser-generated PDF copy.",
        keywords:
            "convert PDF online, PDF to DOCX, PDF to Word, PDF to text, PDF to PNG, PDF to JPG, browser PDF converter",
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
            "Upload a DOCX file and convert it to PDF, HTML, plain text, or a browser-generated DOCX copy.",
        keywords:
            "convert Word document online, DOCX to PDF, DOCX to HTML, DOCX to text, browser Word converter",
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
            "Upload a PPTX file and view extracted slide text, slide numbers, and readable presentation content.",
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
            "Upload a PDF, draw a signature with mouse, pen, touch, or drawing tablet input, place it on a page, and export a signed PDF.",
        keywords:
            "sign PDF online, sign document online, draw signature, browser PDF signing",
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
            "Upload MP4, MOV, or WEBM videos and create a smaller browser-generated MP4 for sharing or upload.",
        keywords:
            "compress video online, reduce video file size, compress MP4, compress MOV, video compressor",
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
            "Upload an MP4 video and reduce its file size with browser video compression settings.",
        keywords:
            "compress MP4 online, reduce MP4 file size, MP4 compressor, smaller MP4 file",
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
            "Upload a MOV file from iPhone, Mac, QuickTime, or webcam workflows and create a smaller MP4 copy.",
        keywords:
            "compress MOV online, reduce MOV file size, QuickTime video compressor, iPhone MOV compressor",
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
            "Upload a ZIP file, remove common junk files, rebuild it with DEFLATE compression, and export an optimized ZIP copy.",
        keywords:
            "compress ZIP online, reduce ZIP file size, optimize ZIP file, clean ZIP file",
    },

    "convert-csv": {
        slug: "convert-csv",
        title: "Convert CSV Online",
        h1: "Convert CSV files online",
        shortTitle: "Convert CSV",
        eyebrow: "CSV Converter",
        icon: <TableChartRoundedIcon />,
        mode: "convertCsv",
        accept:
            ".csv,text/csv,.tsv,text/tab-separated-values,.json,application/json,text/plain",
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
            "JSON to CSV, convert JSON to CSV online, JSON spreadsheet converter",
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
            "CSV cleaner online, clean CSV file, remove blank CSV rows, trim CSV spaces",
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
            "remove duplicate CSV rows, deduplicate CSV online, CSV duplicate remover",
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
            "CSV delimiter converter, convert CSV to TSV, comma to semicolon CSV",
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
            "CSV to PDF, convert CSV to PDF online, spreadsheet to PDF",
    },

    "pdf-to-jpg": {
        slug: "pdf-to-jpg",
        title: "Convert PDF to JPG Free",
        h1: "Convert PDF to JPG free",
        shortTitle: "PDF to JPG",
        eyebrow: "PDF Image Converter",
        icon: <PictureAsPdfRoundedIcon />,
        mode: "pdfToJpg",
        accept: ".pdf,application/pdf",
        description:
            "Upload a PDF and export the current page or every page as high-quality JPG images directly in your browser.",
        keywords:
            "convert PDF to JPG free, PDF to JPG online, PDF page to image, PDF image converter",
    },

    "jpg-to-pdf": {
        slug: "jpg-to-pdf",
        title: "Convert JPG to PDF Free",
        h1: "Convert JPG to PDF free",
        shortTitle: "JPG to PDF",
        eyebrow: "Image PDF Converter",
        icon: <TransformRoundedIcon />,
        mode: "jpgToPdf",
        accept: ".jpg,.jpeg,.png,image/jpeg,image/png",
        description:
            "Upload a JPG, JPEG, or PNG image and convert it into a browser-generated PDF file for free.",
        keywords:
            "convert JPG to PDF free, JPG to PDF online, JPEG to PDF, image to PDF converter",
    },

    "heic-to-jpg": {
        slug: "heic-to-jpg",
        title: "Convert HEIC to JPG Free",
        h1: "Convert HEIC to JPG free",
        shortTitle: "HEIC to JPG",
        eyebrow: "Image Converter",
        icon: <TransformRoundedIcon />,
        mode: "heicToJpg",
        accept:
            ".heic,.HEIC,.heif,.HEIF,image/heic,image/heif,image/heic-sequence,image/heif-sequence",
        description:
            "Upload an iPhone HEIC or HEIF image and convert it to a standard JPG image directly in your browser.",
        keywords:
            "convert HEIC to JPG free, HEIC to JPG online, iPhone photo converter, HEIF to JPG",
    },

    "fahrenheit-to-celsius": {
        slug: "fahrenheit-to-celsius",
        title: "Convert Fahrenheit to Celsius",
        h1: "Convert Fahrenheit to Celsius",
        shortTitle: "Fahrenheit to Celsius",
        eyebrow: "Temperature Converter",
        icon: <TransformRoundedIcon />,
        mode: "temperature",
        temperatureDirection: "fToC",
        accept: "",
        description:
            "Convert Fahrenheit temperatures to Celsius instantly with a simple free browser calculator.",
        keywords:
            "convert Fahrenheit to Celsius, F to C calculator, temperature converter",
    },

    "celsius-to-fahrenheit": {
        slug: "celsius-to-fahrenheit",
        title: "Convert Celsius to Fahrenheit",
        h1: "Convert Celsius to Fahrenheit",
        shortTitle: "Celsius to Fahrenheit",
        eyebrow: "Temperature Converter",
        icon: <TransformRoundedIcon />,
        mode: "temperature",
        temperatureDirection: "cToF",
        accept: "",
        description:
            "Convert Celsius temperatures to Fahrenheit instantly with a simple free browser calculator.",
        keywords:
            "convert Celsius to Fahrenheit, C to F calculator, temperature converter",
    },

    "convert-to-mp3": {
        slug: "convert-to-mp3",
        title: "Convert to MP3 Free",
        h1: "Convert audio or video to MP3 free",
        shortTitle: "Convert to MP3",
        eyebrow: "Audio Converter",
        icon: <TransformRoundedIcon />,
        mode: "audioToMp3",
        accept: "audio/*,video/*,.mp3,.wav,.m4a,.aac,.ogg,.flac,.mp4,.mov,.webm",
        description:
            "Upload audio or video and export the sound as an MP3 file directly in your browser.",
        keywords:
            "convert to MP3 free, audio to MP3, video to MP3, browser MP3 converter",
    },

    "mp3-to-wav": {
        slug: "mp3-to-wav",
        title: "Convert MP3 to WAV Free",
        h1: "Convert MP3 to WAV free",
        shortTitle: "MP3 to WAV",
        eyebrow: "Audio Converter",
        icon: <TransformRoundedIcon />,
        mode: "mp3ToWav",
        accept: ".mp3,audio/mpeg,audio/mp3",
        description:
            "Upload an MP3 file and convert it to a WAV file directly in your browser.",
        keywords:
            "MP3 to WAV free, convert MP3 to WAV online, browser audio converter",
    },

    "wav-to-mp3": {
        slug: "wav-to-mp3",
        title: "Convert WAV to MP3 Free",
        h1: "Convert WAV to MP3 free",
        shortTitle: "WAV to MP3",
        eyebrow: "Audio Converter",
        icon: <TransformRoundedIcon />,
        mode: "wavToMp3",
        accept: ".wav,audio/wav,audio/x-wav",
        description:
            "Upload a WAV file and convert it to a smaller MP3 file directly in your browser.",
        keywords:
            "WAV to MP3 free, convert WAV to MP3 online, browser audio converter",
    },

    "print-pdf": {
        slug: "print-pdf",
        title: "Print PDF Online",
        h1: "Print PDF online",
        shortTitle: "Print PDF",
        eyebrow: "PDF Printer",
        icon: <PictureAsPdfRoundedIcon />,
        mode: "printPdf",
        accept: ".pdf,application/pdf",
        description:
            "Upload a PDF, preview the pages, and open the browser print dialog for the document.",
        keywords:
            "print PDF online, free PDF printer, browser PDF print, print PDF document",
    },

    "print-word": {
        slug: "print-word",
        title: "Print Word Document Online",
        h1: "Print Word documents online",
        shortTitle: "Print Word",
        eyebrow: "Word Printer",
        icon: <DescriptionRoundedIcon />,
        mode: "printWord",
        accept:
            ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        description:
            "Upload a DOCX file, preview the document as browser-readable HTML, and print it from the browser.",
        keywords:
            "print Word document online, print DOCX online, browser Word printer",
    },
};

const SLUG_ALIASES = {
    "convert-pdf-to-jpg": "pdf-to-jpg",
    "convert-jpg-to-pdf": "jpg-to-pdf",
    "convert-heic-to-jpg": "heic-to-jpg",
};

const DEFAULT_SLUG = "office-tools";

function getSlug(pathname) {
    const clean = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
    const normalized = SLUG_ALIASES[clean] || clean;

    return TOOL_PRESETS[normalized] ? normalized : DEFAULT_SLUG;
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

function xmlEscape(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
}

function stripHtml(html) {
    const element = document.createElement("div");
    element.innerHTML = html;
    return element.innerText || element.textContent || "";
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

async function textPagesToDocxBytes({ title, pages }) {
    const zip = new JSZip();

    const paragraphs = pages.flatMap((page) => [
        `Page ${page.pageNumber}`,
        page.text || "No selectable text found on this page.",
    ]);

    zip.file(
        "[Content_Types].xml",
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`
    );

    zip.folder("_rels").file(
        ".rels",
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`
    );

    zip.folder("word").file("document.xml", buildDocxDocumentXml({ title, paragraphs }));
    zip.folder("word").folder("_rels").file(
        "document.xml.rels",
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>`
    );

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

    zip.file(
        "[Content_Types].xml",
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`
    );

    zip.folder("_rels").file(
        ".rels",
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`
    );

    zip.folder("word").file("document.xml", buildDocxDocumentXml({ title, paragraphs }));
    zip.folder("word").folder("_rels").file(
        "document.xml.rels",
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>`
    );

    return zip.generateAsync({
        type: "uint8array",
        compression: "DEFLATE",
    });
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

function openPrintableHtml({ title, body }) {
    const printWindow = window.open("", "_blank", "noopener,noreferrer");

    if (!printWindow) return false;

    printWindow.document.open();
    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(title || "Print Document")}</title>
<style>
body{font-family:Arial,sans-serif;background:white;color:#111827;padding:38px;}
main{max-width:920px;margin:0 auto;}
table{border-collapse:collapse;width:100%;margin:18px 0;}
td,th{border:1px solid #9ca3af;padding:8px;}
p{line-height:1.65;}
@media print{body{padding:0;}main{max-width:none;}}
</style>
</head>
<body>
<main>${body}</main>
<script>
window.onload = function () {
window.focus();
window.print();
};
</script>
</body>
</html>`);
    printWindow.document.close();

    return true;
}

function openPrintableBlob(blob, title = "Print Document") {
    const url = URL.createObjectURL(blob);
    const printWindow = window.open("", "_blank", "noopener,noreferrer");

    if (!printWindow) {
        URL.revokeObjectURL(url);
        return false;
    }

    printWindow.document.open();
    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(title)}</title>
<style>
html,body{margin:0;width:100%;height:100%;overflow:hidden;}
iframe{border:0;width:100vw;height:100vh;}
</style>
</head>
<body>
<iframe src="${url}" onload="this.contentWindow.focus();this.contentWindow.print();"></iframe>
</body>
</html>`);
    printWindow.document.close();

    setTimeout(() => URL.revokeObjectURL(url), 60000);

    return true;
}

function buildJsonLd(preset) {
    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: preset.title,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web Browser",
        url: `${SITE_URL}/${preset.slug}`,
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

function getMediaInputName(fileName) {
    const clean = String(fileName || "input.media").replace(/[^\w.-]/g, "_");
    const extension = clean.match(/\.[^.]+$/)?.[0] || ".media";
    return `input${extension}`;
}

function canvasToBlob(canvas, type = "image/jpeg", quality = 0.92) {
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (blob) resolve(blob);
                else reject(new Error("Could not create image blob."));
            },
            type,
            quality
        );
    });
}

async function normalizeJpegBlob(value) {
    if (!value) {
        throw new Error("The HEIC converter did not return an output file.");
    }

    if (value instanceof Blob) {
        return value.type === "image/jpeg"
            ? value
            : new Blob([await value.arrayBuffer()], { type: "image/jpeg" });
    }

    if (value instanceof ArrayBuffer) {
        return new Blob([value], { type: "image/jpeg" });
    }

    if (value?.buffer instanceof ArrayBuffer) {
        return new Blob([value.buffer], { type: "image/jpeg" });
    }

    throw new Error("The HEIC converter returned an unsupported output type.");
}

function EmptyState({ text }) {
    return (
        <Paper sx={emptyStateSx}>
            <Typography sx={{ color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>
                {text}
            </Typography>
        </Paper>
    );
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

export default function AdditionalPages() {
    return <AdditionalOfficeToolPage />;
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
                        View, convert, compress, clean, print, and sign files from focused browser pages.
                    </Typography>

                    <Typography sx={{ color: "rgba(255,255,255,.7)", fontSize: 18, lineHeight: 1.75 }}>
                        These pages are built for direct SEO URLs. Convert PDF to JPG, JPG to PDF,
                        HEIC to JPG, Fahrenheit to Celsius, Celsius to Fahrenheit, audio to MP3,
                        MP3 to WAV, WAV to MP3, print PDF, print Word, clean CSV files, compress
                        videos, optimize ZIP files, and sign PDF documents.
                    </Typography>
                </Stack>

                <Grid container spacing={2.5}>
                    {tools.map((tool) => (
                        <Grid item xs={12} sm={6} lg={3} key={tool.slug}>
                            <Card component={RouterLink} to={`/${tool.slug}`} sx={toolCardSx}>
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
        crf: 28,
        fps: 30,
        videoBitrate: 1800,
        audioBitrate: 128,
    });

    const [signatureDataUrl, setSignatureDataUrl] = useState("");
    const [signature, setSignature] = useState({
        x: 72,
        y: 120,
        width: 180,
        page: 1,
        color: "#111827",
        lineWidth: 3,
    });

    const [imageUrl, setImageUrl] = useState("");
    const [convertedImageUrl, setConvertedImageUrl] = useState("");
    const [convertedImageBlob, setConvertedImageBlob] = useState(null);

    const [mediaUrl, setMediaUrl] = useState("");
    const [convertedMediaUrl, setConvertedMediaUrl] = useState("");
    const [convertedMediaBlob, setConvertedMediaBlob] = useState(null);
    const [convertedMediaName, setConvertedMediaName] = useState("");

    const [temperatureInput, setTemperatureInput] = useState("");
    const [temperatureOutput, setTemperatureOutput] = useState("");

    const isPdfMode =
        preset.mode === "viewPdf" ||
        preset.mode === "convertPdf" ||
        preset.mode === "signDocument" ||
        preset.mode === "pdfToJpg" ||
        preset.mode === "printPdf";

    const isWordMode =
        preset.mode === "viewWord" ||
        preset.mode === "convertWord" ||
        preset.mode === "printWord";

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
    const isImageMode = preset.mode === "jpgToPdf" || preset.mode === "heicToJpg";
    const isAudioMode =
        preset.mode === "audioToMp3" ||
        preset.mode === "mp3ToWav" ||
        preset.mode === "wavToMp3";
    const isTemperatureMode = preset.mode === "temperature";

    const pageOptions = useMemo(() => {
        return Array.from({ length: pageCount || 1 }, (_, index) => index + 1);
    }, [pageCount]);

    const csvStats = useMemo(() => getRowsStats(csvRows), [csvRows]);

    useEffect(() => {
        if (pdfDoc && isPdfMode) {
            renderActivePdfPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pdfDoc, pageNumber, zoom]);

    useEffect(() => {
        return () => {
            [
                videoUrl,
                compressedVideoUrl,
                imageUrl,
                convertedImageUrl,
                mediaUrl,
                convertedMediaUrl,
            ].forEach((url) => {
                if (url) URL.revokeObjectURL(url);
            });
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

        setZipStats(null);
        setOptimizedZipBlob(null);

        [
            videoUrl,
            compressedVideoUrl,
            imageUrl,
            convertedImageUrl,
            mediaUrl,
            convertedMediaUrl,
        ].forEach((url) => {
            if (url) URL.revokeObjectURL(url);
        });

        setVideoUrl("");
        setCompressedVideoUrl("");
        setCompressedVideoBlob(null);
        setFfmpegProgress(0);
        setFfmpegLog("");

        setImageUrl("");
        setConvertedImageUrl("");
        setConvertedImageBlob(null);

        setMediaUrl("");
        setConvertedMediaUrl("");
        setConvertedMediaBlob(null);
        setConvertedMediaName("");
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
                    setStatus(`PDF loaded with ${loadedPdf.numPages} page(s). Text is ready for export.`);
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
                setStatus("DOCX loaded. You can preview, convert, or print it.");
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
                return;
            }

            if (isImageMode) {
                const url = URL.createObjectURL(nextFile);
                setImageUrl(url);
                setStatus(`${nextFile.name} loaded. Ready to convert.`);
                return;
            }

            if (isAudioMode) {
                const url = URL.createObjectURL(nextFile);
                setMediaUrl(url);
                setStatus(`${nextFile.name} loaded at ${formatBytes(nextFile.size)}. Ready to convert.`);
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
        setStatus("FFmpeg loaded. Ready.");

        return ffmpeg;
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
    }

    async function exportPdfText() {
        if (!pdfDoc) {
            setStatus("Upload a PDF first.");
            return;
        }

        const pages = pdfExtractedPages.length ? pdfExtractedPages : await extractPdfText(pdfDoc);
        const text = pages.map((page) => `Page ${page.pageNumber}\n${page.text}`).join("\n\n");

        downloadText(`${baseName(fileName, "converted-pdf")}.txt`, text);
        setStatus("PDF text exported.");
    }

    async function exportPdfToDocx() {
        if (!pdfDoc) {
            setStatus("Upload a PDF first.");
            return;
        }

        const pages = pdfExtractedPages.length ? pdfExtractedPages : await extractPdfText(pdfDoc);
        const name = baseName(fileName, "converted-pdf");

        const docxBytes = await textPagesToDocxBytes({
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

        downloadBytes(`${baseName(fileName, "document")}-copy.pdf`, output, "application/pdf");
        setStatus("Browser-generated PDF copy exported.");
    }

    async function exportCurrentPdfPageJpg() {
        if (!pdfDoc) {
            setStatus("Upload a PDF first.");
            return;
        }

        try {
            const canvas = await renderPdfPageToCanvas(pdfDoc, pageNumber, 2);
            const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);

            downloadBlob(blob, `${baseName(fileName, "pdf")}-page-${pageNumber}.jpg`);
            setStatus(`Page ${pageNumber} exported as JPG.`);
        } catch (error) {
            console.error(error);
            setStatus("Could not export this PDF page as JPG.");
        }
    }

    async function exportAllPdfPagesJpgZip() {
        if (!pdfDoc) {
            setStatus("Upload a PDF first.");
            return;
        }

        try {
            setStatus("Rendering all PDF pages as JPG images.");

            const zip = new JSZip();
            const name = baseName(fileName, "pdf");

            for (let page = 1; page <= pdfDoc.numPages; page += 1) {
                const canvas = await renderPdfPageToCanvas(pdfDoc, page, 2);
                const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
                const bytes = await blob.arrayBuffer();

                zip.file(`${name}-page-${page}.jpg`, bytes);
            }

            const output = await zip.generateAsync({
                type: "blob",
                compression: "DEFLATE",
            });

            downloadBlob(output, `${name}-jpg-pages.zip`);
            setStatus(`Exported ${pdfDoc.numPages} JPG page image(s) as ZIP.`);
        } catch (error) {
            console.error(error);
            setStatus("Could not export all PDF pages as JPG.");
        }
    }

    function printPdfDocument() {
        if (!pdfBytes) {
            setStatus("Upload a PDF first.");
            return;
        }

        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const opened = openPrintableBlob(blob, baseName(fileName, "print-pdf"));

        setStatus(opened ? "PDF opened in a print window." : "Popup blocked. Allow popups to print.");
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

        downloadText(`${baseName(fileName, "converted-word")}.txt`, textPreview);
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

    function printWordDocument() {
        if (!htmlPreview) {
            setStatus("Upload a DOCX first.");
            return;
        }

        const opened = openPrintableHtml({
            title: baseName(fileName, "print-word"),
            body: htmlPreview,
        });

        setStatus(opened ? "Word document opened in a print window." : "Popup blocked. Allow popups to print.");
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

    async function exportJpgToPdf() {
        if (!file) {
            setStatus("Upload a JPG, JPEG, or PNG first.");
            return;
        }

        try {
            const bytes = await file.arrayBuffer();
            const pdf = await PDFDocument.create();

            const isPng = file.type === "image/png" || file.name.toLowerCase().endsWith(".png");
            const embeddedImage = isPng ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);

            const maxWidth = 612;
            const maxHeight = 792;
            const scale = Math.min(maxWidth / embeddedImage.width, maxHeight / embeddedImage.height, 1);

            const pageWidth = embeddedImage.width * scale;
            const pageHeight = embeddedImage.height * scale;

            const page = pdf.addPage([pageWidth, pageHeight]);

            page.drawImage(embeddedImage, {
                x: 0,
                y: 0,
                width: pageWidth,
                height: pageHeight,
            });

            const output = await pdf.save();

            downloadBytes(`${baseName(fileName, "image")}.pdf`, output, "application/pdf");
            setStatus("Image converted to PDF.");
        } catch (error) {
            console.error(error);
            setStatus("Could not convert this image to PDF. Use JPG, JPEG, or PNG.");
        }
    }

    async function exportHeicToJpg() {
        if (!file) {
            setStatus("Upload a HEIC or HEIF image first.");
            return;
        }

        try {
            setStatus("Checking HEIC file.");

            const lowerName = String(file.name || "").toLowerCase();
            const looksHeic =
                lowerName.endsWith(".heic") ||
                lowerName.endsWith(".heif") ||
                file.type === "image/heic" ||
                file.type === "image/heif" ||
                file.type === "image/heic-sequence" ||
                file.type === "image/heif-sequence";

            let confirmedHeic = false;

            try {
                confirmedHeic = await isHeic(file);
            } catch {
                confirmedHeic = looksHeic;
            }

            if (!confirmedHeic && !looksHeic) {
                throw new Error("This does not look like a HEIC or HEIF image.");
            }

            setStatus("Converting HEIC to JPG. Large iPhone photos can take a moment.");

            const converted = await heicTo({
                blob: file,
                type: "image/jpeg",
                quality: 0.92,
            });

            const jpgBlob = await normalizeJpegBlob(converted);
            const url = URL.createObjectURL(jpgBlob);

            if (convertedImageUrl) {
                URL.revokeObjectURL(convertedImageUrl);
            }

            setConvertedImageBlob(jpgBlob);
            setConvertedImageUrl(url);

            downloadBlob(jpgBlob, `${baseName(fileName, "heic-image")}.jpg`);

            setStatus(`HEIC converted to JPG. Output size: ${formatBytes(jpgBlob.size)}.`);
        } catch (error) {
            console.error("HEIC conversion failed:", error);

            const message =
                error?.message ||
                error?.toString?.() ||
                "Unknown HEIC conversion error.";

            setStatus(`HEIC conversion failed: ${message}`);
        }
    }

    function convertTemperatureNow() {
        const value = Number(temperatureInput);

        if (!Number.isFinite(value)) {
            setTemperatureOutput("");
            setStatus("Enter a valid temperature number.");
            return;
        }

        const result =
            preset.temperatureDirection === "fToC"
                ? ((value - 32) * 5) / 9
                : (value * 9) / 5 + 32;

        setTemperatureOutput(result.toFixed(2));

        setStatus(
            preset.temperatureDirection === "fToC"
                ? `${value}°F = ${result.toFixed(2)}°C`
                : `${value}°C = ${result.toFixed(2)}°F`
        );
    }

    async function convertMediaWithFfmpeg({ outputExtension, outputMime, ffmpegArgs }) {
        if (!file) {
            setStatus("Upload an audio or video file first.");
            return;
        }

        try {
            const ffmpeg = await ensureFfmpegLoaded();
            const inputName = getMediaInputName(file.name);
            const outputName = `${baseName(file.name, "converted")}.${outputExtension}`;

            setStatus("Writing media into FFmpeg memory.");
            setFfmpegProgress(1);

            try {
                await ffmpeg.deleteFile(inputName);
            } catch {
                // ignore
            }

            try {
                await ffmpeg.deleteFile(outputName);
            } catch {
                // ignore
            }

            await ffmpeg.writeFile(inputName, await fetchFile(file));

            setStatus(`Converting to ${outputExtension.toUpperCase()}.`);

            await ffmpeg.exec(["-i", inputName, ...ffmpegArgs, outputName]);

            const data = await ffmpeg.readFile(outputName);
            const blob = new Blob([data], { type: outputMime });
            const url = URL.createObjectURL(blob);

            if (convertedMediaUrl) {
                URL.revokeObjectURL(convertedMediaUrl);
            }

            setConvertedMediaBlob(blob);
            setConvertedMediaUrl(url);
            setConvertedMediaName(outputName);

            setStatus(`Converted file ready. Original: ${formatBytes(file.size)}. New: ${formatBytes(blob.size)}.`);
            setFfmpegProgress(100);

            try {
                await ffmpeg.deleteFile(inputName);
                await ffmpeg.deleteFile(outputName);
            } catch {
                // cleanup best effort
            }
        } catch (error) {
            console.error(error);
            setStatus("Media conversion failed. Try a smaller file or a different browser-supported format.");
        }
    }

    function convertToMp3() {
        return convertMediaWithFfmpeg({
            outputExtension: "mp3",
            outputMime: "audio/mpeg",
            ffmpegArgs: ["-vn", "-codec:a", "libmp3lame", "-q:a", "2"],
        });
    }

    function convertMp3ToWav() {
        return convertMediaWithFfmpeg({
            outputExtension: "wav",
            outputMime: "audio/wav",
            ffmpegArgs: ["-vn", "-acodec", "pcm_s16le", "-ar", "44100", "-ac", "2"],
        });
    }

    function convertWavToMp3() {
        return convertToMp3();
    }

    function downloadConvertedMedia() {
        if (!convertedMediaBlob) {
            setStatus("Convert the media file first.");
            return;
        }

        downloadBlob(convertedMediaBlob, convertedMediaName || `${baseName(fileName, "converted")}.mp3`);
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
                // ignore
            }

            try {
                await ffmpeg.deleteFile(outputName);
            } catch {
                // ignore
            }

            await ffmpeg.writeFile(inputName, await fetchFile(file));

            setStatus("Compressing video to MP4.");

            await ffmpeg.exec([
                "-i",
                inputName,
                "-vf",
                "scale='min(1280,iw)':-2",
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
            const blob = new Blob([data], { type: "video/mp4" });
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
                // cleanup best effort
            }
        } catch (error) {
            console.error(error);
            setStatus("Video compression failed. Try a shorter video or lower bitrate.");
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
            setStatus("Could not optimize this ZIP file. It may be encrypted, damaged, or too large.");
        }
    }

    function downloadOptimizedZip() {
        if (!optimizedZipBlob) {
            setStatus("Optimize the ZIP first.");
            return;
        }

        downloadBlob(optimizedZipBlob, `${baseName(fileName, "optimized")}-optimized.zip`);
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
            setStatus("Signature captured. Adjust placement and export signed PDF.");
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
        const pageIndex = clamp(signature.page - 1, 0, pages.length - 1);
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

        downloadBytes(`${baseName(fileName, "signed-document")}-signed.pdf`, output, "application/pdf");
        setStatus("Signed PDF exported.");
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

                <input ref={fileInputRef} hidden type="file" accept={preset.accept} onChange={handleUpload} />

                <Grid container spacing={2.5}>
                    <Grid item xs={12} lg={3.4}>
                        <Paper sx={sidePanelSx}>
                            <Stack spacing={2}>
                                {!isTemperatureMode && (
                                    <Button
                                        variant="contained"
                                        startIcon={<UploadFileRoundedIcon />}
                                        onClick={() => fileInputRef.current?.click()}
                                        sx={primaryButtonSx}
                                    >
                                        Upload File
                                    </Button>
                                )}

                                {fileName && (
                                    <Typography sx={{ color: "rgba(255,255,255,.72)", wordBreak: "break-word" }}>
                                        {fileName}
                                    </Typography>
                                )}

                                <Paper sx={statusSx}>
                                    <Typography sx={{ color: "rgba(255,255,255,.82)", lineHeight: 1.6 }}>
                                        {status}
                                    </Typography>
                                </Paper>

                                {(ffmpegProgress > 0 || ffmpegLoaded) && (
                                    <Stack spacing={1}>
                                        <LinearProgress variant="determinate" value={ffmpegProgress} />
                                        {ffmpegLog && (
                                            <Typography sx={{ color: "rgba(255,255,255,.48)", fontSize: 12 }}>
                                                {ffmpegLog}
                                            </Typography>
                                        )}
                                    </Stack>
                                )}

                                {isPdfMode && pdfDoc && (
                                    <>
                                        <Divider sx={dividerSx} />

                                        <Typography sx={labelSx}>Page</Typography>
                                        <Select
                                            size="small"
                                            value={pageNumber}
                                            onChange={(event) => setPageNumber(Number(event.target.value))}
                                            sx={selectSx}
                                        >
                                            {pageOptions.map((page) => (
                                                <MenuItem key={page} value={page}>
                                                    Page {page}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                        <Typography sx={labelSx}>Zoom</Typography>
                                        <Slider
                                            min={0.75}
                                            max={2.5}
                                            step={0.05}
                                            value={zoom}
                                            onChange={(_, value) => setZoom(Number(value))}
                                        />
                                    </>
                                )}

                                {preset.mode === "convertPdf" && (
                                    <>
                                        <Divider sx={dividerSx} />
                                        <Button startIcon={<DescriptionRoundedIcon />} onClick={exportPdfToDocx} sx={primaryButtonSx}>
                                            Export PDF to DOCX
                                        </Button>
                                        <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportPdfText} sx={smallButtonSx}>
                                            Export Text
                                        </Button>
                                        <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportPdfPagePng} sx={smallButtonSx}>
                                            Export Current Page PNG
                                        </Button>
                                        <Button startIcon={<PictureAsPdfRoundedIcon />} onClick={exportPdfCopy} sx={smallButtonSx}>
                                            Export PDF Copy
                                        </Button>
                                    </>
                                )}

                                {preset.mode === "pdfToJpg" && (
                                    <>
                                        <Divider sx={dividerSx} />
                                        <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportCurrentPdfPageJpg} sx={primaryButtonSx}>
                                            Export Current Page JPG
                                        </Button>
                                        <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportAllPdfPagesJpgZip} sx={smallButtonSx}>
                                            Export All Pages JPG ZIP
                                        </Button>
                                    </>
                                )}

                                {preset.mode === "printPdf" && (
                                    <>
                                        <Divider sx={dividerSx} />
                                        <Button startIcon={<OpenInNewRoundedIcon />} onClick={printPdfDocument} sx={primaryButtonSx}>
                                            Print PDF
                                        </Button>
                                    </>
                                )}

                                {preset.mode === "convertWord" && (
                                    <>
                                        <Divider sx={dividerSx} />
                                        <Button startIcon={<PictureAsPdfRoundedIcon />} onClick={exportWordPdf} sx={primaryButtonSx}>
                                            Export DOCX to PDF
                                        </Button>
                                        <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportWordHtml} sx={smallButtonSx}>
                                            Export HTML
                                        </Button>
                                        <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportWordText} sx={smallButtonSx}>
                                            Export TXT
                                        </Button>
                                        <Button startIcon={<DescriptionRoundedIcon />} onClick={exportWordDocxCopy} sx={smallButtonSx}>
                                            Export DOCX Copy
                                        </Button>
                                    </>
                                )}

                                {preset.mode === "printWord" && (
                                    <>
                                        <Divider sx={dividerSx} />
                                        <Button startIcon={<OpenInNewRoundedIcon />} onClick={printWordDocument} sx={primaryButtonSx}>
                                            Print Word Document
                                        </Button>
                                    </>
                                )}

                                {preset.mode === "signDocument" && (
                                    <>
                                        <Divider sx={dividerSx} />

                                        <Typography sx={labelSx}>Draw signature</Typography>
                                        <Box
                                            component="canvas"
                                            ref={signatureCanvasRef}
                                            onPointerDown={startSignature}
                                            onPointerMove={drawSignature}
                                            onPointerUp={stopSignature}
                                            onPointerLeave={stopSignature}
                                            sx={signatureCanvasSx}
                                        />

                                        <Stack direction="row" spacing={1}>
                                            <Button startIcon={<ClearRoundedIcon />} onClick={clearSignature} sx={smallButtonSx}>
                                                Clear
                                            </Button>
                                            <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportSignedPdf} sx={primaryButtonSx}>
                                                Export Signed PDF
                                            </Button>
                                        </Stack>

                                        <TextField
                                            label="Page"
                                            type="number"
                                            value={signature.page}
                                            onChange={(event) =>
                                                setSignature((current) => ({
                                                    ...current,
                                                    page: clamp(Number(event.target.value), 1, pageCount || 1),
                                                }))
                                            }
                                            sx={textFieldSx}
                                        />

                                        <TextField
                                            label="X position"
                                            type="number"
                                            value={signature.x}
                                            onChange={(event) =>
                                                setSignature((current) => ({ ...current, x: Number(event.target.value) }))
                                            }
                                            sx={textFieldSx}
                                        />

                                        <TextField
                                            label="Y from top"
                                            type="number"
                                            value={signature.y}
                                            onChange={(event) =>
                                                setSignature((current) => ({ ...current, y: Number(event.target.value) }))
                                            }
                                            sx={textFieldSx}
                                        />

                                        <TextField
                                            label="Signature width"
                                            type="number"
                                            value={signature.width}
                                            onChange={(event) =>
                                                setSignature((current) => ({ ...current, width: Number(event.target.value) }))
                                            }
                                            sx={textFieldSx}
                                        />
                                    </>
                                )}

                                {isCsvMode && (
                                    <>
                                        <Divider sx={dividerSx} />
                                        {(preset.mode === "convertCsv" || preset.mode === "csvToJson") && (
                                            <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportCsvAsJson} sx={primaryButtonSx}>
                                                Export CSV to JSON
                                            </Button>
                                        )}
                                        {(preset.mode === "convertCsv" || preset.mode === "jsonToCsv") && (
                                            <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportJsonAsCsv} sx={smallButtonSx}>
                                                Export JSON to CSV
                                            </Button>
                                        )}
                                        {(preset.mode === "convertCsv" || preset.mode === "csvCleaner") && (
                                            <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportCleanCsv} sx={smallButtonSx}>
                                                Clean CSV
                                            </Button>
                                        )}
                                        {(preset.mode === "convertCsv" || preset.mode === "csvDuplicates") && (
                                            <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportDedupeCsv} sx={smallButtonSx}>
                                                Remove Duplicates
                                            </Button>
                                        )}
                                        {(preset.mode === "convertCsv" || preset.mode === "csvToPdf") && (
                                            <Button startIcon={<PictureAsPdfRoundedIcon />} onClick={exportCsvPdf} sx={smallButtonSx}>
                                                Export CSV to PDF
                                            </Button>
                                        )}
                                        {(preset.mode === "convertCsv" || preset.mode === "csvDelimiter") && (
                                            <>
                                                <Button onClick={() => exportDelimitedCsv(",")} sx={smallButtonSx}>
                                                    Export Comma CSV
                                                </Button>
                                                <Button onClick={() => exportDelimitedCsv("\t")} sx={smallButtonSx}>
                                                    Export Tab TSV
                                                </Button>
                                                <Button onClick={() => exportDelimitedCsv(";")} sx={smallButtonSx}>
                                                    Export Semicolon CSV
                                                </Button>
                                                <Button onClick={() => exportDelimitedCsv("|")} sx={smallButtonSx}>
                                                    Export Pipe CSV
                                                </Button>
                                            </>
                                        )}
                                    </>
                                )}

                                {isZipMode && (
                                    <>
                                        <Divider sx={dividerSx} />
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

                                {isVideoMode && (
                                    <>
                                        <Divider sx={dividerSx} />

                                        <Typography sx={labelSx}>CRF Quality: {videoSettings.crf}</Typography>
                                        <Slider
                                            min={18}
                                            max={36}
                                            step={1}
                                            value={videoSettings.crf}
                                            onChange={(_, value) =>
                                                setVideoSettings((current) => ({ ...current, crf: Number(value) }))
                                            }
                                        />

                                        <Typography sx={labelSx}>FPS: {videoSettings.fps}</Typography>
                                        <Slider
                                            min={12}
                                            max={60}
                                            step={1}
                                            value={videoSettings.fps}
                                            onChange={(_, value) =>
                                                setVideoSettings((current) => ({ ...current, fps: Number(value) }))
                                            }
                                        />

                                        <Typography sx={labelSx}>Video bitrate: {videoSettings.videoBitrate}k</Typography>
                                        <Slider
                                            min={500}
                                            max={6000}
                                            step={100}
                                            value={videoSettings.videoBitrate}
                                            onChange={(_, value) =>
                                                setVideoSettings((current) => ({ ...current, videoBitrate: Number(value) }))
                                            }
                                        />

                                        <Button startIcon={<TransformRoundedIcon />} onClick={compressVideoWithFfmpeg} sx={primaryButtonSx}>
                                            Compress Video
                                        </Button>

                                        <Button
                                            startIcon={<FileDownloadRoundedIcon />}
                                            onClick={downloadCompressedVideo}
                                            disabled={!compressedVideoBlob}
                                            sx={smallButtonSx}
                                        >
                                            Download MP4
                                        </Button>
                                    </>
                                )}

                                {preset.mode === "jpgToPdf" && (
                                    <>
                                        <Divider sx={dividerSx} />
                                        <Button startIcon={<PictureAsPdfRoundedIcon />} onClick={exportJpgToPdf} sx={primaryButtonSx}>
                                            Export Image to PDF
                                        </Button>
                                    </>
                                )}

                                {preset.mode === "heicToJpg" && (
                                    <>
                                        <Divider sx={dividerSx} />
                                        <Button startIcon={<FileDownloadRoundedIcon />} onClick={exportHeicToJpg} sx={primaryButtonSx}>
                                            Export HEIC to JPG
                                        </Button>
                                    </>
                                )}

                                {preset.mode === "temperature" && (
                                    <>
                                        <TextField
                                            fullWidth
                                            label={preset.temperatureDirection === "fToC" ? "Fahrenheit" : "Celsius"}
                                            value={temperatureInput}
                                            onChange={(event) => setTemperatureInput(event.target.value)}
                                            sx={textFieldSx}
                                        />

                                        <Button startIcon={<TransformRoundedIcon />} onClick={convertTemperatureNow} sx={primaryButtonSx}>
                                            Convert Temperature
                                        </Button>

                                        {temperatureOutput && (
                                            <Typography sx={{ color: "#9ee8ff", fontWeight: 950, fontSize: 20 }}>
                                                {temperatureOutput}°{preset.temperatureDirection === "fToC" ? "C" : "F"}
                                            </Typography>
                                        )}
                                    </>
                                )}

                                {preset.mode === "audioToMp3" && (
                                    <>
                                        <Divider sx={dividerSx} />
                                        <Button startIcon={<TransformRoundedIcon />} onClick={convertToMp3} sx={primaryButtonSx}>
                                            Convert to MP3
                                        </Button>
                                        <Button
                                            startIcon={<FileDownloadRoundedIcon />}
                                            onClick={downloadConvertedMedia}
                                            disabled={!convertedMediaBlob}
                                            sx={smallButtonSx}
                                        >
                                            Download MP3
                                        </Button>
                                    </>
                                )}

                                {preset.mode === "mp3ToWav" && (
                                    <>
                                        <Divider sx={dividerSx} />
                                        <Button startIcon={<TransformRoundedIcon />} onClick={convertMp3ToWav} sx={primaryButtonSx}>
                                            Convert MP3 to WAV
                                        </Button>
                                        <Button
                                            startIcon={<FileDownloadRoundedIcon />}
                                            onClick={downloadConvertedMedia}
                                            disabled={!convertedMediaBlob}
                                            sx={smallButtonSx}
                                        >
                                            Download WAV
                                        </Button>
                                    </>
                                )}

                                {preset.mode === "wavToMp3" && (
                                    <>
                                        <Divider sx={dividerSx} />
                                        <Button startIcon={<TransformRoundedIcon />} onClick={convertWavToMp3} sx={primaryButtonSx}>
                                            Convert WAV to MP3
                                        </Button>
                                        <Button
                                            startIcon={<FileDownloadRoundedIcon />}
                                            onClick={downloadConvertedMedia}
                                            disabled={!convertedMediaBlob}
                                            sx={smallButtonSx}
                                        >
                                            Download MP3
                                        </Button>
                                    </>
                                )}
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} lg={8.6}>
                        {isPdfMode && (
                            <Paper sx={previewPanelSx}>
                                {pdfDoc ? (
                                    <Box sx={pdfScrollSx}>
                                        <canvas ref={canvasRef} />
                                    </Box>
                                ) : (
                                    <EmptyState text="Upload a PDF to preview, convert, print, sign, or export it." />
                                )}
                            </Paper>
                        )}

                        {isWordMode && (
                            <Paper sx={previewPanelSx}>
                                {htmlPreview ? (
                                    <Box sx={docPreviewSx} dangerouslySetInnerHTML={{ __html: htmlPreview }} />
                                ) : (
                                    <EmptyState text="Upload a DOCX file to preview, convert, or print it." />
                                )}
                            </Paper>
                        )}

                        {preset.mode === "viewPowerPoint" && (
                            <Stack spacing={2}>
                                {slides.length ? (
                                    slides.map((slide, index) => (
                                        <Card key={slide.name} sx={slideCardSx}>
                                            <CardContent>
                                                <Typography variant="overline" sx={{ color: "#9ee8ff", fontWeight: 950 }}>
                                                    Slide {index + 1}
                                                </Typography>
                                                <Typography variant="h5" sx={{ fontWeight: 950, mb: 1 }}>
                                                    {slide.title}
                                                </Typography>
                                                <Typography sx={{ whiteSpace: "pre-wrap", color: "rgba(255,255,255,.76)" }}>
                                                    {slide.text}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <EmptyState text="Upload a PowerPoint file to extract slide text." />
                                )}
                            </Stack>
                        )}

                        {isCsvMode && (
                            <Stack spacing={2}>
                                {csvRows.length ? (
                                    <>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={4}>
                                                <Paper sx={metricSx}>
                                                    <Typography sx={metricLabelSx}>Rows</Typography>
                                                    <Typography sx={metricValueSx}>{csvStats.rowCount}</Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <Paper sx={metricSx}>
                                                    <Typography sx={metricLabelSx}>Columns</Typography>
                                                    <Typography sx={metricValueSx}>{csvStats.columnCount}</Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <Paper sx={metricSx}>
                                                    <Typography sx={metricLabelSx}>Empty cells</Typography>
                                                    <Typography sx={metricValueSx}>{csvStats.emptyCells}</Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>

                                        <TableContainer component={Paper} sx={tablePanelSx}>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        {(csvRows[0] || []).slice(0, 12).map((cell, index) => (
                                                            <TableCell key={`${cell}-${index}`} sx={tableHeaderSx}>
                                                                {cell || `Column ${index + 1}`}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {csvRows.slice(1, 80).map((row, rowIndex) => (
                                                        <TableRow key={`row-${rowIndex}`}>
                                                            {row.slice(0, 12).map((cell, cellIndex) => (
                                                                <TableCell key={`cell-${rowIndex}-${cellIndex}`} sx={tableCellSx}>
                                                                    {cell}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </>
                                ) : (
                                    <EmptyState text="Upload CSV, TSV, or JSON data to preview and convert it." />
                                )}
                            </Stack>
                        )}

                        {isImageMode && (
                            <Stack spacing={2}>
                                {imageUrl ? (
                                    <Card sx={slideCardSx}>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontWeight: 950, mb: 1 }}>
                                                Uploaded image
                                            </Typography>
                                            <Box component="img" src={imageUrl} alt="Uploaded preview" sx={imagePreviewSx} />
                                            <Typography sx={{ color: "rgba(255,255,255,.66)", mt: 1 }}>
                                                Original size: {formatBytes(file?.size || 0)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <EmptyState text="Upload an image to convert it." />
                                )}

                                {convertedImageUrl && (
                                    <Card sx={slideCardSx}>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontWeight: 950, mb: 1 }}>
                                                Converted JPG preview
                                            </Typography>
                                            <Box component="img" src={convertedImageUrl} alt="Converted preview" sx={imagePreviewSx} />
                                            <Typography sx={{ color: "rgba(255,255,255,.66)", mt: 1 }}>
                                                Converted size: {formatBytes(convertedImageBlob?.size || 0)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                )}
                            </Stack>
                        )}

                        {isAudioMode && (
                            <Stack spacing={2}>
                                {mediaUrl ? (
                                    <Card sx={slideCardSx}>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontWeight: 950, mb: 1 }}>
                                                Original media
                                            </Typography>
                                            <Box component="audio" src={mediaUrl} controls sx={{ width: "100%" }} />
                                            <Typography sx={{ color: "rgba(255,255,255,.66)", mt: 1 }}>
                                                Original size: {formatBytes(file?.size || 0)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <EmptyState text="Upload audio or video to convert it." />
                                )}

                                {convertedMediaUrl && (
                                    <Card sx={slideCardSx}>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontWeight: 950, mb: 1 }}>
                                                Converted audio preview
                                            </Typography>
                                            <Box component="audio" src={convertedMediaUrl} controls sx={{ width: "100%" }} />
                                            <Typography sx={{ color: "rgba(255,255,255,.66)", mt: 1 }}>
                                                Converted size: {formatBytes(convertedMediaBlob?.size || 0)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                )}
                            </Stack>
                        )}

                        {isVideoMode && (
                            <Stack spacing={2}>
                                {videoUrl ? (
                                    <Card sx={slideCardSx}>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontWeight: 950, mb: 1 }}>
                                                Original video
                                            </Typography>
                                            <Box component="video" src={videoUrl} controls sx={videoPreviewSx} />
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <EmptyState text="Upload a video to compress it." />
                                )}

                                {compressedVideoUrl && (
                                    <Card sx={slideCardSx}>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontWeight: 950, mb: 1 }}>
                                                Compressed video
                                            </Typography>
                                            <Box component="video" src={compressedVideoUrl} controls sx={videoPreviewSx} />
                                        </CardContent>
                                    </Card>
                                )}
                            </Stack>
                        )}

                        {isZipMode && (
                            <Paper sx={previewPanelSx}>
                                {zipStats ? (
                                    <Stack spacing={2}>
                                        <Typography variant="h5" sx={{ fontWeight: 950 }}>
                                            ZIP Summary
                                        </Typography>
                                        <Typography sx={{ color: "rgba(255,255,255,.72)" }}>
                                            Files: {zipStats.fileCount}
                                        </Typography>
                                        <Typography sx={{ color: "rgba(255,255,255,.72)" }}>
                                            Junk files detected: {zipStats.junkCount}
                                        </Typography>
                                        <Typography sx={{ color: "rgba(255,255,255,.72)" }}>
                                            Original size: {formatBytes(zipStats.originalSize)}
                                        </Typography>
                                    </Stack>
                                ) : (
                                    <EmptyState text="Upload a ZIP file to optimize it." />
                                )}
                            </Paper>
                        )}

                        {isTemperatureMode && (
                            <Card sx={slideCardSx}>
                                <CardContent>
                                    <Typography variant="h5" sx={{ fontWeight: 950, mb: 2 }}>
                                        {preset.temperatureDirection === "fToC"
                                            ? "Fahrenheit to Celsius"
                                            : "Celsius to Fahrenheit"}
                                    </Typography>

                                    <Typography sx={{ color: "rgba(255,255,255,.72)", mb: 2 }}>
                                        Enter a temperature value and convert it instantly in the browser.
                                    </Typography>

                                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                        <TextField
                                            fullWidth
                                            label={preset.temperatureDirection === "fToC" ? "Fahrenheit" : "Celsius"}
                                            value={temperatureInput}
                                            onChange={(event) => setTemperatureInput(event.target.value)}
                                            sx={textFieldSx}
                                        />

                                        <Button onClick={convertTemperatureNow} sx={primaryButtonSx}>
                                            Convert
                                        </Button>
                                    </Stack>

                                    {temperatureOutput && (
                                        <Typography
                                            sx={{
                                                mt: 3,
                                                color: "#9ee8ff",
                                                fontSize: { xs: 34, md: 52 },
                                                fontWeight: 950,
                                            }}
                                        >
                                            {temperatureOutput}°{preset.temperatureDirection === "fToC" ? "C" : "F"}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </GradientPage>
    );
}

const pillSx = {
    width: "fit-content",
    color: "#06101c",
    background: "linear-gradient(135deg,#9ee8ff,#b38cff)",
    fontWeight: 950,
};

const iconBoxSx = {
    width: 48,
    height: 48,
    borderRadius: 3,
    display: "grid",
    placeItems: "center",
    color: "#9ee8ff",
    background: "rgba(158,232,255,.12)",
    border: "1px solid rgba(158,232,255,.18)",
};

const toolCardSx = {
    height: "100%",
    textDecoration: "none",
    color: "inherit",
    background:
        "linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.035))",
    border: "1px solid rgba(255,255,255,.1)",
    borderRadius: 4,
    transition: "transform .18s ease, border-color .18s ease",
    "&:hover": {
        transform: "translateY(-4px)",
        borderColor: "rgba(158,232,255,.45)",
    },
};

const sidePanelSx = {
    p: 2,
    borderRadius: 4,
    background: "rgba(10,16,32,.82)",
    border: "1px solid rgba(255,255,255,.1)",
    position: { lg: "sticky" },
    top: 18,
};

const previewPanelSx = {
    p: 2,
    minHeight: 520,
    borderRadius: 4,
    background: "rgba(10,16,32,.65)",
    border: "1px solid rgba(255,255,255,.1)",
    overflow: "hidden",
};

const primaryButtonSx = {
    color: "#06101c",
    fontWeight: 950,
    background: "linear-gradient(135deg,#9ee8ff,#b38cff)",
    "&:hover": {
        background: "linear-gradient(135deg,#b7f0ff,#c9b2ff)",
    },
};

const smallButtonSx = {
    color: "#e8f8ff",
    border: "1px solid rgba(158,232,255,.26)",
    background: "rgba(158,232,255,.08)",
    "&:hover": {
        background: "rgba(158,232,255,.14)",
    },
};

const statusSx = {
    p: 1.5,
    borderRadius: 3,
    background: "rgba(255,255,255,.055)",
    border: "1px solid rgba(255,255,255,.08)",
};

const dividerSx = {
    borderColor: "rgba(255,255,255,.12)",
};

const labelSx = {
    color: "rgba(255,255,255,.72)",
    fontWeight: 850,
    fontSize: 13,
};

const selectSx = {
    color: "white",
    ".MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255,255,255,.18)",
    },
    ".MuiSvgIcon-root": {
        color: "white",
    },
};

const textFieldSx = {
    "& .MuiInputBase-root": {
        color: "white",
    },
    "& .MuiInputLabel-root": {
        color: "rgba(255,255,255,.62)",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255,255,255,.18)",
    },
};

const pdfScrollSx = {
    overflow: "auto",
    maxHeight: "78vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    p: 2,
    background: "rgba(0,0,0,.24)",
    borderRadius: 3,
};

const docPreviewSx = {
    background: "white",
    color: "#111827",
    borderRadius: 3,
    p: { xs: 2, md: 5 },
    minHeight: 520,
    "& table": {
        borderCollapse: "collapse",
        width: "100%",
    },
    "& td, & th": {
        border: "1px solid #9ca3af",
        p: 1,
    },
    "& p": {
        lineHeight: 1.7,
    },
};

const emptyStateSx = {
    p: 4,
    borderRadius: 4,
    minHeight: 300,
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    background: "rgba(255,255,255,.05)",
    border: "1px dashed rgba(255,255,255,.16)",
};

const slideCardSx = {
    borderRadius: 4,
    background: "rgba(10,16,32,.72)",
    border: "1px solid rgba(255,255,255,.1)",
};

const metricSx = {
    p: 2,
    borderRadius: 4,
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.1)",
};

const metricLabelSx = {
    color: "rgba(255,255,255,.58)",
    fontSize: 13,
    fontWeight: 850,
};

const metricValueSx = {
    color: "#9ee8ff",
    fontSize: 34,
    fontWeight: 950,
};

const tablePanelSx = {
    borderRadius: 4,
    background: "rgba(10,16,32,.72)",
    border: "1px solid rgba(255,255,255,.1)",
    maxHeight: 620,
};

const tableHeaderSx = {
    color: "#9ee8ff",
    fontWeight: 950,
    background: "rgba(158,232,255,.08)",
    borderColor: "rgba(255,255,255,.08)",
};

const tableCellSx = {
    color: "rgba(255,255,255,.74)",
    borderColor: "rgba(255,255,255,.08)",
};

const imagePreviewSx = {
    width: "100%",
    maxHeight: 560,
    objectFit: "contain",
    borderRadius: 3,
    background: "rgba(255,255,255,.06)",
};

const videoPreviewSx = {
    width: "100%",
    maxHeight: 560,
    borderRadius: 3,
    background: "black",
};

const signatureCanvasSx = {
    width: "100%",
    height: 120,
    borderRadius: 3,
    background: "white",
    border: "1px solid rgba(255,255,255,.16)",
    touchAction: "none",
    cursor: "crosshair",
};