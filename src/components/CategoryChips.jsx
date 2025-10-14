import { CATEGORIES } from "../constants/categories";
import { Button } from "./Button";

export const CategoryChips = ({ selected = [], onChange }) => {
    const toggle = (slug) => {
        const next = selected.includes(slug) ? selected.filter((s) => s !== slug) : [...selected, slug];
        onChange(next);
    };

    return (
        <div className="perfect-center gap-4">
            <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(({ slug, label, description }) => {
                    const active = selected.includes(slug);
                    return (
                        <Button
                            key={slug}
                            type="button"
                            aria-pressed={active}
                            title={description}
                            onClick={() => toggle(slug)}
                            variant="primary"
                        >
                            {label}
                        </Button>
                    );
                })}
            </div>
            {selected.length > 0 && (
                <Button
                    type="button"
                    onClick={() => onChange([])}
                    className="px-3 py-1 rounded-2xl border bg-white"
                >
                    Limpiar
                </Button>
            )}
        </div>
    );
};
