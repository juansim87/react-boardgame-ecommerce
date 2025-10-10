import { useContext, useState } from "react";
import like from "../assets/icons/like.png";
import noLike from "../assets/icons/no-like.png";
import { AuthContext } from "../context/AuthContext";
import { Button } from "./Button";

export const Card = ({ product }) => {
    const [liked, setLiked] = useState(false);
    const { user } = useContext(AuthContext);

    const handleLike = () => {
        setLiked((prev) => !prev);
    };

    return (
        <div
            key={product._id}
            className="perfect-center  bg-brand-300 border-3 border-secondary p-4 rounded-2xl gap-2"
        >
            <div className="perfect-center min-h-14 text-center">
                <h4>{product.name}</h4>
            </div>
            <div className="h-50">
                <img src={product.images} alt={`Portada de ${product.name}`} className="h-full" />
            </div>
            <p>{product.price} €</p>
            {user && (
                <div className="align-row gap-4">
                    <Button variant="secondary" className="cursor-pointer">
                        Añadir al carrito
                    </Button>
                    <div className="w-6 cursor-pointer" role="button" onClick={handleLike}>
                        <img src={liked ? like : noLike} className="w-full " />
                    </div>
                </div>
            )}
        </div>
    );
};
