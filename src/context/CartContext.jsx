import { createContext, useEffect, useState } from "react";
import {
    getCartFromLocalStorage,
    removeCartFromLocalStorage,
    saveCartInLocalStorage,
} from "../core/cart/cart.service";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ id: null, items: [] });
    // const [cartSumary, setCartSummary] = useState(null);

    useEffect(() => {
        const storedCart = getCartFromLocalStorage();
        storedCart?.items && setCart(storedCart);
    }, []);

    useEffect(() => {
        if (cart?.items?.length) {
            saveCartInLocalStorage(cart);
        } else {
            removeCartFromLocalStorage();
        }
    }, [cart]);

    const addItem = (product) => {
        if (!product || !product._id) {
            console.warn("Intento no válido de añadir un producto", product);
            return;
        }

        setCart((prevCart) => {
            const existingItem = prevCart.items.find((item) => item._id === product._id);

            let updatedItems;

            if (existingItem) {
                updatedItems = prevCart.items.map((item) =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
                console.log(`🟢 +1 unidad de ${product.name}. Total: ${existingItem.quantity + 1}`);
            } else {
                updatedItems = [...prevCart.items, { ...product, quantity: 1 }];
                console.log(`🆕 Producto añadido al carrito: ${product.name}`);
            }

            const updatedCart = { ...prevCart, items: updatedItems };
            console.log("🛍️ Carrito actualizado:", updatedCart);
            return updatedCart;
        });
    };

    const removeItem = (productId) => {
        if (!productId) {
            console.warn("Se ha intentado eliminar el producto sin ID");
            return;
        }

        setCart((prevCart) => {
            const existingItem = prevCart.items.find((item) => item._id === productId);

            if (!existingItem) {
                console.warn("Nose encontró el producto en el carrito:", productId);
                return prevCart;
            }

            const updatedItems = prevCart.items.filter((item) => item._id !== productId);
            const updatedCart = { ...prevCart, items: updatedItems };
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart({ id: null, items: [] });
        console.log("Carrito vaciado");
    };

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        console.log(`🧮 Total de artículos en carrito: ${totalItems}`);
    }, [totalItems]);

    return (
        <CartContext
            value={{
                cart,
                setCart,
                addItem,
                removeItem,
                clearCart,
            }}
        >
            {children}
        </CartContext>
    );
};
