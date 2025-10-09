import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getProfileApi, loginApi, logoutApi, registerApi } from "./auth.api";
import {
    removeTokenFromLocalStorage,
    removeUserFromLocalStorage,
    saveTokenInLocalStorage,
    saveUserInLocalStorage,
} from "./auth.service";

export const useAuth = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const login = useCallback(
        async ({ email, password }) => {
            // Enviar a la API de autenticación
            console.log(`Iniciando sesión con email: ${email} y password: ${password}`);

            const authData = await loginApi({ email, password });

            if (authData) {
                saveTokenInLocalStorage(authData.token);
                saveUserInLocalStorage(authData.user);
                setUser(authData.user);
                navigate("/");
            }

            // Si la API nos dice error, mostramos un mensaje de error
        },
        [navigate, setUser]
    );

    const logout = async () => {
        // Lógica de cierre de sesión
        console.log("Cerrando sesión");

        const logoutResponse = await logoutApi();

        if (logoutResponse?.logout) {
            console.log("logout del hook", logoutResponse);
            removeUserFromLocalStorage();
            removeTokenFromLocalStorage();
            setUser(null);
            navigate("/");
        }
    };

    const register = useCallback(
        async (user) => {
            // Enviar a la API de autenticación
            console.log(`Registrando al usuario: ${user.email} y password: ${user.password}`);

            const authData = await registerApi(user);

            if (authData) {
                saveTokenInLocalStorage(authData.token);
                saveUserInLocalStorage(authData.user);
                setUser(authData.user);
                navigate("/");
            }

            // Si la API nos dice error, mostramos un mensaje de error
        },
        [navigate, setUser]
    );

    const getProfile = useCallback(async () => {
        // Lógica para obtener el usuario actual
        console.log("Obteniendo usuario actual");

        const { user } = await getProfileApi();

        if (user) {
            console.log("La api dice que hay usuario", user);
        } else {
            console.log("NO hay usuario");
        }
    }, []);

    return { login, logout, register, getProfile };
};
