import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button } from "./Button";

export const QuantitySelector = ({ item }) => {
    const { increaseQuantity, decreaseQuantity, removeItem } = useContext(CartContext);
    return (
        <div className="flex gap-2">
            <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => decreaseQuantity(item._id)}>
                    −
                </Button>
                <span className="w-6 text-center">{item.quantity}</span>
                <Button variant="secondary" onClick={() => increaseQuantity(item._id)}>
                    +
                </Button>
            </div>
            <Button variant="danger" onClick={() => removeItem(item._id)}>
                Eliminar
            </Button>
        </div>
    );
};
