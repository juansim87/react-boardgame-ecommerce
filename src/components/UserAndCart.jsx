import { useState } from "react";
import { Link } from "react-router-dom";
import trolly from "../assets/icons/trolly.png";
import user from "../assets/icons/user.png";

export const UserAndCart = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="align-row gap-sm relative">
            <div role="button" onClick={() => setIsOpen(!isOpen)} className="max-w-[32px] cursor-pointer">
                <img src={user} alt="Usuario" className="w-full" />
            </div>
            {isOpen && (
                <div className="perfect-center absolute right-0 top-[110%] w-40 bg-white border border-gray-200 rounded-lg shadow-md z-50 p-2">
                    <Link to="/login" className="text-brand-400">
                        Iniciar sesión
                    </Link>
                    <Link to="/register">Registrarse</Link>
                </div>
            )}

            <div role="button" className="max-w-[32px] cursor-pointer">
                <img src={trolly} alt="Carrito" className="w-full" />
            </div>
        </div>
    );
};
