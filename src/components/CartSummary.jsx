import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { QuantitySelector } from "./QuantitySelector";

export const CartSummary = ({ item, index }) => {
    const { cart } = useContext(CartContext);
    return (
        <div
            className={`flex items-center justify-between pb-3 gap-4 ${
                index !== cart.items.length - 1 ? "border-b" : ""
            }`}
        >
            <div className="flex items-center gap-4">
                <img src={item.images?.[0]} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600 text-sm">
                        {item.quantity} × {item.price.toFixed(2)} €
                    </p>
                    <p className="text-brand-600 font-semibold">
                        {(item.quantity * item.price).toFixed(2)} €
                    </p>
                </div>
            </div>
            <QuantitySelector item={item} />
        </div>
    );
};
