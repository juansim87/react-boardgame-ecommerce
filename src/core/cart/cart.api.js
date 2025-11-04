import { api } from "../http/axios";

export const getCartApi = async () => {
    try {
        const response = await api.get("/carts");
        return response.data;
    } catch (err) {
        throw err.status;
    }
};
