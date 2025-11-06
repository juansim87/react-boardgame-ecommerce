import { api } from "../http/axios";

//Get user's favorites list

export const getFavoritesApi = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}/favoritos`);
        console.log("[FAV API] GET favoritos →", response.data);
        return response.data.favoritos || [];
    } catch (err) {
        console.error("[FAV API], Error GET favoritos:", err);
        return [];
    }
};

//Add favorite

export const addFavoriteApi = async (userId, productId) => {
    try {
        const response = await api.post(`/users/${userId}/favorites/${productId}`);
        console.log("[FAV API] GET favoritos →", response.data);
        return response.data.user?.favoritos || [];
    } catch (err) {
        console.error("[FAV API] Error POST favoritos:", err);
        return null;
    }
};

//Remove favorite

export const removeFavoriteApi = async (userId, productId) => {
    try {
        const response = await api.delete(`/users/${userId}/favoritos/${productId}`);
        console.log("[FAV API] DELETE favorito →", response.data);
        return response.data.user?.favoritos || [];
    } catch (err) {
        console.error("[FAV API] Error DELETE favorito:", err);
        return null;
    }
};
