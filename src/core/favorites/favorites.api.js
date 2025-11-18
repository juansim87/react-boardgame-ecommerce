import { api } from "../http/axios";

//Get user's favorites list

export const getFavoritesApi = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}/favoritos`);
        return response.data.favoritos || [];
    } catch (err) {
        console.error(" Error GET favoritos:", err);
        return [];
    }
};

//Add favorite

export const addFavoriteApi = async (userId, productId) => {
    const safeUserId = userId?.toString();
    const safeProductId = encodeURIComponent(productId?.toString() || "");
    const url = `/users/${safeUserId}/favoritos/${safeProductId}`;

    console.log("[FAV API] POST URL →", url);

    try {
        const response = await api.post(url);
        console.log("[FAV API] POST favorito →", response.data);
        return response.data.user?.favoritos || [];
    } catch (err) {
        console.error("[FAV API] Error POST favoritos:", {
            message: err?.message,
            status: err?.response?.status,
            data: err?.response?.data,
            url,
        });
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
