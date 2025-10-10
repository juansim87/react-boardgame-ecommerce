import { useContext, useEffect, useState } from "react";
import { CTASignUp } from "../components/CTASignUp";
import { ProductCarousel } from "../components/ProductCarousel";
import { AuthContext } from "../context/AuthContext";
import { api } from "../core/http/axios";

export const HomePage = () => {
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        api.get("/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <div>
            {!user ? <CTASignUp /> : <h1>Bienvenido a Ludokracia, {user.username}</h1>}
            <ProductCarousel title="Novedades" products={products} />
            <ProductCarousel title="Más vendidos" products={products} />
            <ProductCarousel title="Populares" products={products} />
        </div>
    );
};
