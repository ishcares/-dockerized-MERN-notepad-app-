// src/main.jsx (CLEANED)

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ❌ REMOVED: import "react-toastify/dist/ReactToastify.css";
// ❌ REMOVED: import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* ❌ REMOVED: ToastContainer component */}
  </React.StrictMode>
);
