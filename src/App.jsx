import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CreateProductForm } from "./components/CreateProductForm";
import { PrivateRoute } from "./components/PrivateRoute";
import { AboutPage } from "./pages/AboutPage";
import { EditProductPage } from "./pages/EditProductPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { Page404 } from "./pages/Page404";
import { ProductsPage } from "./pages/ProductsPage";
import { ProfileEditPage } from "./pages/ProfileEditPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisterPage } from "./pages/RegisterPage";
import { AdminRoute } from "./router/AdminRoute";
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
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/profile/edit" element={<ProfileEditPage />} />
                        <Route element={<AdminRoute />}>
                            <Route path="/admin/products/edit" element={<EditProductPage />} />
                            <Route path="/admin/products/create" element={<CreateProductForm />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </MainBox>
            <Footer />
        </div>
    );
};
