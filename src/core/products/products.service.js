import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "../../helpers/storage";

export const saveProductsInLocalStorage = (products) => {
    saveDataInStorage("products", products);
};

export const getProductsFromLocalStorage = () => {
    return getDataFromStorage("products");
};

export const removeProductsFromLocalStorage = () => {
    removeFromStorage("products");
};

export const saveCategoriesInLocalStorage = (categories) => {
    saveDataInStorage("categories", categories);
};

export const getCategoriesFromLocalStorage = () => {
    return getDataFromStorage("categories");
};

export const removeCategoriesFromLocalStorage = () => {
    removeFromStorage("categories");
};
