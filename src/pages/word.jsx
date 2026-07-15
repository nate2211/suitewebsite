import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

import {
    AppNavBar,
    GradientPage,
    SectionHeader,
    WordEditor,
} from "../components/components.jsx";

import HelmetHeader from "../components/HelmetHeader.jsx";

export default function Word() {
    return (
        <GradientPage>
            <HelmetHeader
                title="Word Editor"
                path="/word"
                description="Import DOCX files, type directly on a document page, use formatting controls, and export documents as HTML, TXT, or Word-compatible DOC files."
                keywords="Word editor, DOCX editor, browser document editor, online word processor, edit DOCX, frontend Word editor"
            />

            <AppNavBar />

            <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
                <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
                    <DescriptionRoundedIcon sx={{ color: "#9ee8ff" }} />

                    <Typography
                        variant="overline"
                        sx={{
                            color: "#9ee8ff",
                            fontWeight: 950,
                            letterSpacing: 1.6,
                        }}
                    >
                        Word Editor
                    </Typography>
                </Stack>

                <SectionHeader
                    title="Word-style processor with DOCX import"
                    description="Import DOCX files, type directly on the document page, use formatting controls, and export your document as HTML, TXT, or Word-compatible DOC."
                />

                <WordEditor />
            </Container>
        </GradientPage>
    );
}