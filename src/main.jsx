import ReactDOM from "react-dom/client";
import "./index.css";
import { Divergent } from "./Divergent.jsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <Divergent />
    </React.StrictMode>
  </BrowserRouter>
);
