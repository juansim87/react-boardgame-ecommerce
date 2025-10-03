import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "../components/Card";
import { api } from "../core/http/axios";

export const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const q = (searchParams.get("q") || "").trim().toLowerCase();

    const orderedProducts = [...products].sort((a, b) =>
        a.name.localeCompare(b.name, "es", { sensitivity: "base" })
    );

    useEffect(() => {
        api.get("/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const results = useMemo(() => {
        const filtered = q ? products.filter((p) => p.name?.toLowerCase().includes(q)) : products;

        return [...filtered].sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));
    }, [products, q]);

    return (
        <div className="perfect-center min-h-dvh bg-brand-200 p-12 gap-8">
            <h1>Resultados {q ? `para “${q}”` : ""}</h1>

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
