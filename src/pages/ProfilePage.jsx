import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { AuthContext } from "../context/AuthContext";

export const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    console.log(user);

    const navigate = useNavigate();
    return (
        <div className="perfect-center gap-4">
            <h1>{user?.username}</h1>
            <Button onClick={() => navigate("/profile/edit")} variant="primary">
                Editar perfil
            </Button>
            <Button onClick={() => navigate("/")} variant="secondary">
                Volver a la página principal
            </Button>
        </div>
    );
};
