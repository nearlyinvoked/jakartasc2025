import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeRegistry from "./components/theme-registry";
import "./utils/featureDetection";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeRegistry>
      <App />
    </ThemeRegistry>
  </StrictMode>
);

// Register service worker for offline functionality
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registered:", registration);
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed:", error);
      });
  });
}
