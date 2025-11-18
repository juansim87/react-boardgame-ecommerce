import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CreateProductForm } from "./components/CreateProductForm";
import { PrivateRoute } from "./components/PrivateRoute";
import { ToastContainer } from "./components/Toast/ToastContainer";
import { useToastContext } from "./context/ToastContext";
import { AboutPage } from "./pages/AboutPage";
import { CartPage } from "./pages/CartPage";
import { EditProductPage } from "./pages/EditProductPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { Page404 } from "./pages/Page404";
import { ProductsPage } from "./pages/ProductsPage";
import { ProfileEditPage } from "./pages/ProfileEditPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisterPage } from "./pages/RegisterPage";
import { UserManagerPage } from "./pages/UserManagerPage";
import { UserPage } from "./pages/UserPage";
import { AdminRoute } from "./router/AdminRoute";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { MainBox } from "./sections/MainBox";

export const App = () => {
    const toast = useToastContext();
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
                        <Route path="/user" element={<UserPage />} />
                        <Route path="/user/cart" element={<CartPage />} />
                        <Route path="/user/profile" element={<ProfilePage />} />
                        <Route path="/user/profile/edit" element={<ProfileEditPage />} />
                        <Route element={<AdminRoute />}>
                            <Route path="/admin/usermanager" element={<UserManagerPage />} />
                            <Route path="/admin/products/edit" element={<EditProductPage />} />
                            <Route path="/admin/products/create" element={<CreateProductForm />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<Page404 />} />
                </Routes>
                <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
            </MainBox>
            <Footer />
        </div>
    );
};
