export const Container = ({ children, className }) => {
    return (
        <div className={`w-max-xs sm:w-max-sm md:w-max-md lg:w-max-lg mx-[0-auto] ${className}`}>
            {children}
        </div>
    );
};
