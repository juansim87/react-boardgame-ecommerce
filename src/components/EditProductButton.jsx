import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const EditProductButton = ({ id }) => {
    const navigate = useNavigate();

    const handleEdit = (event) => {
        event.preventDefault();
        event?.stopPropagation?.();
        navigate(`/admin/products/edit?id=${id}`);
    };

    return (
        <Button variant="secondary" onClick={handleEdit} title="Editar">
            Editar 📝
        </Button>
    );
};
