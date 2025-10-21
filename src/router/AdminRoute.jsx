import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const AdminRoute = () => {
    const { user } = useContext(AuthContext);

    if (user === null) {
        return <div>Cargando...</div>;
    }

    if (!user || user.role !== "admin") {
        return <Navigate to="/" state={{ error: "Acceso denegado" }} />;
    }
    return <Outlet />;
};
