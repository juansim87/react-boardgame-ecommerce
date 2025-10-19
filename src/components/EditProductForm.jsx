import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PRODUCT_FIELDS_FORM } from "../constants/product_fields_form";
import { ProductsContext } from "../context/ProductsContext";
import { editProductApi } from "../core/products/products.api";
import { useProducts } from "../core/products/useProducts";
import { Button } from "./Button";
import { Container } from "./Container";
import { FormInput } from "./FormInput";

export const EditProductForm = () => {
    const { products } = useContext(ProductsContext);
    const { getProducts } = useProducts();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({});

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
            category: Array.isArray(productSelected.category)
                ? productSelected.category.join(", ")
                : productSelected.category || "",
        });
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
            category: form.category
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
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
        <Container className="flex items-center justify-center min-h-[70vh] max-w-element-width-landing-md">
            <div className="flex flex-col gap-landing-md w-full bg-white rounded-2xl shadow-landing-lg p-8">
                <h2 className="text-primary">{productSelected?.name || "Editar producto"}</h2>
                <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                    {PRODUCT_FIELDS_FORM.map(({ label, input, containerClass }) => {
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
                    })}

                    <Button type="submit" className="w-full mt-2 justify-center rounded-full">
                        Guardar
                    </Button>
                </form>
            </div>
        </Container>
    );
};
