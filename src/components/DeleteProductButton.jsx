import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { deleteProductApi } from "../core/products/products.api";
import { Button } from "./Button";

export const DeleteProductButton = ({ id, name }) => {
    const { removeProduct } = useContext(ProductsContext);
    const [loading, setLoading] = useState(false);

    const handleDelete = async (event) => {
        event.preventDefault();

        const ok = window.confirm(`Vas a borrar "${name || id}". Esta acción es permanente. ¿Continuar?`);
        if (!ok) return;

        try {
            setLoading(true);
            await deleteProductApi(id);
            removeProduct(id);
            alert(`"${name || id}" borrado correctamente.`);
        } catch (error) {
            const status = error?.response?.status;

            if (status === 404) {
                console.warn("El producto ya no existe en la API, limpiando localmente...");
                removeProduct(id); // se elimina igual del contexto y localStorage
                alert(`"${name || id}" ya no existía en la API, se ha eliminado localmente.`);
            } else {
                console.error("Error al borrar el producto:", error);
                alert("No se pudo eliminar el producto. Revisa la consola.");
            }
        }
    };

    return (
        <Button variant="danger" onClick={handleDelete} disabled={loading} title="Borrar producto">
            {loading ? "..." : "Eliminar 🗑️"}
        </Button>
    );
};
