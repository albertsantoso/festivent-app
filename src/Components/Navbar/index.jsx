import FestiventLogoBlack from "./../../Assets/Logo/festivent-logo-black.png";
import FestiventLogoWhite from "./../../Assets/Logo/festivent-logo-white.png";
import PrimaryButton from "../PrimaryButton";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../../Redux/Features/Users";
import DropdownItemsWithIcon from "../AccountDropdown";
import { useState } from "react";

export default function Navbar() {
    const email = useSelector((state) => state.users.email);
    const fullname = useSelector((state) => state.users.fullname)
    const points = useSelector((state) => state.users.points)
    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState(false)

    const [colorChange, setColorChange] = useState(false)

    const changeNavColor = () => {
        window.scrollY >= 480 ? setColorChange(true) : setColorChange(false)
    }

    window.addEventListener("scroll", changeNavColor)

    return (
        <>
            <section className={`Navbar fixed z-10 top-0 left-0 right-0 bg-white  ${colorChange ? "md:bg-white shadow-lg" : "bg-frosted-glass"} duration-200`}>
                <div className={`navbar-wrapper duration-200 md:px-[30px] md:mx-auto md:max-w-[1300px] container md:flex md:justify-between items-center md:py-0 py-4 px-4 md:h-[82px] md:w-full`}>
                    <div className="navbar-left flex gap-0 md:gap-8 items-center justify-between md:justify-start w-full md:w-auto">
                        <div className="navbar-logo">
                            <Link to={"/"}>
                                <img src={colorChange ? FestiventLogoBlack : FestiventLogoWhite} alt="" srcset="" className="md:max-w-[150px] md:min-w-[150px] w-[120px]" />
                            </Link>
                        </div>
                        <div className="navbar-menus">
                            <div className="menu-item">
                                <Link to={"/events"}>
                                    <span className={`font-bold ${colorChange ? "text-black" : "text-white"}`}>Explore events</span>
                                </Link>
                            </div>
                        </div>
                        <div className="navbar-menus md:hidden">
                            <div className={`menu-item text-[28px] ${colorChange ? "text-black" : "text-white"} flex items-center cursor-pointer`} onClick={() => setMenuOpen(!menuOpen)}>
                                <ion-icon name={menuOpen ? "close" : "menu"}></ion-icon>
                            </div>
                        </div>
                    </div>

                    <div className={`navbar-actions md:flex md:items-center md:gap-2 `}>
                        <div className="md:flex md:gap-2 hidden">
                            <div className="action-create-event">
                                {email ? (
                                    <Link to={"/create"}>
                                        <PrimaryButton buttonText="Create an Event" bgColor={`${colorChange ? "bg-gradient-animation-1" : "bg-[#111827]"}`} textColor="white" customStyle={"hover:scale-[1.04] active:scale-[.95]"} />
                                    </Link>
                                ) : (
                                    <>
                                        <Link onClick={() => alert("Please login first")} to={"/login"}>
                                            <PrimaryButton buttonText="Create an Event" bgColor="bg-gradient-animation-1" textColor="white" customStyle={"hover:scale-[1.04] active:scale-[.95]"} />
                                        </Link>
                                    </>
                                )}
                            </div>
                            {
                                email && fullname ?
                                    (
                                        <DropdownItemsWithIcon handleFunctionLogout={() => dispatch(onLogout())} />
                                    )
                                    :
                                    (
                                        <div className="action-login">
                                            <Link to={"/login"}>
                                                <PrimaryButton buttonText="Log in" bgColor="black" textColor="white" customStyle={"hover:scale-[1.04] active:scale-[.95]"} />
                                            </Link>
                                        </div>
                                    )
                            }
                        </div>
                        <div
                            className={`menu-mobile md:hidden text-xl text-right flex items-center justify-between gap-2 md:static absolute md:z-10 -z-[9999] ${menuOpen ? `top-[126px] h-screen opacity-100` : `top-[-50px] opacity-0`}  left-0 right-0 md:p-0 transition-all duration-300`} >
                            <div className={`flex justify-between w-full gap-2 ${colorChange ? "bg-white" : "bg-frosted-glass"} p-4 absolute top-[-68px]`}>
                                <div className="action-create-event w-full">
                                    {email ? (
                                        <Link to={"/create"} onClick={() => setMenuOpen(false)}>
                                            <PrimaryButton buttonText="Create an Event" bgColor="bg-gradient-animation-1" textColor="white" customStyle={"hover:scale-[1.04] active:scale-[.95]"} />
                                            {/* <span>
                                            Create an event
                                        </span> */}
                                        </Link>
                                    ) : (
                                        <>
                                            <Link onClick={() => alert("Please login first")} to={"/login"}>
                                                <PrimaryButton buttonText="Create an Event" bgColor="bg-gradient-animation-1" textColor="white" customStyle={"hover:scale-[1.04] active:scale-[.95]"} />
                                                {/* <span>
                                                Create an event
                                            </span> */}
                                            </Link>
                                        </>
                                    )}
                                </div>
                                {
                                    email && fullname ?
                                        (
                                            <DropdownItemsWithIcon dismissMenu={() => setMenuOpen(false)} handleFunctionLogout={() => dispatch(onLogout())} />
                                        )
                                        :
                                        (
                                            <div className="action-login w-full">
                                                <Link to={"/login"}>
                                                    <PrimaryButton buttonText="Log in" bgColor="black" textColor="white" customStyle={"hover:scale-[1.04] active:scale-[.95]"} />
                                                </Link>
                                            </div>
                                        )
                                }
                            </div>
                            <div className={`dismiss opacity-30 h-screen w-screen absolute ${menuOpen ? `top-[0px] h-screen` : `top-[-9999px]`}`} onClick={() => setMenuOpen(false)}></div>
                        </div>
                    </div>
                </div >
            </section >
        </>
    );
}
