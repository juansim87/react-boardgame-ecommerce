import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/" state={{ hayUsuario: "No existe usuario" }} />;
    }

    return <Outlet />;
};
