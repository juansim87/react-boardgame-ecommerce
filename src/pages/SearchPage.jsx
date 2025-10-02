import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { api } from "../core/http/axios";

export const SearchPage = () => {
    const [products, setProducts] = useState([]);

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
        <div className="min-h-dvh bg-brand-200 p-4 ">
            <h1>Página de productos</h1>
            <div className="grid grid-cols-1 gap-1 bg-brand-300 gap-4">
                {products.map((product) => (
                    <Card key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};
