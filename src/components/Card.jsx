import { useContext, useState } from "react";
import like from "../assets/icons/like.png";
import noLike from "../assets/icons/no-like.png";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { Button } from "./Button";
import { EditProductButton } from "./EditProductButton";
import { Modal } from "./Modal";

export const Card = ({ product }) => {
    const [liked, setLiked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([user.favoritos]);
    const { addItem, removeItem } = useContext(CartContext);

    const handleLike = (product) => {
        setLiked((prev) => !prev);
        if (favorites.includes(product.name)) {
            console.log("El producto ya está añadido");
        } else {
            console.log(product.name);
        }
    };

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

            <div className="flex perfect-center gap-2">
                {user && (
                    <div className="flex items-center gap-5 mt-3">
                        <Button variant="primary" onClick={() => addItem(product)}>
                            Añadir al carrito
                        </Button>
                        <Button onClick={() => removeItem(product._id)}>Eliminar del carrito</Button>
                        <div
                            className="w-6 cursor-pointer transition-transform duration-200 hover:scale-110"
                            onClick={handleLike}
                        >
                            <img src={liked ? like : noLike} alt="Like" className="w-full" />
                        </div>
                    </div>
                )}

                {user && user.role === "admin" && <EditProductButton id={product._id} />}
            </div>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
                <div className="p-4 text-center">
                    <img
                        src={mainImage}
                        alt={product.name}
                        className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] object-contain mb-4 rounded-md mx-auto"
                    />
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    {product.description && <p className="text-gray-700 mb-4">{product.description}</p>}
                    <p className="text-lg font-medium mb-4">{product.price} €</p>
                    <div className="perfect-center gap-2">
                        {user && user.role === "admin" && <EditProductButton id={product._id} />}
                        <Button variant="primary" onClick={() => setIsOpen(false)}>
                            Cerrar
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
