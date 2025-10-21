import { useMemo } from "react";
import { Input } from "./Input";

export const FormInput = ({ containerClass, input, label }) => {
    const loadForm = useMemo(
        () => (
            <div className={containerClass}>
                <label
                    htmlFor={input.name}
                    className={`font-medium text-landing-brand-gray ${label.className}`}
                >
                    {label.text}
                </label>
                <Input
                    id={input.name}
                    name={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={input.value}
                    onChange={input.onChange}
                    required={input.required}
                    className={input.className}
                />
            </div>
        ),
        [
            containerClass,
            input.className,
            input.name,
            input.onChange,
            input.placeholder,
            input.required,
            input.type,
            input.value,
            label.className,
            label.text,
        ]
    );

    return loadForm;
};
