import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import SlideshowRoundedIcon from "@mui/icons-material/SlideshowRounded";

import {
    AppNavBar,
    GradientPage,
    PowerPointEditor,
    SectionHeader,
} from "../components/components.jsx";

import HelmetHeader from "../components/HelmetHeader.jsx";

export default function PowerPoint() {
    return (
        <GradientPage>
            <HelmetHeader
                title="PowerPoint Editor"
                path="/powerpoint"
                description="Import PPTX files, view slide thumbnails, edit slide titles and body text, manage speaker notes, and export presentations from the browser."
                keywords="PowerPoint editor, PPTX editor, browser slide editor, presentation editor, edit PPTX online, frontend PowerPoint editor"
            />

            <AppNavBar />

            <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
                <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
                    <SlideshowRoundedIcon sx={{ color: "#9ee8ff" }} />

                    <Typography
                        variant="overline"
                        sx={{
                            color: "#9ee8ff",
                            fontWeight: 950,
                            letterSpacing: 1.6,
                        }}
                    >
                        PowerPoint Editor
                    </Typography>
                </Stack>

                <SectionHeader
                    title="PowerPoint-style slide editor with PPTX import"
                    description="Import PPTX files, view slide thumbnails, edit titles and body text directly on the slide, manage speaker notes, and export a presentation."
                />

                <PowerPointEditor />
            </Container>
        </GradientPage>
    );
}