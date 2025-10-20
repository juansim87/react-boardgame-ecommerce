// Input Desktop: Use for desktop
// text size: 16px; Line height: 150%
// Padding: 12px; 24px

// Input Mobile: Use for mobile
// Text size: 16px; Line height: 150%
// Padding: 12px; 20px

export const Input = ({ className = "", value, defaultValue, ...props }) => {
    return (
        <input
            {...props}
            value={value ?? defaultValue ?? ""}
            className={`bg-white border text-landing-lg placeholder:text-gray rounded-xl py-3 px-6 focus:outline-none focus:ring-2 transition ${className}`}
        />
    );
};
