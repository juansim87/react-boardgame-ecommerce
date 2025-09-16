import menu from "../assets/icons/menu-primary.png";
import order from "../assets/icons/order.png";
import user from "../assets/icons/user.png";
import logoRow from "../assets/logos/ludokracia-final-row.png";
import logoName from "../assets/logos/ludokracia-title-green.png";
import { Container } from "./Container";
import { SearchInput } from "./SearchInput";

export const NavBar = () => {
    return (
        <nav className="w-full">
            <Container className="p-xs sm:p-sm md:hidden">
                <div className="w-full perfect-center p-xs gap-sm sm:p-sm ">
                    <div div className="w-full align-row justify-between">
                        <div className="align-row gap-sm">
                            <div role="button" className="max-w-[32px] cursor-pointer">
                                <img src={menu} />
                            </div>
                            <div className="max-w-[200px] sm:max-w-[300px]">
                                <img src={logoName} className="w-full" />
                            </div>
                        </div>
                        <div className="align-row gap-sm">
                            <div role="button" className="max-w-[32px] cursor-pointer">
                                <img src={user} />
                            </div>
                            <div role="button" className="max-w-[32px] cursor-pointer">
                                <img src={order} />
                            </div>
                        </div>
                    </div>
                    <SearchInput />
                </div>
            </Container>
            <Container className="hidden md:flex">
                <div className=" w-full perfect-center p-xs gap-sm sm:p-sm ">
                    <div div className="w-full align-row justify-between">
                        <div className="align-row gap-sm">
                            <div className="max-w-[260px]">
                                <img src={logoRow} className="w-full" />
                            </div>
                            <div role="button">
                                <p>Aquí van los elementos del menú</p>
                            </div>
                        </div>
                        <div className="align-row gap-sm">
                            <div role="button" className="max-w-[40px] cursor-pointer">
                                <img src={user} className="w-full" />
                            </div>
                            <div role="button" className="max-w-[40px] cursor-pointer">
                                <img src={order} className="w-full" />
                            </div>
                        </div>
                    </div>
                    <SearchInput />
                </div>
            </Container>
        </nav>
    );
};
