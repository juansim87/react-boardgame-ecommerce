import search from "../assets/icons/search-primary.png";

export const SearchInput = () => {
    return (
        <div className="w-full flex items-center bg-gray-200 rounded-full p-xs">
            <div className="w-[32px]">
                <img src={search} />
            </div>
            <input type="text" placeholder="Encuentra el juego que buscas" className="w-full text-primary" />
        </div>
    );
};
