import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import trolly from "../assets/icons/trolly.png";
import userIcon from "../assets/icons/user-icon.png";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../core/auth/useAuth";
import { Button } from "./Button";

export const UserAndCart = () => {
    const [isOpen, setIsOpen] = useState(false);
    const userRef = useRef(null);
    const { pathname } = useLocation();
    const { user } = useContext(AuthContext);
    const { logout } = useAuth();
    console.log("Usuario:", user);

    useEffect(() => {
        const onDocClick = (e) => {
            if (isOpen && userRef.current && !userRef.current.contains(e.target)) setIsOpen(false);
        };
        const onKey = (e) => e.key === "Escape" && setIsOpen(false);
        document.addEventListener("click", onDocClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("click", onDocClick);
            document.removeEventListener("keydown", onKey);
        };
    }, [isOpen]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <div className="align-row gap-sm">
            <div ref={userRef} className="relative">
                <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((o) => !o)}
                    className="w-8 h-8 shrink-0 rounded-full p-0 bg-transparent cursor-pointer"
                >
                    <img
                        src={user ? user.avatar : userIcon}
                        alt="Usuario"
                        className="w-full h-full object-contain"
                    />
                </button>

                {isOpen && !user && (
                    <div
                        role="menu"
                        className="absolute right-0 top-[110%] w-40 bg-white border border-gray-200 rounded-lg shadow-md z-50 p-2"
                    >
                        <Link
                            to="/login"
                            role="menuitem"
                            className="block text-brand-400 rounded-md px-2 py-1 hover:bg-black/5"
                            onClick={() => setIsOpen(false)}
                        >
                            Iniciar sesión
                        </Link>
                        <Link
                            to="/register"
                            role="menuitem"
                            className="block rounded-md px-2 py-1 hover:bg-black/5"
                            onClick={() => setIsOpen(false)}
                        >
                            Registrarse
                        </Link>
                    </div>
                )}
                {isOpen && user && (
                    <div
                        role="menu"
                        className="absolute right-0 top-[110%] w-40 bg-white border border-gray-200 rounded-lg shadow-md z-50 p-2"
                    >
                        <Button variant="primary" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                )}
            </div>

            <button
                type="button"
                className="w-8 h-8 shrink-0 rounded-full p-0 bg-transparent cursor-pointer"
                onClick={() => setIsOpen(false)}
            >
                <img src={trolly} alt="Carrito" className="w-full h-full object-contain" />
            </button>
        </div>
    );
};
