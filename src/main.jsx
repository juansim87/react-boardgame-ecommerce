import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartsProvider } from "./context/CartsContext.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CartsProvider>
                    <ProductsProvider>
                        <App />
                    </ProductsProvider>
                </CartsProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
