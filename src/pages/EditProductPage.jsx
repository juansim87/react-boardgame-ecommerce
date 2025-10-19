import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { EditProductForm } from "../components/EditProductForm";
import { AuthContext } from "../context/AuthContext";
import { ProductsContext } from "../context/ProductsContext";

export const EditProductPage = () => {
    const { user } = useContext(AuthContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const { products } = useContext(ProductsContext);

    const id = searchParams.get("id");

    if (!user || user.role !== "admin") return <p>Acceso denegado</p>;

    return id ? (
        <div>
            <EditProductForm />
        </div>
    ) : (
        <div>
            <h2>Listado de productos</h2>
            <ul className="w-100 flex flex-col justify-center gap-4">
                {products
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((product) => (
                        <li key={product._id} className="w-full flex justify-between items-center">
                            {product.name}
                            <Button onClick={() => setSearchParams({ id: product._id })}>📝​</Button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};
