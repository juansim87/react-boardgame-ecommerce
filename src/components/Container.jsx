export const Container = ({ children, className }) => {
    return (
        <div
            className={`flex perfect-center w-max-xs sm:w-max-sm md:w-max-md lg:w-max-lg m-[0-auto] ${className}`}
        >
            {children}
        </div>
    );
};
