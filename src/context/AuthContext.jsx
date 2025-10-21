import { createContext, useEffect, useState } from "react";
import { getUserFromLocalStorage } from "../core/auth/auth.service";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const user = getUserFromLocalStorage();
        setUser(user);
    }, []);

    return <AuthContext value={{ user, setUser }}>{children}</AuthContext>;
};
