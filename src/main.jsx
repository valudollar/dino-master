import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "normalize.css";
import "./fonts/Dinosaur.ttf";
import "./fonts/Dinosaur2.ttf";
import "./fonts/Dinosaur3.otf";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <BrowserRouter>
    <App />
  </BrowserRouter>

  // </React.StrictMode>,
);
