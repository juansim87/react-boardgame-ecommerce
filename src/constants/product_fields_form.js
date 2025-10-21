export const PRODUCT_FIELDS_FORM = [
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "sku",
            type: "text",
            placeholder: "Código del producto",
            label: "SKU",
            required: true,
        },
        label: { text: "SKU", className: "" },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "name",
            type: "text",
            placeholder: "Nombre del producto",
            label: "Nombre del producto",
            required: true,
        },
        label: { text: "Nombre del producto", className: "" },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "description",
            type: "text",
            placeholder: "Describe el producto",
            label: "Descripción",
            required: true,
        },
        label: { text: "Descripción", className: "" },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "price",
            type: "number",
            step: "0.01",
            min: "0",
            placeholder: "Precio",
            label: "Precio (€)",
            required: true,
        },
        label: { text: "Precio (€)", className: "" },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "releaseDate",
            type: "date",
            label: "Fecha de lanzamiento",
            required: true,
        },
        label: { text: "Fecha de lanzamiento", className: "" },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "images",
            type: "text",
            placeholder: "URL de la imagen del producto",
            label: "Imágenes (URLs separadas por coma)",
            required: false,
        },
        label: { text: "Imágenes", className: "" },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "category",
            type: "text",
            placeholder: "Categorías del producto",
            label: "Categorías (separadas por coma)",
            required: true,
        },
        label: { text: "Categorías", className: "" },
    },
];
