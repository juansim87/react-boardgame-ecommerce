import { Link } from "react-router-dom";
import bannerImg from "../assets/images/banner-img.png";
import { Button } from "./Button";
import { Container } from "./Container";

export const CTASignUp = () => {
    return (
        <Container>
            <div className="bg-secondary-light max-w-4/5 perfect-center rounded-default p-3 gap-6 md:flex-row md:p-5 md:rounded-md md:gap-16 lg:rounded-lg lg:p-8">
                <div className="w-32 md:block md:w-40 lg:w-80">
                    <img src={bannerImg} className="w-full" />
                </div>
                <div className="perfect-center text-white gap-6 p-4">
                    <h2 className="text-center font-bold md:text-3xl lg">¡Regístrate en Ludokrazia!</h2>
                    <p className="self-center">
                        Y gana puntos para conseguir descuentos en tus juegos favoritos
                    </p>
                    <Link to="/register">
                        <Button variant="primary">
                            <p>Registrarse</p>
                        </Button>
                    </Link>
                </div>
            </div>
        </Container>
    );
};
