import { useState } from "react";

/**
 * Hook personalizado para gestión global de notificaciones Toast
 *
 * @returns {Object} Estado de toasts y métodos de gestión
 *
 * @example
 * const toast = useToast();
 *
 * const handleSuccess = () => {
 *   toast.success('¡Operación completada!');
 * };
 *
 * return (
 *   <div>
 *     <button onClick={handleSuccess}>Mostrar éxito</button>
 *     <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
 *   </div>
 * );
 */
export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = "info", options = {}) => {
        const id = Date.now() + Math.random();
        const toast = {
            id,
            message,
            type,
            position: "top-right",
            ...options,
        };

        setToasts((prev) => [...prev, toast]);

        const duration = options.duration !== undefined ? options.duration : 4000;
        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const clearAllToasts = () => {
        setToasts([]);
    };

    return {
        toasts,
        addToast,
        removeToast,
        clearAllToasts,
        success: (message, options) => addToast(message, "success", options),
        error: (message, options) => addToast(message, "error", options),
        warning: (message, options) => addToast(message, "warning", options),
        info: (message, options) => addToast(message, "info", options),
    };
};
