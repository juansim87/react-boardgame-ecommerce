import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { CTASignUp } from "../components/CTASignUp";
import { ProductCarousel } from "../components/ProductCarousel";
import { AuthContext } from "../context/AuthContext";
import { ProductsContext } from "../context/ProductsContext";

export const HomePage = () => {
    const { products } = useContext(ProductsContext);
    const { user } = useContext(AuthContext);

    return (
        <div className="perfect-center gap-4">
            {!user ? <CTASignUp /> : <h1>Bienvenido a Ludokracia, {user.username}</h1>}
            <Link to="/products">
                <Button variant="primary" role="button">
                    Todos nuestros productos
                </Button>
            </Link>
            <ProductCarousel title="Novedades" products={products} />
            {/* <ProductCarousel title="Populares" products={products} /> */}
        </div>
    );
};
