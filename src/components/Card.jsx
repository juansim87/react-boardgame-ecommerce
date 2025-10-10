import { useContext, useState } from "react";
import like from "../assets/icons/like.png";
import noLike from "../assets/icons/no-like.png";
import { AuthContext } from "../context/AuthContext";
import { Button } from "./Button";
import { Modal } from "./Modal";

export const Card = ({ product }) => {
    const [liked, setLiked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(AuthContext);

    const handleLike = () => setLiked((prev) => !prev);

    // En caso de que product.images sea array o string
    const mainImage = Array.isArray(product.images) ? product.images[0] : product.images;

    return (
        <div className="bg-brand-300 border-3 border-secondary p-4 rounded-2xl text-center">
            <h4 className="mb-2">{product.name}</h4>

            <div
                className="h-50 cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                onClick={() => setIsOpen(true)}
            >
                <img src={mainImage} alt={product.name} className="h-full w-full object-cover rounded-md" />
            </div>

            <p className="mt-2">{product.price} €</p>

            {user && (
                <div className="flex justify-center gap-4 mt-3">
                    <Button variant="secondary">Añadir al carrito</Button>
                    <div
                        className="w-6 cursor-pointer transition-transform duration-200 hover:scale-110"
                        onClick={handleLike}
                    >
                        <img src={liked ? like : noLike} alt="Like" className="w-full" />
                    </div>
                </div>
            )}

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
                <div className="p-4 text-center">
                    <img src={mainImage} alt={product.name} className="w-full h-auto mb-4 rounded-md" />
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    {product.description && <p className="text-gray-700 mb-4">{product.description}</p>}
                    <p className="text-lg font-medium mb-4">{product.price} €</p>
                    <Button variant="primary" onClick={() => setIsOpen(false)}>
                        Cerrar
                    </Button>
                </div>
            </Modal>
        </div>
    );
};
