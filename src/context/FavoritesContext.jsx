// src/context/FavoritesContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { addFavoriteApi, getFavoritesApi, removeFavoriteApi } from "../core/favorites/favorites.api";
import { AuthContext } from "./AuthContext";

export const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);

    const getUserId = () => user?._id || user?.id || null;

    useEffect(() => {
        const userId = getUserId();

        if (!userId) {
            setFavorites([]);
            return;
        }

        const load = async () => {
            const favs = await getFavoritesApi(userId);
            setFavorites(favs);
        };

        load();
    }, [user]);

    const addFavorite = async (productId) => {
        const userId = getUserId();
        if (!userId) {
            console.warn("[FAV CTX] Intento de añadir favorito sin usuario");
            return;
        }

        const updated = await addFavoriteApi(userId, productId);
        if (updated) {
            setFavorites(updated);
        }
    };

    const removeFavorite = async (productId) => {
        const userId = getUserId();
        if (!userId) {
            console.warn("[FAV CTX] Intento fallido de eliminar favorito sin usuario");
            return;
        }
        console.log("[FAV CTX] DELETE favorito:", { userId, productId });

        const updated = await removeFavoriteApi(userId, productId);
        if (updated) {
            setFavorites(updated);
        }
    };

    const isFavorite = (productId) => favorites.some((p) => p._id === productId || p.id === productId);

    return (
        <FavoritesContext
            value={{
                favorites,
                addFavorite,
                removeFavorite,
                isFavorite,
            }}
        >
            {children}
        </FavoritesContext>
    );
};
