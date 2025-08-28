// import React, { Component } from "react";
import React from "react";
import ReactDOM from "react-dom";
import ReactDOMClient from 'react-dom/client';
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactToWebComponent from "react-to-webcomponent";

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppWithRouter = ({ width = 400, height = 600 }) => (
  <BrowserRouter>
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
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

const RecyclingGameElement = reactToWebComponent(AppWithRouter, React, ReactDOM);

customElements.define("recycling-game-widget", RecyclingGameElement);

if (document.getElementById("root")) {
  ReactDOM.render(<AppWithRouter />, document.getElementById("root"));
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
