import { useSearchParams } from "react-router-dom";
import { Button } from "./Button";

export const EditProductButton = ({ id }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleEdit = (event) => {
        event.preventDefault();
        event?.stopPropagation?.();
        setSearchParams({ id });
    };

    return (
        <Button variant="secondary" onClick={handleEdit} title="Editar">
            Editar 📝
        </Button>
    );
};
