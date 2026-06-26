import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
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
import {
    AppNavBar,
    GradientPage,
    SectionHeader,
} from "../components/components";

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

    return (
        <GradientPage>
            <AppNavBar />

            <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
                <Stack spacing={3} alignItems="center" textAlign="center">
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

                    <Typography
                        variant="overline"
                        sx={{
                            color: "#9ee8ff",
                            fontWeight: 950,
                            letterSpacing: 1.8,
                        }}
                    >
                        Browser Office Suite
                    </Typography>

                    <Typography
                        variant="h1"
                        sx={{
                            maxWidth: 1100,
                            fontWeight: 950,
                            fontSize: { xs: 40, sm: 56, md: 80 },
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