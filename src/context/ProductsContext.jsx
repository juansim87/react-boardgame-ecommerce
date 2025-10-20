import { createContext, useEffect, useState } from "react";
import { getCategoriesApi, getProductsApi } from "../core/products/products.api";
import {
    getCategoriesFromLocalStorage,
    getProductsFromLocalStorage,
} from "../core/products/products.service";

export const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const productsFromStorage = getProductsFromLocalStorage();
        if (productsFromStorage?.length) {
            setProducts(productsFromStorage);
        } else {
            getProductsApi()
                .then((data) => setProducts(data))
                .catch((err) => console.error("Error al obtener productos:", err));
        }

        const categoriesFromStorage = getCategoriesFromLocalStorage();
        if (categoriesFromStorage) {
            const fixedCategories = categoriesFromStorage.categories || categoriesFromStorage;
            setCategories(fixedCategories);
        } else {
            getCategoriesApi()
                .then((data) => {
                    const fixedCategories = data.categories || data;
                    setCategories(fixedCategories);
                })
                .catch((err) => console.error("Error al obtener categorías:", err));
        }
    }, []);

    const removeProduct = (id) => {
        setProducts((prev) => prev.filter((p) => p._id !== id));
    };

    return (
        <ProductsContext value={{ products, setProducts, categories, setCategories, removeProduct }}>
            {children}
        </ProductsContext>
    );
};
