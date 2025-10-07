import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input"; // si choca con otra lib, aliaséalo: `import { Input as TextInput } from "./Input"`

export const LoginForm = ({ onSubmit }) => {
    const [form, setForm] = useState({ email: "", password: "", remember: false });

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    };

    const validate = () =>
        (!form.email.trim() && "Introduce tu correo.") ||
        (!/\S+@\S+\.\S+/.test(form.email) && "Correo no válido.") ||
        (!form.password && "Introduce tu contraseña.") ||
        null;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const error = validate();
        if (error) return alert(error);

        const payload = {
            email: form.email.trim(),
            password: form.password,
            remember: form.remember,
        };

        if (onSubmit) {
            await onSubmit(payload);
            return;
        }

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Login fallido");
            // éxito: redirige o actualiza estado global
        } catch (err) {
            console.error(err);
            alert("No se pudo iniciar sesión.");
        }
    };

    return (
        <div className="perfect-center gap-4">
            <h2>Inicio de sesión</h2>
            <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
                <label className="label">
                    Correo
                    <Input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="correo@ejemplo.com"
                        autoComplete="email"
                        required
                    />
                </label>

                <label className="label">
                    Contraseña
                    <Input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        required
                    />
                </label>

                <label className="flex items-center gap-2">
                    <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} />
                    Recordarme
                </label>

                <Button type="submit" variant="primary">
                    Entrar
                </Button>
            </form>
        </div>
    );
};
