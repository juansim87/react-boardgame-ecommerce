import { useState } from "react";
import like from "../assets/icons/like.png";
import noLike from "../assets/icons/no-like.png";
import { Button } from "./Button";

export const Card = ({ product }) => {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked((prev) => !prev);
    };

    return (
        <div key={product._id} className="perfect-center  bg-brand-300 border p-4 rounded gap-2">
            <h2>{product.name}</h2>
            <div className="h-50">
                <img src={product.images} alt={`Portada de ${product.name}`} className="h-full" />
            </div>
            <p>{product.price} €</p>
            <div className="align-row gap-4">
                <Button variant="secondary">Añadir al carrito</Button>
                <div className="w-6" role="button" onClick={handleLike}>
                    <img src={liked ? like : noLike} className="w-full" />
                </div>
            </div>
        </div>
    );
};
