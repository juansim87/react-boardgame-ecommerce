import { api } from "../http/axios";

export const getProductsApi = async () => {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (error) {
        console.error("Error al Obtener Productos", error);
        throw error;
    }
};

export const getProductsByIdApi = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al Obtener Categorias");
        throw error;
    }
};

export const editProductApi = async (id, data) => {
    try {
        const response = await api.patch(`/products/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error al editar producto", error);
        throw error;
    }
};

export const createProductApi = async (product) => {
    try {
        const response = await api.post("/products", product);
        return response.data;
    } catch (error) {
        const status = error?.response?.status;
        const data = error?.response?.data;
        console.error("[API ERROR]", status, data);
        throw error;
    }
};

export const deleteProductApi = async (id) => {
    if (!id) throw new Error("ID requerido");
    const { data } = await api.delete(`/products/${id}`);
    return data;
};

export const getCategoriesApi = async () => {
    try {
        const response = await api.get("/products/categories");
        return response.data;
    } catch (error) {
        console.error("Error al Obtener Categorias", error);
        throw error;
    }
};
