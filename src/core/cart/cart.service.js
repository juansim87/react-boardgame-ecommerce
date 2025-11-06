import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "../../helpers/storage";

const getCartKey = (userId) => {
    const key = userId ? `cart_${userId}` : "cart_guest";
    console.log("[cart.service] key:", key);
    return key;
};

export const saveCartInLocalStorage = (cart, userId) => {
    saveDataInStorage(getCartKey(userId), cart);
};

export const getCartFromLocalStorage = (userId) => {
    return getDataFromStorage(getCartKey(userId));
};

export const removeCartFromLocalStorage = (userId) => {
    removeFromStorage(getCartKey(userId));
};
