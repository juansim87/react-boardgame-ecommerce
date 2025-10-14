export const CATEGORIES = [
    { slug: "accessories", label: "Accesorios para juegos", description: "Tapetes, fundas, insertos…" },
    { slug: "family", label: "Juegos familiares", description: "Fáciles de explicar y jugar" },
    { slug: "hidden-role", label: "Juegos de rol oculto", description: "Deduce quién miente (o miente tú)" },
    {
        slug: "strategy",
        label: "Juegos de estrategia",
        description: "Planificación, control y AP opcional 😅",
    },
    { slug: "party", label: "Juegos de fiesta", description: "Risas, caos y cero resentimiento (ejem)" },
    { slug: "cooperative", label: "Juegos cooperativos", description: "Todos contra el juego" },
    { slug: "deck-building", label: "Construcción de mazos", description: "Empiezas flojo, terminas combo" },
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);
export const CATEGORY_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c.label]));
