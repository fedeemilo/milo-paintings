import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { ContextProvider } from "./context/ContextProvider";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <ContextProvider>
        <App />
    </ContextProvider>
);
