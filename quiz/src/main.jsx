import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Quiz from "./Quiz.jsx";
import NumberGame from "./NumberGame.jsx"


createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Quiz></Quiz> */}
    <NumberGame></NumberGame>
  </StrictMode>
);
