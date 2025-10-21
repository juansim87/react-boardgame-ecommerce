import { Container } from "../components/Container";

export const MainBox = ({ children }) => {
    return (
        <div className="min-h-screen">
            <Container>{children}</Container>
        </div>
    );
};
