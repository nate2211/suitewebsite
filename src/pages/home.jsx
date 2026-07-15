import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SlideshowRoundedIcon from "@mui/icons-material/SlideshowRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import CloudOffRoundedIcon from "@mui/icons-material/CloudOffRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import TransformRoundedIcon from "@mui/icons-material/TransformRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import FindInPageRoundedIcon from "@mui/icons-material/FindInPageRounded";
import VideoFileRoundedIcon from "@mui/icons-material/VideoFileRounded";
import FolderZipRoundedIcon from "@mui/icons-material/FolderZipRounded";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";

import {
    AppNavBar,
    GradientPage,
    SectionHeader,
} from "../components/components.jsx";

import HelmetHeader from "../components/HelmetHeader.jsx";

export default function Home() {
    const coreEditors = [
        {
            title: "CSV Editor",
            path: "/csv",
            icon: <TableChartRoundedIcon />,
            description:
                "Upload, edit, add rows, add columns, search, copy, and export CSV files in an Excel-style grid.",
            button: "Open CSV Editor",
        },
        {
            title: "Word Editor",
            path: "/word",
            icon: <DescriptionRoundedIcon />,
            description:
                "Import DOCX files, type directly on a document page, format text, insert tables, and export documents.",
            button: "Open Word Editor",
        },
        {
            title: "PowerPoint Editor",
            path: "/powerpoint",
            icon: <SlideshowRoundedIcon />,
            description:
                "Import PPTX files, edit slide thumbnails, use slide layouts, manage speaker notes, and export presentations.",
            button: "Open PowerPoint Editor",
        },
        {
            title: "PDF Editor",
            path: "/pdf",
            icon: <PictureAsPdfRoundedIcon />,
            description:
                "Import PDFs, preview pages, add text, highlights, rectangles, ink notes, signatures, and export an edited PDF.",
            button: "Open PDF Editor",
        },
    ];

    const topWorkflowLinks = [
        {
            path: "/office-tools",
            label: "Office Tools Hub",
            sublabel: "All focused utility pages",
            icon: <AppsRoundedIcon />,
        },
        {
            path: "/compress-video",
            label: "Compress Video",
            sublabel: "MP4, MOV, WEBM upload help",
            icon: <VideoFileRoundedIcon />,
        },
        {
            path: "/compress-mp4",
            label: "Compress MP4",
            sublabel: "Reduce MP4 file size",
            icon: <VideoFileRoundedIcon />,
        },
        {
            path: "/compress-mov",
            label: "Compress MOV",
            sublabel: "QuickTime and iPhone videos",
            icon: <VideoFileRoundedIcon />,
        },
        {
            path: "/convert-csv",
            label: "Convert CSV",
            sublabel: "CSV, TSV, JSON, PDF exports",
            icon: <TableChartRoundedIcon />,
        },
        {
            path: "/csv-to-json",
            label: "CSV to JSON",
            sublabel: "Developer data conversion",
            icon: <DataObjectRoundedIcon />,
        },
        {
            path: "/compress-zip",
            label: "Compress ZIP",
            sublabel: "Clean and rebuild archives",
            icon: <FolderZipRoundedIcon />,
        },
        {
            path: "/sign-document",
            label: "Sign Document",
            sublabel: "Draw and place PDF signatures",
            icon: <BorderColorRoundedIcon />,
        },
    ];

    const enterpriseHighlights = [
        {
            title: "Frontend-only workflow",
            icon: <CloudOffRoundedIcon />,
            description:
                "Files are handled in the browser with local JavaScript APIs, Blob exports, PDF rendering, document parsing, ZIP processing, and FFmpeg.wasm video compression.",
        },
        {
            title: "Direct task pages",
            icon: <FindInPageRoundedIcon />,
            description:
                "SEO-friendly routes help users land directly on the exact tool they need: compress MP4, convert CSV to JSON, sign a PDF, or view a Word file.",
        },
        {
            title: "Helpdesk-ready utilities",
            icon: <WorkspacePremiumRoundedIcon />,
            description:
                "Useful for real office and campus support issues like large webcam uploads, ZIP cleanup, document signing, CSV cleanup, and format conversion.",
        },
    ];

    const compressionTools = [
        {
            title: "Compress Video",
            path: "/compress-video",
            icon: <VideoFileRoundedIcon />,
            badge: "MP4 / MOV / WEBM",
            description:
                "Upload MP4, MOV, or WEBM files and compress them into smaller MP4 videos for email, LMS, or instructor upload.",
        },
        {
            title: "Compress MP4",
            path: "/compress-mp4",
            icon: <VideoFileRoundedIcon />,
            badge: "MP4",
            description:
                "Reduce MP4 file size with browser FFmpeg compression controls for bitrate, frame rate, and output quality.",
        },
        {
            title: "Compress MOV",
            path: "/compress-mov",
            icon: <VideoFileRoundedIcon />,
            badge: "QuickTime / iPhone",
            description:
                "Shrink MOV videos from iPhone, QuickTime, Mac, webcam, or classroom recording workflows into smaller MP4 exports.",
        },
        {
            title: "Compress ZIP",
            path: "/compress-zip",
            icon: <FolderZipRoundedIcon />,
            badge: "ZIP",
            description:
                "Remove common junk files and rebuild ZIP archives with maximum browser-side DEFLATE compression.",
        },
    ];

    const csvTools = [
        {
            title: "Convert CSV",
            path: "/convert-csv",
            icon: <TableChartRoundedIcon />,
            badge: "CSV Hub",
            description:
                "Upload CSV, TSV, or JSON and export cleaned CSV, JSON, delimiter-adjusted files, or PDF table output.",
        },
        {
            title: "CSV to JSON",
            path: "/csv-to-json",
            icon: <DataObjectRoundedIcon />,
            badge: "Developer",
            description:
                "Convert spreadsheet rows into structured JSON objects using the first row as clean field names.",
        },
        {
            title: "JSON to CSV",
            path: "/json-to-csv",
            icon: <DataObjectRoundedIcon />,
            badge: "Developer",
            description:
                "Convert JSON arrays or objects into spreadsheet-ready CSV rows that can be opened in Excel-style tools.",
        },
        {
            title: "CSV Cleaner",
            path: "/csv-cleaner",
            icon: <CleaningServicesRoundedIcon />,
            badge: "Cleanup",
            description:
                "Trim extra spaces, remove blank rows, normalize row widths, and export a cleaned CSV copy.",
        },
        {
            title: "Remove CSV Duplicates",
            path: "/remove-duplicate-csv-rows",
            icon: <CleaningServicesRoundedIcon />,
            badge: "Deduplicate",
            description:
                "Detect repeated rows, remove duplicate CSV entries, and export a deduplicated spreadsheet file.",
        },
        {
            title: "CSV Delimiter Converter",
            path: "/csv-delimiter-converter",
            icon: <TransformRoundedIcon />,
            badge: "CSV / TSV",
            description:
                "Convert comma, semicolon, tab, or pipe-delimited data into the delimiter format you need.",
        },
        {
            title: "CSV to PDF",
            path: "/csv-to-pdf",
            icon: <PictureAsPdfRoundedIcon />,
            badge: "PDF Export",
            description:
                "Turn CSV table data into a browser-generated PDF report for sharing, printing, or archiving.",
        },
    ];

    const documentTools = [
        {
            title: "Additional Office Tools",
            path: "/office-tools",
            icon: <AppsRoundedIcon />,
            badge: "Tool Hub",
            description:
                "Open the complete focused tools hub for viewers, converters, signing, compression, and CSV utilities.",
        },
        {
            title: "Convert PDF",
            path: "/convert-pdf",
            icon: <TransformRoundedIcon />,
            badge: "PDF",
            description:
                "Upload a PDF and export text, a DOCX copy, page PNG previews, or a browser-generated PDF copy.",
        },
        {
            title: "Convert Word",
            path: "/convert-word",
            icon: <DescriptionRoundedIcon />,
            badge: "DOCX",
            description:
                "Upload a DOCX file and export PDF, HTML, plain text, or a simplified browser-generated DOCX copy.",
        },
        {
            title: "Sign Document",
            path: "/sign-document",
            icon: <BorderColorRoundedIcon />,
            badge: "Signature",
            description:
                "Draw a signature with mouse, touch, pen, or drawing tablet, place it on a PDF, resize it, and export.",
        },
    ];

    const viewerTools = [
        {
            title: "View PDF",
            path: "/view-pdf",
            icon: <PictureAsPdfRoundedIcon />,
            description:
                "Upload and preview PDF pages with page navigation, zoom controls, and browser rendering.",
        },
        {
            title: "View Word",
            path: "/view-word",
            icon: <DescriptionRoundedIcon />,
            description:
                "Preview DOCX content as readable browser HTML with paragraphs, tables, and basic formatting.",
        },
        {
            title: "View PowerPoint",
            path: "/view-powerpoint",
            icon: <SlideshowRoundedIcon />,
            description:
                "Extract and view readable text from PPTX slides, slide titles, and slide content.",
        },
        {
            title: "View CSV",
            path: "/view-csv",
            icon: <TableChartRoundedIcon />,
            description:
                "Open CSV files as a clean spreadsheet-style table with columns and rows in the browser.",
        },
    ];

    const sisterSites = [
        {
            title: "MusicStudioLab",
            url: "https://musicstudiolab.com",
            displayUrl: "musicstudiolab.com",
            icon: <MusicNoteRoundedIcon />,
            badge: "Browser Music Studio",
            description:
                "Create sounds, sequence patterns, design synths, arrange playlists, use WebAudio effects, and export music from the browser.",
            cta: "Visit MusicStudioLab",
            accent: "#9ee8ff",
            gradient:
                "linear-gradient(135deg, rgba(158,232,255,.18), rgba(88,166,255,.08))",
            border: "rgba(158,232,255,.24)",
        },
        {
            title: "ImageMasterLab",
            url: "https://imagemasterlab.com",
            displayUrl: "imagemasterlab.com",
            icon: <ImageRoundedIcon />,
            badge: "Browser Image Editor",
            description:
                "Edit images, add layers, use text tools, draw selections, make graphics, and export polished image files.",
            cta: "Visit ImageMasterLab",
            accent: "#b38cff",
            gradient:
                "linear-gradient(135deg, rgba(179,140,255,.2), rgba(255,255,255,.05))",
            border: "rgba(179,140,255,.28)",
        },
        {
            title: "AudioMasterLab",
            url: "https://audiomasterlab.com",
            displayUrl: "audiomasterlab.com",
            icon: <GraphicEqRoundedIcon />,
            badge: "Browser Audio Mastering",
            description:
                "Upload audio, preview waveforms, apply mastering effects, shape volume and tone, and export improved audio directly.",
            cta: "Visit AudioMasterLab",
            accent: "#70ffd6",
            gradient:
                "linear-gradient(135deg, rgba(112,255,214,.16), rgba(158,232,255,.08))",
            border: "rgba(112,255,214,.24)",
        },
    ];

    return (
        <GradientPage>
            <HelmetHeader
                title="Frontend Browser Office Suite"
                path="/"
                description="SuiteOfficeLab is a frontend-only browser office suite for editing CSV, Word-style documents, PowerPoint-style slides, and PDFs. Use direct tools to convert PDFs, convert Word documents, compress MP4 and MOV videos, optimize ZIP files, clean CSV files, convert CSV to JSON, view documents, and sign PDFs online."
                keywords="SuiteOfficeLab, browser office suite, frontend office editor, CSV editor, Word editor, PowerPoint editor, PDF editor, compress video online, compress MP4 online, compress MOV online, compress ZIP online, convert CSV online, CSV to JSON, JSON to CSV, CSV cleaner, CSV delimiter converter, CSV to PDF, convert PDF online, convert Word online, view PDF online, sign PDF online"
            />

            <AppNavBar />

            <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
                <Grid container spacing={3.5} alignItems="center">
                    <Grid item xs={12} lg={7.4}>
                        <Stack
                            spacing={3}
                            alignItems={{ xs: "center", lg: "flex-start" }}
                            textAlign={{ xs: "center", lg: "left" }}
                        >
                            <Box sx={heroIconSx}>
                                <AutoAwesomeRoundedIcon sx={{ fontSize: 56, color: "#9ee8ff" }} />
                            </Box>

                            <Stack
                                direction="row"
                                spacing={1}
                                flexWrap="wrap"
                                justifyContent={{ xs: "center", lg: "flex-start" }}
                                useFlexGap
                            >
                                <Chip
                                    icon={<WorkspacePremiumRoundedIcon />}
                                    label="Browser Office Suite"
                                    sx={heroChipSx}
                                />

                                <Chip
                                    icon={<BoltRoundedIcon />}
                                    label="Frontend-only file tools"
                                    sx={heroChipMutedSx}
                                />

                                <Chip
                                    icon={<FindInPageRoundedIcon />}
                                    label="Direct SEO utility pages"
                                    sx={heroChipMutedSx}
                                />
                            </Stack>

                            <Typography
                                variant="h1"
                                sx={{
                                    maxWidth: 1120,
                                    fontWeight: 950,
                                    fontSize: { xs: 40, sm: 56, md: 78 },
                                    lineHeight: 0.95,
                                    letterSpacing: "-0.055em",
                                }}
                            >
                                Enterprise-style browser tools for documents, CSV data, PDFs, ZIPs, and video uploads.
                            </Typography>

                            <Typography
                                sx={{
                                    maxWidth: 980,
                                    color: "rgba(255,255,255,.72)",
                                    fontSize: { xs: 16, md: 19 },
                                    lineHeight: 1.75,
                                }}
                            >
                                SuiteOfficeLab combines full browser editors with focused one-task utility pages.
                                Edit office files, sign PDFs, clean CSV data, convert CSV to JSON, compress MP4 or MOV
                                webcam videos, and optimize ZIP archives without building a backend upload system.
                            </Typography>

                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1.5}
                                justifyContent={{ xs: "center", lg: "flex-start" }}
                            >
                                <Button
                                    component={RouterLink}
                                    to="/office-tools"
                                    size="large"
                                    variant="contained"
                                    startIcon={<AppsRoundedIcon />}
                                    sx={primaryButtonSx}
                                >
                                    Open Office Tools
                                </Button>

                                <Button
                                    component={RouterLink}
                                    to="/compress-video"
                                    size="large"
                                    variant="outlined"
                                    startIcon={<VideoFileRoundedIcon />}
                                    sx={outlineButtonSx}
                                >
                                    Compress Video
                                </Button>

                                <Button
                                    component={RouterLink}
                                    to="/convert-csv"
                                    size="large"
                                    variant="outlined"
                                    startIcon={<TableChartRoundedIcon />}
                                    sx={outlineButtonSx}
                                >
                                    Convert CSV
                                </Button>
                            </Stack>

                            <Stack
                                direction="row"
                                spacing={1}
                                flexWrap="wrap"
                                justifyContent={{ xs: "center", lg: "flex-start" }}
                                useFlexGap
                                sx={{ pt: 1 }}
                            >
                                {[
                                    { label: "Office Tools", path: "/office-tools" },
                                    { label: "Compress MP4", path: "/compress-mp4" },
                                    { label: "Compress MOV", path: "/compress-mov" },
                                    { label: "Compress ZIP", path: "/compress-zip" },
                                    { label: "CSV to JSON", path: "/csv-to-json" },
                                    { label: "Sign PDF", path: "/sign-document" },
                                ].map((link) => (
                                    <Button
                                        key={link.path}
                                        component={RouterLink}
                                        to={link.path}
                                        size="small"
                                        sx={quickLinkSx}
                                    >
                                        {link.label}
                                    </Button>
                                ))}
                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} lg={4.6}>
                        <Card sx={heroPanelSx}>
                            <CardContent sx={{ p: 3, position: "relative" }}>
                                <Stack spacing={2.25}>
                                    <Stack direction="row" spacing={1.25} alignItems="center">
                                        <Box sx={panelIconSx}>
                                            <AppsRoundedIcon />
                                        </Box>

                                        <Box>
                                            <Typography
                                                variant="overline"
                                                sx={{ color: "#9ee8ff", fontWeight: 950 }}
                                            >
                                                Top Tool Links
                                            </Typography>

                                            <Typography variant="h5" sx={{ fontWeight: 950 }}>
                                                Start with a direct workflow
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Typography sx={{ color: "rgba(255,255,255,.68)", lineHeight: 1.7 }}>
                                        The Office Tools hub stays here with the rest of the top links so users can either browse everything or jump straight into one task.
                                    </Typography>

                                    <Grid container spacing={1.25}>
                                        {topWorkflowLinks.map((item) => (
                                            <Grid item xs={12} sm={6} key={item.path}>
                                                <Button
                                                    component={RouterLink}
                                                    to={item.path}
                                                    endIcon={<OpenInNewRoundedIcon />}
                                                    sx={heroRouteButtonSx}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        alignItems="center"
                                                        sx={{ minWidth: 0, width: "100%" }}
                                                    >
                                                        <Box sx={routeMiniIconSx}>
                                                            {item.icon}
                                                        </Box>

                                                        <Box sx={{ minWidth: 0, textAlign: "left" }}>
                                                            <Typography
                                                                component="span"
                                                                sx={{
                                                                    display: "block",
                                                                    fontWeight: 950,
                                                                    fontSize: 13.5,
                                                                    whiteSpace: "nowrap",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                }}
                                                            >
                                                                {item.label}
                                                            </Typography>

                                                            <Typography
                                                                component="span"
                                                                sx={{
                                                                    display: "block",
                                                                    color: "rgba(255,255,255,.55)",
                                                                    fontSize: 11.5,
                                                                    whiteSpace: "nowrap",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                }}
                                                            >
                                                                {item.sublabel}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </Button>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Box sx={{ mt: { xs: 6, md: 9 } }}>
                    <Grid container spacing={2.5}>
                        {enterpriseHighlights.map((item) => (
                            <Grid item xs={12} md={4} key={item.title}>
                                <Card sx={enterpriseCardSx}>
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={iconBoxSx}>{item.icon}</Box>

                                        <Typography variant="h6" sx={{ fontWeight: 950, mb: 1 }}>
                                            {item.title}
                                        </Typography>

                                        <Typography sx={{ color: "rgba(255,255,255,.68)", lineHeight: 1.7 }}>
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ mt: { xs: 6, md: 9 } }}>
                    <SectionHeader
                        eyebrow="Core Editors"
                        title="Full editors for office files"
                        description="Use the full editor pages when you want richer controls for spreadsheets, documents, presentations, and PDFs."
                    />

                    <Grid container spacing={2.5}>
                        {coreEditors.map((tool) => (
                            <Grid item xs={12} md={6} lg={3} key={tool.title}>
                                <ToolCard tool={tool} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ mt: { xs: 6, md: 9 } }}>
                    <SectionHeader
                        eyebrow="Compression Tools"
                        title="Shrink videos and ZIP files for real upload problems"
                        description="These tools are built around common helpdesk issues: webcam videos that are too large for instructor upload, MOV files from iPhones or Macs, and ZIP archives that need cleanup."
                    />

                    <Grid container spacing={2.5}>
                        {compressionTools.map((tool) => (
                            <Grid item xs={12} sm={6} lg={3} key={tool.path}>
                                <DirectToolCard tool={tool} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ mt: { xs: 6, md: 9 } }}>
                    <SectionHeader
                        eyebrow="CSV Tools"
                        title="Convert, clean, and export spreadsheet data"
                        description="Focused CSV pages help users solve one data problem at a time: JSON conversion, delimiter conversion, duplicate removal, CSV cleaning, and PDF export."
                    />

                    <Grid container spacing={2.5}>
                        {csvTools.map((tool) => (
                            <Grid item xs={12} sm={6} lg={3} key={tool.path}>
                                <DirectToolCard tool={tool} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ mt: { xs: 6, md: 9 } }}>
                    <SectionHeader
                        eyebrow="Document Workflows"
                        title="Convert, view, and sign office documents"
                        description="Direct pages for high-value document tasks that users search for: PDF conversion, Word conversion, viewing files online, and signing PDFs."
                    />

                    <Grid container spacing={2.5}>
                        {documentTools.map((tool) => (
                            <Grid item xs={12} sm={6} lg={3} key={tool.path}>
                                <DirectToolCard tool={tool} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ mt: { xs: 6, md: 9 } }}>
                    <SectionHeader
                        eyebrow="Online Viewers"
                        title="Preview files without opening a desktop app"
                        description="Browser viewers for PDFs, DOCX documents, PowerPoint files, and CSV tables."
                    />

                    <Grid container spacing={2.5}>
                        {viewerTools.map((tool) => (
                            <Grid item xs={12} sm={6} lg={3} key={tool.path}>
                                <DirectToolCard tool={tool} compact />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ mt: { xs: 6, md: 9 } }}>
                    <Card sx={ctaPanelSx}>
                        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                            <Grid container spacing={3} alignItems="center">
                                <Grid item xs={12} md={8}>
                                    <Chip
                                        label="Frontend productivity stack"
                                        sx={{
                                            mb: 2,
                                            color: "#9ee8ff",
                                            fontWeight: 950,
                                            border: "1px solid rgba(158,232,255,.24)",
                                            background: "rgba(158,232,255,.08)",
                                        }}
                                    />

                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 950,
                                            letterSpacing: "-0.045em",
                                            mb: 1,
                                        }}
                                    >
                                        One site for office editing, file conversion, compression, and exports.
                                    </Typography>

                                    <Typography sx={{ color: "rgba(255,255,255,.7)", lineHeight: 1.75 }}>
                                        SuiteOfficeLab is structured like an enterprise web app: a clear hub,
                                        categorized tools, direct task URLs, local browser processing, and export-first workflows.
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Stack spacing={1.25}>
                                        <Button
                                            component={RouterLink}
                                            to="/office-tools"
                                            variant="contained"
                                            startIcon={<AppsRoundedIcon />}
                                            sx={primaryButtonSx}
                                        >
                                            Explore Office Tools
                                        </Button>

                                        <Button
                                            component={RouterLink}
                                            to="/compress-video"
                                            variant="outlined"
                                            startIcon={<VideoFileRoundedIcon />}
                                            sx={outlineButtonSx}
                                        >
                                            Compress Upload Video
                                        </Button>

                                        <Button
                                            component={RouterLink}
                                            to="/csv-cleaner"
                                            variant="outlined"
                                            startIcon={<CleaningServicesRoundedIcon />}
                                            sx={outlineButtonSx}
                                        >
                                            Clean CSV File
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>

                <Box sx={{ mt: { xs: 6, md: 9 } }}>
                    <SectionHeader
                        eyebrow="Sponsored Tools"
                        title="More browser creative apps"
                        description="Promoted sister sites for music creation, image editing, and audio mastering."
                    />

                    <Grid container spacing={2.5}>
                        {sisterSites.map((site) => (
                            <Grid item xs={12} md={4} key={site.title}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        background: site.gradient,
                                        border: `1px solid ${site.border}`,
                                        backdropFilter: "blur(18px)",
                                        boxShadow: "0 26px 80px rgba(0,0,0,.28)",
                                        position: "relative",
                                        overflow: "hidden",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: -70,
                                            right: -70,
                                            width: 210,
                                            height: 210,
                                            borderRadius: "999px",
                                            background: site.border,
                                            filter: "blur(4px)",
                                            opacity: 0.55,
                                        }}
                                    />

                                    <CardContent sx={{ p: 3, position: "relative" }}>
                                        <Stack spacing={2.2}>
                                            <Stack direction="row" spacing={1.5} alignItems="center">
                                                <Box
                                                    sx={{
                                                        width: 58,
                                                        height: 58,
                                                        borderRadius: "20px",
                                                        display: "grid",
                                                        placeItems: "center",
                                                        color: site.accent,
                                                        background: "rgba(0,0,0,.22)",
                                                        border: `1px solid ${site.border}`,
                                                    }}
                                                >
                                                    {site.icon}
                                                </Box>

                                                <Box>
                                                    <Typography
                                                        variant="overline"
                                                        sx={{
                                                            color: site.accent,
                                                            fontWeight: 950,
                                                            letterSpacing: 1.2,
                                                        }}
                                                    >
                                                        Advertisement
                                                    </Typography>

                                                    <Typography variant="h5" sx={{ fontWeight: 950 }}>
                                                        {site.title}
                                                    </Typography>
                                                </Box>
                                            </Stack>

                                            <Chip
                                                label={site.badge}
                                                sx={{
                                                    width: "fit-content",
                                                    color: site.accent,
                                                    fontWeight: 950,
                                                    border: `1px solid ${site.border}`,
                                                    background: "rgba(0,0,0,.18)",
                                                }}
                                            />

                                            <Typography sx={{ color: "rgba(255,255,255,.7)", lineHeight: 1.75 }}>
                                                {site.description}
                                            </Typography>

                                            <Button
                                                component="a"
                                                href={site.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                variant="contained"
                                                endIcon={<OpenInNewRoundedIcon />}
                                                sx={{
                                                    mt: "auto",
                                                    color: "#061019",
                                                    fontWeight: 950,
                                                    background:
                                                        "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,.78) 100%)",
                                                    "&:hover": {
                                                        background:
                                                            "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,.88) 100%)",
                                                    },
                                                }}
                                            >
                                                {site.cta}
                                            </Button>

                                            <Typography
                                                component="a"
                                                href={site.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{
                                                    color: "rgba(255,255,255,.55)",
                                                    fontSize: 13,
                                                    textDecoration: "none",
                                                    "&:hover": {
                                                        color: site.accent,
                                                    },
                                                }}
                                            >
                                                {site.displayUrl}
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ mt: { xs: 5, md: 7 } }}>
                    <Grid container spacing={2.5}>
                        <Grid item xs={12} md={6}>
                            <InfoCard
                                icon={<CloudOffRoundedIcon />}
                                title="Local browser file handling"
                                description="Files are opened in the browser using local JavaScript APIs. Edited exports, converted files, compressed outputs, and signed PDFs are generated as direct downloads."
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InfoCard
                                icon={<FileDownloadRoundedIcon />}
                                title="Export-first user experience"
                                description="The interface focuses on practical outputs: PDFs, DOCX files, TXT files, JSON files, CSV files, optimized ZIP archives, and compressed MP4 videos."
                                purple
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </GradientPage>
    );
}

function ToolCard({ tool }) {
    return (
        <Card sx={cardSx}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={iconBoxSx}>{tool.icon}</Box>

                <Typography variant="h5" sx={{ fontWeight: 950, mb: 1 }}>
                    {tool.title}
                </Typography>

                <Typography
                    sx={{
                        color: "rgba(255,255,255,.68)",
                        lineHeight: 1.7,
                        mb: 2.5,
                    }}
                >
                    {tool.description}
                </Typography>

                <Button
                    component={RouterLink}
                    to={tool.path}
                    variant="outlined"
                    fullWidth
                    sx={cardButtonSx}
                >
                    {tool.button}
                </Button>
            </CardContent>
        </Card>
    );
}

function DirectToolCard({ tool, compact = false }) {
    return (
        <Card component={RouterLink} to={tool.path} sx={directCardSx}>
            <CardContent sx={{ p: 3 }}>
                <Stack spacing={compact ? 1.5 : 2}>
                    <Stack direction="row" spacing={1.25} alignItems="center">
                        <Box sx={iconBoxCompactSx}>{tool.icon}</Box>

                        {tool.badge && (
                            <Chip
                                label={tool.badge}
                                size="small"
                                sx={{
                                    color: "#dff8ff",
                                    fontWeight: 950,
                                    border: "1px solid rgba(158,232,255,.22)",
                                    background: "rgba(158,232,255,.08)",
                                }}
                            />
                        )}
                    </Stack>

                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 950, mb: 1 }}>
                            {tool.title}
                        </Typography>

                        <Typography sx={{ color: "rgba(255,255,255,.68)", lineHeight: 1.7 }}>
                            {tool.description}
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: "rgba(255,255,255,.1)" }} />

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{ color: "#9ee8ff", fontWeight: 950, fontSize: 13 }}>
                            {tool.path}
                        </Typography>

                        <OpenInNewRoundedIcon sx={{ color: "#9ee8ff", fontSize: 18 }} />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

function InfoCard({ icon, title, description, purple = false }) {
    return (
        <Card
            sx={{
                height: "100%",
                background: purple ? "rgba(179,140,255,.07)" : "rgba(158,232,255,.07)",
                border: purple
                    ? "1px solid rgba(179,140,255,.16)"
                    : "1px solid rgba(158,232,255,.16)",
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ color: purple ? "#b38cff" : "#9ee8ff", mb: 1 }}>
                    {icon}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 950, mb: 1 }}>
                    {title}
                </Typography>

                <Typography sx={{ color: "rgba(255,255,255,.68)", lineHeight: 1.7 }}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

const heroIconSx = {
    width: 96,
    height: 96,
    borderRadius: "30px",
    display: "grid",
    placeItems: "center",
    background:
        "linear-gradient(135deg, rgba(158,232,255,.24), rgba(179,140,255,.2))",
    border: "1px solid rgba(255,255,255,.16)",
    boxShadow: "0 24px 80px rgba(0,0,0,.45)",
};

const heroChipSx = {
    color: "#9ee8ff",
    fontWeight: 950,
    border: "1px solid rgba(158,232,255,.25)",
    background: "rgba(158,232,255,.08)",
    "& .MuiChip-icon": {
        color: "#9ee8ff",
    },
};

const heroChipMutedSx = {
    color: "white",
    fontWeight: 900,
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(255,255,255,.06)",
    "& .MuiChip-icon": {
        color: "#9ee8ff",
    },
};

const primaryButtonSx = {
    px: 3,
    py: 1.35,
    color: "#061019",
    fontWeight: 950,
    background: "linear-gradient(135deg, #9ee8ff 0%, #b38cff 100%)",
    boxShadow: "0 18px 45px rgba(158,232,255,.22)",
    "&:hover": {
        background: "linear-gradient(135deg, #c8f4ff 0%, #cbb2ff 100%)",
    },
};

const outlineButtonSx = {
    px: 3,
    py: 1.35,
    color: "white",
    borderColor: "rgba(255,255,255,.2)",
    fontWeight: 900,
    "&:hover": {
        borderColor: "rgba(158,232,255,.45)",
        background: "rgba(158,232,255,.08)",
    },
};

const quickLinkSx = {
    color: "#dff8ff",
    fontWeight: 900,
    borderRadius: 999,
    px: 1.6,
    py: 0.75,
    border: "1px solid rgba(158,232,255,.22)",
    background: "rgba(158,232,255,.07)",
    textTransform: "none",
    "&:hover": {
        background: "rgba(158,232,255,.14)",
        borderColor: "rgba(158,232,255,.45)",
    },
};

const heroPanelSx = {
    background:
        "linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.035))",
    border: "1px solid rgba(255,255,255,.14)",
    backdropFilter: "blur(22px)",
    boxShadow: "0 30px 90px rgba(0,0,0,.38)",
    overflow: "hidden",
    position: "relative",
    "&:before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background:
            "radial-gradient(circle at top right, rgba(158,232,255,.2), transparent 42%), radial-gradient(circle at bottom left, rgba(179,140,255,.18), transparent 38%)",
        pointerEvents: "none",
    },
};

const panelIconSx = {
    width: 46,
    height: 46,
    borderRadius: "16px",
    display: "grid",
    placeItems: "center",
    color: "#9ee8ff",
    background: "rgba(158,232,255,.12)",
    border: "1px solid rgba(158,232,255,.18)",
};

const heroRouteButtonSx = {
    width: "100%",
    minHeight: 72,
    justifyContent: "space-between",
    px: 1.25,
    py: 1,
    color: "white",
    fontWeight: 950,
    borderRadius: "16px",
    border: "1px solid rgba(158,232,255,.2)",
    background: "linear-gradient(135deg, rgba(158,232,255,.13), rgba(179,140,255,.08))",
    textTransform: "none",
    "& .MuiButton-endIcon": {
        marginLeft: 0.75,
    },
    "&:hover": {
        borderColor: "rgba(158,232,255,.42)",
        background: "linear-gradient(135deg, rgba(158,232,255,.18), rgba(179,140,255,.12))",
    },
};

const routeMiniIconSx = {
    width: 34,
    height: 34,
    minWidth: 34,
    borderRadius: "12px",
    display: "grid",
    placeItems: "center",
    color: "#9ee8ff",
    background: "rgba(158,232,255,.1)",
    border: "1px solid rgba(158,232,255,.15)",
    "& svg": {
        fontSize: 19,
    },
};

const enterpriseCardSx = {
    height: "100%",
    color: "white",
    background: "rgba(255,255,255,.055)",
    border: "1px solid rgba(255,255,255,.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 22px 70px rgba(0,0,0,.24)",
};

const cardSx = {
    height: "100%",
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 24px 70px rgba(0,0,0,.28)",
    color: "white",
};

const directCardSx = {
    height: "100%",
    textDecoration: "none",
    color: "white",
    display: "block",
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 24px 70px rgba(0,0,0,.28)",
    transition: "transform 180ms ease, border-color 180ms ease, background 180ms ease",
    "&:hover": {
        transform: "translateY(-5px)",
        borderColor: "rgba(158,232,255,.42)",
        background: "rgba(158,232,255,.08)",
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
    mb: 2,
};

const iconBoxCompactSx = {
    width: 48,
    height: 48,
    borderRadius: "16px",
    display: "grid",
    placeItems: "center",
    color: "#9ee8ff",
    background: "rgba(158,232,255,.12)",
    border: "1px solid rgba(158,232,255,.18)",
};

const cardButtonSx = {
    color: "white",
    borderColor: "rgba(255,255,255,.18)",
    fontWeight: 900,
    "&:hover": {
        borderColor: "rgba(158,232,255,.42)",
        background: "rgba(158,232,255,.08)",
    },
};

const ctaPanelSx = {
    background:
        "linear-gradient(135deg, rgba(158,232,255,.12), rgba(179,140,255,.1), rgba(255,255,255,.045))",
    border: "1px solid rgba(255,255,255,.14)",
    boxShadow: "0 30px 95px rgba(0,0,0,.32)",
    backdropFilter: "blur(20px)",
    color: "white",
};