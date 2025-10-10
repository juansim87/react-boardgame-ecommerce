import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AboutPage } from "./pages/AboutPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { Page404 } from "./pages/Page404";
import { ProductsPage } from "./pages/ProductsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisterPage } from "./pages/RegisterPage";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { MainBox } from "./sections/MainBox";

export const App = () => {
    return (
        <div className="w-full">
            <Header />
            <MainBox>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    {/* <Route path="private" element={<PrivateRoute />}>
                        <Route path="/admin" />
                    </Route> */}
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </MainBox>
            <Footer />
        </div>
    );
};
