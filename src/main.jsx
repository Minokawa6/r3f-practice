import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DieProvider } from "./presentation/context/DieProvider.jsx";
import { ThreeDDieSkinProvider } from "./presentation/context/ThreeDDieSkinProvider.jsx";
import ThreeD from "./presentation/pages/ThreeD";
import "./main.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DieProvider>
      <ThreeDDieSkinProvider>
        <ThreeD />
      </ThreeDDieSkinProvider>
    </DieProvider>
  </StrictMode>
);
