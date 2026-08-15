import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";

createRoot(document.getElementById("root")!).render(  // 非空断言：root 一定存在（第 4 课）
  <StrictMode>
    <App />
  </StrictMode>
);
