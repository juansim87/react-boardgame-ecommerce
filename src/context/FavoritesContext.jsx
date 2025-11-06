import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);

    console.log("Context montado");

    useEffect(() => {
        console.log("Usuario detectado", user);
    }, [user]);
    return <FavoritesContext value={{ favorites, setFavorites }}>{children}</FavoritesContext>;
};
