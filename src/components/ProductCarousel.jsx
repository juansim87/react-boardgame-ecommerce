import { Card } from "../components/Card";

export const ProductCarousel = ({ title, products, sortBy = "newest", limit = 5 }) => {
    const sorters = {
        newest: (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate),
        popular: (a, b) => (b.likes ?? 0) - (a.likes ?? 0),
        bestsellers: (a, b) => (b.sales ?? 0) - (a.sales ?? 0),
    };

    const comparator = sorters[sortBy] || sorters.newest;

    const items = [...products].sort(comparator).slice(0, limit);

    return (
        <section className="my-10 bg-brand-200 p-4">
            <h2 className="font-semibold mb-4">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-1">
                {items.map((product) => (
                    <Card key={product._id} product={product} />
                ))}
            </div>
        </section>
    );
};
