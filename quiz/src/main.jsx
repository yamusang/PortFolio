import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Quiz from "./Quiz.jsx";
import QuizApp from "./QuizApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <Quiz></Quiz>
    {/* <QuizApp></QuizApp> */}
  </StrictMode>
);
