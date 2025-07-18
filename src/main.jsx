import App from "./app";
import { createRoot } from "react-dom/client";
import { StrictMode } from 'react';
import { Analytics } from "@vercel/analytics/react"


createRoot(document.getElementById('root')).render(
    <StrictMode>
    <App />
    <Analytics />
    </StrictMode>
);