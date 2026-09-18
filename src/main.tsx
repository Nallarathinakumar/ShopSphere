import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import "./styles.css";

// Hash routing is the safest default for GitHub Pages because Pages has no
// server-side rewrite. Switch VITE_ROUTER=browser on Vercel/Netlify.
const useHash = String(import.meta.env.VITE_ROUTER || "hash") === "hash";
const Router = useHash ? HashRouter : BrowserRouter;
const basename = useHash ? undefined : import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router basename={basename}>
      <CartProvider>
        <App />
      </CartProvider>
    </Router>
  </React.StrictMode>
);
