import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import search from "../assets/icons/search-primary.png";

export const SearchInput = () => {
    const [term, setTerm] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        setTerm(searchParams.get("q") || "");
    }, [searchParams]);

    const onSubmit = (event) => {
        event.preventDefault();
        const next = new URLSearchParams(searchParams);
        const query = term.trim();

        if (query) next.set("q", query);
        else next.delete("q");

        navigate({ pathname: "/products", search: `?${next.toString()}` });
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
            <button type="submit" className="w-10 bg-gray-300 rounded-4xl cursor-pointer p-1">
                <img src={search} alt="Buscar" />
            </button>
        </form>
    );
};
