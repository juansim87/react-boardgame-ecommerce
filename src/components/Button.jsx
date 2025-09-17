import classNames from "classnames";

export const Button = ({
    children,
    variant = "default",
    size = "md",
    disabled = false,
    onClick,
    type = "button",
    className = "",
    ...props
}) => {
    const baseClasses =
        "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

    const variantConfig = {
        default: {
            classes:
                "bg-brand-50 text-gray-700 border border-brand-300 hover:bg-brand-400 hover:text-gray-900 focus:ring-primary",
            hasHoverEffects: true,
            shadowColor: null,
        },
        primary: {
            classes:
                "bg-brand-400 text-white border border-brand-400 hover:bg-brand-300 focus:ring-primary shadow-sm",
            hasHoverEffects: true,
            shadowColor: "hover:shadow-brand-400/25",
        },
        secondary: {
            classes:
                "bg-secondary text-white border border-secondary hover:bg-secondary-dark focus:ring-secondary-dark shadow-sm",
            hasHoverEffects: true,
            shadowColor: "hover:shadow-secondary-dark/25",
        },
        outline: {
            classes:
                "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
            hasHoverEffects: true,
            shadowColor: null,
        },
        ghost: {
            classes: "bg-transparent text-gray-700 border-transparent hover:bg-gray-100 focus:ring-gray-500",
            hasHoverEffects: false,
            shadowColor: null,
        },
        danger: {
            classes:
                "bg-error-500 text-white border border-error-600 hover:bg-error-600 focus:ring-error-500 shadow-sm",
            hasHoverEffects: true,
            shadowColor: "hover:shadow-error-500/25",
        },
    };

    const sizeConfig = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        xl: "px-8 py-4 text-lg",
    };

    const currentVariant = variantConfig[variant] || variantConfig.default;
    const currentSize = sizeConfig[size] || sizeConfig.md;

    const buttonClasses = classNames(
        baseClasses,
        currentVariant.classes,
        currentSize,
        {
            "opacity-50 cursor-not-allowed pointer-events-none": disabled,
            "hover:scale-105 hover:shadow-lg transform": !disabled && currentVariant.hasHoverEffects,
            [currentVariant.shadowColor]: !disabled && currentVariant.shadowColor,
        },
        className
    );

    return (
        <button type={type} disabled={disabled} onClick={onClick} className={buttonClasses} {...props}>
            {children}
        </button>
    );
};
