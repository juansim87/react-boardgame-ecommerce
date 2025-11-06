import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export const UserPage = () => {
    const { user } = useContext(AuthContext);
    const { cart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    // Calcular total de artículos del carrito
    const totalItems = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    const cartPreview = cart?.items?.slice(0, 3) || []; // Mostrar solo los 3 primeros

    return (
        <div className="perfect-center flex-col gap-6 p-6">
            {/* 🧍 Sección de perfil básico */}
            <section className="w-full max-w-3xl bg-white border rounded-2xl shadow-md p-6 flex flex-col items-center gap-4">
                <h2 className="text-xl font-semibold text-brand-700">👤 Mi cuenta</h2>
                <div className="w-32 h-32 rounded-full overflow-hidden border">
                    <Avatar src={user?.avatar} name={user?.username || user?.name} sizeClass="w-32 h-32" />
                </div>
                <h3 className="text-lg font-medium">{user?.name}</h3>
                <p className="text-gray-600">{user?.email}</p>
                <Button onClick={() => navigate("/user/profile")} variant="primary">
                    Ver perfil completo
                </Button>
            </section>

            {/* 🛒 Sección de resumen del carrito */}
            <section className="w-full max-w-3xl bg-white border rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-brand-700 mb-4">🛒 Carrito de compras</h2>

                {totalItems === 0 ? (
                    <p className="text-gray-500">Tu carrito está vacío.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {cartPreview.map((item) => (
                            <div key={item._id} className="flex items-center gap-4 border-b pb-2">
                                <img
                                    src={item.images?.[0]}
                                    alt={item.name}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-600">{item.price.toFixed(2)} €</p>
                                </div>
                                <div className="flex items-center gap 2">
                                    <Button variant="secondary" onClick={() => decreaseQuantity(item._id)}>
                                        −
                                    </Button>
                                    <span className="w-6 text-center">{item.quantity}</span>
                                    <Button variant="secondary" onClick={() => increaseQuantity(item._id)}>
                                        +
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {cart.items.length > 3 && (
                            <p className="text-gray-400 text-sm">...y {cart.items.length - 3} más.</p>
                        )}

                        <div className="flex justify-between items-center mt-4">
                            <p className="font-semibold">Total artículos: {totalItems}</p>
                            <Link to="/user/cart">
                                <Button variant="primary">Ver carrito completo</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </section>

            {/* ❤️ Sección de favoritos */}
            <section className="w-full max-w-3xl bg-white border rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-brand-700 mb-4">❤️ Favoritos</h2>

                <p className="text-gray-500">
                    Aún no tienes productos favoritos. ¡Haz clic en el corazón de un producto para guardarlo
                    aquí!
                </p>
                {/* Cuando tengas la lógica, aquí mapearás los favoritos */}
            </section>
        </div>
    );
};
