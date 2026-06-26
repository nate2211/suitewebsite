import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import {
    AppNavBar,
    GradientPage,
    PdfEditor,
    SectionHeader,
} from "../components/components";

export default function Pdf() {
    return (
        <GradientPage>
            <AppNavBar />

            <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
                <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
                    <PictureAsPdfRoundedIcon sx={{ color: "#9ee8ff" }} />

                    <Typography
                        variant="overline"
                        sx={{
                            color: "#9ee8ff",
                            fontWeight: 950,
                            letterSpacing: 1.6,
                        }}
                    >
                        PDF Editor
                    </Typography>
                </Stack>

                <SectionHeader
                    title="Adobe-style PDF reader and editor"
                    description="Import a PDF, view pages, zoom, add text, highlights, boxes, redaction blocks, notes, and signatures, then export a new edited PDF directly from the browser."
                />

                <PdfEditor />
            </Container>
        </GradientPage>
    );
}