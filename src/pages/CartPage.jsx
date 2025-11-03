import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { CartContext } from "../context/CartContext";

export const CartPage = () => {
    const { cart, removeItem, clearCart } = useContext(CartContext);

    // Calcular totales (useMemo para optimizar)
    const { totalItems, totalPrice } = useMemo(() => {
        const items = cart?.items || [];
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        return { totalItems, totalPrice };
    }, [cart]);

    // Si el carrito está vacío
    if (!cart?.items?.length) {
        return (
            <div className="perfect-center flex-col gap-4 p-8">
                <h1 className="text-2xl font-semibold text-brand-700">🛒 Tu carrito está vacío</h1>
                <Link to="/products">
                    <Button variant="primary">Ir a productos</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-8 max-w-5xl mx-auto">
            <h1 className="text-2xl font-semibold text-brand-700">🛍️ Carrito de compras</h1>

            {/* Lista de productos */}
            <div className="flex flex-col gap-4">
                {cart.items.map((item) => (
                    <div key={item._id} className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-4">
                            <img
                                src={item.images?.[0]}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg"
                            />
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

                        <Button variant="secondary" onClick={() => removeItem(item._id)}>
                            Eliminar
                        </Button>
                    </div>
                ))}
            </div>

            {/* Totales y acciones */}
            <div className="flex justify-between items-center border-t pt-4">
                <div>
                    <p className="font-medium text-lg">Total artículos: {totalItems}</p>
                    <p className="text-xl font-bold text-brand-700">Total: {totalPrice.toFixed(2)} €</p>
                </div>

                <div className="flex gap-3">
                    <Link to="/products">
                        <Button variant="secondary">Seguir comprando</Button>
                    </Link>
                    <Button variant="danger" onClick={clearCart}>
                        Vaciar carrito
                    </Button>
                </div>
            </div>
        </div>
    );
};
