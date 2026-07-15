/**
 * Compatibility entry for clean Vite migrations copied over an older CRA tree.
 * The application source lives in App.jsx; this file prevents stale App.js
 * imports from returning a 404 response with an invalid MIME type.
 */
export { default } from "./App.jsx";
