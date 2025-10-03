import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { api } from "../core/http/axios";

export const SearchPage = () => {
    const [products, setProducts] = useState([]);

    const orderedProducts = [...products].sort((a, b) =>
        a.name.localeCompare(b.name, "es", { sensivity: "base" })
    );

    useEffect(() => {
        api.get("/products")
            .then((response) => {
                console.log("Products data:", response.data);
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    return (
        <div className="perfect-center min-h-dvh bg-brand-200 p-12 gap-8">
            <h1>Página de productos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {orderedProducts.map((product) => (
                    <Card key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};
