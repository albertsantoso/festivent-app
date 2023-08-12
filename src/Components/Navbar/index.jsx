import FestiventLogoBlack from "./../../Assets/Logo/festivent-logo-black.png";
import PrimaryButton from "../PrimaryButton";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../../Redux/Features/Users";
import DropdownItemsWithIcon from "../AccountDropdown";

export default function Navbar() {
    const email = useSelector((state) => state.users.email);
    const fullname = useSelector((state) => state.users.fullname)
    const dispatch = useDispatch();

    return (
        <>
            <section className="Navbar fixed w-full z-50">
                <nav>
                    <div className="navbar-container navbar-bg bg-white shadow-lg">
                        <div className="navbar-wrapper mycontainer container flex justify-between items-center h-[82px] w-full">
                            <div className="navbar-left flex gap-8 items-center">
                                <div className="navbar-logo">
                                    <Link to={"/"}>
                                        <img src={FestiventLogoBlack} alt="" srcset="" className="md:max-w-[150px] md:min-w-[150px] w-[30px]" />
                                    </Link>
                                </div>
                                <ul className="navbar-menus flex gap-10">
                                    <li className="menu-item">
                                        <Link to={"/events"}>
                                            <span className="font-bold">Explore events</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="navbar-middle">
                            </div>

                            <div className="navbar-right">
                                <div className="navbar-actions flex gap-2">
                                    <div className="action-create-event">
                                        {email ? (
                                            <Link to={"/create"}>
                                                <PrimaryButton buttonText="Create an Event" bgColor="bg-gradient-animation-1" textColor="white" customStyle={"hover:scale-[1.02] active:scale-[.95]"} />
                                            </Link>
                                        ) : (
                                            <>
                                                <Link onClick={() => alert("Please login first")} to={"/login"}>
                                                    <PrimaryButton buttonText="Create an Event" bgColor="bg-gradient-animation-1" textColor="white" customStyle={"hover:scale-[1.02] active:scale-[.95]"} />
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                    {email && fullname ? (
                                        <DropdownItemsWithIcon handleFunctionLogout={() => dispatch(onLogout())} />
                                    ) : (
                                        <div className="action-login">
                                            <Link to={"/login"}>
                                                <PrimaryButton buttonText="Log in" bgColor="black" textColor="white" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </section>
        </>
    );
}
