import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reactToWebComponent from "react-to-webcomponent";

// React wrapper component with configurable width/height
const AppWithRouter = ({ width, height }) => {
  const containerWidth = width || window.innerWidth; const containerHeight = height || window.innerHeight;

  return (
    <BrowserRouter>
      <div
        style={{
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
          overflow: "hidden",
          border: "1px solid #ccc",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <App />
      </div>
    </BrowserRouter>
  );
};

// --- Web Component version ---
const RecyclingGameElement = reactToWebComponent(AppWithRouter, React, ReactDOM);
customElements.define("recycling-game-widget", RecyclingGameElement);

// --- Standalone app version (for dev / CRA) ---
const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<AppWithRouter />);
}
