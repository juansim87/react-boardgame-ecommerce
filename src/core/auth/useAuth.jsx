import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getProfileApi, loginApi, logoutApi, profileEditApi, registerApi } from "./auth.api";
import {
    removeTokenFromLocalStorage,
    removeUserFromLocalStorage,
    saveTokenInLocalStorage,
    saveUserInLocalStorage,
} from "./auth.service";

export const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const login = useCallback(
        async ({ email, password }) => {
            const authData = await loginApi({ email, password });

            console.log("AuthData", authData);

            if (authData) {
                saveTokenInLocalStorage(authData.token);
                saveUserInLocalStorage(authData.user);
                setUser(authData.user);
                navigate("/");
            }
        },
        [navigate, user]
    );

    const logout = async () => {
        console.log("Cerrando sesión");

        const logoutResponse = await logoutApi();

        if (logoutResponse?.logout) {
            console.log("logout del hook", logoutResponse);
            removeUserFromLocalStorage();
            removeTokenFromLocalStorage();
            setUser(false);
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

    const editProfile = useCallback(
        async (userData) => {
            // Enviar a la API de autenticación

            const userProfile = await profileEditApi(user.id, userData);

            console.log("Perfil de usuario:", userProfile);

            if (userProfile) {
                saveUserInLocalStorage(userProfile);
                setUser(userProfile);
                navigate("/profile");
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

    return { login, logout, register, getProfile, editProfile };
};
