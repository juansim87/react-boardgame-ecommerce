import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const EditProductButton = ({ id }) => {
    const navigate = useNavigate();

    const handleEdit = (event) => {
        event?.stopPropagation?.();
        navigate(`/admin/products/edit?id=${id}`);
    };

    console.log("[EditProductButton] id prop:", id);
    return (
        <Button variant="secondary" onClick={handleEdit}>
            Editar Producto
        </Button>
    );
};
