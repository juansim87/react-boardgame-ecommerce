import { createContext, useContext, useEffect, useState } from "react";
import { addFavoriteApi, getFavoritesApi } from "../core/favorites/favorites.api";
import { AuthContext } from "./AuthContext";

export const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);

    // Load favorites when loging
    useEffect(() => {
        const loadFavorites = async () => {
            if (!user?._id) {
                console.log("[FAV CTX] No hay usuario → favoritos = []");
                setFavorites([]);
                return;
            }

            console.log("[FAV CTX] Cargando favoritos del usuario:", user._id);
            const favs = await getFavoritesApi(user._id);
            setFavorites(favs);
        };

        loadFavorites();
    }, [user]);

    //Add favorite

    const addFavorite = async (productId) => {
        if (!user?._id) {
            console.warn("Intento fallido de añadir favorito sin usuario");
            return;
        }

        console.log("Añadiendo favorito");

        const updatedFavs = await addFavoriteApi(user._id, productId);

        if (updatedFavs) {
            console.log("Favoritos actualizados", updated);
            setFavorites(updatedFavs);
        }
    };

    //Remove favorite
    const removeFavorite = async (productId) => {
        if (!user?._id) {
            console.warn("Intento fallido de eliminar favorito sin usuario");
            return;
        }

        const updatedFavs = await addFavoriteApi(user._id, productId);
        if (updatedFavs) {
            console.log("Favoritos actualizados (DELETE)", updatedFavs);
            setFavorites(updatedFavs);
        }
    };

    const isFavorite = (productId) => {
        return favorites.map((p) => p.id === productId || p._id === productId);
    };

    return (
        <FavoritesContext value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext>
    );
};
