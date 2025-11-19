import { useEffect, useState } from "react";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { useToastContext } from "../context/ToastContext";
import { getUsersApi, removeUserApi } from "../core/users/users.api";

export const UserManagerPage = () => {
    const [userList, setUserList] = useState([]);
    const { success, info, error, warning } = useToastContext();

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsersApi();
            setUserList(users);
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        const selectedUser = userList.find((user) => user.id === userId);
        const confirmDelete = confirm(`¿Eliminar al usuario ${selectedUser.name}?`);
        if (!confirmDelete) return;

        const result = await removeUserApi(userId);
        if (result) {
            setUserList((prev) => prev.filter((user) => user.id !== userId));
            info(`El usuario ${selectedUser.name} ha sido eliminado correctamente`);
        }
    };

    return (
        <div className="w-full perfect-center gap-4">
            <h2>Gestor de usuarios</h2>
            <div className="list gap-5">
                {userList.map((user) => (
                    <li key={user.id} className="w-full flex justify-between items-center">
                        <div className="align-row gap-2">
                            <Avatar src={user.avatar} sizeClass="w-20 h-20" />
                            <p className="text-lg">{user.name}</p>
                        </div>
                        <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                            Eliminar usuario
                        </Button>
                    </li>
                ))}
            </div>
        </div>
    );
};
