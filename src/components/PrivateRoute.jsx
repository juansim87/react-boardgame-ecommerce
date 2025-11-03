import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (user === null) {
        return <div>Cargando...</div>;
    }

    if (user === false) {
        localStorage.setItem("redirectAfterLogin", location.pathname);
        return <Navigate to="/login" state={{ hayUsuario: "No existe usuario" }} />;
    }

    return <Outlet />;
};
