import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "../components/Card";
import { CategoryChips } from "../components/CategoryChips";
import { CATEGORY_SLUGS } from "../constants/categories";
import { api } from "../core/http/axios";

export const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const q = (searchParams.get("q") || "").trim().toLowerCase();

    const cats = searchParams.getAll("cat").filter((c) => CATEGORY_SLUGS.includes(c));

    useEffect(() => {
        api.get("/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const handleCatsChange = (nextCats) => {
        const next = new URLSearchParams(searchParams);
        next.delete("cat");
        nextCats.forEach((c) => next.append("cat", c));
        setSearchParams(next);
    };

    const results = useMemo(() => {
        const byText = (p) =>
            !q ||
            (p.name && p.name.toLowerCase().includes(q)) ||
            (p.description && p.description.toLowerCase().includes(q));

        const byCats = (p) => {
            if (!cats.length) return true;
            const prodCats = Array.isArray(p.category) ? p.category : [];
            return cats.every((cat) => prodCats.includes(cat));
        };

        const filtered = products.filter((p) => byText(p) && byCats(p));

        return [...filtered].sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));
    }, [products, q, cats]);
    return (
        <div className="perfect-center justify-start min-h-dvh bg-brand-200 p-12 gap-8">
            <h1>Resultados {q ? `para “${q}”` : ""}</h1>

            <CategoryChips selected={cats} onChange={handleCatsChange} />

            {results.length === 0 ? (
                <p>No se han encontrado productos{q ? ` para “${q}”` : ""}.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {results.map((product) => (
                        <Card key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};
