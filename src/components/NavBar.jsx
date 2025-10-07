import { Link } from "react-router-dom";
import menu from "../assets/icons/menu-primary.png";
import logoRow from "../assets/logos/ludokracia-final-row.png";
import logoName from "../assets/logos/ludokracia-title-green.png";
import { Container } from "./Container";
import { SearchInput } from "./SearchInput";
import { UserAndCart } from "./UserAndCart";

export const NavBar = () => {
    return (
        <nav className="w-full">
            <Container className="p-xs sm:p-sm md:hidden">
                <div className="w-full perfect-center p-xs gap-sm sm:p-sm ">
                    <div className="w-full align-row justify-between">
                        <div className="align-row gap-sm">
                            <div role="button" className="max-w-[32px] cursor-pointer">
                                <img src={menu} />
                            </div>
                            <Link to="/" className="max-w-[200px] sm:max-w-[300px] cursor-pointer">
                                <img src={logoName} className="w-full" />
                            </Link>
                        </div>
                        <UserAndCart />
                    </div>
                    <SearchInput />
                </div>
            </Container>
            <Container className="hidden md:flex">
                <div className=" w-full perfect-center p-xs gap-sm sm:p-sm">
                    <div className="w-full align-row justify-between gap-4">
                        <div className="align-row gap-sm">
                            <Link to="/" className="max-w-[260px] cursor-pointer">
                                <img src={logoRow} className="w-full" />
                            </Link>
                        </div>
                        <SearchInput />
                        <UserAndCart />
                    </div>
                </div>
            </Container>
        </nav>
    );
};
