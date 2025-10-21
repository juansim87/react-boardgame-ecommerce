import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = () => {
    const { user } = useContext(AuthContext);
    if (user === null) {
        return <div>Cargando...</div>;
    }

    if (user === false) {
        return <Navigate to="/login" state={{ hayUsuario: "No existe usuario" }} />;
    }

    return <Outlet />;
};
