import { useContext, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "../components/Card";
import { CategoryChips } from "../components/CategoryChips";
import { ProductsContext } from "../context/ProductsContext";

export const ProductsPage = () => {
    const { products } = useContext(ProductsContext);
    const [selected, setSelected] = useState([]);
    const [searchParams] = useSearchParams();

    const q = (searchParams.get("q") || "").trim().toLowerCase();

    const filtered = useMemo(() => {
        const byText = (product) =>
            !q ||
            (product.name && product.name.toLowerCase().includes(q)) ||
            (product.description && product.description.toLowerCase().includes(q));

        const byCats = (product) => {
            if (!selected.length) return true;
            const productCategories = Array.isArray(product.category) ? product.category : [];
            return selected.every((category) => productCategories.includes(category));
        };

        return products.filter((product) => byText(product) && byCats(product));
    }, [products, q, selected]);

    return (
        <div className="perfect-center justify-start min-h-dvh bg-brand-200 p-12 gap-8">
            <h1>Resultados</h1>
            <CategoryChips selected={selected} onChange={setSelected} />
            {products.length <= 0 ? (
                <p>No hay productos disponibles</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {filtered
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((product) => (
                            <Card key={product._id} product={product} />
                        ))}
                </div>
            )}
        </div>
    );
};
