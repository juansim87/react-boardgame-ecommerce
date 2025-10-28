import { useContext } from "react";
import { CATEGORY_LABEL } from "../constants/categories";
import { ProductsContext } from "../context/ProductsContext";
import { Button } from "./Button";

export const CategoryChips = ({ selected = [], onChange }) => {
    const { categories } = useContext(ProductsContext);

    const toggle = (slug) => {
        const next = selected.includes(slug)
            ? selected.filter((selection) => selection !== slug)
            : [...selected, slug];
        onChange(next);
    };

    const labelFor = (slug) =>
        CATEGORY_LABEL[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

    const sorted = (categories ?? []).slice().sort((a, b) => {
        const la = labelFor(a);
        const lb = labelFor(b);
        return la.localeCompare(lb, "es", { sensitivity: "base" });
    });

    return (
        <div className="perfect-center gap-2">
            <div className="flex items-center gap-2">
                {sorted.map((slug) => (
                    <Button
                        key={slug}
                        onClick={() => toggle(slug)}
                        variant={selected.includes(slug) ? "primary" : "outline"}
                        aria-pressed={selected.includes(slug)}
                    >
                        {labelFor(slug)}
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
