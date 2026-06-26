import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
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
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";

import {
    AppNavBar,
    GradientPage,
    SectionHeader,
} from "../components/components";

import HelmetHeader from "../components/HelmetHeader";

export default function Home() {
    const tools = [
        {
            title: "CSV Editor",
            path: "/csv",
            icon: <TableChartRoundedIcon />,
            description:
                "Upload, edit, add rows, add columns, search, copy, and export CSV files in an Excel-style grid.",
            button: "Open CSV",
        },
        {
            title: "Word Editor",
            path: "/word",
            icon: <DescriptionRoundedIcon />,
            description:
                "Import DOCX files, type directly on a document page, format text, insert tables, and export documents.",
            button: "Open Word",
        },
        {
            title: "PowerPoint Editor",
            path: "/powerpoint",
            icon: <SlideshowRoundedIcon />,
            description:
                "Import PPTX files, edit slide thumbnails, use slide layouts, manage speaker notes, and export presentations.",
            button: "Open PowerPoint",
        },
        {
            title: "PDF Editor",
            path: "/pdf",
            icon: <PictureAsPdfRoundedIcon />,
            description:
                "Import PDFs, preview pages, add text, highlights, rectangles, ink notes, signatures, and export an edited PDF.",
            button: "Open PDF",
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
            gradient:
                "linear-gradient(135deg, rgba(158,232,255,.18), rgba(88,166,255,.08))",
            border: "rgba(158,232,255,.22)",
            iconBg: "rgba(158,232,255,.14)",
            accent: "#9ee8ff",
        },
        {
            title: "ImageMasterLab",
            url: "https://imagemasterlab.com",
            displayUrl: "imagemasterlab.com",
            icon: <ImageRoundedIcon />,
            badge: "Browser Image Editor",
            description:
                "Edit images, add layers, use text tools, draw selections, make creative graphics, and export polished image files.",
            cta: "Visit ImageMasterLab",
            gradient:
                "linear-gradient(135deg, rgba(179,140,255,.18), rgba(255,255,255,.05))",
            border: "rgba(179,140,255,.24)",
            iconBg: "rgba(179,140,255,.14)",
            accent: "#b38cff",
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
            gradient:
                "linear-gradient(135deg, rgba(112,255,214,.14), rgba(158,232,255,.08))",
            border: "rgba(112,255,214,.2)",
            iconBg: "rgba(112,255,214,.12)",
            accent: "#70ffd6",
        },
    ];

    return (
        <GradientPage>
            <HelmetHeader
                title="Frontend Browser Office Suite"
                path="/"
                description="Edit CSV, Word-style documents, PowerPoint-style slides, and PDFs from one frontend-only browser office suite with direct local file exports. Explore related browser tools from MusicStudioLab, ImageMasterLab, and AudioMasterLab."
                keywords="browser office suite, frontend office editor, CSV editor, Word editor, PowerPoint editor, PDF editor, online document editor, MusicStudioLab, ImageMasterLab, AudioMasterLab"
            />

            <AppNavBar />

            <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
                <Grid container spacing={3.5} alignItems="center">
                    <Grid item xs={12} lg={8}>
                        <Stack spacing={3} alignItems={{ xs: "center", lg: "flex-start" }} textAlign={{ xs: "center", lg: "left" }}>
                            <Box
                                sx={{
                                    width: 94,
                                    height: 94,
                                    borderRadius: "30px",
                                    display: "grid",
                                    placeItems: "center",
                                    background:
                                        "linear-gradient(135deg, rgba(158,232,255,.24), rgba(179,140,255,.2))",
                                    border: "1px solid rgba(255,255,255,.16)",
                                    boxShadow: "0 24px 80px rgba(0,0,0,.45)",
                                }}
                            >
                                <AutoAwesomeRoundedIcon sx={{ fontSize: 54, color: "#9ee8ff" }} />
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
                                    sx={{
                                        color: "#9ee8ff",
                                        fontWeight: 950,
                                        border: "1px solid rgba(158,232,255,.25)",
                                        background: "rgba(158,232,255,.08)",
                                    }}
                                />

                                <Chip
                                    icon={<BoltRoundedIcon />}
                                    label="Frontend-only exports"
                                    sx={{
                                        color: "white",
                                        fontWeight: 900,
                                        border: "1px solid rgba(255,255,255,.14)",
                                        background: "rgba(255,255,255,.06)",
                                    }}
                                />
                            </Stack>

                            <Typography
                                variant="h1"
                                sx={{
                                    maxWidth: 1100,
                                    fontWeight: 950,
                                    fontSize: { xs: 40, sm: 56, md: 78 },
                                    lineHeight: 0.95,
                                }}
                            >
                                Edit CSV, Word, PowerPoint, and PDF files from one frontend app.
                            </Typography>

                            <Typography
                                sx={{
                                    maxWidth: 920,
                                    color: "rgba(255,255,255,.72)",
                                    fontSize: { xs: 16, md: 19 },
                                    lineHeight: 1.7,
                                }}
                            >
                                A frontend-only productivity suite with spreadsheet editing,
                                document editing, slide editing, and PDF markup/export tools. Import
                                files, make browser-based edits, and export your finished work.
                            </Typography>

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                                <Button
                                    component={RouterLink}
                                    to="/pdf"
                                    size="large"
                                    variant="contained"
                                    startIcon={<PictureAsPdfRoundedIcon />}
                                    sx={{
                                        px: 3,
                                        py: 1.35,
                                        color: "#061019",
                                        fontWeight: 950,
                                        background:
                                            "linear-gradient(135deg, #9ee8ff 0%, #b38cff 100%)",
                                    }}
                                >
                                    Open PDF Editor
                                </Button>

                                <Button
                                    component={RouterLink}
                                    to="/word"
                                    size="large"
                                    variant="outlined"
                                    startIcon={<EditNoteRoundedIcon />}
                                    sx={{
                                        px: 3,
                                        py: 1.35,
                                        color: "white",
                                        borderColor: "rgba(255,255,255,.2)",
                                        fontWeight: 900,
                                    }}
                                >
                                    Start Writing
                                </Button>
                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Card
                            sx={{
                                background:
                                    "linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.035))",
                                border: "1px solid rgba(255,255,255,.14)",
                                backdropFilter: "blur(22px)",
                                boxShadow: "0 30px 90px rgba(0,0,0,.38)",
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "radial-gradient(circle at top right, rgba(158,232,255,.2), transparent 42%), radial-gradient(circle at bottom left, rgba(179,140,255,.18), transparent 38%)",
                                    pointerEvents: "none",
                                }}
                            />

                            <CardContent sx={{ p: 3, position: "relative" }}>
                                <Stack spacing={2}>
                                    <Stack direction="row" spacing={1.25} alignItems="center">
                                        <Box
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: "16px",
                                                display: "grid",
                                                placeItems: "center",
                                                color: "#9ee8ff",
                                                background: "rgba(158,232,255,.12)",
                                                border: "1px solid rgba(158,232,255,.18)",
                                            }}
                                        >
                                            <CampaignRoundedIcon />
                                        </Box>

                                        <Box>
                                            <Typography variant="overline" sx={{ color: "#9ee8ff", fontWeight: 950 }}>
                                                Featured Network
                                            </Typography>

                                            <Typography variant="h5" sx={{ fontWeight: 950 }}>
                                                More browser tools
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Typography sx={{ color: "rgba(255,255,255,.68)", lineHeight: 1.7 }}>
                                        Explore the other tools in your creative browser app network:
                                        music production, image editing, and audio mastering.
                                    </Typography>

                                    {sisterSites.map((site) => (
                                        <Button
                                            key={site.title}
                                            component="a"
                                            href={site.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            endIcon={<OpenInNewRoundedIcon />}
                                            sx={{
                                                justifyContent: "space-between",
                                                px: 2,
                                                py: 1.4,
                                                color: "white",
                                                fontWeight: 950,
                                                borderRadius: "16px",
                                                border: `1px solid ${site.border}`,
                                                background: site.gradient,
                                                textTransform: "none",
                                            }}
                                        >
                                            {site.displayUrl}
                                        </Button>
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Box sx={{ mt: { xs: 6, md: 9 } }}>
                    <SectionHeader
                        eyebrow="Suite Tools"
                        title="Choose your editor"
                        description="Each workspace is designed to feel similar to familiar Microsoft or Adobe-style tools while staying fully frontend."
                    />

                    <Grid container spacing={2.5}>
                        {tools.map((tool) => (
                            <Grid item xs={12} md={6} lg={3} key={tool.title}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        background: "rgba(255,255,255,.06)",
                                        border: "1px solid rgba(255,255,255,.12)",
                                        backdropFilter: "blur(18px)",
                                        boxShadow: "0 24px 70px rgba(0,0,0,.28)",
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Box
                                            sx={{
                                                width: 54,
                                                height: 54,
                                                borderRadius: "18px",
                                                display: "grid",
                                                placeItems: "center",
                                                color: "#9ee8ff",
                                                background: "rgba(158,232,255,.12)",
                                                border: "1px solid rgba(158,232,255,.18)",
                                                mb: 2,
                                            }}
                                        >
                                            {tool.icon}
                                        </Box>

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
                                            sx={{
                                                color: "white",
                                                borderColor: "rgba(255,255,255,.18)",
                                                fontWeight: 900,
                                            }}
                                        >
                                            {tool.button}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ mt: { xs: 6, md: 8 } }}>
                    <SectionHeader
                        eyebrow="Sponsored Tools"
                        title="Try our other browser apps"
                        description="These promoted websites are part of your creative tool network and help users move from documents into music, images, and audio production."
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
                                            top: -60,
                                            right: -60,
                                            width: 180,
                                            height: 180,
                                            borderRadius: "999px",
                                            background: site.iconBg,
                                            filter: "blur(4px)",
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
                                                        background: site.iconBg,
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

                <Box sx={{ mt: 5 }}>
                    <Grid container spacing={2.5}>
                        <Grid item xs={12} md={6}>
                            <Card
                                sx={{
                                    height: "100%",
                                    background: "rgba(158,232,255,.07)",
                                    border: "1px solid rgba(158,232,255,.16)",
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <CloudOffRoundedIcon sx={{ color: "#9ee8ff", mb: 1 }} />

                                    <Typography variant="h6" sx={{ fontWeight: 950, mb: 1 }}>
                                        Frontend-only file handling
                                    </Typography>

                                    <Typography sx={{ color: "rgba(255,255,255,.68)" }}>
                                        Files are opened in the browser using local JavaScript APIs.
                                        Edited exports are generated with Blob downloads, so no
                                        backend upload is required.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card
                                sx={{
                                    height: "100%",
                                    background: "rgba(179,140,255,.07)",
                                    border: "1px solid rgba(179,140,255,.16)",
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <FileDownloadRoundedIcon sx={{ color: "#b38cff", mb: 1 }} />

                                    <Typography variant="h6" sx={{ fontWeight: 950, mb: 1 }}>
                                        Direct exports
                                    </Typography>

                                    <Typography sx={{ color: "rgba(255,255,255,.68)" }}>
                                        Export CSV, Word-compatible documents, HTML presentations,
                                        and edited PDFs directly from the browser.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </GradientPage>
    );
}