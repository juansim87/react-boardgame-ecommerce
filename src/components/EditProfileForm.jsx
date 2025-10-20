import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../core/auth/useAuth";
import { Button } from "./Button";
import { Container } from "./Container";
import { FormInput } from "./FormInput";

const EDIT_PROFILE_FIELDS = [
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "username",
            type: "text",
            placeholder: "juanperez_92",
            label: "Usuario",
            required: true,
        },
        label: { text: "Usuario", className: "" },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "name",
            type: "text",
            placeholder: "Juan Pérez",
            label: "Nombre completo",
            required: true,
        },
        label: { text: "Nombre completo", className: "" },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "email",
            type: "email",
            placeholder: "juan@correo.com",
            label: "Email",
            required: true,
            // readOnly: true, // ← descomenta si quieres que no se pueda editar
        },
        label: { text: "Email", className: "" },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "phoneNumber",
            type: "tel",
            placeholder: "+34 600 000 000",
            label: "Teléfono",
            required: false,
        },
        label: { text: "Teléfono", className: "" },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "bio",
            type: "text",
            placeholder: "Sobre mí...",
            label: "Bio",
            required: false,
        },
        label: { text: "Bio", className: "" },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "address",
            type: "text",
            placeholder: "C/ Falsa 123, Madrid",
            label: "Dirección",
            required: false,
        },
        label: { text: "Dirección", className: "" },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "avatar",
            type: "text",
            placeholder: "Ruta de la imagen",
            label: "Avatar",
            required: false,
        },
        label: { text: "Avatar", className: "" },
    },
];

export const EditProfileForm = () => {
    const { user } = useContext(AuthContext);
    const { editProfile } = useAuth();

    const INITIAL_PROFILE = {
        username: user?.username || "",
        name: user?.name || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.bio || "",
        address: user?.address || "",
        avatar: user?.avatar || "",
    };

    const [form, setForm] = useState(INITIAL_PROFILE);

    useEffect(() => {
        if (user) {
            setForm(INITIAL_PROFILE);
        }
    }, [user]);

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await editProfile(form);
    };

    return (
        <Container className="flex items-center justify-center min-h-[70vh] max-w-element-width-landing-md">
            <div className="flex flex-col gap-landing-md w-full bg-white rounded-2xl shadow-landing-lg p-8">
                <h2 className="text-primary">Editar perfil</h2>

                <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                    {EDIT_PROFILE_FIELDS.map(({ label, input, containerClass }) => {
                        return (
                            <FormInput
                                key={input.name}
                                containerClass={containerClass}
                                input={{
                                    name: input.name,
                                    type: input.type,
                                    placeholder: input.placeholder,
                                    value: form[input.name],
                                    onChange: onInputChange,
                                    required: input.required,
                                    readOnly: input.readOnly,
                                }}
                                label={{
                                    text: label.text,
                                    className: label.className,
                                }}
                            />
                        );
                    })}

                    <Button type="submit" className="w-full mt-2 justify-center rounded-full">
                        Guardar
                    </Button>
                </form>
            </div>
        </Container>
    );
};
