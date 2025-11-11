import { useEffect, useState } from "react";

const FONT_SIZE_MAP = {
    "w-12": "text-base",
    "w-20": "text-2xl",
    "w-32": "text-4xl",
};

const COLORS = [
    "bg-brand-400",
    "bg-emerald-500",
    "bg-sky-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-violet-500",
    "bg-lime-500",
    "bg-orange-500",
];

const getColorByInitial = (char) => {
    if (!char) return COLORS[0];
    const index = char.charCodeAt(0) % COLORS.length;
    return COLORS[index];
};

const isValidSrc = (src) =>
    typeof src === "string" && src.trim() !== "" && src !== "null" && src !== "undefined";

export const Avatar = ({ src, name = "", sizeClass = "w-12 h-12" }) => {
    const initial = (name?.trim()?.charAt(0) || "?").toUpperCase();
    const [showImage, setShowImage] = useState(isValidSrc(src));

    useEffect(() => {
        setShowImage(isValidSrc(src));
    }, [src]);

    const matchedKey = Object.keys(FONT_SIZE_MAP).find((key) => sizeClass.includes(key));
    const textSize = FONT_SIZE_MAP[matchedKey] || "text-lg";
    const bgColor = getColorByInitial(initial);

    if (showImage) {
        return (
            <img
                src={src}
                alt={name}
                className={`${sizeClass} object-cover rounded-full border border-gray-300 bg-white`}
                onError={() => setShowImage(false)}
                draggable={false}
            />
        );
    }

    // Fallback tipo Gmail con color dinámico
    return (
        <div
            className={`${sizeClass} flex items-center justify-center rounded-full border border-gray-300 ${bgColor} text-white font-bold select-none`}
            aria-label={name}
        >
            <span className={textSize}>{initial}</span>
        </div>
    );
};
