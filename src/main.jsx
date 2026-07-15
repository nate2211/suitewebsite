import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./resizeObserverFix.js";

const container = document.getElementById("root");

if (!container) {
  throw new Error("SuiteOfficeLab could not find the #root application element.");
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
