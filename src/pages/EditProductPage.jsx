import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";

import { DeleteProductButton } from "../components/DeleteProductButton";
import { EditProductButton } from "../components/EditProductButton";
import { EditProductForm } from "../components/EditProductForm";
import { AuthContext } from "../context/AuthContext";
import { ProductsContext } from "../context/ProductsContext";

export const EditProductPage = () => {
    const { user } = useContext(AuthContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const { products } = useContext(ProductsContext);
    const navigate = useNavigate();

    const id = searchParams.get("id");

    if (!user || user.role !== "admin") return <p>Acceso denegado</p>;

    return id ? (
        <div>
            <EditProductForm />
        </div>
    ) : (
        <div className="perfect-center gap-5">
            <h2>Listado de productos</h2>
            <Button variant="primary" onClick={() => navigate("/admin/products/create")}>
                Añadir producto ➕​
            </Button>
            <ul className="w-120 flex flex-col justify-center gap-3">
                {products
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((product) => (
                        <li key={product._id} className="w-full flex justify-between items-center">
                            {product.name}
                            <div className="flex gap-2">
                                <EditProductButton id={product._id} />
                                <DeleteProductButton id={product._id} name={product.name} />
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};
