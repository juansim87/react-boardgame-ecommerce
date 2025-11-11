import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useToastContext } from "../context/ToastContext.jsx";
import {
    getCartFromLocalStorage,
    removeCartFromLocalStorage,
    saveCartInLocalStorage,
} from "../core/cart/cart.service";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ id: null, items: [] });
    const { user } = useContext(AuthContext);
    const { success, info, error, warning } = useToastContext();

    //Load cart by user or guest
    useEffect(() => {
        const uid = user?._id || user?.id || "guest";

        const storedCart = getCartFromLocalStorage(uid);

        if (storedCart?.items) {
            setCart(storedCart);
        } else {
            setCart({ id: uid, items: [] });
        }
    }, [user]);

    //Merge guest cart with user cart when logged

    useEffect(() => {
        if (!user) return;

        const guestCart = getCartFromLocalStorage("guest");
        if (!guestCart || !guestCart.items?.length) return;

        const userId = user._id || user.id;
        const userCart = getCartFromLocalStorage(userId) || { items: [] };

        const fusionMap = new Map();

        userCart.items.forEach((item) => {
            fusionMap.set(item._id, { ...item });
        });

        guestCart.items.forEach((item) => {
            if (fusionMap.has(item._id)) {
                fusionMap.set(item._id, {
                    ...fusionMap.get(item._id),
                    quantity: fusionMap.get(item._id).quantity + item.quantity,
                });
            } else {
                fusionMap.set(item._id, { ...item });
            }
        });

        const mergedCart = {
            id: userId,
            items: Array.from(fusionMap.values()),
        };

        saveCartInLocalStorage(mergedCart, userId);

        removeCartFromLocalStorage("guest");

        setCart(mergedCart);
    }, [user]);

    //Save cart (guests and users)
    useEffect(() => {
        const uid = user?._id || user?.id || "guest";

        if (cart?.items?.length > 0) {
            saveCartInLocalStorage(cart, uid);
        } else {
            removeCartFromLocalStorage(uid);
        }
    }, [cart, user]);

    // Add products
    const addItem = (product) => {
        if (!product || !product._id) return;

        setCart((prevCart) => {
            const existingItem = prevCart.items.find((item) => item._id === product._id);

            const updatedItems = existingItem
                ? prevCart.items.map((item) =>
                      item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                  )
                : [...prevCart.items, { ...product, quantity: 1 }];

            return { ...prevCart, items: updatedItems };
        });

        success("Producto añadido correctamente");
    };

    // Delete products
    const removeItem = (productId) => {
        if (!productId) return;

        const deleteConfirmation = confirm("¿Deseas eliminar este producto?");

        if (deleteConfirmation) {
            setCart((prevCart) => ({
                ...prevCart,
                items: prevCart.items.filter((item) => item._id !== productId),
            }));

            error("Producto eliminado correctamente");
        }
    };

    // Increase products
    const increaseQuantity = (productId) => {
        setCart((prevCart) => ({
            ...prevCart,
            items: prevCart.items.map((item) =>
                item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
            ),
        }));
    };

    // Decrease products
    const decreaseQuantity = (productId) => {
        setCart((prevCart) => ({
            ...prevCart,
            items: prevCart.items
                .map((item) => (item._id === productId ? { ...item, quantity: item.quantity - 1 } : item))
                .filter((item) => item.quantity > 0),
        }));
    };

    //Empty cart
    const clearCart = () => {
        const uid = user?._id || user?.id || "guest";
        removeCartFromLocalStorage(uid);
        setCart({ id: uid, items: [] });
    };

    // Total items
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
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
        </CartContext.Provider>
    );
};
