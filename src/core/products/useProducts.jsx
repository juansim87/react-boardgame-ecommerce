import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductsContext";
import { getCategoriesApi, getProductsApi, getProductsByIdApi } from "./products.api";
import { saveCategoriesInLocalStorage, saveProductsInLocalStorage } from "./products.service";

export const useProducts = () => {
    const { setProducts, setCategories } = useContext(ProductContext);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const navigate = useNavigate();

    const getProducts = async () => {
        setLoadingProducts(true);
        try {
            const products = await getProductsApi();
            if (products && products.length) {
                setProducts(products);
                saveProductsInLocalStorage(products);
            }
            if (!products.length) return;
        } catch (error) {
            console.error("Algo ha salido mal en getProducts(useProducts)", err);
        } finally {
            setLoadingProducts(false);
        }
    };

    const getProductsById = async (id) => {
        try {
            const product = await getProductsByIdApi(id);
            if (product) return product;
        } catch (error) {
            console.error("No se ha encontrado el producto", error);
            throw error;
        }
    };

    const getCategories = async () => {
        setLoadingCategories(true);
        try {
            const categories = await getCategoriesApi();
            if (categories && categories?.length) {
                setCategories(categories);
                saveCategoriesInLocalStorage(categories);
            }
            if (!categories.length) return;
        } catch (error) {
            console.error("Algo ha salido mal en getCategories(useProducts)", error);
        } finally {
            setLoadingCategories(false);
        }
    };

    return { getProducts, getProductsById, getCategories, loadingProducts, loadingCategories };
};
