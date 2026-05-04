import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import onlyLogo from './images/only-logo.png';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import the i18n configuration

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Wrap App with I18nextProvider */}
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

// Dynamically set the favicon
const link = document.createElement('link');
link.rel = 'icon';
link.href = onlyLogo;
link.type = 'image/png';
document.head.appendChild(link);