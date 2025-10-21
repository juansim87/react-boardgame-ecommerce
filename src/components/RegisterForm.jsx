import { useState } from "react";
import { useAuth } from "../core/auth/useAuth";
import { Button } from "./Button";
import { Container } from "./Container";
import { FormInput } from "./FormInput";

const INITIAL_FORM = { email: "", password: "", role: "user", name: "" };

const REGISTER_FORM_FIELDS = [
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "name",
            type: "text",
            placeholder: "Juan Perez",
            required: true,
        },
        label: {
            text: "Nombre completo",
            className: "",
        },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "email",
            type: "email",
            placeholder: "admin@admin.com",
            required: true,
        },
        label: {
            text: "Email",
            className: "",
        },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "password",
            type: "password",
            placeholder: "1234",
            required: true,
        },
        label: {
            text: "Contraseña",
            className: "",
        },
    },
];

export const RegisterForm = ({}) => {
    const [form, setForm] = useState(INITIAL_FORM);
    const { register } = useAuth();

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const onRegisterSubmit = async (event) => {
        event.preventDefault();
        alert(`Email:  ${form.email}\nPassword: ${form.password}, nombre: ${form.name}`);
        await register(form);
        setForm(INITIAL_FORM);
    };

    return (
        <Container className="flex items-center justify-center min-h-[70vh] max-w-element-width-landing-md gap-4">
            <h2 className="text-primary">Registro</h2>

            <form className="flex flex-col gap-5" onSubmit={onRegisterSubmit}>
                {REGISTER_FORM_FIELDS.map(({ label, input, containerClass }) => (
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
                        }}
                        label={{
                            text: label.text,
                            className: label.className,
                        }}
                    />
                ))}

                <Button type="submit" className="w-full mt-2 justify-center rounded-full">
                    Entrar
                </Button>
            </form>
        </Container>
    );
};
