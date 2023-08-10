import FestiventLogoBlack from "./../../Assets/Logo/festivent-logo-black.png"
import PrimaryButton from "../PrimaryButton"
import DropdownNavbarMenu from "../DropdownNavbarMenu"
import { Link } from "react-router-dom"
import "./Navbar.css"


export default function Navbar() {
    return (
        <>
            <section className="Navbar fixed w-full z-50">
                <nav>
                    <div className="navbar-container navbar-bg bg-white shadow-lg">
                        <div className="navbar-wrapper mycontainer flex justify-between items-center h-[82px] w-full">
                            <div className="navbar-left">
                                <div className="navbar-logo">
                                    <Link to={"/"}>
                                        <img src={FestiventLogoBlack}
                                            alt=""
                                            srcset=""
                                            className="md:max-w-[150px] md:min-w-[150px] w-[30px]" />
                                    </Link>
                                </div>
                            </div>

                            <div className="navbar-middle">
                                <ul className="navbar-menus flex gap-10">
                                    <li className="menu-item">
                                        <DropdownNavbarMenu menuTitle="Events" />
                                    </li>
                                    <li className="menu-item">
                                        <DropdownNavbarMenu menuTitle="Events" />
                                    </li>
                                    <li className="menu-item">
                                        <DropdownNavbarMenu menuTitle="Events" />
                                    </li>
                                    <li className="menu-item">
                                        <DropdownNavbarMenu menuTitle="Events" />
                                    </li>
                                    <li className="menu-item">
                                        <DropdownNavbarMenu menuTitle="Events" />
                                    </li>
                                </ul>
                            </div>

                            <div className="navbar-right">
                                <div className="navbar-actions flex gap-2">
                                    <div className="action-create-event">
                                        <Link to={"/create"}>
                                            <PrimaryButton buttonText="Create an Event" bgColor="white" textColor="black" />
                                        </Link>
                                    </div>
                                    <div className="action-login">
                                        <Link to={"/login"}>
                                            <PrimaryButton buttonText="Log in" bgColor="black" textColor="white" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </section>
        </>
    )
}