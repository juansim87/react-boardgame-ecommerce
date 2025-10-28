import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORY_LABEL } from "../constants/categories";
import { PRODUCT_FIELDS_FORM } from "../constants/product_fields_form";
import { ProductsContext } from "../context/ProductsContext";
import { useProducts } from "../core/products/useProducts";
import { Button } from "./Button";
import { Container } from "./Container";
import { FormInput } from "./FormInput";

export const CreateProductForm = () => {
    const { createProducts } = useProducts();
    const { categories } = useContext(ProductsContext);

    const [selectedCategories, setSelectedCategories] = useState([]);

    const EMPTY_FORM = {
        sku: "",
        name: "",
        description: "",
        price: "",
        releaseDate: "",
        images: "",
        category: "",
    };

    const [form, setForm] = useState(EMPTY_FORM);
    const navigate = useNavigate();

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const labelFor = (slug) =>
        CATEGORY_LABEL[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

    const toggleCategory = (slug) => {
        setSelectedCategories((prev) =>
            prev.includes(slug) ? prev.filter((selected) => selected !== slug) : [...prev, slug]
        );
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        console.log("CreateProductForm Enviando formulario...", form);

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
            const created = await createProducts(payload);
            console.log("[CreateProductForm] Respuesta de createProducts:", created);

            const newId = created?._id ?? created?.id;
            console.log("[CreateProductForm] ID detectado:", newId);

            alert("Producto creado correctamente ✅");

            if (newId) {
                navigate(`/admin/products/edit?id=${newId}`);
            }
        } catch (error) {
            console.error("[CreateProductForm] Error:", error?.response?.status, error?.response?.data);
            alert(`Error al crear el producto: ${error?.response?.data?.message ?? "ver consola"}`);
        }
    };

    return (
        <Container className="flex items-center justify-center min-h-[70vh] max-w-element-width-landing-md">
            <h2>Añadir Producto</h2>
            <form className="flex flex-col gap-5 w-200" onSubmit={onSubmit}>
                {PRODUCT_FIELDS_FORM.filter((f) => f.input?.name !== "category").map(
                    ({ label, input, containerClass }) => {
                        return (
                            <FormInput
                                key={input.name}
                                containerClass={containerClass}
                                input={{
                                    name: input.name,
                                    type: input.type,
                                    placeholder: input.placeholder,
                                    value: form[input.name] ?? "",
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
                <fieldset className="flex flex-col gap-3 w-full">
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
                <div className="w-full flex justify-around">
                    <Button variant="primary" type="submit">
                        Añadir
                    </Button>
                    <Button variant="secondary" onClick={() => navigate("/admin/products/edit")}>
                        Cerrar
                    </Button>
                </div>
            </form>
        </Container>
    );
};
