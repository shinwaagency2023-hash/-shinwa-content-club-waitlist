import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Privacy from "./pages/Privacy";
import "./index.css";

const isPrivacy = window.location.pathname.replace(/\/$/, "") === "/privacy";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{isPrivacy ? <Privacy /> : <App />}</React.StrictMode>
);
