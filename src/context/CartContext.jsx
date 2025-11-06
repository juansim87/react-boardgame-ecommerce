import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
    getCartFromLocalStorage,
    removeCartFromLocalStorage,
    saveCartInLocalStorage,
} from "../core/cart/cart.service";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ id: null, items: [] });
    const { user } = useContext(AuthContext);

    //1. Cargar carrito según usuario o invitado
    useEffect(() => {
        const uid = user?._id || user?.id || "guest";

        const storedCart = getCartFromLocalStorage(uid);

        if (storedCart?.items) {
            setCart(storedCart);
        } else {
            setCart({ id: uid, items: [] });
        }
    }, [user]);

    //2. Guardar carrito (invitado y usuarios)
    useEffect(() => {
        const uid = user?._id || user?.id || "guest";

        if (cart?.items?.length > 0) {
            saveCartInLocalStorage(cart, uid);
        } else {
            removeCartFromLocalStorage(uid);
        }
    }, [cart, user]);

    //3. Añadir producto
    const addItem = (product) => {
        if (!product || !product._id) return;

        setCart((prevCart) => {
            const existingItem = prevCart.items.find((i) => i._id === product._id);

            const updatedItems = existingItem
                ? prevCart.items.map((i) => (i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i))
                : [...prevCart.items, { ...product, quantity: 1 }];

            return { ...prevCart, items: updatedItems };
        });
    };

    //4. Eliminar producto
    const removeItem = (productId) => {
        if (!productId) return;

        setCart((prevCart) => ({
            ...prevCart,
            items: prevCart.items.filter((i) => i._id !== productId),
        }));
    };

    //5. Incrementar cantidad
    const increaseQuantity = (productId) => {
        setCart((prevCart) => ({
            ...prevCart,
            items: prevCart.items.map((i) => (i._id === productId ? { ...i, quantity: i.quantity + 1 } : i)),
        }));
    };

    //6. Decrementar cantidad
    const decreaseQuantity = (productId) => {
        setCart((prevCart) => ({
            ...prevCart,
            items: prevCart.items
                .map((i) => (i._id === productId ? { ...i, quantity: i.quantity - 1 } : i))
                .filter((i) => i.quantity > 0),
        }));
    };

    //7. Vaciar carrito
    const clearCart = () => {
        const uid = user?._id || user?.id || "guest";
        removeCartFromLocalStorage(uid);
        setCart({ id: uid, items: [] });
    };

    //8. Total de artículos
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext
            value={{
                cart,
                setCart,
                addItem,
                removeItem,
                clearCart,
                increaseQuantity,
                decreaseQuantity,
                totalItems,
            }}
        >
            {children}
        </CartContext>
    );
};
