import { createContext, useContext } from "react";
import { useToast } from "../components/Toast/useToast";

export const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const toast = useToast();
    return <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>;
};

export const useToastContext = () => useContext(ToastContext);
