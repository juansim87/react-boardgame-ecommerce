import { useState } from "react";
import { useNavigate } from "react-router-dom";
import search from "../assets/icons/search-primary.png";

export const SearchInput = () => {
    const [term, setTerm] = useState("");
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();

        const query = term.trim();
        navigate(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
    };

    return (
        <form onSubmit={onSubmit} className="w-full flex items-center bg-gray-200 rounded-full p-sm gap-2">
            <input
                type="text"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Encuentra el juego que buscas"
                className="w-full text-primary"
            />
            <button type="submit" className="w-10 bg-gray-300 rounded-4xl cursor-pointer p-1" role="button">
                <img src={search} alt="Buscar" />
            </button>
        </form>
    );
};
