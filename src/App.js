import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";

import Home from "./pages/home";
import Csv from "./pages/csv";
import Word from "./pages/word";
import PowerPoint from "./pages/powerpoint";
import Pdf from "./pages/pdf";
import AdditionalPages from "./pages/additionalpages";
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9ee8ff",
    },
    secondary: {
      main: "#b38cff",
    },
    background: {
      default: "#050711",
      paper: "#0a1020",
    },
  },
  typography: {
    fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    button: {
      textTransform: "none",
      fontWeight: 850,
    },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          backgroundColor: "#050711",
        },
        "*": {
          boxSizing: "border-box",
        },
      },
    },
  },
});

export default function App() {
  return (
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/csv" element={<Csv />} />
              <Route path="/word" element={<Word />} />
              <Route path="/powerpoint" element={<PowerPoint />} />
              <Route path="/pdf" element={<Pdf />} />
              <Route path="/office-tools" element={<AdditionalPages />} />
              <Route path="/convert-pdf" element={<AdditionalPages />} />
              <Route path="/convert-word" element={<AdditionalPages />} />
              <Route path="/view-pdf" element={<AdditionalPages />} />
              <Route path="/view-word" element={<AdditionalPages />} />
              <Route path="/view-powerpoint" element={<AdditionalPages />} />
              <Route path="/view-csv" element={<AdditionalPages />} />
              <Route path="/sign-document" element={<AdditionalPages />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
  );
}