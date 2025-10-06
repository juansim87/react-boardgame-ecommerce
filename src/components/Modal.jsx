import { useEffect } from "react";

export const Modal = ({ open, onClose, title = "Aviso", children, actions }) => {
    useEffect(() => {
        const onEsc = (event) => event.key === "Escape" && onClose?.();
        if (open) document.addEventListener("keydown", onEsc);
        return () => document.removeEventListener("keydown", onEsc);
    }, [open, onClose]);

    if (!open) return null;

    return <div></div>;
};
