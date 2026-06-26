import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";

import {
    AppNavBar,
    CsvEditor,
    GradientPage,
    SectionHeader,
} from "../components/components";

import HelmetHeader from "../components/HelmetHeader";

export default function Csv() {
    return (
        <GradientPage>
            <HelmetHeader
                title="CSV Editor"
                path="/csv"
                description="Upload, edit, search, add rows, add columns, copy CSV text, and export edited CSV files directly from the browser."
                keywords="CSV editor, browser CSV editor, online spreadsheet editor, edit CSV file, export CSV, frontend CSV editor"
            />

            <AppNavBar />

            <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
                <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
                    <TableChartRoundedIcon sx={{ color: "#9ee8ff" }} />

                    <Typography
                        variant="overline"
                        sx={{
                            color: "#9ee8ff",
                            fontWeight: 950,
                            letterSpacing: 1.6,
                        }}
                    >
                        CSV Editor
                    </Typography>
                </Stack>

                <SectionHeader
                    title="CSV editor with direct file export"
                    description="Upload a CSV file, edit the grid, add rows, add columns, copy CSV text, and export the edited CSV directly from the browser."
                />

                <CsvEditor />
            </Container>
        </GradientPage>
    );
}