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
            <div className="w-50 rounded-2xl">
                <img src={user?.avatar} className="w-full rounded-full" />
            </div>
            <div className="align-row gap-2">
                <Button onClick={() => navigate("/profile/edit")} variant="primary">
                    Editar perfil
                </Button>
                <Button onClick={() => navigate("/")} variant="secondary">
                    Volver a la página principal
                </Button>
            </div>
            <div className="w-100 perfect-center gap-4 bg-primary-light rounded-2xl p-5">
                <h3 className="text-center">Perfil</h3>
                <div className="flex flex-col gap-4 p-6">
                    <p>Nombre: {user?.name}</p>
                    <p>Email: {user?.email} </p>
                    <p>Teléfono: {user?.phoneNumber}</p>
                    <p>Dirección: {user?.address}</p>
                    <p>Biografía: {user?.bio}</p>
                </div>
            </div>
        </div>
    );
};
