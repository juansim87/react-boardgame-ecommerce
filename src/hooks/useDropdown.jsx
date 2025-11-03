import { useEffect, useRef, useState } from "react";

export const useDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onDocClick = (e) => {
            if (isOpen && ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        const onKey = (e) => {
            if (e.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("click", onDocClick);
        document.addEventListener("keydown", onKey);

        return () => {
            document.removeEventListener("click", onDocClick);
            document.removeEventListener("keydown", onKey);
        };
    }, [isOpen]);

    return { isOpen, setIsOpen, ref };
};
