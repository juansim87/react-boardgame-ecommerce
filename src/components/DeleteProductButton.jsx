import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { deleteProductApi } from "../core/products/products.api";
import { Button } from "./Button";

export const DeleteProductButton = ({ id, name }) => {
    const { removeProduct } = useContext(ProductsContext);
    const [loading, setLoading] = useState(false);

    const onClick = async (event) => {
        event.preventDefault();

        const ok = window.confirm(`Vas a borrar "${name || id}". Esta acción es permanente. ¿Continuar?`);
        if (!ok) return;

        try {
            setLoading(true);
            await deleteProductApi(id);
            removeProduct(id);
            alert(`"${name || id}" borrado correctamente.`);
        } catch (err) {
            console.error(err);
            alert("Error al borrar el producto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button variant="danger" onClick={onClick} disabled={loading} title="Borrar producto">
            {loading ? "..." : "Eliminar 🗑️"}
        </Button>
    );
};
