import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ProductsContext } from "../context/ProductsContext";

export const EditProductPage = () => {
    const { user } = useContext(AuthContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const { products } = useContext(ProductsContext);

    const id = searchParams.get("id");

    console.log("Productos:", products);
    if (!user || user.role !== "admin") return <p>Acceso denegado</p>;

    return id ? (
        <p>Editar producto:{id}</p>
    ) : (
        <div>
            <h2>Listado de productos</h2>
            <ul>
                {products
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((product) => (
                        <li key={product._id}>
                            <button onClick={() => setSearchParams({ id: product._id })}>
                                {product.name}
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};
