import { createContext, useState } from "react";
import { getCartFromLocalStorage, getCartSummaryFromLocalStorage } from "../core/cart/cart.service";

export const CartsContext = createContext(null);

export const CartsProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [cartSumary, setCartSummary] = useState(null);

    useEffect(() => {
        const cartFromStorage = getCartFromLocalStorage();
        const cartSummaryFromStorage = getCartSummaryFromLocalStorage();

        cartFromStorage && setCart(cartFromStorage);
        cartSummaryFromStorage && setCartSummary(cartSummaryFromStorage);
    }, []);

    return <CartsContext value={{ cart, setCart, cartSumary, setCartSummary }}>{children}</CartsContext>;
};
