import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CATEGORY_LABEL } from "../constants/categories";
import { PRODUCT_FIELDS_FORM } from "../constants/product_fields_form";
import { ProductsContext } from "../context/ProductsContext";
import { editProductApi } from "../core/products/products.api";
import { useProducts } from "../core/products/useProducts";
import { Button } from "./Button";
import { Container } from "./Container";
import { FormInput } from "./FormInput";

export const EditProductForm = () => {
    const { products, categories = [] } = useContext(ProductsContext);
    const { getProducts, getCategories } = useProducts();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);

    const labelFor = (slug) =>
        CATEGORY_LABEL[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

    const toggleCategory = (slug) => {
        setSelectedCategories((prev) =>
            prev.includes(slug) ? prev.filter((selection) => selection !== slug) : [...prev, slug]
        );
    };

    const id = searchParams.get("id");

    const productSelected = products.find((product) => product._id === id);

    useEffect(() => {
        if (!productSelected) return;

        setForm({
            sku: productSelected.sku || "",
            name: productSelected.name || "",
            description: productSelected.description || "",
            price: String(productSelected.price ?? ""),
            releaseDate: productSelected.releaseDate ? productSelected.releaseDate.slice(0, 10) : "",
            images: Array.isArray(productSelected.images)
                ? productSelected.images.join(", ")
                : productSelected.images || "",
        });

        if (Array.isArray(productSelected.category)) {
            setSelectedCategories(productSelected.category);
        } else if (typeof productSelected.category === "string" && productSelected.category.trim() !== "") {
            setSelectedCategories(productSelected.category.split(",").map((s) => s.trim()));
        } else {
            setSelectedCategories([]);
        }
    }, [productSelected]);

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            sku: form.sku.trim(),
            name: form.name.trim(),
            description: form.description.trim(),
            price: Number(form.price),
            releaseDate: new Date(form.releaseDate).toISOString(),
            images: form.images
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            category: selectedCategories,
        };

        try {
            await editProductApi(id, payload);
            await getProducts();
            alert("Producto actualizado correctamente");
            navigate("/admin/products/edit");
        } catch (error) {
            alert("Error al actualizar el producto");
        }
    };

    return (
        <Container className="flex items-center justify-center min-h-[70vh] w-200 bg-primary-light p-4 gap-5">
            <h2 className="text-primary">{productSelected?.name || "Editar producto"}</h2>
            <div className="w-50">
                <img src={form.images} className="w-full" />
            </div>
            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                {PRODUCT_FIELDS_FORM.filter((filtered) => filtered.input?.name !== "category").map(
                    ({ label, input, containerClass }) => {
                        return (
                            <FormInput
                                key={input.name}
                                containerClass={containerClass}
                                input={{
                                    name: input.name,
                                    type: input.type,
                                    placeholder: input.placeholder,
                                    value: form[input.name],
                                    onChange: onInputChange,
                                    required: input.required,
                                    readOnly: input.readOnly,
                                }}
                                label={{
                                    text: label.text,
                                    className: label.className,
                                }}
                            />
                        );
                    }
                )}
                <fieldset className="flex flex-col gap-3">
                    <legend className="font-semibold">Categorías</legend>
                    <div className="flex flex-wrap gap-3">
                        {[...(categories ?? [])]
                            .slice()
                            .sort((a, b) =>
                                labelFor(a).localeCompare(labelFor(b), "es", { sensitivity: "base" })
                            )
                            .map((slug) => (
                                <label key={slug} className="inline-flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(slug)}
                                        onChange={() => toggleCategory(slug)}
                                    />
                                    <span>{labelFor(slug)}</span>
                                </label>
                            ))}
                    </div>
                </fieldset>

                <Button type="submit" className="w-full mt-2 justify-center rounded-full">
                    Guardar
                </Button>
            </form>
        </Container>
    );
};
