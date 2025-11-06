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

            if (authData) {
                saveTokenInLocalStorage(authData.token);
                saveUserInLocalStorage(authData.user);
                setUser(authData.user);

                const redirectPath = localStorage.getItem("redirectAfterLogin");

                if (redirectPath) {
                    navigate(redirectPath);
                    localStorage.removeItem("redirectAfterLogin");
                } else {
                    navigate("/user");
                }
            }
        },
        [navigate, setUser]
    );

    const logout = async () => {
        const logoutResponse = await logoutApi();

        if (logoutResponse?.logout) {
            removeUserFromLocalStorage();
            removeTokenFromLocalStorage();
            localStorage.removeItem("redirectAfterLogin");
            setUser(false);
            navigate("/");
        }
    };

    const register = useCallback(
        async (user) => {
            const authData = await registerApi(user);

            if (authData) {
                saveTokenInLocalStorage(authData.token);
                saveUserInLocalStorage(authData.user);
                setUser(authData.user);
                navigate("/user");
            }
        },
        [navigate, setUser]
    );

    const editProfile = useCallback(
        async (userData) => {
            const userProfile = await profileEditApi(user.id, userData);

            if (userProfile) {
                saveUserInLocalStorage(userProfile);
                setUser(userProfile);
                navigate("/user/profile");
            }
        },
        [navigate, setUser]
    );

    const getProfile = useCallback(async () => {
        const { user } = await getProfileApi();

        if (user) {
            console.log("La api dice que hay usuario", user);
        } else {
            console.log("NO hay usuario");
        }
    }, []);

    return { login, logout, register, getProfile, editProfile };
};
