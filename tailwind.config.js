export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
                error: "var(--color-error)",
                warning: "var(--color-warning)",
            },
        },
    },
    plugins: [],
};
