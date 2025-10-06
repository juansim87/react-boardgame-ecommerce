import { useEffect, useState } from "react";
import { CTASignUp } from "../components/CTASignUp";
import { ProductCarousel } from "../components/ProductCarousel";
import { api } from "../core/http/axios";

export const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <div>
            <CTASignUp />
            <ProductCarousel title="Novedades" products={products} />
            <ProductCarousel title="Más vendidos" products={products} />
            <ProductCarousel title="Populares" products={products} />
        </div>
    );
};
