import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AboutPage } from "./pages/AboutPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { SearchPage } from "./pages/SearchPage";
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
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </MainBox>
            <Footer />
        </div>
    );
};
