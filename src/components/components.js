import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import JSZip from "jszip";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import {
    Alert,
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Grid,
    IconButton,
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
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SlideshowRoundedIcon from "@mui/icons-material/SlideshowRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import ViewCarouselRoundedIcon from "@mui/icons-material/ViewCarouselRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import FormatUnderlinedRoundedIcon from "@mui/icons-material/FormatUnderlinedRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import FormatAlignLeftRoundedIcon from "@mui/icons-material/FormatAlignLeftRounded";
import FormatAlignCenterRoundedIcon from "@mui/icons-material/FormatAlignCenterRounded";
import FormatAlignRightRoundedIcon from "@mui/icons-material/FormatAlignRightRounded";
import FormatIndentIncreaseRoundedIcon from "@mui/icons-material/FormatIndentIncreaseRounded";
import FormatIndentDecreaseRoundedIcon from "@mui/icons-material/FormatIndentDecreaseRounded";
import StrikethroughSRoundedIcon from "@mui/icons-material/StrikethroughSRounded";
import FormatColorTextRoundedIcon from "@mui/icons-material/FormatColorTextRounded";
import FormatColorFillRoundedIcon from "@mui/icons-material/FormatColorFillRounded";
import FormatClearRoundedIcon from "@mui/icons-material/FormatClearRounded";
import TitleRoundedIcon from "@mui/icons-material/TitleRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import TextFieldsRoundedIcon from "@mui/icons-material/TextFieldsRounded";
import ViewColumnRoundedIcon from "@mui/icons-material/ViewColumnRounded";
import WebAssetRoundedIcon from "@mui/icons-material/WebAssetRounded";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import FileOpenRoundedIcon from "@mui/icons-material/FileOpenRounded";
import FunctionsRoundedIcon from "@mui/icons-material/FunctionsRounded";
import GridOnRoundedIcon from "@mui/icons-material/GridOnRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TableRowsRoundedIcon from "@mui/icons-material/TableRowsRounded";
import FindReplaceRoundedIcon from "@mui/icons-material/FindReplaceRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import BorderAllRoundedIcon from "@mui/icons-material/BorderAllRounded";
import HighlightRoundedIcon from "@mui/icons-material/HighlightRounded";
import CropSquareRoundedIcon from "@mui/icons-material/CropSquareRounded";
import GestureRoundedIcon from "@mui/icons-material/GestureRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import ZoomOutRoundedIcon from "@mui/icons-material/ZoomOutRounded";
import FitScreenRoundedIcon from "@mui/icons-material/FitScreenRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export function GradientPage({ children }) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                color: "white",
                background:
                    "radial-gradient(circle at top left, rgba(158,232,255,.18), transparent 35%), radial-gradient(circle at top right, rgba(179,140,255,.18), transparent 35%), linear-gradient(135deg, #050711 0%, #080d1c 45%, #0a1024 100%)",
            }}
        >
            {children}
        </Box>
    );
}

export function AppNavBar() {
    const location = useLocation();

    const navItems = [
        {
            label: "Home",
            path: "/",
            icon: <HomeRoundedIcon fontSize="small" />,
        },
        {
            label: "Archive",
            path: "/archive",
            icon: <LibraryBooksRoundedIcon fontSize="small" />,
        },
        {
            label: "CSV",
            path: "/csv",
            icon: <TableChartRoundedIcon fontSize="small" />,
        },
        {
            label: "Word",
            path: "/word",
            icon: <DescriptionRoundedIcon fontSize="small" />,
        },
        {
            label: "PowerPoint",
            path: "/powerpoint",
            icon: <SlideshowRoundedIcon fontSize="small" />,
        },
        {
            label: "PDF",
            path: "/pdf",
            icon: <PictureAsPdfRoundedIcon fontSize="small" />,
        },
    ];

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: "rgba(5, 7, 17, .74)",
                backdropFilter: "blur(18px)",
                borderBottom: "1px solid rgba(255,255,255,.1)",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ minHeight: 72, gap: 2 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flex: 1 }}>
                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                borderRadius: "15px",
                                display: "grid",
                                placeItems: "center",
                                background:
                                    "linear-gradient(135deg, rgba(158,232,255,.25), rgba(179,140,255,.2))",
                                border: "1px solid rgba(255,255,255,.14)",
                            }}
                        >
                            <ViewCarouselRoundedIcon sx={{ color: "#9ee8ff" }} />
                        </Box>

                        <Box>
                            <Typography sx={{ fontWeight: 950, lineHeight: 1 }}>
                                BrowserSuite
                            </Typography>

                            <Typography
                                variant="caption"
                                sx={{
                                    color: "rgba(255,255,255,.58)",
                                    fontWeight: 750,
                                }}
                            >
                                CSV · Word · PowerPoint · PDF
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{
                            overflowX: "auto",
                            maxWidth: { xs: "62vw", md: "unset" },
                            pb: 0.25,
                        }}
                    >
                        {navItems.map((item) => {
                            const active = location.pathname === item.path;

                            return (
                                <Button
                                    key={item.path}
                                    component={RouterLink}
                                    to={item.path}
                                    startIcon={item.icon}
                                    sx={{
                                        whiteSpace: "nowrap",
                                        color: active ? "#061019" : "rgba(255,255,255,.78)",
                                        fontWeight: 900,
                                        px: 1.7,
                                        background: active
                                            ? "linear-gradient(135deg, #9ee8ff, #b38cff)"
                                            : "transparent",
                                        "&:hover": {
                                            background: active
                                                ? "linear-gradient(135deg, #9ee8ff, #b38cff)"
                                                : "rgba(255,255,255,.08)",
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            );
                        })}
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export function SectionHeader({ eyebrow, title, description }) {
    return (
        <Box sx={{ mb: 3 }}>
            {eyebrow && (
                <Typography
                    variant="overline"
                    sx={{
                        color: "#9ee8ff",
                        fontWeight: 950,
                        letterSpacing: 1.5,
                    }}
                >
                    {eyebrow}
                </Typography>
            )}

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 950,
                    mb: 1,
                    fontSize: { xs: 30, md: 42 },
                }}
            >
                {title}
            </Typography>

            {description && (
                <Typography
                    sx={{
                        color: "rgba(255,255,255,.68)",
                        maxWidth: 980,
                        lineHeight: 1.7,
                    }}
                >
                    {description}
                </Typography>
            )}
        </Box>
    );
}

function createId() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function downloadTextFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
}

function downloadBytesFile(filename, bytes, mimeType) {
    const blob = new Blob([bytes], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function getNodesByLocalName(root, localName) {
    return Array.from(root.getElementsByTagName("*")).filter(
        (node) => node.localName === localName
    );
}

function getDirectChildrenByLocalName(node, localName) {
    return Array.from(node.children || []).filter((child) => child.localName === localName);
}

function getAttrValue(node, name) {
    if (!node) {
        return "";
    }

    return (
        node.getAttribute(`w:${name}`) ||
        node.getAttribute(`a:${name}`) ||
        node.getAttribute(name) ||
        ""
    );
}

function hexToRgb01(hex) {
    const clean = String(hex || "#000000").replace("#", "");
    const full =
        clean.length === 3
            ? clean
                .split("")
                .map((item) => item + item)
                .join("")
            : clean.padEnd(6, "0").slice(0, 6);

    const r = parseInt(full.slice(0, 2), 16) / 255;
    const g = parseInt(full.slice(2, 4), 16) / 255;
    const b = parseInt(full.slice(4, 6), 16) / 255;

    return rgb(r || 0, g || 0, b || 0);
}

/* CSV EDITOR */

const defaultCsvRows = [
    ["Product", "SKU", "Price", "Stock", "Status"],
    ["BrowserSuite", "BS-001", "49.00", "24", "Active"],
    ["CSV Editor", "CSV-100", "19.00", "128", "Active"],
    ["Word Editor", "DOC-220", "29.00", "64", "Draft"],
    ["PowerPoint Editor", "PPT-300", "39.00", "42", "Active"],
];

function normalizeRows(rows) {
    const width = Math.max(1, ...rows.map((row) => row.length));

    return rows.map((row) => {
        const next = [...row];

        while (next.length < width) {
            next.push("");
        }

        return next;
    });
}

function parseCsv(text) {
    const rows = [];
    let row = [];
    let cell = "";
    let insideQuotes = false;

    for (let i = 0; i < text.length; i += 1) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"' && insideQuotes && nextChar === '"') {
            cell += '"';
            i += 1;
            continue;
        }

        if (char === '"') {
            insideQuotes = !insideQuotes;
            continue;
        }

        if (char === "," && !insideQuotes) {
            row.push(cell);
            cell = "";
            continue;
        }

        if ((char === "\n" || char === "\r") && !insideQuotes) {
            if (char === "\r" && nextChar === "\n") {
                i += 1;
            }

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

    return normalizeRows(rows.filter((item) => item.some((value) => value !== "")));
}

function escapeCsvCell(value) {
    const stringValue = String(value ?? "");
    const needsQuotes =
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n") ||
        stringValue.includes("\r");

    const escaped = stringValue.replace(/"/g, '""');

    return needsQuotes ? `"${escaped}"` : escaped;
}

function serializeCsv(rows) {
    return rows
        .map((row) => row.map((cell) => escapeCsvCell(cell)).join(","))
        .join("\n");
}

function numberToColumnName(index) {
    let value = index + 1;
    let result = "";

    while (value > 0) {
        const remainder = (value - 1) % 26;
        result = String.fromCharCode(65 + remainder) + result;
        value = Math.floor((value - 1) / 26);
    }

    return result;
}

export function CsvEditor() {
    const fileInputRef = useRef(null);

    const [rows, setRows] = useState(defaultCsvRows);
    const [fileName, setFileName] = useState("edited-workbook.csv");
    const [selectedCell, setSelectedCell] = useState({
        rowIndex: 0,
        colIndex: 0,
    });
    const [searchTerm, setSearchTerm] = useState("");

    const columnCount = useMemo(() => {
        return Math.max(1, ...rows.map((row) => row.length));
    }, [rows]);

    const csvPreview = useMemo(() => serializeCsv(rows), [rows]);

    const activeCellName = `${numberToColumnName(selectedCell.colIndex)}${
        selectedCell.rowIndex + 1
    }`;

    const activeCellValue =
        rows[selectedCell.rowIndex]?.[selectedCell.colIndex] !== undefined
            ? rows[selectedCell.rowIndex][selectedCell.colIndex]
            : "";

    const matchCount = useMemo(() => {
        if (!searchTerm.trim()) {
            return 0;
        }

        return rows.flat().filter((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        ).length;
    }, [rows, searchTerm]);

    function updateCell(rowIndex, colIndex, value) {
        setRows((previousRows) => {
            const nextRows = previousRows.map((row) => [...row]);

            while (nextRows[rowIndex].length < columnCount) {
                nextRows[rowIndex].push("");
            }

            nextRows[rowIndex][colIndex] = value;
            return nextRows;
        });
    }

    function updateActiveCell(value) {
        updateCell(selectedCell.rowIndex, selectedCell.colIndex, value);
    }

    function handleUpload(event) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setFileName(file.name.replace(/\.csv$/i, "") + "-edited.csv");

        const reader = new FileReader();

        reader.onload = (readerEvent) => {
            const text = String(readerEvent.target?.result || "");
            const parsed = parseCsv(text);

            if (parsed.length > 0) {
                setRows(parsed);
                setSelectedCell({ rowIndex: 0, colIndex: 0 });
            }
        };

        reader.readAsText(file);
    }

    function addRow() {
        setRows((previousRows) => {
            const width = Math.max(1, ...previousRows.map((row) => row.length));
            return [...previousRows, Array.from({ length: width }, () => "")];
        });
    }

    function addColumn() {
        setRows((previousRows) => {
            return previousRows.map((row, rowIndex) => [
                ...row,
                rowIndex === 0 ? `Column ${row.length + 1}` : "",
            ]);
        });
    }

    function deleteRow(rowIndex) {
        setRows((previousRows) => {
            if (previousRows.length <= 1) {
                return [[""]];
            }

            return previousRows.filter((_, index) => index !== rowIndex);
        });

        setSelectedCell({ rowIndex: 0, colIndex: 0 });
    }

    function deleteColumn(colIndex) {
        setRows((previousRows) => {
            if (columnCount <= 1) {
                return previousRows.map(() => [""]);
            }

            return previousRows.map((row) => row.filter((_, index) => index !== colIndex));
        });

        setSelectedCell({ rowIndex: 0, colIndex: 0 });
    }

    function clearSelectedCell() {
        updateActiveCell("");
    }

    function copyCsvToClipboard() {
        navigator.clipboard.writeText(csvPreview);
    }

    function resetEditor() {
        setRows(defaultCsvRows);
        setFileName("edited-workbook.csv");
        setSelectedCell({ rowIndex: 0, colIndex: 0 });
        setSearchTerm("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    function exportCsv() {
        const safeName = fileName.trim().toLowerCase().endsWith(".csv")
            ? fileName.trim()
            : `${fileName.trim() || "edited-workbook"}.csv`;

        downloadTextFile(safeName, csvPreview, "text/csv;charset=utf-8");
    }

    return (
        <Paper
            sx={{
                overflow: "hidden",
                background: "rgba(255,255,255,.055)",
                border: "1px solid rgba(255,255,255,.12)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 28px 90px rgba(0,0,0,.45)",
            }}
        >
            <Box
                sx={{
                    background:
                        "linear-gradient(180deg, rgba(7,95,44,.92), rgba(5,70,34,.88))",
                    borderBottom: "1px solid rgba(255,255,255,.14)",
                }}
            >
                <Stack
                    direction={{ xs: "column", xl: "row" }}
                    spacing={1.5}
                    alignItems={{ xs: "stretch", xl: "center" }}
                    sx={{ p: 2 }}
                >
                    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ flex: 1 }}>
                        <GridOnRoundedIcon sx={{ color: "#d7ffe8" }} />

                        <Box>
                            <Typography sx={{ fontWeight: 950, lineHeight: 1 }}>
                                Excel-Style CSV Workbook
                            </Typography>

                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,.74)" }}>
                                Spreadsheet grid · formula bar · direct CSV export
                            </Typography>
                        </Box>
                    </Stack>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv,text/csv"
                        hidden
                        onChange={handleUpload}
                    />

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Button
                            variant="outlined"
                            startIcon={<UploadFileRoundedIcon />}
                            onClick={() => fileInputRef.current?.click()}
                            sx={{ color: "white", borderColor: "rgba(255,255,255,.3)" }}
                        >
                            Open CSV
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<AddRoundedIcon />}
                            onClick={addRow}
                            sx={{ color: "white", borderColor: "rgba(255,255,255,.3)" }}
                        >
                            Insert Row
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<AddRoundedIcon />}
                            onClick={addColumn}
                            sx={{ color: "white", borderColor: "rgba(255,255,255,.3)" }}
                        >
                            Insert Column
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<FileDownloadRoundedIcon />}
                            onClick={exportCsv}
                            sx={{
                                color: "#053b1d",
                                fontWeight: 950,
                                background: "linear-gradient(135deg, #d7ffe8 0%, #9ee8ff 100%)",
                            }}
                        >
                            Save CSV
                        </Button>
                    </Stack>
                </Stack>

                <Divider sx={{ borderColor: "rgba(255,255,255,.14)" }} />

                <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    alignItems="center"
                    sx={{ p: 1.25 }}
                >
                    <Tooltip title="Delete selected row">
                        <Button
                            size="small"
                            startIcon={<TableRowsRoundedIcon />}
                            onClick={() => deleteRow(selectedCell.rowIndex)}
                            sx={{ color: "white", border: "1px solid rgba(255,255,255,.18)" }}
                        >
                            Delete Row
                        </Button>
                    </Tooltip>

                    <Tooltip title="Delete selected column">
                        <Button
                            size="small"
                            startIcon={<ViewColumnRoundedIcon />}
                            onClick={() => deleteColumn(selectedCell.colIndex)}
                            sx={{ color: "white", border: "1px solid rgba(255,255,255,.18)" }}
                        >
                            Delete Column
                        </Button>
                    </Tooltip>

                    <Button
                        size="small"
                        startIcon={<DeleteRoundedIcon />}
                        onClick={clearSelectedCell}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.18)" }}
                    >
                        Clear Cell
                    </Button>

                    <Button
                        size="small"
                        startIcon={<ContentCopyRoundedIcon />}
                        onClick={copyCsvToClipboard}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.18)" }}
                    >
                        Copy CSV
                    </Button>

                    <Button
                        size="small"
                        startIcon={<RestartAltRoundedIcon />}
                        onClick={resetEditor}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.18)" }}
                    >
                        Reset
                    </Button>

                    <Chip
                        label={`${rows.length} rows`}
                        sx={{
                            color: "white",
                            background: "rgba(255,255,255,.12)",
                            border: "1px solid rgba(255,255,255,.16)",
                            fontWeight: 850,
                        }}
                    />

                    <Chip
                        label={`${columnCount} columns`}
                        sx={{
                            color: "white",
                            background: "rgba(255,255,255,.12)",
                            border: "1px solid rgba(255,255,255,.16)",
                            fontWeight: 850,
                        }}
                    />
                </Stack>
            </Box>

            <Box
                sx={{
                    p: 1.25,
                    background: "rgba(245,247,250,.96)",
                    color: "#111827",
                    borderBottom: "1px solid rgba(15,23,42,.14)",
                }}
            >
                <Stack direction={{ xs: "column", lg: "row" }} spacing={1.25}>
                    <TextField
                        label="Name box"
                        value={activeCellName}
                        size="small"
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{
                            width: { xs: "100%", lg: 130 },
                            "& .MuiInputBase-root": {
                                background: "white",
                                color: "#111827",
                            },
                            "& .MuiInputLabel-root": {
                                color: "#4b5563",
                            },
                        }}
                    />

                    <TextField
                        label="Formula bar"
                        value={activeCellValue}
                        onChange={(event) => updateActiveCell(event.target.value)}
                        size="small"
                        fullWidth
                        InputProps={{
                            startAdornment: <FunctionsRoundedIcon sx={{ color: "#107c41", mr: 1 }} />,
                        }}
                        sx={{
                            "& .MuiInputBase-root": {
                                background: "white",
                                color: "#111827",
                            },
                            "& .MuiInputLabel-root": {
                                color: "#4b5563",
                            },
                        }}
                    />

                    <TextField
                        label="Search sheet"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        size="small"
                        sx={{
                            width: { xs: "100%", lg: 230 },
                            "& .MuiInputBase-root": {
                                background: "white",
                                color: "#111827",
                            },
                            "& .MuiInputLabel-root": {
                                color: "#4b5563",
                            },
                        }}
                        InputProps={{
                            startAdornment: <SearchRoundedIcon sx={{ color: "#107c41", mr: 1 }} />,
                        }}
                    />

                    <TextField
                        label="Export file"
                        value={fileName}
                        onChange={(event) => setFileName(event.target.value)}
                        size="small"
                        sx={{
                            width: { xs: "100%", lg: 260 },
                            "& .MuiInputBase-root": {
                                background: "white",
                                color: "#111827",
                            },
                            "& .MuiInputLabel-root": {
                                color: "#4b5563",
                            },
                        }}
                    />
                </Stack>

                {searchTerm.trim() && (
                    <Typography sx={{ mt: 1, color: "#374151", fontSize: 13 }}>
                        Search matches: {matchCount}
                    </Typography>
                )}
            </Box>

            <TableContainer
                sx={{
                    maxHeight: "66vh",
                    background: "#ffffff",
                    borderBottom: "1px solid rgba(15,23,42,.12)",
                }}
            >
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    width: 58,
                                    background: "#f3f4f6",
                                    color: "#374151",
                                    fontWeight: 950,
                                    borderColor: "#d1d5db",
                                    position: "sticky",
                                    left: 0,
                                    zIndex: 5,
                                }}
                            >
                                #
                            </TableCell>

                            {Array.from({ length: columnCount }).map((_, colIndex) => {
                                const active = selectedCell.colIndex === colIndex;

                                return (
                                    <TableCell
                                        key={colIndex}
                                        sx={{
                                            minWidth: 190,
                                            background: active ? "#d9eadf" : "#f3f4f6",
                                            color: "#111827",
                                            fontWeight: 950,
                                            borderColor: "#d1d5db",
                                            textAlign: "center",
                                        }}
                                    >
                                        {numberToColumnName(colIndex)}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row, rowIndex) => {
                            const rowActive = selectedCell.rowIndex === rowIndex;

                            return (
                                <TableRow key={rowIndex}>
                                    <TableCell
                                        sx={{
                                            width: 58,
                                            position: "sticky",
                                            left: 0,
                                            zIndex: 2,
                                            background: rowActive ? "#d9eadf" : "#f9fafb",
                                            color: "#374151",
                                            borderColor: "#d1d5db",
                                            textAlign: "center",
                                            fontWeight: 950,
                                        }}
                                    >
                                        {rowIndex + 1}
                                    </TableCell>

                                    {Array.from({ length: columnCount }).map((_, colIndex) => {
                                        const selected =
                                            selectedCell.rowIndex === rowIndex &&
                                            selectedCell.colIndex === colIndex;

                                        const value = row[colIndex] ?? "";
                                        const matchesSearch =
                                            searchTerm.trim() &&
                                            String(value).toLowerCase().includes(searchTerm.toLowerCase());

                                        return (
                                            <TableCell
                                                key={`${rowIndex}-${colIndex}`}
                                                sx={{
                                                    p: 0,
                                                    borderColor: selected ? "#107c41" : "#d1d5db",
                                                    borderWidth: selected ? 2 : 1,
                                                    borderStyle: "solid",
                                                    background: matchesSearch
                                                        ? "#fff7cc"
                                                        : selected
                                                            ? "#ecfdf3"
                                                            : "white",
                                                }}
                                            >
                                                <TextField
                                                    value={value}
                                                    onChange={(event) =>
                                                        updateCell(rowIndex, colIndex, event.target.value)
                                                    }
                                                    onFocus={() => setSelectedCell({ rowIndex, colIndex })}
                                                    variant="standard"
                                                    fullWidth
                                                    multiline
                                                    minRows={1}
                                                    InputProps={{
                                                        disableUnderline: true,
                                                    }}
                                                    sx={{
                                                        px: 1,
                                                        py: 0.65,
                                                        "& textarea, & input": {
                                                            color: "#111827",
                                                            fontSize: 14,
                                                            lineHeight: 1.35,
                                                            fontFamily:
                                                                'Calibri, Arial, "Segoe UI", ui-sans-serif, sans-serif',
                                                        },
                                                    }}
                                                />
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                sx={{
                    p: 1.5,
                    background: "#f3f4f6",
                    color: "#111827",
                    borderTop: "1px solid rgba(15,23,42,.12)",
                }}
            >
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    <Chip
                        label="Sheet1"
                        sx={{
                            background: "#107c41",
                            color: "white",
                            fontWeight: 950,
                            borderRadius: 1.5,
                        }}
                    />

                    <Typography sx={{ color: "#4b5563", fontSize: 13 }}>
                        Selected {activeCellName}
                    </Typography>

                    <Typography sx={{ color: "#4b5563", fontSize: 13 }}>
                        CSV Preview updates automatically when you edit cells.
                    </Typography>
                </Stack>
            </Box>
        </Paper>
    );
}

/* WORD EDITOR */

const defaultDocumentHtml = `
<h1>New Document</h1>
<p>Start typing directly on this page. This editor works like a lightweight Microsoft Word-style processor.</p>
<h2>Document Features</h2>
<p>You can select text, apply formatting, insert tables, add links, align paragraphs, manage margins, import DOCX files, and export your document.</p>
<ul>
  <li>Type directly on the white document page</li>
  <li>Use the ribbon toolbar for formatting</li>
  <li>Import modern DOCX files</li>
</ul>
`;

function docxRunToHtml(run) {
    const runProps = getDirectChildrenByLocalName(run, "rPr")[0];
    const isBold = getDirectChildrenByLocalName(runProps || {}, "b").length > 0;
    const isItalic = getDirectChildrenByLocalName(runProps || {}, "i").length > 0;
    const isUnderline = getDirectChildrenByLocalName(runProps || {}, "u").length > 0;
    const isStrike = getDirectChildrenByLocalName(runProps || {}, "strike").length > 0;

    const pieces = [];

    Array.from(run.children || []).forEach((child) => {
        if (child.localName === "t") {
            pieces.push(escapeHtml(child.textContent || ""));
        }

        if (child.localName === "tab") {
            pieces.push("&emsp;");
        }

        if (child.localName === "br") {
            pieces.push("<br />");
        }
    });

    let inner = pieces.join("");

    if (!inner) {
        return "";
    }

    if (isBold) {
        inner = `<strong>${inner}</strong>`;
    }

    if (isItalic) {
        inner = `<em>${inner}</em>`;
    }

    if (isUnderline) {
        inner = `<u>${inner}</u>`;
    }

    if (isStrike) {
        inner = `<s>${inner}</s>`;
    }

    return inner;
}

function docxParagraphToHtml(paragraph) {
    const props = getDirectChildrenByLocalName(paragraph, "pPr")[0];
    const styleNode = getDirectChildrenByLocalName(props || {}, "pStyle")[0];
    const styleValue = getAttrValue(styleNode, "val").toLowerCase();
    const hasNumbering = getDirectChildrenByLocalName(props || {}, "numPr").length > 0;

    const runs = getDirectChildrenByLocalName(paragraph, "r");
    const inner = runs.map((run) => docxRunToHtml(run)).join("");

    if (!inner.trim()) {
        return "<p><br /></p>";
    }

    if (styleValue.includes("title")) {
        return `<h1>${inner}</h1>`;
    }

    if (styleValue.includes("heading1")) {
        return `<h1>${inner}</h1>`;
    }

    if (styleValue.includes("heading2")) {
        return `<h2>${inner}</h2>`;
    }

    if (styleValue.includes("heading3")) {
        return `<h3>${inner}</h3>`;
    }

    if (hasNumbering) {
        return `<ul><li>${inner}</li></ul>`;
    }

    return `<p>${inner}</p>`;
}

function docxTableToHtml(table) {
    const rows = getDirectChildrenByLocalName(table, "tr");

    const renderedRows = rows
        .map((row) => {
            const cells = getDirectChildrenByLocalName(row, "tc");

            const renderedCells = cells
                .map((cell) => {
                    const paragraphs = getDirectChildrenByLocalName(cell, "p");
                    const html = paragraphs.map((paragraph) => docxParagraphToHtml(paragraph)).join("");
                    return `<td>${html || "<p><br /></p>"}</td>`;
                })
                .join("");

            return `<tr>${renderedCells}</tr>`;
        })
        .join("");

    return `<table><tbody>${renderedRows}</tbody></table>`;
}

function docxXmlToHtml(xmlText) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "application/xml");
    const body = getNodesByLocalName(xml, "body")[0];

    if (!body) {
        return "<p>Imported document was empty.</p>";
    }

    const htmlParts = Array.from(body.children || []).map((child) => {
        if (child.localName === "p") {
            return docxParagraphToHtml(child);
        }

        if (child.localName === "tbl") {
            return docxTableToHtml(child);
        }

        return "";
    });

    return htmlParts.join("\n");
}

function htmlToPlainText(html) {
    const element = document.createElement("div");
    element.innerHTML = html;
    return element.innerText || element.textContent || "";
}

function buildWordHtmlDocument({
                                   title,
                                   bodyHtml,
                                   fontSize,
                                   fontFamily,
                                   pageWidth,
                                   pagePadding,
                               }) {
    const safeTitle = escapeHtml(title || "Document");
    const safeFontSize = Number(fontSize) || 18;
    const safePageWidth = Number(pageWidth) || 900;
    const safePagePadding = Number(pagePadding) || 72;
    const safeFontFamily = String(fontFamily || "Arial, sans-serif");

    return [
        "<!DOCTYPE html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="UTF-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        "<title>" + safeTitle + "</title>",
        "<style>",
        "body {",
        "  margin: 0;",
        "  padding: 48px;",
        "  font-family: " + safeFontFamily + ";",
        "  background: #f3f4f6;",
        "  color: #111827;",
        "  line-height: 1.7;",
        "}",
        "main {",
        "  max-width: " + safePageWidth + "px;",
        "  min-height: 1100px;",
        "  margin: 0 auto;",
        "  background: white;",
        "  padding: " + safePagePadding + "px;",
        "  border-radius: 4px;",
        "  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.16);",
        "  font-size: " + safeFontSize + "px;",
        "}",
        "h1 { font-size: 2.2em; margin: 0 0 0.5em; }",
        "h2 { font-size: 1.55em; margin: 1.2em 0 0.4em; }",
        "h3 { font-size: 1.25em; margin: 1em 0 0.35em; }",
        "p { margin: 0 0 0.85em; }",
        "ul, ol { padding-left: 1.4em; }",
        "table { border-collapse: collapse; width: 100%; margin: 18px 0; }",
        "td, th { border: 1px solid #9ca3af; padding: 10px; vertical-align: top; }",
        ".page-break { page-break-after: always; border-top: 2px dashed #d1d5db; margin: 32px 0; }",
        "</style>",
        "</head>",
        "<body>",
        "<main>",
        bodyHtml,
        "</main>",
        "</body>",
        "</html>",
    ].join("\n");
}

export function WordEditor() {
    const docxInputRef = useRef(null);
    const editorRef = useRef(null);

    const [documentTitle, setDocumentTitle] = useState("New Document");
    const [documentHtml, setDocumentHtml] = useState(defaultDocumentHtml);
    const [documentVersion, setDocumentVersion] = useState(1);
    const [fileName, setFileName] = useState("document");
    const [fontSize, setFontSize] = useState(18);
    const [fontFamily, setFontFamily] = useState("Arial, sans-serif");
    const [pageWidth, setPageWidth] = useState(900);
    const [pagePadding, setPagePadding] = useState(72);
    const [zoom, setZoom] = useState(90);
    const [textColor, setTextColor] = useState("#111827");
    const [highlightColor, setHighlightColor] = useState("#fff59d");
    const [findText, setFindText] = useState("");
    const [replaceText, setReplaceText] = useState("");
    const [status, setStatus] = useState(
        "Ready. Import a DOCX file or start typing directly on the page."
    );

    const wordStats = useMemo(() => {
        const text = htmlToPlainText(documentHtml);
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const characters = text.length;
        const paragraphs = (documentHtml.match(/<p|<h1|<h2|<h3|<li/g) || []).length;

        return {
            words,
            characters,
            paragraphs,
        };
    }, [documentHtml]);

    function getCurrentHtml() {
        return editorRef.current?.innerHTML || documentHtml;
    }

    function setEditorContent(nextHtml) {
        setDocumentHtml(nextHtml);
        setDocumentVersion((previous) => previous + 1);
    }

    function syncDocumentHtml() {
        setDocumentHtml(getCurrentHtml());
    }

    function runCommand(command, value = null) {
        editorRef.current?.focus();
        document.execCommand(command, false, value);
        syncDocumentHtml();
    }

    function formatBlock(block) {
        editorRef.current?.focus();
        document.execCommand("formatBlock", false, block);
        syncDocumentHtml();
    }

    async function importDocx(event) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.name.toLowerCase().endsWith(".docx")) {
            setStatus("Only modern .docx files are supported for Word import.");
            return;
        }

        try {
            setStatus(`Importing ${file.name}...`);

            const buffer = await file.arrayBuffer();
            const zip = await JSZip.loadAsync(buffer);
            const documentFile = zip.file("word/document.xml");

            if (!documentFile) {
                setStatus("This DOCX file does not contain word/document.xml.");
                return;
            }

            const xmlText = await documentFile.async("text");
            const importedHtml = docxXmlToHtml(xmlText);

            setDocumentTitle(file.name.replace(/\.docx$/i, ""));
            setFileName(file.name.replace(/\.docx$/i, "-edited"));
            setEditorContent(importedHtml || "<p>Imported document was empty.</p>");
            setStatus(
                "DOCX imported. Paragraphs, headings, bold, italic, underline, tables, and basic lists were converted into editable HTML."
            );
        } catch (error) {
            console.error(error);
            setStatus("DOCX import failed. The file may be encrypted, damaged, or unsupported.");
        } finally {
            if (docxInputRef.current) {
                docxInputRef.current.value = "";
            }
        }
    }

    function insertHtml(html) {
        editorRef.current?.focus();
        document.execCommand("insertHTML", false, html);
        syncDocumentHtml();
    }

    function insertTable() {
        insertHtml(`
<table>
  <tbody>
    <tr>
      <td><strong>Header 1</strong></td>
      <td><strong>Header 2</strong></td>
      <td><strong>Header 3</strong></td>
    </tr>
    <tr>
      <td>Cell text</td>
      <td>Cell text</td>
      <td>Cell text</td>
    </tr>
    <tr>
      <td>Cell text</td>
      <td>Cell text</td>
      <td>Cell text</td>
    </tr>
  </tbody>
</table>
<p><br /></p>`);
    }

    function insertLink() {
        const url = window.prompt("Enter a URL for the selected text:");

        if (!url) {
            return;
        }

        runCommand("createLink", url);
    }

    function replaceAllMatches() {
        if (!findText) {
            setStatus("Enter text to find before replacing.");
            return;
        }

        const current = getCurrentHtml();
        const safeFind = escapeHtml(findText);
        const safeReplace = escapeHtml(replaceText);
        const next = current.split(safeFind).join(safeReplace);

        setEditorContent(next);
        setStatus(`Replaced all visible matches for "${findText}".`);
    }

    function resetDocument() {
        setDocumentTitle("New Document");
        setFileName("document");
        setFontSize(18);
        setFontFamily("Arial, sans-serif");
        setPageWidth(900);
        setPagePadding(72);
        setZoom(90);
        setFindText("");
        setReplaceText("");
        setEditorContent(defaultDocumentHtml);
        setStatus("Document reset.");
    }

    function copyDocument() {
        navigator.clipboard.writeText(htmlToPlainText(getCurrentHtml()));
        setStatus("Document text copied to clipboard.");
    }

    function exportHtml() {
        const html = buildWordHtmlDocument({
            title: documentTitle,
            bodyHtml: getCurrentHtml(),
            fontSize,
            fontFamily,
            pageWidth,
            pagePadding,
        });

        downloadTextFile(
            `${fileName.trim() || "document"}.html`,
            html,
            "text/html;charset=utf-8"
        );

        setStatus("HTML document exported.");
    }

    function exportTxt() {
        const text = htmlToPlainText(getCurrentHtml());

        downloadTextFile(
            `${fileName.trim() || "document"}.txt`,
            text,
            "text/plain;charset=utf-8"
        );

        setStatus("TXT document exported.");
    }

    function exportWordDoc() {
        const html = buildWordHtmlDocument({
            title: documentTitle,
            bodyHtml: getCurrentHtml(),
            fontSize,
            fontFamily,
            pageWidth,
            pagePadding,
        });

        downloadTextFile(
            `${fileName.trim() || "document"}.doc`,
            html,
            "application/msword;charset=utf-8"
        );

        setStatus("Word-compatible .doc export created.");
    }

    function printDocument() {
        const html = buildWordHtmlDocument({
            title: documentTitle,
            bodyHtml: getCurrentHtml(),
            fontSize,
            fontFamily,
            pageWidth,
            pagePadding,
        });

        const printWindow = window.open("", "_blank");

        if (!printWindow) {
            setStatus("Popup blocked. Allow popups to print the document.");
            return;
        }

        printWindow.document.open();
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }

    return (
        <Paper
            sx={{
                overflow: "hidden",
                background: "rgba(255,255,255,.055)",
                border: "1px solid rgba(255,255,255,.12)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 28px 90px rgba(0,0,0,.45)",
            }}
        >
            <Box
                sx={{
                    borderBottom: "1px solid rgba(255,255,255,.1)",
                    background: "rgba(8,13,28,.92)",
                }}
            >
                <Stack
                    direction={{ xs: "column", xl: "row" }}
                    spacing={1.5}
                    alignItems={{ xs: "stretch", xl: "center" }}
                    sx={{ p: 2 }}
                >
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1 }}>
                        <ArticleRoundedIcon sx={{ color: "#9ee8ff" }} />

                        <Box>
                            <Typography sx={{ fontWeight: 950, lineHeight: 1 }}>
                                Word Processor
                            </Typography>

                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,.6)" }}>
                                DOCX import · editable page · Word-style ribbon
                            </Typography>
                        </Box>
                    </Stack>

                    <input
                        ref={docxInputRef}
                        type="file"
                        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        hidden
                        onChange={importDocx}
                    />

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Button
                            variant="outlined"
                            startIcon={<FileOpenRoundedIcon />}
                            onClick={() => docxInputRef.current?.click()}
                            sx={{ color: "white", borderColor: "rgba(255,255,255,.18)" }}
                        >
                            Import DOCX
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<SaveAltRoundedIcon />}
                            onClick={exportWordDoc}
                            sx={{
                                color: "#061019",
                                fontWeight: 950,
                                background:
                                    "linear-gradient(135deg, #9ee8ff 0%, #b38cff 100%)",
                            }}
                        >
                            Export DOC
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<FileDownloadRoundedIcon />}
                            onClick={exportHtml}
                            sx={{ color: "white", borderColor: "rgba(255,255,255,.18)" }}
                        >
                            HTML
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<FileDownloadRoundedIcon />}
                            onClick={exportTxt}
                            sx={{ color: "white", borderColor: "rgba(255,255,255,.18)" }}
                        >
                            TXT
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<PrintRoundedIcon />}
                            onClick={printDocument}
                            sx={{ color: "white", borderColor: "rgba(255,255,255,.18)" }}
                        >
                            Print
                        </Button>
                    </Stack>
                </Stack>

                <Divider sx={{ borderColor: "rgba(255,255,255,.1)" }} />

                <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    alignItems="center"
                    sx={{ p: 1.5 }}
                >
                    <Button
                        size="small"
                        startIcon={<FormatBoldRoundedIcon />}
                        onClick={() => runCommand("bold")}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Bold
                    </Button>

                    <Button
                        size="small"
                        startIcon={<FormatItalicRoundedIcon />}
                        onClick={() => runCommand("italic")}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Italic
                    </Button>

                    <Button
                        size="small"
                        startIcon={<FormatUnderlinedRoundedIcon />}
                        onClick={() => runCommand("underline")}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Underline
                    </Button>

                    <Button
                        size="small"
                        startIcon={<StrikethroughSRoundedIcon />}
                        onClick={() => runCommand("strikeThrough")}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Strike
                    </Button>

                    <Button
                        size="small"
                        startIcon={<FormatListBulletedRoundedIcon />}
                        onClick={() => runCommand("insertUnorderedList")}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Bullets
                    </Button>

                    <Button
                        size="small"
                        startIcon={<FormatListNumberedRoundedIcon />}
                        onClick={() => runCommand("insertOrderedList")}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Numbering
                    </Button>

                    <Button
                        size="small"
                        startIcon={<FormatIndentDecreaseRoundedIcon />}
                        onClick={() => runCommand("outdent")}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Outdent
                    </Button>

                    <Button
                        size="small"
                        startIcon={<FormatIndentIncreaseRoundedIcon />}
                        onClick={() => runCommand("indent")}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Indent
                    </Button>

                    <Button
                        size="small"
                        startIcon={<FormatAlignLeftRoundedIcon />}
                        onClick={() => runCommand("justifyLeft")}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Left
                    </Button>

                    <Button
                        size="small"
                        startIcon={<FormatAlignCenterRoundedIcon />}
                        onClick={() => runCommand("justifyCenter")}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Center
                    </Button>

                    <Button
                        size="small"
                        startIcon={<FormatAlignRightRoundedIcon />}
                        onClick={() => runCommand("justifyRight")}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Right
                    </Button>

                    <Button
                        size="small"
                        startIcon={<TitleRoundedIcon />}
                        onClick={() => formatBlock("h1")}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        H1
                    </Button>

                    <Button
                        size="small"
                        startIcon={<TitleRoundedIcon />}
                        onClick={() => formatBlock("h2")}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        H2
                    </Button>

                    <Button
                        size="small"
                        startIcon={<TextFieldsRoundedIcon />}
                        onClick={() => formatBlock("p")}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Paragraph
                    </Button>
                </Stack>

                <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    alignItems="center"
                    sx={{ p: 1.5, pt: 0 }}
                >
                    <Button
                        size="small"
                        startIcon={<FormatColorTextRoundedIcon />}
                        onClick={() => runCommand("foreColor", textColor)}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Text Color
                    </Button>

                    <TextField
                        type="color"
                        value={textColor}
                        onChange={(event) => setTextColor(event.target.value)}
                        size="small"
                        sx={{
                            width: 70,
                            "& input": {
                                p: 0.5,
                                height: 30,
                            },
                        }}
                    />

                    <Button
                        size="small"
                        startIcon={<FormatColorFillRoundedIcon />}
                        onClick={() => runCommand("hiliteColor", highlightColor)}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Highlight
                    </Button>

                    <TextField
                        type="color"
                        value={highlightColor}
                        onChange={(event) => setHighlightColor(event.target.value)}
                        size="small"
                        sx={{
                            width: 70,
                            "& input": {
                                p: 0.5,
                                height: 30,
                            },
                        }}
                    />

                    <Button
                        size="small"
                        startIcon={<BorderAllRoundedIcon />}
                        onClick={insertTable}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Table
                    </Button>

                    <Button
                        size="small"
                        startIcon={<LinkRoundedIcon />}
                        onClick={insertLink}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Link
                    </Button>

                    <Button
                        size="small"
                        startIcon={<AddRoundedIcon />}
                        onClick={() =>
                            insertHtml(
                                '<h2>New Section</h2><p>Start writing your new section here.</p>'
                            )
                        }
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Section
                    </Button>

                    <Button
                        size="small"
                        startIcon={<FormatClearRoundedIcon />}
                        onClick={() => runCommand("removeFormat")}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                    >
                        Clear Format
                    </Button>

                    <Tooltip title="Copy plain document text">
                        <IconButton
                            onClick={copyDocument}
                            sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                        >
                            <ContentCopyRoundedIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Reset document">
                        <IconButton
                            onClick={resetDocument}
                            sx={{ color: "white", border: "1px solid rgba(255,255,255,.12)" }}
                        >
                            <RestartAltRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Box>

            <Grid container>
                <Grid
                    item
                    xs={12}
                    lg={3}
                    sx={{
                        borderRight: { lg: "1px solid rgba(255,255,255,.1)" },
                        background: "rgba(0,0,0,.16)",
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 950, mb: 2 }}>
                            Document Settings
                        </Typography>

                        <Stack spacing={2}>
                            <TextField
                                label="Document title"
                                value={documentTitle}
                                onChange={(event) => setDocumentTitle(event.target.value)}
                                fullWidth
                                sx={{
                                    "& .MuiInputBase-root": {
                                        background: "rgba(0,0,0,.22)",
                                    },
                                }}
                            />

                            <TextField
                                label="Export file name"
                                value={fileName}
                                onChange={(event) => setFileName(event.target.value)}
                                fullWidth
                                sx={{
                                    "& .MuiInputBase-root": {
                                        background: "rgba(0,0,0,.22)",
                                    },
                                }}
                            />

                            <Box>
                                <Typography sx={{ fontWeight: 900, mb: 1 }}>
                                    Font size: {fontSize}px
                                </Typography>

                                <Slider
                                    value={fontSize}
                                    min={12}
                                    max={34}
                                    step={1}
                                    onChange={(_, value) => setFontSize(value)}
                                />
                            </Box>

                            <Box>
                                <Typography sx={{ fontWeight: 900, mb: 1 }}>
                                    Page zoom: {zoom}%
                                </Typography>

                                <Slider
                                    value={zoom}
                                    min={55}
                                    max={125}
                                    step={5}
                                    onChange={(_, value) => setZoom(value)}
                                />
                            </Box>

                            <Box>
                                <Typography sx={{ fontWeight: 900, mb: 1 }}>
                                    Page width: {pageWidth}px
                                </Typography>

                                <Slider
                                    value={pageWidth}
                                    min={720}
                                    max={1100}
                                    step={20}
                                    onChange={(_, value) => setPageWidth(value)}
                                />
                            </Box>

                            <Box>
                                <Typography sx={{ fontWeight: 900, mb: 1 }}>
                                    Margins: {pagePadding}px
                                </Typography>

                                <Slider
                                    value={pagePadding}
                                    min={32}
                                    max={110}
                                    step={4}
                                    onChange={(_, value) => setPagePadding(value)}
                                />
                            </Box>

                            <Box>
                                <Typography sx={{ fontWeight: 900, mb: 1 }}>Font family</Typography>

                                <Select
                                    value={fontFamily}
                                    onChange={(event) => setFontFamily(event.target.value)}
                                    fullWidth
                                    sx={{ background: "rgba(0,0,0,.22)" }}
                                >
                                    <MenuItem value="Arial, sans-serif">Arial</MenuItem>
                                    <MenuItem value="Calibri, Arial, sans-serif">Calibri</MenuItem>
                                    <MenuItem value="Georgia, serif">Georgia</MenuItem>
                                    <MenuItem value="'Times New Roman', serif">
                                        Times New Roman
                                    </MenuItem>
                                    <MenuItem value="'Segoe UI', sans-serif">Segoe UI</MenuItem>
                                    <MenuItem value="'Courier New', monospace">Courier New</MenuItem>
                                </Select>
                            </Box>

                            <Divider sx={{ borderColor: "rgba(255,255,255,.1)" }} />

                            <Typography variant="h6" sx={{ fontWeight: 950 }}>
                                Find and Replace
                            </Typography>

                            <TextField
                                label="Find"
                                value={findText}
                                onChange={(event) => setFindText(event.target.value)}
                                fullWidth
                                InputProps={{
                                    startAdornment: <SearchRoundedIcon sx={{ color: "#9ee8ff", mr: 1 }} />,
                                }}
                                sx={{
                                    "& .MuiInputBase-root": {
                                        background: "rgba(0,0,0,.22)",
                                    },
                                }}
                            />

                            <TextField
                                label="Replace with"
                                value={replaceText}
                                onChange={(event) => setReplaceText(event.target.value)}
                                fullWidth
                                sx={{
                                    "& .MuiInputBase-root": {
                                        background: "rgba(0,0,0,.22)",
                                    },
                                }}
                            />

                            <Button
                                variant="outlined"
                                startIcon={<FindReplaceRoundedIcon />}
                                onClick={replaceAllMatches}
                                sx={{ color: "white", borderColor: "rgba(255,255,255,.18)" }}
                            >
                                Replace All
                            </Button>

                            <Divider sx={{ borderColor: "rgba(255,255,255,.1)" }} />

                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                <Chip
                                    label={`${wordStats.words} words`}
                                    sx={{
                                        color: "white",
                                        background: "rgba(158,232,255,.1)",
                                        border: "1px solid rgba(158,232,255,.2)",
                                        fontWeight: 850,
                                    }}
                                />

                                <Chip
                                    label={`${wordStats.characters} chars`}
                                    sx={{
                                        color: "white",
                                        background: "rgba(179,140,255,.1)",
                                        border: "1px solid rgba(179,140,255,.2)",
                                        fontWeight: 850,
                                    }}
                                />

                                <Chip
                                    label={`${wordStats.paragraphs} blocks`}
                                    sx={{
                                        color: "white",
                                        background: "rgba(255,255,255,.08)",
                                        border: "1px solid rgba(255,255,255,.14)",
                                        fontWeight: 850,
                                    }}
                                />
                            </Stack>

                            <Alert
                                severity="info"
                                sx={{
                                    background: "rgba(158,232,255,.09)",
                                    color: "rgba(255,255,255,.82)",
                                    border: "1px solid rgba(158,232,255,.18)",
                                    "& .MuiAlert-icon": {
                                        color: "#9ee8ff",
                                    },
                                }}
                            >
                                {status}
                            </Alert>
                        </Stack>
                    </Box>
                </Grid>

                <Grid item xs={12} lg={9}>
                    <Box
                        sx={{
                            minHeight: "78vh",
                            overflow: "auto",
                            p: { xs: 2, md: 4 },
                            background:
                                "linear-gradient(180deg, rgba(255,255,255,.035), rgba(0,0,0,.2))",
                        }}
                    >
                        <Box
                            sx={{
                                mx: "auto",
                                width: `${pageWidth}px`,
                                maxWidth: "100%",
                                transform: `scale(${zoom / 100})`,
                                transformOrigin: "top center",
                                transition: "transform .18s ease",
                            }}
                        >
                            <Box
                                key={documentVersion}
                                ref={editorRef}
                                contentEditable
                                suppressContentEditableWarning
                                onInput={syncDocumentHtml}
                                dangerouslySetInnerHTML={{ __html: documentHtml }}
                                sx={{
                                    minHeight: 1120,
                                    outline: "none",
                                    borderRadius: "4px",
                                    background: "white",
                                    color: "#111827",
                                    p: `${pagePadding}px`,
                                    boxShadow: "0 30px 100px rgba(0,0,0,.45)",
                                    fontFamily,
                                    fontSize,
                                    lineHeight: 1.7,
                                    "& h1": {
                                        fontSize: "2.25em",
                                        lineHeight: 1.1,
                                        margin: "0 0 .55em",
                                        fontWeight: 800,
                                    },
                                    "& h2": {
                                        fontSize: "1.55em",
                                        lineHeight: 1.2,
                                        margin: "1.25em 0 .45em",
                                        fontWeight: 800,
                                    },
                                    "& h3": {
                                        fontSize: "1.25em",
                                        margin: "1em 0 .35em",
                                        fontWeight: 800,
                                    },
                                    "& p": {
                                        margin: "0 0 .85em",
                                    },
                                    "& ul, & ol": {
                                        paddingLeft: "1.45em",
                                    },
                                    "& table": {
                                        width: "100%",
                                        borderCollapse: "collapse",
                                        my: 2,
                                    },
                                    "& td, & th": {
                                        border: "1px solid #9ca3af",
                                        p: 1.25,
                                        verticalAlign: "top",
                                    },
                                    "& a": {
                                        color: "#2563eb",
                                        textDecoration: "underline",
                                    },
                                    "&:focus": {
                                        boxShadow:
                                            "0 30px 100px rgba(0,0,0,.45), 0 0 0 3px rgba(158,232,255,.3)",
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

/* POWERPOINT EDITOR */

const stableMultilineSx = {
    "& .MuiInputBase-root": {
        background: "rgba(0,0,0,.22)",
        alignItems: "flex-start",
    },
    "& textarea": {
        resize: "vertical",
        overflow: "auto",
        lineHeight: 1.45,
    },
};

const slideThemes = [
    {
        id: "blue",
        name: "Blue Gradient",
        background:
            "radial-gradient(circle at top left, rgba(158,232,255,.24), transparent 36%), radial-gradient(circle at bottom right, rgba(179,140,255,.24), transparent 36%), linear-gradient(135deg, #07101f, #0b1024)",
    },
    {
        id: "dark",
        name: "Dark Professional",
        background:
            "radial-gradient(circle at top right, rgba(255,255,255,.1), transparent 30%), linear-gradient(135deg, #111827, #020617)",
    },
    {
        id: "purple",
        name: "Purple Glow",
        background:
            "radial-gradient(circle at top left, rgba(179,140,255,.35), transparent 35%), linear-gradient(135deg, #160f2e, #090816)",
    },
    {
        id: "white",
        name: "Clean White",
        background: "linear-gradient(135deg, #ffffff, #eef2ff)",
        light: true,
    },
];

const defaultSlides = [
    {
        id: createId(),
        title: "BrowserSuite Presentation",
        body: "Create PowerPoint-style slides directly in the browser.",
        notes: "Introduce the suite and explain the frontend-only workflow.",
        theme: "blue",
        layout: "title-body",
    },
    {
        id: createId(),
        title: "Import PPTX Files",
        body: "Upload modern PowerPoint files and extract slide text into editable browser slides.",
        notes:
            "Imported PPTX files keep text content. Complex SmartArt, animations, and embedded media are not fully recreated.",
        theme: "purple",
        layout: "title-body",
    },
    {
        id: createId(),
        title: "Export Presentation",
        body: "Export a polished HTML deck that can be opened in any browser.",
        notes: "Use print-to-PDF from the browser if a PDF handoff is needed.",
        theme: "dark",
        layout: "section",
    },
];

function getTheme(themeId) {
    return slideThemes.find((theme) => theme.id === themeId) || slideThemes[0];
}

function getTextFitInfo(value) {
    const text = String(value || "").trim();
    const hardLines = text ? text.split(/\n+/).length : 1;
    const estimatedLines = Math.ceil(text.length / 52);

    return {
        chars: text.length,
        lines: Math.max(1, hardLines, estimatedLines),
    };
}

function getSlideFitStyles(slide) {
    const titleInfo = getTextFitInfo(slide?.title);
    const bodyInfo = getTextFitInfo(slide?.body);
    const layout = slide?.layout || "title-body";

    const contentPressure =
        titleInfo.lines * 1.6 +
        bodyInfo.lines +
        Math.ceil(bodyInfo.chars / 115);

    const titlePenalty = Math.max(0, contentPressure - 6) * 2.75;
    const bodyPenalty = Math.max(0, contentPressure - 7) * 1.6;

    const isBigTitle = layout === "big-title";
    const isSection = layout === "section";

    return {
        titleXs: clamp(
            (isBigTitle ? 38 : 30) - titlePenalty * 0.5,
            18,
            isBigTitle ? 38 : 30
        ),
        titleMd: clamp(
            (isBigTitle ? 76 : 58) - titlePenalty,
            25,
            isBigTitle ? 76 : 58
        ),
        bodyXs: clamp(
            (isSection ? 18 : 16) - bodyPenalty * 0.4,
            10,
            isSection ? 18 : 16
        ),
        bodyMd: clamp(
            (isSection ? 30 : 25) - bodyPenalty,
            12,
            isSection ? 30 : 25
        ),
        paddingXs: contentPressure > 12 ? 2.25 : 3.5,
        paddingMd: contentPressure > 12 ? 3.25 : 6,
        justify: contentPressure > 9 ? "flex-start" : "center",
        crowded: contentPressure > 9,
    };
}

function pptxSlideXmlToSlide(xmlText, index, notes = "") {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "application/xml");
    const paragraphNodes = getNodesByLocalName(xml, "p");

    const paragraphs = paragraphNodes
        .map((paragraph) => {
            const textNodes = getNodesByLocalName(paragraph, "t");

            return textNodes
                .map((node) => node.textContent || "")
                .join("")
                .trim();
        })
        .filter(Boolean);

    const title = paragraphs[0] || `Imported Slide ${index + 1}`;
    const body = paragraphs.slice(1).join("\n") || "Imported slide content";

    return {
        id: createId(),
        title,
        body,
        notes,
        theme: index % 2 === 0 ? "blue" : "dark",
        layout: "title-body",
    };
}

function buildPresentationHtml(slides) {
    const renderedSlides = slides
        .map((slide, index) => {
            const theme = getTheme(slide.theme);
            const fit = getSlideFitStyles(slide);
            const foreground = theme.light ? "#111827" : "white";
            const secondary = theme.light ? "rgba(17,24,39,.72)" : "rgba(255,255,255,.76)";
            const safeTitle = escapeHtml(slide.title);
            const safeBody = escapeHtml(slide.body).replaceAll("\n", "<br />");
            const safeNotes = escapeHtml(slide.notes).replaceAll("\n", "<br />");

            return `
<section class="slide" style="background:${theme.background}; color:${foreground};">
  <div class="slide-number">Slide ${index + 1}</div>

  <div class="slide-content" style="
    justify-content:${fit.justify};
    padding:${fit.paddingMd * 8}px;
  ">
    <div class="slide-scroll">
      <h1 style="font-size:${fit.titleMd}px;">${safeTitle}</h1>
      ${
                slide.layout !== "big-title"
                    ? `<p style="color:${secondary}; font-size:${fit.bodyMd}px;">${safeBody}</p>`
                    : ""
            }
      ${
                safeNotes
                    ? `<aside class="notes"><strong>Speaker Notes:</strong><br />${safeNotes}</aside>`
                    : ""
            }
    </div>
  </div>
</section>`;
        })
        .join("\n");

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Presentation Export</title>
<style>
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #050711;
    color: white;
  }

  .slide {
    min-height: 100vh;
    position: relative;
    border-bottom: 1px solid rgba(255,255,255,0.16);
    overflow: hidden;
  }

  .slide-number {
    position: absolute;
    top: 24px;
    left: 32px;
    z-index: 2;
    color: #9ee8ff;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .slide-content {
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .slide-scroll {
    max-height: calc(100vh - 96px);
    overflow-y: auto;
    overflow-x: hidden;
  }

  h1 {
    max-width: 1000px;
    margin: 0 0 24px;
    line-height: 1.04;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  p {
    max-width: 900px;
    margin: 0;
    line-height: 1.28;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .notes {
    margin-top: 42px;
    max-width: 900px;
    padding: 18px 20px;
    color: rgba(255,255,255,0.74);
    background: rgba(0,0,0,0.22);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 18px;
    font-size: 16px;
    line-height: 1.6;
  }

  @media print {
    .slide {
      min-height: 100vh;
      page-break-after: always;
    }

    .slide-scroll {
      max-height: none;
      overflow: visible;
    }
  }
</style>
</head>
<body>
  <main>
    ${renderedSlides}
  </main>
</body>
</html>`;
}

export function PowerPointEditor() {
    const pptxInputRef = useRef(null);

    const [slides, setSlides] = useState(defaultSlides);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [fileName, setFileName] = useState("presentation");
    const [status, setStatus] = useState(
        "Ready. Import a PPTX file or start building slides."
    );

    const safeSelectedIndex = clamp(selectedIndex, 0, Math.max(0, slides.length - 1));
    const selectedSlide = slides[safeSelectedIndex] || slides[0];
    const selectedTheme = getTheme(selectedSlide.theme);

    const slideFit = useMemo(() => {
        return getSlideFitStyles(selectedSlide);
    }, [selectedSlide]);

    async function importPptx(event) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.name.toLowerCase().endsWith(".pptx")) {
            setStatus("Only modern .pptx files are supported for PowerPoint import.");
            return;
        }

        try {
            setStatus(`Importing ${file.name}...`);

            const buffer = await file.arrayBuffer();
            const zip = await JSZip.loadAsync(buffer);

            const slideFiles = zip
                .file(/^ppt\/slides\/slide\d+\.xml$/)
                .sort((a, b) => {
                    const aNumber = Number(a.name.match(/slide(\d+)\.xml$/)?.[1] || 0);
                    const bNumber = Number(b.name.match(/slide(\d+)\.xml$/)?.[1] || 0);
                    return aNumber - bNumber;
                });

            if (!slideFiles.length) {
                setStatus("This PPTX file does not contain readable slide XML.");
                return;
            }

            const importedSlides = [];

            for (let index = 0; index < slideFiles.length; index += 1) {
                const slideXml = await slideFiles[index].async("text");
                const notesFile = zip.file(`ppt/notesSlides/notesSlide${index + 1}.xml`);
                let notes = "";

                if (notesFile) {
                    const notesXml = await notesFile.async("text");
                    const parser = new DOMParser();
                    const notesDoc = parser.parseFromString(notesXml, "application/xml");

                    notes = getNodesByLocalName(notesDoc, "t")
                        .map((node) => node.textContent || "")
                        .join(" ")
                        .trim();
                }

                importedSlides.push(pptxSlideXmlToSlide(slideXml, index, notes));
            }

            setSlides(importedSlides);
            setSelectedIndex(0);
            setFileName(file.name.replace(/\.pptx$/i, "-edited"));
            setStatus(
                `Imported ${importedSlides.length} slides. Text and notes were converted into editable browser slides.`
            );
        } catch (error) {
            console.error(error);
            setStatus("PPTX import failed. The file may be encrypted, damaged, or unsupported.");
        } finally {
            if (pptxInputRef.current) {
                pptxInputRef.current.value = "";
            }
        }
    }

    function updateSelectedSlide(field, value) {
        setSlides((previousSlides) =>
            previousSlides.map((slide, index) =>
                index === safeSelectedIndex
                    ? {
                        ...slide,
                        [field]: value,
                    }
                    : slide
            )
        );
    }

    function addSlide() {
        const nextSlide = {
            id: createId(),
            title: `New Slide ${slides.length + 1}`,
            body: "Click directly on the title or body to edit this slide.",
            notes: "",
            theme: "blue",
            layout: "title-body",
        };

        setSlides((previousSlides) => [...previousSlides, nextSlide]);
        setSelectedIndex(slides.length);
    }

    function duplicateSlide() {
        const copiedSlide = {
            ...selectedSlide,
            id: createId(),
            title: `${selectedSlide.title || "Untitled Slide"} Copy`,
        };

        setSlides((previousSlides) => {
            const nextSlides = [...previousSlides];
            nextSlides.splice(safeSelectedIndex + 1, 0, copiedSlide);
            return nextSlides;
        });

        setSelectedIndex(safeSelectedIndex + 1);
    }

    function deleteSlide(indexToDelete) {
        setSlides((previousSlides) => {
            if (previousSlides.length <= 1) {
                return [
                    {
                        id: createId(),
                        title: "New Slide",
                        body: "Add your slide content here.",
                        notes: "",
                        theme: "blue",
                        layout: "title-body",
                    },
                ];
            }

            return previousSlides.filter((_, index) => index !== indexToDelete);
        });

        setSelectedIndex((previousIndex) => {
            if (previousIndex <= 0) {
                return 0;
            }

            return Math.max(0, previousIndex - 1);
        });
    }

    function resetDeck() {
        setSlides(defaultSlides);
        setSelectedIndex(0);
        setFileName("presentation");
        setStatus("Presentation reset.");
    }

    function exportHtmlPresentation() {
        const html = buildPresentationHtml(slides);

        downloadTextFile(
            `${fileName.trim() || "presentation"}.html`,
            html,
            "text/html;charset=utf-8"
        );

        setStatus("HTML presentation exported.");
    }

    function exportJsonPresentation() {
        downloadTextFile(
            `${fileName.trim() || "presentation"}.json`,
            JSON.stringify(slides, null, 2),
            "application/json;charset=utf-8"
        );

        setStatus("Presentation JSON exported.");
    }

    return (
        <Paper
            sx={{
                overflow: "hidden",
                background: "rgba(255,255,255,.055)",
                border: "1px solid rgba(255,255,255,.12)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 28px 90px rgba(0,0,0,.45)",
            }}
        >
            <Box
                sx={{
                    background: "rgba(8,13,28,.88)",
                    borderBottom: "1px solid rgba(255,255,255,.1)",
                }}
            >
                <Stack
                    direction={{ xs: "column", xl: "row" }}
                    spacing={1.5}
                    alignItems={{ xs: "stretch", xl: "center" }}
                    sx={{ p: 2 }}
                >
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1 }}>
                        <SlideshowRoundedIcon sx={{ color: "#9ee8ff" }} />

                        <Box>
                            <Typography sx={{ fontWeight: 950, lineHeight: 1 }}>
                                PowerPoint Workspace
                            </Typography>

                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,.6)" }}>
                                Slide thumbnails · direct slide editing · speaker notes
                            </Typography>
                        </Box>
                    </Stack>

                    <input
                        ref={pptxInputRef}
                        type="file"
                        accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                        hidden
                        onChange={importPptx}
                    />

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Button
                            variant="outlined"
                            startIcon={<FileOpenRoundedIcon />}
                            onClick={() => pptxInputRef.current?.click()}
                            sx={{ color: "white", borderColor: "rgba(255,255,255,.18)" }}
                        >
                            Import PPTX
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<AddRoundedIcon />}
                            onClick={addSlide}
                            sx={{ color: "white", borderColor: "rgba(255,255,255,.18)" }}
                        >
                            New Slide
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<AddToPhotosRoundedIcon />}
                            onClick={duplicateSlide}
                            sx={{ color: "white", borderColor: "rgba(255,255,255,.18)" }}
                        >
                            Duplicate
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<SaveAltRoundedIcon />}
                            onClick={exportHtmlPresentation}
                            sx={{
                                color: "#061019",
                                fontWeight: 950,
                                background:
                                    "linear-gradient(135deg, #9ee8ff 0%, #b38cff 100%)",
                            }}
                        >
                            Export Deck
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<FileDownloadRoundedIcon />}
                            onClick={exportJsonPresentation}
                            sx={{ color: "white", borderColor: "rgba(255,255,255,.18)" }}
                        >
                            JSON
                        </Button>

                        <Tooltip title="Reset presentation">
                            <IconButton
                                onClick={resetDeck}
                                sx={{ color: "white", border: "1px solid rgba(255,255,255,.14)" }}
                            >
                                <RestartAltRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>

                <Divider sx={{ borderColor: "rgba(255,255,255,.1)" }} />

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ p: 1.5 }}
                >
                    <Chip
                        icon={<ViewColumnRoundedIcon />}
                        label={`${slides.length} slides`}
                        sx={{
                            color: "white",
                            background: "rgba(158,232,255,.1)",
                            border: "1px solid rgba(158,232,255,.2)",
                            fontWeight: 800,
                        }}
                    />

                    <TextField
                        label="Export file name"
                        value={fileName}
                        onChange={(event) => setFileName(event.target.value)}
                        size="small"
                        sx={{
                            minWidth: 240,
                            "& .MuiInputBase-root": {
                                background: "rgba(0,0,0,.22)",
                            },
                        }}
                    />

                    <Select
                        size="small"
                        value={selectedSlide.theme}
                        onChange={(event) => updateSelectedSlide("theme", event.target.value)}
                        sx={{
                            minWidth: 190,
                            background: "rgba(0,0,0,.22)",
                        }}
                    >
                        {slideThemes.map((theme) => (
                            <MenuItem key={theme.id} value={theme.id}>
                                {theme.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select
                        size="small"
                        value={selectedSlide.layout}
                        onChange={(event) => updateSelectedSlide("layout", event.target.value)}
                        sx={{
                            minWidth: 170,
                            background: "rgba(0,0,0,.22)",
                        }}
                    >
                        <MenuItem value="title-body">Title + Body</MenuItem>
                        <MenuItem value="section">Section Slide</MenuItem>
                        <MenuItem value="big-title">Big Title</MenuItem>
                    </Select>

                    <Typography sx={{ color: "rgba(255,255,255,.62)", fontSize: 14 }}>
                        {status}
                    </Typography>
                </Stack>
            </Box>

            <Grid
                container
                sx={{
                    minHeight: "76vh",
                    width: "100%",
                    overflow: "hidden",
                }}
            >
                <Grid
                    item
                    xs={12}
                    md={3}
                    lg={3}
                    sx={{
                        minWidth: 0,
                        borderRight: { md: "1px solid rgba(255,255,255,.1)" },
                        background: "rgba(0,0,0,.2)",
                    }}
                >
                    <Box
                        sx={{
                            p: 2,
                            maxHeight: { md: "76vh" },
                            overflowY: "auto",
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 950, mb: 2 }}>
                            Slides
                        </Typography>

                        <Stack spacing={1.25}>
                            {slides.map((slide, index) => {
                                const active = safeSelectedIndex === index;
                                const theme = getTheme(slide.theme);

                                return (
                                    <Card
                                        key={slide.id}
                                        onClick={() => setSelectedIndex(index)}
                                        sx={{
                                            cursor: "pointer",
                                            background: active
                                                ? "rgba(158,232,255,.15)"
                                                : "rgba(255,255,255,.055)",
                                            border: active
                                                ? "1px solid rgba(158,232,255,.5)"
                                                : "1px solid rgba(255,255,255,.1)",
                                        }}
                                    >
                                        <CardContent sx={{ p: 1.25, "&:last-child": { pb: 1.25 } }}>
                                            <Stack direction="row" spacing={1} alignItems="flex-start">
                                                <Typography
                                                    sx={{
                                                        width: 24,
                                                        color: active ? "#9ee8ff" : "rgba(255,255,255,.55)",
                                                        fontWeight: 950,
                                                    }}
                                                >
                                                    {index + 1}
                                                </Typography>

                                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                                    <Box
                                                        sx={{
                                                            aspectRatio: "16 / 9",
                                                            mb: 1,
                                                            borderRadius: 1.4,
                                                            border: "1px solid rgba(255,255,255,.12)",
                                                            background: theme.background,
                                                            p: 1,
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                color: theme.light ? "#111827" : "white",
                                                                fontSize: 9,
                                                                fontWeight: 950,
                                                                lineHeight: 1.05,
                                                                overflow: "hidden",
                                                                display: "-webkit-box",
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: "vertical",
                                                            }}
                                                        >
                                                            {slide.title}
                                                        </Typography>

                                                        <Typography
                                                            sx={{
                                                                color: theme.light
                                                                    ? "rgba(17,24,39,.65)"
                                                                    : "rgba(255,255,255,.62)",
                                                                fontSize: 6.5,
                                                                mt: 0.5,
                                                                lineHeight: 1.15,
                                                                overflow: "hidden",
                                                                display: "-webkit-box",
                                                                WebkitLineClamp: 4,
                                                                WebkitBoxOrient: "vertical",
                                                            }}
                                                        >
                                                            {slide.body}
                                                        </Typography>
                                                    </Box>

                                                    <Typography
                                                        sx={{
                                                            fontWeight: 900,
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        {slide.title || "Untitled Slide"}
                                                    </Typography>
                                                </Box>

                                                <Tooltip title="Delete slide">
                                                    <IconButton
                                                        size="small"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            deleteSlide(index);
                                                        }}
                                                        sx={{ color: "rgba(255,255,255,.58)" }}
                                                    >
                                                        <DeleteRoundedIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </Stack>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} lg={6} sx={{ minWidth: 0 }}>
                    <Box
                        sx={{
                            height: "100%",
                            minHeight: 640,
                            p: { xs: 2, md: 3 },
                            display: "grid",
                            placeItems: "center",
                            background:
                                "linear-gradient(180deg, rgba(255,255,255,.035), rgba(0,0,0,.22))",
                        }}
                    >
                        <Box sx={{ width: "100%", maxWidth: 980, minWidth: 0 }}>
                            <Box
                                sx={{
                                    aspectRatio: "16 / 9",
                                    width: "100%",
                                    borderRadius: 4,
                                    overflow: "hidden",
                                    position: "relative",
                                    background: selectedTheme.background,
                                    border: "1px solid rgba(255,255,255,.16)",
                                    boxShadow: "0 30px 100px rgba(0,0,0,.45)",
                                }}
                            >
                                <Typography
                                    variant="overline"
                                    sx={{
                                        position: "absolute",
                                        top: 16,
                                        left: 22,
                                        zIndex: 2,
                                        color: selectedTheme.light ? "#2563eb" : "#9ee8ff",
                                        fontWeight: 950,
                                        letterSpacing: 1.4,
                                        fontSize: { xs: 9, md: 12 },
                                        pointerEvents: "none",
                                    }}
                                >
                                    Slide {safeSelectedIndex + 1}
                                </Typography>

                                <Box
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                        minHeight: 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: slideFit.justify,
                                        pt: { xs: 5, md: 6 },
                                        pb: { xs: 4, md: 5 },
                                        px: {
                                            xs: slideFit.paddingXs,
                                            md: slideFit.paddingMd,
                                        },
                                        overflow: "hidden",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            minHeight: 0,
                                            maxHeight: "100%",
                                            overflowY: "auto",
                                            overflowX: "hidden",
                                            pr: 0.5,
                                            scrollbarWidth: "thin",
                                        }}
                                    >
                                        <Box
                                            contentEditable
                                            suppressContentEditableWarning
                                            onInput={(event) =>
                                                updateSelectedSlide("title", event.currentTarget.innerText)
                                            }
                                            sx={{
                                                outline: "none",
                                                color: selectedTheme.light ? "#111827" : "white",
                                                fontWeight: 950,
                                                fontSize: {
                                                    xs: slideFit.titleXs,
                                                    md: slideFit.titleMd,
                                                },
                                                lineHeight: 1.04,
                                                mb: selectedSlide.layout === "big-title" ? 0 : 1.35,
                                                maxWidth: "100%",
                                                overflowWrap: "anywhere",
                                                wordBreak: "break-word",
                                                whiteSpace: "pre-wrap",
                                                "&:focus": {
                                                    boxShadow: "0 0 0 3px rgba(158,232,255,.35)",
                                                    borderRadius: 2,
                                                },
                                            }}
                                        >
                                            {selectedSlide.title}
                                        </Box>

                                        {selectedSlide.layout !== "big-title" && (
                                            <Box
                                                contentEditable
                                                suppressContentEditableWarning
                                                onInput={(event) =>
                                                    updateSelectedSlide("body", event.currentTarget.innerText)
                                                }
                                                sx={{
                                                    outline: "none",
                                                    color: selectedTheme.light
                                                        ? "rgba(17,24,39,.72)"
                                                        : "rgba(255,255,255,.78)",
                                                    whiteSpace: "pre-wrap",
                                                    fontSize: {
                                                        xs: slideFit.bodyXs,
                                                        md: slideFit.bodyMd,
                                                    },
                                                    lineHeight: 1.24,
                                                    maxWidth: "100%",
                                                    overflowWrap: "anywhere",
                                                    wordBreak: "break-word",
                                                    "&:focus": {
                                                        boxShadow: "0 0 0 3px rgba(158,232,255,.35)",
                                                        borderRadius: 2,
                                                    },
                                                }}
                                            >
                                                {selectedSlide.body}
                                            </Box>
                                        )}
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        position: "absolute",
                                        right: 22,
                                        bottom: 18,
                                        width: 80,
                                        height: 5,
                                        borderRadius: 999,
                                        background: selectedTheme.light
                                            ? "rgba(37,99,235,.4)"
                                            : "rgba(158,232,255,.4)",
                                        pointerEvents: "none",
                                    }}
                                />
                            </Box>

                            <Typography
                                sx={{
                                    mt: 1.5,
                                    color: "rgba(255,255,255,.55)",
                                    textAlign: "center",
                                }}
                            >
                                Click directly on the slide title or body text to edit. Long imported slides auto-fit and scroll inside the slide instead of clipping.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={3}
                    lg={3}
                    sx={{
                        minWidth: 0,
                        borderLeft: { md: "1px solid rgba(255,255,255,.1)" },
                        background: "rgba(0,0,0,.16)",
                    }}
                >
                    <Box
                        sx={{
                            p: 2,
                            maxHeight: { md: "76vh" },
                            overflowY: "auto",
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 950, mb: 2 }}>
                            Slide Details
                        </Typography>

                        <Stack spacing={2}>
                            <TextField
                                label="Slide title"
                                value={selectedSlide.title}
                                onChange={(event) => updateSelectedSlide("title", event.target.value)}
                                multiline
                                rows={2}
                                fullWidth
                                sx={stableMultilineSx}
                            />

                            <TextField
                                label="Slide body"
                                value={selectedSlide.body}
                                onChange={(event) => updateSelectedSlide("body", event.target.value)}
                                multiline
                                rows={6}
                                fullWidth
                                sx={stableMultilineSx}
                            />

                            <TextField
                                label="Speaker notes"
                                value={selectedSlide.notes}
                                onChange={(event) => updateSelectedSlide("notes", event.target.value)}
                                multiline
                                rows={8}
                                fullWidth
                                sx={stableMultilineSx}
                            />

                            <Button
                                variant="outlined"
                                startIcon={<WebAssetRoundedIcon />}
                                onClick={() => updateSelectedSlide("layout", "title-body")}
                                sx={{ color: "white", borderColor: "rgba(255,255,255,.18)" }}
                            >
                                Title + Body Layout
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={<TitleRoundedIcon />}
                                onClick={() => updateSelectedSlide("layout", "big-title")}
                                sx={{ color: "white", borderColor: "rgba(255,255,255,.18)" }}
                            >
                                Big Title Layout
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={<NotesRoundedIcon />}
                                onClick={() =>
                                    updateSelectedSlide(
                                        "notes",
                                        "Explain the main idea of this slide and what the audience should remember."
                                    )
                                }
                                sx={{ color: "white", borderColor: "rgba(255,255,255,.18)" }}
                            >
                                Add Notes Template
                            </Button>

                            <Alert
                                severity="info"
                                sx={{
                                    background: "rgba(158,232,255,.09)",
                                    color: "rgba(255,255,255,.82)",
                                    border: "1px solid rgba(158,232,255,.18)",
                                    "& .MuiAlert-icon": {
                                        color: "#9ee8ff",
                                    },
                                }}
                            >
                                PPTX import reads slide text and notes. Complex animations, videos, SmartArt, images, and exact PowerPoint styling are not fully recreated in this frontend parser.
                            </Alert>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

/* PDF EDITOR */

const pdfTools = [
    {
        value: "select",
        label: "Select",
        icon: <LayersRoundedIcon fontSize="small" />,
    },
    {
        value: "text",
        label: "Text",
        icon: <TextFieldsRoundedIcon fontSize="small" />,
    },
    {
        value: "highlight",
        label: "Highlight",
        icon: <HighlightRoundedIcon fontSize="small" />,
    },
    {
        value: "box",
        label: "Box",
        icon: <CropSquareRoundedIcon fontSize="small" />,
    },
    {
        value: "redact",
        label: "Redact",
        icon: <DeleteSweepRoundedIcon fontSize="small" />,
    },
    {
        value: "note",
        label: "Note",
        icon: <NotesRoundedIcon fontSize="small" />,
    },
    {
        value: "signature",
        label: "Signature",
        icon: <GestureRoundedIcon fontSize="small" />,
    },
    {
        value: "ink",
        label: "Ink Note",
        icon: <BorderColorRoundedIcon fontSize="small" />,
    },
];

function getAnnotationLabel(type) {
    if (type === "text") return "Text";
    if (type === "highlight") return "Highlight";
    if (type === "box") return "Box";
    if (type === "redact") return "Redaction";
    if (type === "note") return "Note";
    if (type === "signature") return "Signature";
    if (type === "ink") return "Ink Note";
    return "Annotation";
}

export function PdfEditor() {
    const fileInputRef = useRef(null);
    const pageCanvasRefs = useRef({});
    const renderTokenRef = useRef(0);

    const [pdfBytes, setPdfBytes] = useState(null);
    const [pdfDocProxy, setPdfDocProxy] = useState(null);
    const [fileName, setFileName] = useState("edited-document.pdf");
    const [pageCount, setPageCount] = useState(0);
    const [activePageIndex, setActivePageIndex] = useState(0);
    const [zoom, setZoom] = useState(115);
    const [tool, setTool] = useState("text");
    const [annotations, setAnnotations] = useState([]);
    const [selectedAnnotationId, setSelectedAnnotationId] = useState(null);
    const [defaultText, setDefaultText] = useState("New text");
    const [defaultNote, setDefaultNote] = useState("Note");
    const [fontSize, setFontSize] = useState(18);
    const [strokeWidth, setStrokeWidth] = useState(2);
    const [textColor, setTextColor] = useState("#111827");
    const [fillColor, setFillColor] = useState("#fff176");
    const [boxColor, setBoxColor] = useState("#2563eb");
    const [signatureName, setSignatureName] = useState("Signature");
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState(
        "Open a PDF file to begin. Add edits by choosing a tool and clicking the page."
    );

    const selectedAnnotation = useMemo(() => {
        return annotations.find((item) => item.id === selectedAnnotationId) || null;
    }, [annotations, selectedAnnotationId]);

    const annotationStats = useMemo(() => {
        return {
            total: annotations.length,
            text: annotations.filter((item) => item.type === "text").length,
            highlights: annotations.filter((item) => item.type === "highlight").length,
            boxes: annotations.filter((item) => item.type === "box").length,
            redactions: annotations.filter((item) => item.type === "redact").length,
            notes: annotations.filter((item) => item.type === "note").length,
            signatures: annotations.filter((item) => item.type === "signature").length,
            ink: annotations.filter((item) => item.type === "ink").length,
        };
    }, [annotations]);

    const visiblePageIndexes = useMemo(() => {
        if (!pageCount) {
            return [];
        }

        return Array.from({ length: pageCount }).map((_, index) => index);
    }, [pageCount]);

    const filteredAnnotations = useMemo(() => {
        if (!searchTerm.trim()) {
            return annotations;
        }

        return annotations.filter((item) => {
            const haystack = `${getAnnotationLabel(item.type)} ${item.text || ""} ${
                item.note || ""
            } page ${item.pageIndex + 1}`.toLowerCase();

            return haystack.includes(searchTerm.toLowerCase());
        });
    }, [annotations, searchTerm]);

    useEffect(() => {
        if (!pdfDocProxy) {
            return;
        }

        let cancelled = false;
        const currentToken = renderTokenRef.current + 1;
        renderTokenRef.current = currentToken;

        async function renderPages() {
            for (let index = 0; index < pageCount; index += 1) {
                if (cancelled || renderTokenRef.current !== currentToken) {
                    return;
                }

                const pageNumber = index + 1;
                const page = await pdfDocProxy.getPage(pageNumber);
                const canvas = pageCanvasRefs.current[index];

                if (!canvas) {
                    continue;
                }

                const viewport = page.getViewport({
                    scale: zoom / 100,
                });

                const context = canvas.getContext("2d");

                canvas.width = Math.floor(viewport.width);
                canvas.height = Math.floor(viewport.height);
                canvas.style.width = `${viewport.width}px`;
                canvas.style.height = `${viewport.height}px`;

                context.clearRect(0, 0, canvas.width, canvas.height);

                await page.render({
                    canvasContext: context,
                    viewport,
                }).promise;
            }
        }

        renderPages().catch((error) => {
            console.error(error);
            setStatus("PDF rendering failed. Try a different file or lower zoom.");
        });

        return () => {
            cancelled = true;
        };
    }, [pdfDocProxy, pageCount, zoom]);

    async function openPdf(event) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.name.toLowerCase().endsWith(".pdf")) {
            setStatus("Only PDF files are supported on this page.");
            return;
        }

        try {
            setStatus(`Opening ${file.name}...`);

            const buffer = await file.arrayBuffer();
            const bytes = new Uint8Array(buffer);
            const loadingTask = pdfjsLib.getDocument({
                data: bytes,
                useWorkerFetch: true,
                isEvalSupported: false,
            });

            const loadedPdf = await loadingTask.promise;

            setPdfBytes(bytes);
            setPdfDocProxy(loadedPdf);
            setFileName(file.name.replace(/\.pdf$/i, "-edited.pdf"));
            setPageCount(loadedPdf.numPages);
            setActivePageIndex(0);
            setAnnotations([]);
            setSelectedAnnotationId(null);
            setStatus(
                `Opened ${file.name}. ${loadedPdf.numPages} page${
                    loadedPdf.numPages === 1 ? "" : "s"
                } loaded.`
            );
        } catch (error) {
            console.error(error);
            setStatus("Failed to open PDF. The file may be encrypted, damaged, or unsupported.");
        } finally {
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    }

    function addAnnotationFromClick(pageIndex, event) {
        if (!pdfDocProxy || tool === "select") {
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();

        const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
        const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);

        let nextAnnotation = {
            id: createId(),
            pageIndex,
            type: tool,
            xRatio: x,
            yRatio: y,
            wRatio: 0.24,
            hRatio: 0.055,
            text: defaultText,
            note: defaultNote,
            fontSize,
            strokeWidth,
            textColor,
            fillColor,
            boxColor,
            opacity: 0.38,
        };

        if (tool === "highlight") {
            nextAnnotation = {
                ...nextAnnotation,
                wRatio: 0.34,
                hRatio: 0.035,
                text: "",
                opacity: 0.45,
            };
        }

        if (tool === "box") {
            nextAnnotation = {
                ...nextAnnotation,
                wRatio: 0.26,
                hRatio: 0.11,
                text: "",
                opacity: 0,
            };
        }

        if (tool === "redact") {
            nextAnnotation = {
                ...nextAnnotation,
                wRatio: 0.3,
                hRatio: 0.05,
                text: "",
                fillColor: "#111111",
                opacity: 1,
            };
        }

        if (tool === "note") {
            nextAnnotation = {
                ...nextAnnotation,
                wRatio: 0.24,
                hRatio: 0.09,
                text: defaultNote,
                fillColor: "#fff7cc",
                textColor: "#111827",
                opacity: 0.92,
            };
        }

        if (tool === "signature") {
            nextAnnotation = {
                ...nextAnnotation,
                wRatio: 0.28,
                hRatio: 0.08,
                text: signatureName,
                fontSize: 24,
                textColor: "#111827",
                fillColor: "#ffffff",
                opacity: 0,
            };
        }

        if (tool === "ink") {
            nextAnnotation = {
                ...nextAnnotation,
                wRatio: 0.3,
                hRatio: 0.08,
                text: defaultText,
                fontSize: 16,
                textColor: "#1d4ed8",
                fillColor: "#ffffff",
                opacity: 0,
            };
        }

        setAnnotations((previous) => [...previous, nextAnnotation]);
        setSelectedAnnotationId(nextAnnotation.id);
        setStatus(`${getAnnotationLabel(tool)} annotation added to page ${pageIndex + 1}.`);
    }

    function updateAnnotation(id, patch) {
        setAnnotations((previous) =>
            previous.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        ...patch,
                    }
                    : item
            )
        );
    }

    function moveAnnotation(id, dxRatio, dyRatio) {
        setAnnotations((previous) =>
            previous.map((item) => {
                if (item.id !== id) {
                    return item;
                }

                return {
                    ...item,
                    xRatio: clamp(item.xRatio + dxRatio, 0, 0.98),
                    yRatio: clamp(item.yRatio + dyRatio, 0, 0.98),
                };
            })
        );
    }

    function resizeAnnotation(id, dwRatio, dhRatio) {
        setAnnotations((previous) =>
            previous.map((item) => {
                if (item.id !== id) {
                    return item;
                }

                return {
                    ...item,
                    wRatio: clamp(item.wRatio + dwRatio, 0.03, 0.95),
                    hRatio: clamp(item.hRatio + dhRatio, 0.02, 0.95),
                };
            })
        );
    }

    function deleteSelectedAnnotation() {
        if (!selectedAnnotationId) {
            return;
        }

        setAnnotations((previous) =>
            previous.filter((item) => item.id !== selectedAnnotationId)
        );
        setSelectedAnnotationId(null);
        setStatus("Selected PDF edit removed.");
    }

    function clearPageAnnotations() {
        setAnnotations((previous) =>
            previous.filter((item) => item.pageIndex !== activePageIndex)
        );
        setSelectedAnnotationId(null);
        setStatus(`All edits removed from page ${activePageIndex + 1}.`);
    }

    function resetPdfWorkspace() {
        setPdfBytes(null);
        setPdfDocProxy(null);
        setPageCount(0);
        setActivePageIndex(0);
        setAnnotations([]);
        setSelectedAnnotationId(null);
        setFileName("edited-document.pdf");
        setZoom(115);
        setStatus("Workspace reset. Open a PDF file to begin.");
    }

    function copyAnnotationSummary() {
        const summary = annotations
            .map((item, index) => {
                return `${index + 1}. Page ${item.pageIndex + 1} - ${getAnnotationLabel(
                    item.type
                )}: ${item.text || item.note || ""}`;
            })
            .join("\n");

        navigator.clipboard.writeText(summary || "No PDF edits yet.");
        setStatus("PDF edit summary copied to clipboard.");
    }

    async function exportEditedPdf() {
        if (!pdfBytes) {
            setStatus("Open a PDF before exporting.");
            return;
        }

        try {
            setStatus("Exporting edited PDF...");

            const pdfDoc = await PDFDocument.load(pdfBytes);
            const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
            const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
            const pages = pdfDoc.getPages();

            annotations.forEach((annotation) => {
                const page = pages[annotation.pageIndex];

                if (!page) {
                    return;
                }

                const pageWidth = page.getWidth();
                const pageHeight = page.getHeight();

                const x = annotation.xRatio * pageWidth;
                const w = annotation.wRatio * pageWidth;
                const h = annotation.hRatio * pageHeight;
                const y = pageHeight - annotation.yRatio * pageHeight - h;

                if (annotation.type === "highlight") {
                    page.drawRectangle({
                        x,
                        y,
                        width: w,
                        height: h,
                        color: hexToRgb01(annotation.fillColor || "#fff176"),
                        opacity: annotation.opacity ?? 0.45,
                    });
                }

                if (annotation.type === "redact") {
                    page.drawRectangle({
                        x,
                        y,
                        width: w,
                        height: h,
                        color: rgb(0, 0, 0),
                        opacity: 1,
                    });
                }

                if (annotation.type === "box") {
                    page.drawRectangle({
                        x,
                        y,
                        width: w,
                        height: h,
                        borderColor: hexToRgb01(annotation.boxColor || "#2563eb"),
                        borderWidth: Number(annotation.strokeWidth) || 2,
                        opacity: 1,
                    });
                }

                if (annotation.type === "note") {
                    page.drawRectangle({
                        x,
                        y,
                        width: w,
                        height: h,
                        color: hexToRgb01(annotation.fillColor || "#fff7cc"),
                        borderColor: rgb(0.86, 0.68, 0.1),
                        borderWidth: 1,
                        opacity: annotation.opacity ?? 0.92,
                    });

                    page.drawText(annotation.text || annotation.note || "Note", {
                        x: x + 8,
                        y: y + h - 18,
                        size: clamp(Number(annotation.fontSize) || 12, 8, 28),
                        font: helvetica,
                        color: hexToRgb01(annotation.textColor || "#111827"),
                        maxWidth: Math.max(20, w - 16),
                        lineHeight: clamp(Number(annotation.fontSize) || 12, 8, 28) * 1.2,
                    });
                }

                if (annotation.type === "text") {
                    page.drawText(annotation.text || "Text", {
                        x,
                        y: y + Math.max(2, h - (Number(annotation.fontSize) || 18)),
                        size: clamp(Number(annotation.fontSize) || 18, 8, 72),
                        font: helvetica,
                        color: hexToRgb01(annotation.textColor || "#111827"),
                        maxWidth: Math.max(20, w),
                        lineHeight: clamp(Number(annotation.fontSize) || 18, 8, 72) * 1.2,
                    });
                }

                if (annotation.type === "signature") {
                    page.drawText(annotation.text || signatureName || "Signature", {
                        x,
                        y: y + Math.max(2, h / 2 - 8),
                        size: clamp(Number(annotation.fontSize) || 24, 10, 72),
                        font: helveticaOblique,
                        color: hexToRgb01(annotation.textColor || "#111827"),
                        maxWidth: Math.max(30, w),
                    });

                    page.drawLine({
                        start: {
                            x,
                            y: y + 4,
                        },
                        end: {
                            x: x + w,
                            y: y + 4,
                        },
                        thickness: 1,
                        color: hexToRgb01(annotation.textColor || "#111827"),
                    });
                }

                if (annotation.type === "ink") {
                    page.drawText(annotation.text || "Ink note", {
                        x,
                        y: y + Math.max(2, h - (Number(annotation.fontSize) || 16)),
                        size: clamp(Number(annotation.fontSize) || 16, 8, 48),
                        font: helveticaOblique,
                        color: hexToRgb01(annotation.textColor || "#1d4ed8"),
                        maxWidth: Math.max(20, w),
                        lineHeight: clamp(Number(annotation.fontSize) || 16, 8, 48) * 1.2,
                    });
                }
            });

            const editedBytes = await pdfDoc.save();
            const safeName = fileName.trim().toLowerCase().endsWith(".pdf")
                ? fileName.trim()
                : `${fileName.trim() || "edited-document"}.pdf`;

            downloadBytesFile(safeName, editedBytes, "application/pdf");
            setStatus(`Edited PDF exported with ${annotations.length} edit layer item(s).`);
        } catch (error) {
            console.error(error);
            setStatus("PDF export failed. Try a different PDF or remove complex edits.");
        }
    }

    function openPreviewInNewTab() {
        if (!pdfBytes) {
            return;
        }

        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank", "noopener,noreferrer");
    }

    function goToPreviousPage() {
        setActivePageIndex((previous) => clamp(previous - 1, 0, pageCount - 1));
    }

    function goToNextPage() {
        setActivePageIndex((previous) => clamp(previous + 1, 0, pageCount - 1));
    }

    return (
        <Paper
            sx={{
                overflow: "hidden",
                background: "rgba(255,255,255,.055)",
                border: "1px solid rgba(255,255,255,.12)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 28px 90px rgba(0,0,0,.45)",
            }}
        >
            <Box
                sx={{
                    background:
                        "linear-gradient(180deg, rgba(117,18,18,.92), rgba(67,16,28,.9))",
                    borderBottom: "1px solid rgba(255,255,255,.14)",
                }}
            >
                <Stack
                    direction={{ xs: "column", xl: "row" }}
                    spacing={1.5}
                    alignItems={{ xs: "stretch", xl: "center" }}
                    sx={{ p: 2 }}
                >
                    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ flex: 1 }}>
                        <PictureAsPdfRoundedIcon sx={{ color: "#ffd3ce" }} />

                        <Box>
                            <Typography sx={{ fontWeight: 950, lineHeight: 1 }}>
                                Adobe-Style PDF Workspace
                            </Typography>

                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,.74)" }}>
                                PDF reader · markup tools · direct edited PDF export
                            </Typography>
                        </Box>
                    </Stack>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,application/pdf"
                        hidden
                        onChange={openPdf}
                    />

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Button
                            variant="outlined"
                            startIcon={<UploadFileRoundedIcon />}
                            onClick={() => fileInputRef.current?.click()}
                            sx={{ color: "white", borderColor: "rgba(255,255,255,.3)" }}
                        >
                            Open PDF
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<SaveAltRoundedIcon />}
                            onClick={exportEditedPdf}
                            disabled={!pdfBytes}
                            sx={{
                                color: "#2a0808",
                                fontWeight: 950,
                                background: "linear-gradient(135deg, #ffd3ce 0%, #9ee8ff 100%)",
                                "&.Mui-disabled": {
                                    color: "rgba(255,255,255,.35)",
                                    background: "rgba(255,255,255,.12)",
                                },
                            }}
                        >
                            Export Edited PDF
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<OpenInNewRoundedIcon />}
                            onClick={openPreviewInNewTab}
                            disabled={!pdfBytes}
                            sx={{ color: "white", borderColor: "rgba(255,255,255,.3)" }}
                        >
                            Open Original
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<RestartAltRoundedIcon />}
                            onClick={resetPdfWorkspace}
                            sx={{ color: "white", borderColor: "rgba(255,255,255,.3)" }}
                        >
                            Reset
                        </Button>
                    </Stack>
                </Stack>

                <Divider sx={{ borderColor: "rgba(255,255,255,.14)" }} />

                <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    alignItems="center"
                    sx={{ p: 1.25 }}
                >
                    {pdfTools.map((item) => {
                        const active = tool === item.value;

                        return (
                            <Button
                                key={item.value}
                                size="small"
                                startIcon={item.icon}
                                onClick={() => setTool(item.value)}
                                sx={{
                                    color: active ? "#2a0808" : "white",
                                    background: active
                                        ? "linear-gradient(135deg, #ffd3ce, #9ee8ff)"
                                        : "transparent",
                                    border: "1px solid rgba(255,255,255,.18)",
                                    fontWeight: 950,
                                    "&:hover": {
                                        background: active
                                            ? "linear-gradient(135deg, #ffd3ce, #9ee8ff)"
                                            : "rgba(255,255,255,.08)",
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        );
                    })}

                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ borderColor: "rgba(255,255,255,.16)" }}
                    />

                    <Button
                        size="small"
                        startIcon={<NavigateBeforeRoundedIcon />}
                        onClick={goToPreviousPage}
                        disabled={!pageCount || activePageIndex <= 0}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.18)" }}
                    >
                        Prev
                    </Button>

                    <Chip
                        label={
                            pageCount
                                ? `Page ${activePageIndex + 1} / ${pageCount}`
                                : "No PDF loaded"
                        }
                        sx={{
                            color: "white",
                            background: "rgba(255,255,255,.12)",
                            border: "1px solid rgba(255,255,255,.16)",
                            fontWeight: 850,
                        }}
                    />

                    <Button
                        size="small"
                        endIcon={<NavigateNextRoundedIcon />}
                        onClick={goToNextPage}
                        disabled={!pageCount || activePageIndex >= pageCount - 1}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.18)" }}
                    >
                        Next
                    </Button>

                    <Button
                        size="small"
                        startIcon={<ZoomOutRoundedIcon />}
                        onClick={() => setZoom((previous) => clamp(previous - 15, 55, 220))}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.18)" }}
                    >
                        Zoom Out
                    </Button>

                    <Chip
                        label={`${zoom}%`}
                        sx={{
                            color: "white",
                            background: "rgba(255,255,255,.12)",
                            border: "1px solid rgba(255,255,255,.16)",
                            fontWeight: 850,
                        }}
                    />

                    <Button
                        size="small"
                        startIcon={<ZoomInRoundedIcon />}
                        onClick={() => setZoom((previous) => clamp(previous + 15, 55, 220))}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.18)" }}
                    >
                        Zoom In
                    </Button>

                    <Button
                        size="small"
                        startIcon={<FitScreenRoundedIcon />}
                        onClick={() => setZoom(115)}
                        sx={{ color: "white", border: "1px solid rgba(255,255,255,.18)" }}
                    >
                        Fit
                    </Button>
                </Stack>
            </Box>

            <Grid container sx={{ minHeight: "78vh" }}>
                <Grid
                    item
                    xs={12}
                    md={2.4}
                    sx={{
                        borderRight: { md: "1px solid rgba(255,255,255,.1)" },
                        background: "rgba(0,0,0,.22)",
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 950, mb: 2 }}>
                            Pages
                        </Typography>

                        {!pageCount && (
                            <Paper
                                sx={{
                                    p: 2,
                                    background: "rgba(255,255,255,.06)",
                                    border: "1px solid rgba(255,255,255,.1)",
                                }}
                            >
                                <Typography sx={{ color: "rgba(255,255,255,.68)", lineHeight: 1.6 }}>
                                    Open a PDF to see page thumbnails here.
                                </Typography>
                            </Paper>
                        )}

                        <Stack spacing={1.25}>
                            {visiblePageIndexes.map((pageIndex) => {
                                const active = activePageIndex === pageIndex;
                                const pageEdits = annotations.filter(
                                    (item) => item.pageIndex === pageIndex
                                ).length;

                                return (
                                    <Card
                                        key={pageIndex}
                                        onClick={() => setActivePageIndex(pageIndex)}
                                        sx={{
                                            cursor: "pointer",
                                            background: active
                                                ? "rgba(158,232,255,.14)"
                                                : "rgba(255,255,255,.055)",
                                            border: active
                                                ? "1px solid rgba(158,232,255,.48)"
                                                : "1px solid rgba(255,255,255,.1)",
                                        }}
                                    >
                                        <CardContent sx={{ p: 1.25, "&:last-child": { pb: 1.25 } }}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Box
                                                    sx={{
                                                        width: 42,
                                                        height: 56,
                                                        borderRadius: 1,
                                                        display: "grid",
                                                        placeItems: "center",
                                                        background: "white",
                                                        color: "#111827",
                                                        fontWeight: 950,
                                                        boxShadow: "0 8px 24px rgba(0,0,0,.24)",
                                                    }}
                                                >
                                                    {pageIndex + 1}
                                                </Box>

                                                <Box sx={{ minWidth: 0 }}>
                                                    <Typography sx={{ fontWeight: 950 }}>
                                                        Page {pageIndex + 1}
                                                    </Typography>

                                                    <Typography
                                                        variant="caption"
                                                        sx={{ color: "rgba(255,255,255,.58)" }}
                                                    >
                                                        {pageEdits} edit{pageEdits === 1 ? "" : "s"}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </Stack>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6.9}>
                    <Box
                        sx={{
                            minHeight: "78vh",
                            maxHeight: "78vh",
                            overflow: "auto",
                            p: { xs: 2, md: 3 },
                            background:
                                "linear-gradient(180deg, rgba(255,255,255,.035), rgba(0,0,0,.24))",
                        }}
                    >
                        {!pdfDocProxy && (
                            <Box
                                sx={{
                                    minHeight: 540,
                                    display: "grid",
                                    placeItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                <Paper
                                    sx={{
                                        maxWidth: 620,
                                        p: { xs: 3, md: 5 },
                                        background: "rgba(255,255,255,.06)",
                                        border: "1px solid rgba(255,255,255,.12)",
                                    }}
                                >
                                    <PictureAsPdfRoundedIcon
                                        sx={{ fontSize: 68, color: "#ffb4ad", mb: 2 }}
                                    />

                                    <Typography variant="h4" sx={{ fontWeight: 950, mb: 1 }}>
                                        Open a PDF to start editing
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "rgba(255,255,255,.68)",
                                            lineHeight: 1.7,
                                            mb: 3,
                                        }}
                                    >
                                        This workspace renders your PDF pages and places an editable
                                        annotation layer above them. Your edits export into a new PDF.
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        startIcon={<UploadFileRoundedIcon />}
                                        onClick={() => fileInputRef.current?.click()}
                                        sx={{
                                            color: "#2a0808",
                                            fontWeight: 950,
                                            background:
                                                "linear-gradient(135deg, #ffd3ce 0%, #9ee8ff 100%)",
                                        }}
                                    >
                                        Open PDF File
                                    </Button>
                                </Paper>
                            </Box>
                        )}

                        {pdfDocProxy && (
                            <Stack spacing={3} alignItems="center">
                                {visiblePageIndexes.map((pageIndex) => {
                                    const pageAnnotations = annotations.filter(
                                        (item) => item.pageIndex === pageIndex
                                    );

                                    return (
                                        <Box
                                            key={pageIndex}
                                            sx={{
                                                width: "fit-content",
                                                maxWidth: "100%",
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ mb: 1 }}
                                            >
                                                <Typography sx={{ fontWeight: 950 }}>
                                                    Page {pageIndex + 1}
                                                </Typography>

                                                <Chip
                                                    size="small"
                                                    label={`${pageAnnotations.length} edit${
                                                        pageAnnotations.length === 1 ? "" : "s"
                                                    }`}
                                                    sx={{
                                                        color: "white",
                                                        background:
                                                            activePageIndex === pageIndex
                                                                ? "rgba(158,232,255,.18)"
                                                                : "rgba(255,255,255,.08)",
                                                        border: "1px solid rgba(255,255,255,.14)",
                                                    }}
                                                />
                                            </Stack>

                                            <Box
                                                onMouseDown={() => setActivePageIndex(pageIndex)}
                                                onDoubleClick={(event) =>
                                                    addAnnotationFromClick(pageIndex, event)
                                                }
                                                sx={{
                                                    position: "relative",
                                                    width: "fit-content",
                                                    mx: "auto",
                                                    borderRadius: 1.5,
                                                    overflow: "hidden",
                                                    background: "#e5e7eb",
                                                    boxShadow:
                                                        activePageIndex === pageIndex
                                                            ? "0 24px 90px rgba(158,232,255,.16), 0 0 0 3px rgba(158,232,255,.38)"
                                                            : "0 24px 90px rgba(0,0,0,.5)",
                                                    border: "1px solid rgba(255,255,255,.18)",
                                                }}
                                            >
                                                <canvas
                                                    ref={(node) => {
                                                        if (node) {
                                                            pageCanvasRefs.current[pageIndex] = node;
                                                        }
                                                    }}
                                                    style={{
                                                        display: "block",
                                                    }}
                                                />

                                                <Box
                                                    onClick={(event) => {
                                                        if (event.target === event.currentTarget) {
                                                            addAnnotationFromClick(pageIndex, event);
                                                        }
                                                    }}
                                                    sx={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        cursor: tool === "select" ? "default" : "crosshair",
                                                    }}
                                                >
                                                    {pageAnnotations.map((annotation) => {
                                                        const selected =
                                                            selectedAnnotationId === annotation.id;

                                                        const left = `${annotation.xRatio * 100}%`;
                                                        const top = `${annotation.yRatio * 100}%`;
                                                        const width = `${annotation.wRatio * 100}%`;
                                                        const height = `${annotation.hRatio * 100}%`;

                                                        let annotationSx = {
                                                            position: "absolute",
                                                            left,
                                                            top,
                                                            width,
                                                            height,
                                                            minHeight: 18,
                                                            borderRadius: 0.5,
                                                            cursor: "pointer",
                                                            outline: selected
                                                                ? "2px solid #38bdf8"
                                                                : "1px solid rgba(0,0,0,.2)",
                                                            boxShadow: selected
                                                                ? "0 0 0 4px rgba(56,189,248,.25)"
                                                                : "none",
                                                            overflow: "hidden",
                                                        };

                                                        if (annotation.type === "highlight") {
                                                            annotationSx = {
                                                                ...annotationSx,
                                                                background: annotation.fillColor || "#fff176",
                                                                opacity: annotation.opacity ?? 0.45,
                                                                border: "none",
                                                            };
                                                        }

                                                        if (annotation.type === "redact") {
                                                            annotationSx = {
                                                                ...annotationSx,
                                                                background: "#111111",
                                                                opacity: 0.96,
                                                                border: "none",
                                                            };
                                                        }

                                                        if (annotation.type === "box") {
                                                            annotationSx = {
                                                                ...annotationSx,
                                                                border: `${annotation.strokeWidth || 2}px solid ${
                                                                    annotation.boxColor || "#2563eb"
                                                                }`,
                                                                background: "transparent",
                                                            };
                                                        }

                                                        if (annotation.type === "text") {
                                                            annotationSx = {
                                                                ...annotationSx,
                                                                color: annotation.textColor || "#111827",
                                                                fontSize: `${annotation.fontSize || 18}px`,
                                                                fontWeight: 800,
                                                                background: "rgba(255,255,255,.2)",
                                                                border: "1px dashed rgba(37,99,235,.45)",
                                                                p: 0.5,
                                                            };
                                                        }

                                                        if (annotation.type === "note") {
                                                            annotationSx = {
                                                                ...annotationSx,
                                                                color: annotation.textColor || "#111827",
                                                                fontSize: `${annotation.fontSize || 14}px`,
                                                                background: annotation.fillColor || "#fff7cc",
                                                                border: "1px solid rgba(146,64,14,.55)",
                                                                p: 0.75,
                                                            };
                                                        }

                                                        if (annotation.type === "signature") {
                                                            annotationSx = {
                                                                ...annotationSx,
                                                                color: annotation.textColor || "#111827",
                                                                fontSize: `${annotation.fontSize || 24}px`,
                                                                fontStyle: "italic",
                                                                fontWeight: 800,
                                                                background: "rgba(255,255,255,.05)",
                                                                borderBottom: "2px solid #111827",
                                                                borderTop: "none",
                                                                borderLeft: "none",
                                                                borderRight: "none",
                                                                p: 0.5,
                                                            };
                                                        }

                                                        if (annotation.type === "ink") {
                                                            annotationSx = {
                                                                ...annotationSx,
                                                                color: annotation.textColor || "#1d4ed8",
                                                                fontSize: `${annotation.fontSize || 16}px`,
                                                                fontStyle: "italic",
                                                                fontWeight: 800,
                                                                background: "rgba(255,255,255,.08)",
                                                                border: "1px dashed rgba(29,78,216,.45)",
                                                                p: 0.5,
                                                            };
                                                        }

                                                        return (
                                                            <Box
                                                                key={annotation.id}
                                                                onClick={(event) => {
                                                                    event.stopPropagation();
                                                                    setSelectedAnnotationId(annotation.id);
                                                                    setActivePageIndex(pageIndex);
                                                                    setTool("select");
                                                                }}
                                                                sx={annotationSx}
                                                            >
                                                                {["text", "note", "signature", "ink"].includes(annotation.type) &&
                                                                    annotation.text}
                                                            </Box>
                                                        );
                                                    })}
                                                </Box>
                                            </Box>

                                            <Typography
                                                sx={{
                                                    mt: 1,
                                                    textAlign: "center",
                                                    color: "rgba(255,255,255,.5)",
                                                    fontSize: 13,
                                                }}
                                            >
                                                Click once to select page. Double-click to place the active tool.
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Stack>
                        )}
                    </Box>
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={2.7}
                    sx={{
                        borderLeft: { md: "1px solid rgba(255,255,255,.1)" },
                        background: "rgba(0,0,0,.16)",
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 950, mb: 2 }}>
                            Edit Properties
                        </Typography>

                        <Stack spacing={2}>
                            <TextField
                                label="Export file name"
                                value={fileName}
                                onChange={(event) => setFileName(event.target.value)}
                                fullWidth
                                sx={{
                                    "& .MuiInputBase-root": {
                                        background: "rgba(0,0,0,.22)",
                                    },
                                }}
                            />

                            <TextField
                                label="Default text"
                                value={defaultText}
                                onChange={(event) => setDefaultText(event.target.value)}
                                fullWidth
                                sx={{
                                    "& .MuiInputBase-root": {
                                        background: "rgba(0,0,0,.22)",
                                    },
                                }}
                            />

                            <TextField
                                label="Default note"
                                value={defaultNote}
                                onChange={(event) => setDefaultNote(event.target.value)}
                                multiline
                                minRows={2}
                                fullWidth
                                sx={{
                                    "& .MuiInputBase-root": {
                                        background: "rgba(0,0,0,.22)",
                                        alignItems: "flex-start",
                                    },
                                }}
                            />

                            <TextField
                                label="Signature name"
                                value={signatureName}
                                onChange={(event) => setSignatureName(event.target.value)}
                                fullWidth
                                sx={{
                                    "& .MuiInputBase-root": {
                                        background: "rgba(0,0,0,.22)",
                                    },
                                }}
                            />

                            <Box>
                                <Typography sx={{ fontWeight: 900, mb: 1 }}>
                                    Font size: {fontSize}px
                                </Typography>

                                <Slider
                                    value={fontSize}
                                    min={8}
                                    max={72}
                                    step={1}
                                    onChange={(_, value) => setFontSize(value)}
                                />
                            </Box>

                            <Box>
                                <Typography sx={{ fontWeight: 900, mb: 1 }}>
                                    Border width: {strokeWidth}px
                                </Typography>

                                <Slider
                                    value={strokeWidth}
                                    min={1}
                                    max={12}
                                    step={1}
                                    onChange={(_, value) => setStrokeWidth(value)}
                                />
                            </Box>

                            <Stack direction="row" spacing={1}>
                                <TextField
                                    label="Text"
                                    type="color"
                                    value={textColor}
                                    onChange={(event) => setTextColor(event.target.value)}
                                    fullWidth
                                    sx={{
                                        "& input": {
                                            height: 44,
                                            p: 0.5,
                                        },
                                    }}
                                />

                                <TextField
                                    label="Fill"
                                    type="color"
                                    value={fillColor}
                                    onChange={(event) => setFillColor(event.target.value)}
                                    fullWidth
                                    sx={{
                                        "& input": {
                                            height: 44,
                                            p: 0.5,
                                        },
                                    }}
                                />

                                <TextField
                                    label="Box"
                                    type="color"
                                    value={boxColor}
                                    onChange={(event) => setBoxColor(event.target.value)}
                                    fullWidth
                                    sx={{
                                        "& input": {
                                            height: 44,
                                            p: 0.5,
                                        },
                                    }}
                                />
                            </Stack>

                            <Divider sx={{ borderColor: "rgba(255,255,255,.1)" }} />

                            <Typography variant="h6" sx={{ fontWeight: 950 }}>
                                Selected Edit
                            </Typography>

                            {!selectedAnnotation && (
                                <Alert
                                    severity="info"
                                    sx={{
                                        background: "rgba(158,232,255,.09)",
                                        color: "rgba(255,255,255,.82)",
                                        border: "1px solid rgba(158,232,255,.18)",
                                        "& .MuiAlert-icon": {
                                            color: "#9ee8ff",
                                        },
                                    }}
                                >
                                    Select an edit layer item to change its text, position, and size.
                                </Alert>
                            )}

                            {selectedAnnotation && (
                                <Stack spacing={1.5}>
                                    <Chip
                                        label={`${getAnnotationLabel(selectedAnnotation.type)} on page ${
                                            selectedAnnotation.pageIndex + 1
                                        }`}
                                        sx={{
                                            color: "white",
                                            background: "rgba(158,232,255,.1)",
                                            border: "1px solid rgba(158,232,255,.2)",
                                            fontWeight: 850,
                                        }}
                                    />

                                    {["text", "note", "signature", "ink"].includes(selectedAnnotation.type) && (
                                        <TextField
                                            label="Selected text"
                                            value={selectedAnnotation.text || ""}
                                            onChange={(event) =>
                                                updateAnnotation(selectedAnnotation.id, {
                                                    text: event.target.value,
                                                })
                                            }
                                            multiline
                                            minRows={2}
                                            fullWidth
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    background: "rgba(0,0,0,.22)",
                                                    alignItems: "flex-start",
                                                },
                                            }}
                                        />
                                    )}

                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                onClick={() =>
                                                    moveAnnotation(selectedAnnotation.id, -0.01, 0)
                                                }
                                                sx={{
                                                    color: "white",
                                                    borderColor: "rgba(255,255,255,.18)",
                                                }}
                                            >
                                                Left
                                            </Button>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                onClick={() =>
                                                    moveAnnotation(selectedAnnotation.id, 0.01, 0)
                                                }
                                                sx={{
                                                    color: "white",
                                                    borderColor: "rgba(255,255,255,.18)",
                                                }}
                                            >
                                                Right
                                            </Button>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                onClick={() =>
                                                    moveAnnotation(selectedAnnotation.id, 0, -0.01)
                                                }
                                                sx={{
                                                    color: "white",
                                                    borderColor: "rgba(255,255,255,.18)",
                                                }}
                                            >
                                                Up
                                            </Button>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                onClick={() =>
                                                    moveAnnotation(selectedAnnotation.id, 0, 0.01)
                                                }
                                                sx={{
                                                    color: "white",
                                                    borderColor: "rgba(255,255,255,.18)",
                                                }}
                                            >
                                                Down
                                            </Button>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                onClick={() =>
                                                    resizeAnnotation(selectedAnnotation.id, -0.02, -0.01)
                                                }
                                                sx={{
                                                    color: "white",
                                                    borderColor: "rgba(255,255,255,.18)",
                                                }}
                                            >
                                                Smaller
                                            </Button>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                onClick={() =>
                                                    resizeAnnotation(selectedAnnotation.id, 0.02, 0.01)
                                                }
                                                sx={{
                                                    color: "white",
                                                    borderColor: "rgba(255,255,255,.18)",
                                                }}
                                            >
                                                Bigger
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    <Button
                                        variant="outlined"
                                        startIcon={<DeleteRoundedIcon />}
                                        onClick={deleteSelectedAnnotation}
                                        sx={{
                                            color: "#ffb4ad",
                                            borderColor: "rgba(255,180,173,.35)",
                                        }}
                                    >
                                        Delete Selected Edit
                                    </Button>
                                </Stack>
                            )}

                            <Divider sx={{ borderColor: "rgba(255,255,255,.1)" }} />

                            <TextField
                                label="Search edits"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                fullWidth
                                InputProps={{
                                    startAdornment: <SearchRoundedIcon sx={{ color: "#9ee8ff", mr: 1 }} />,
                                }}
                                sx={{
                                    "& .MuiInputBase-root": {
                                        background: "rgba(0,0,0,.22)",
                                    },
                                }}
                            />

                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                <Chip
                                    label={`${annotationStats.total} total`}
                                    sx={{
                                        color: "white",
                                        background: "rgba(255,255,255,.08)",
                                        border: "1px solid rgba(255,255,255,.14)",
                                        fontWeight: 850,
                                    }}
                                />

                                <Chip
                                    label={`${annotationStats.text} text`}
                                    sx={{
                                        color: "white",
                                        background: "rgba(158,232,255,.08)",
                                        border: "1px solid rgba(158,232,255,.18)",
                                        fontWeight: 850,
                                    }}
                                />

                                <Chip
                                    label={`${annotationStats.highlights} highlights`}
                                    sx={{
                                        color: "white",
                                        background: "rgba(255,241,118,.14)",
                                        border: "1px solid rgba(255,241,118,.24)",
                                        fontWeight: 850,
                                    }}
                                />
                            </Stack>

                            {searchTerm.trim() && (
                                <Box
                                    sx={{
                                        maxHeight: 160,
                                        overflow: "auto",
                                        borderRadius: 2,
                                        border: "1px solid rgba(255,255,255,.1)",
                                    }}
                                >
                                    {filteredAnnotations.map((item) => (
                                        <Box
                                            key={item.id}
                                            onClick={() => {
                                                setSelectedAnnotationId(item.id);
                                                setActivePageIndex(item.pageIndex);
                                            }}
                                            sx={{
                                                p: 1,
                                                cursor: "pointer",
                                                borderBottom: "1px solid rgba(255,255,255,.08)",
                                                "&:hover": {
                                                    background: "rgba(255,255,255,.06)",
                                                },
                                            }}
                                        >
                                            <Typography sx={{ fontWeight: 900, fontSize: 13 }}>
                                                Page {item.pageIndex + 1} · {getAnnotationLabel(item.type)}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    color: "rgba(255,255,255,.58)",
                                                    fontSize: 12,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {item.text || item.note || "No text"}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            )}

                            <Button
                                variant="outlined"
                                startIcon={<ContentCopyRoundedIcon />}
                                onClick={copyAnnotationSummary}
                                sx={{ color: "white", borderColor: "rgba(255,255,255,.18)" }}
                            >
                                Copy Edit Summary
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={<DeleteSweepRoundedIcon />}
                                onClick={clearPageAnnotations}
                                disabled={!pageCount}
                                sx={{
                                    color: "#ffb4ad",
                                    borderColor: "rgba(255,180,173,.35)",
                                }}
                            >
                                Clear Current Page
                            </Button>

                            <Alert
                                severity="info"
                                sx={{
                                    background: "rgba(158,232,255,.09)",
                                    color: "rgba(255,255,255,.82)",
                                    border: "1px solid rgba(158,232,255,.18)",
                                    "& .MuiAlert-icon": {
                                        color: "#9ee8ff",
                                    },
                                }}
                            >
                                {status}
                            </Alert>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}