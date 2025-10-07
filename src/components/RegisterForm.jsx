import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

export const RegisterForm = ({ onSubmit }) => {
    const [form, setForm] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
    });

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validate = () => {
        (!form.username.trim() && "Usuario obligatorio") ||
            (!form.username.trim() && "Nombre obligatorio") ||
            (!form.lastName.trim() && "Los apellidos son obligatorios.") ||
            (!form.email.trim() && "El correo es obligatorio.") ||
            (!/\S+@\S+\.\S+/.test(form.email) && "Correo no válido.") ||
            ((form.password || "").length < 8 && "La contraseña debe tener al menos 8 caracteres.") ||
            (form.password !== form.confirmPassword && "Las contraseñas no coinciden.") ||
            (!form.terms && "Debes aceptar los términos y la privacidad.") ||
            null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const error = validate();
        if (error) return alert(error);
        const payload = {
            username: form.username.trim(),
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            name: `${form.firstName.trim()} ${form.lastName.trim()}`,
            email: form.email.trim(),
            password: form.password,
            role: "user",
        };

        if (onSubmit) {
            await onSubmit(payload);
            return;
        }

        try {
            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error("Registro fallido");
            alert("¡Cuenta creada! Revisa tu correo para verificarla.");
        } catch (err) {
            console.error(err);
            alert("Ha ocurrido un error al registrar.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-secondary-light p-8 border-2 rounded-2xl"
        >
            <label className="label">
                Usuario
                <Input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    minLength={3}
                    maxLength={20}
                    placeholder="tu_usuario"
                />
            </label>

            <label className="label">
                Nombre
                <Input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Juan"
                />
            </label>

            <label className="label">
                Apellidos
                <Input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Pérez"
                />
            </label>

            <label className="label">
                Correo
                <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="correo@ejemplo.com"
                />
            </label>

            <label className="label">
                Contraseña
                <Input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    placeholder="Mínimo 8 caracteres"
                />
            </label>

            <label className="label">
                Repite la contraseña
                <Input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={8}
                    placeholder="Igual que la anterior"
                />
            </label>

            <label className="flex gap-2 items-center">
                <input
                    type="checkbox"
                    name="terms"
                    checked={form.terms}
                    onChange={handleChange}
                    required
                    className="cursor-pointer"
                />
                Acepto los términos y la política de privacidad
            </label>

            <Button type="submit" variant="primary">
                Crear cuenta
            </Button>
        </form>
    );
};
