import { api } from "../http/axios";

export const getUsersApi = async () => {
    try {
        const response = await api.get(`/users`);
        console.log("Api de usuarios", response.data);
        return response.data;
    } catch (err) {
        console.error(" Error GET users:", err);
        return [];
    }
};

export const removeUserApi = async (userId) => {
    try {
        const response = await api.delete(`/users/${userId}`);
        console.log("Usuario eliminado", response.data);
        return response.data;
    } catch (err) {
        console.log("Error al eliminar usuario", err);
        return null;
    }
};
