import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ThreeD from "./ThreeD";
import "./main.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThreeD />
  </StrictMode>
);
