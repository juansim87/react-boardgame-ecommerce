import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { Button } from "./Button";

const CATEGORIES_TRANSLATIONS = {
    accessories: "Accesorios para juegos",
    family: "Juegos familiares",
    "hidden-role": "Juegos de rol oculto",
    strategy: "Juegos de estrategia",
    party: "Juegos de fiesta",
    cooperative: "Juegos cooperativos",
    "deck-building": "Construcción de mazos",
};

export const CategoryChips = ({ selected = [], onChange }) => {
    const { categories } = useContext(ProductsContext);

    const toggle = (slug) => {
        const next = selected.includes(slug)
            ? selected.filter((selection) => selection !== slug)
            : [...selected, slug];
        onChange(next);
    };

    return (
        <div className="perfect-center gap-2">
            <div className="flex items-center gap-2 ">
                {categories?.length > 0 &&
                    categories.map((cat) => (
                        <Button
                            key={cat}
                            onClick={() => toggle(cat)}
                            variant={selected.includes(cat) ? "primary" : "outline"}
                        >
                            {CATEGORIES_TRANSLATIONS[cat] ??
                                cat.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())}
                        </Button>
                    ))}
            </div>
            {selected.length > 0 && (
                <Button variant="secondary" onClick={() => onChange([])}>
                    Limpiar
                </Button>
            )}
        </div>
    );
};
