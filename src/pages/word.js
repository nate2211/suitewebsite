import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import {
    AppNavBar,
    GradientPage,
    SectionHeader,
    WordEditor,
} from "../components/components";

export default function Word() {
    return (
        <GradientPage>
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