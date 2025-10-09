import { api } from "../http/axios";

export const loginApi = async (user) => {
    try {
        console.log(`loginApi: ${user.email} y password: ${user.password}`);
        const response = await api.post("/auth/login", user);
        console.log("respuesta de la api", response);

        return response.data;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
    }
};

export const registerApi = async (user) => {
    try {
        console.log(
            `registerApi: ${user.email} y password: ${user.password}, nombre: ${user.name} role: ${user.role}`
        );
        const response = await api.post("/auth/register", user);
        console.log("respuesta de la api", response);

        return response.data;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw error;
    }
};

export const logoutApi = async () => {
    try {
        console.log("logoutApi");
        const response = await api.post("/auth/logout");
        console.log("respuesta de la api", response);

        return response.data;
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        throw error;
    }
};

export const getProfileApi = async () => {
    try {
        console.log("getProfileApi");
        const response = await api.get("/auth/me");
        console.log("respuesta de la api", response);

        return response.data;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        throw error;
    }
};
