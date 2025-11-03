import { api } from "../http/axios";

export const getCartApi = async () => {
    try {
        const response = await api.get("/carts");
        return response.data;
    } catch (err) {
        throw err.status;
    }
};

// export const getCartByIdApi = async (id) => {
//     try {
//         const response = await api.get(`/carts/${id}`);
//         return response.data;
//     } catch (err) {
//         console.error("Error al obtener carrito por ID", err);
//         throw err;
//     }
// };

export const createCartApi = async () => {
    const response = await api.post("/carts");
};
