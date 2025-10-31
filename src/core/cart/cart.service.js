import { saveDataInStorage } from "../../helpers/storage";

export const saveCartInLocalStorage = (cart) => {
    saveDataInStorage("cart", cart);
};

export const getCartFromLocalStorage = () => {
    return getDataFromStorage("cart");
};

export const removeCartFromLocalStorage = () => {
    removeFromStorage("cart");
};

export const saveCartSummaryInLocalStorage = (cartSummary) => {
    saveDataInStorage("cartSummary", cartSummary);
};

export const getCartSummaryFromLocalStorage = () => {
    return getDaraFromStorage("cartSummary");
};

export const removeCartSummaryFromLocalStorage = () => {
    removeFromStorage("cartSummary");
};
