import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import trolly from "../assets/icons/trolly.png";
import userIcon from "../assets/icons/user-icon.png";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../core/auth/useAuth";
import { useDropdown } from "../hooks/useDropdown";
import { Avatar } from "./Avatar";

export const UserAndCart = () => {
    const { pathname } = useLocation();
    const { user } = useContext(AuthContext);
    const { cart, clearCart } = useContext(CartContext);
    const { logout } = useAuth();
    const userDropdown = useDropdown();
    const cartDropdown = useDropdown();

    const totalItems = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    useEffect(() => {
        userDropdown.setIsOpen(false);
        cartDropdown.setIsOpen(false);
    }, [pathname]);

    return (
        <div className="align-row gap-sm">
            {/* --- MENÚ USUARIO --- */}
            <div ref={userDropdown.ref} className="relative">
                <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={userDropdown.isOpen}
                    onClick={() => {
                        userDropdown.setIsOpen((o) => !o);
                        cartDropdown.setIsOpen(false);
                    }}
                    className="w-12 h-12 shrink-0 rounded-full p-0 bg-transparent cursor-pointer"
                >
                    {user ? (
                        <Avatar
                            src={user?.avatar}
                            name={user?.username || user?.name}
                            sizeClass="w-12 h-12"
                        />
                    ) : (
                        <img
                            src={userIcon}
                            alt="Usuario"
                            className="w-full h-full object-contain rounded-full border border-gray-300"
                        />
                    )}
                </button>

                {userDropdown.isOpen && !user && (
                    <div
                        role="menu"
                        className="absolute right-0 top-[110%] w-min-50 bg-white border border-gray-200 rounded-lg shadow-md z-50 p-2"
                    >
                        <Link
                            to="/login"
                            role="menuitem"
                            className="block text-brand-400 rounded-md px-2 py-1 hover:bg-black/5"
                            onClick={() => userDropdown.setIsOpen(false)}
                        >
                            Iniciar sesión
                        </Link>
                        <Link
                            to="/register"
                            role="menuitem"
                            className="block rounded-md px-2 py-1 hover:bg-black/5"
                            onClick={() => userDropdown.setIsOpen(false)}
                        >
                            Registrarse
                        </Link>
                    </div>
                )}

                {userDropdown.isOpen && user && (
                    <div
                        role="menu"
                        className="absolute right-0 top-[110%] w-40 bg-white border border-gray-200 rounded-lg shadow-md z-50 p-2"
                    >
                        <Link
                            to="/user"
                            role="menuitem"
                            className="block rounded-md px-2 py-1 hover:bg-black/5"
                            onClick={() => userDropdown.setIsOpen(false)}
                        >
                            Mi cuenta
                        </Link>
                        <Link
                            to="/user/profile"
                            role="menuitem"
                            className="block rounded-md px-2 py-1 hover:bg-black/5"
                            onClick={() => userDropdown.setIsOpen(false)}
                        >
                            Perfil
                        </Link>
                        {user.role === "admin" && (
                            <Link
                                to="/admin/products/edit"
                                role="menuitem"
                                className="block rounded-md px-2 py-1 hover:bg-black/5"
                                onClick={() => userDropdown.setIsOpen(false)}
                            >
                                Editar productos
                            </Link>
                        )}
                        <Link
                            to="/register"
                            role="menuitem"
                            className="block text-error-900 rounded-md px-2 py-1 hover:bg-black/5"
                            onClick={logout}
                        >
                            Logout
                        </Link>
                    </div>
                )}
            </div>

            {/* --- MENÚ CARRITO --- */}
            {user && (
                <div className="relative" ref={cartDropdown.ref}>
                    <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={cartDropdown.isOpen}
                        onClick={() => {
                            cartDropdown.setIsOpen((o) => !o);
                            userDropdown.setIsOpen(false);
                        }}
                        className="w-12 h-12 shrink-0 rounded-full p-0 bg-transparent cursor-pointer"
                    >
                        <img src={trolly} alt="Carrito" className="w-full h-full object-contain" />

                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    {cartDropdown.isOpen && (
                        <div
                            role="menu"
                            className="absolute right-0 top-[110%] w-40 bg-white border border-gray-200 rounded-lg shadow-md z-50 p-2"
                        >
                            <Link
                                to="/user/cart"
                                role="menuitem"
                                className="block rounded-md px-2 py-1 hover:bg-black/5"
                                onClick={() => cartDropdown.setIsOpen(false)}
                            >
                                Mostrar carrito
                            </Link>
                            <button
                                type="button"
                                role="menuitem"
                                className="block w-full text-left text-error-900 rounded-md px-2 py-1 hover:bg-black/5"
                                onClick={() => {
                                    clearCart();
                                    cartDropdown.setIsOpen(false);
                                }}
                            >
                                Vaciar carrito
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
