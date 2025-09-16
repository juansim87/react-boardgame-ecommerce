import shipment from "../assets/icons/shipment.png";
import { Container } from "./Container.jsx";

export const Adv = () => {
    return (
        <div className="w-full bg-secondary text-white p-2 perfect-center">
            <Container className="perfect-center flex-row gap-3 md:gap-4">
                <p className="text-xs sm:text-sm md:text-base font-semibold">
                    Envío a domicilio gratis en pedidos de más de 50€ o en nuestros juegos de más de 7€
                </p>
                <div className="w-7">
                    <img src={shipment} className="w-full" />
                </div>
            </Container>
        </div>
    );
};
