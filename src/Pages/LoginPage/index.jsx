import FestiventLogoBlack from "./../../Assets/Logo/festivent-logo-black.png";
import ConcertImage from "./../../Assets/Images/concert_login.jpg";
import { FcGoogle } from "react-icons/fc";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { onLogin } from "../../Redux/Features/Users";
import { Toaster } from "react-hot-toast";

export default function LoginPage() {
    const email = useSelector((state) => state.users.email);

    const inputEmail = useRef();
    const inputPassword = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (email) {
        return navigate("/");
    }

    return (
        <>
            <Toaster />
            <div className="LoginPage w-full h-[100vh]">
                <div className="login-page-container grid md:grid-cols-2 grid-cols-1">
                    <div className="login-section h-[100vh] px-8 flex items-center">
                        <div className="login-section-container w-[360px] m-auto">
                            <div className="login-section-heading flex flex-col items-start mb-12">
                                <div className="login-heading-logo mb-10">
                                    <Link to={"/"}>
                                        <img
                                            src={FestiventLogoBlack}
                                            alt=""
                                            className="h-5 black-shadow-2xl"
                                        />
                                    </Link>
                                </div>
                                <div className="login-heading-title">
                                    <h1 className="text-black font-extrabold text-5xl">
                                        Log in
                                    </h1>
                                </div>
                            </div>
                            <div className="login-form">
                                <div className="form-container">
                                    <div className="flex flex-col gap-4">
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Email address"
                                                ref={inputEmail}
                                                className="border-2 w-full py-3 px-4 rounded-lg font-semibold outline-none"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Password"
                                                ref={inputPassword}
                                                className="border-2 w-full py-3 px-4 rounded-lg font-semibold outline-none "
                                            />
                                        </div>
                                        <div className="form-group mt-2">
                                            <button
                                                type="submit"
                                                className={`rounded-lg py-3 px-4 w-full hover:scale-105 active:scale-100`}
                                                onClick={() =>
                                                    dispatch(
                                                        onLogin(
                                                            inputEmail.current
                                                                .value,
                                                            inputPassword
                                                                .current.value
                                                        )
                                                    )
                                                }
                                            >
                                                <span className="font-bold text-lg text-white [text-shadow:_0_0_4px_rgb(0_0_0_/_70%)]">
                                                    Log in
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="split-form my-8">
                                <span className="pill border-2 px-4 py-[2px] rounded-full text-sm text-center font-medium text-gray-400">
                                    or
                                </span>
                            </div>
                            <div className="login-google mb-8">
                                <a
                                    href="/"
                                    type="submit"
                                    className={`rounded-lg py-3 px-4 w-full border-2 border-gray-600 hover:border-gray-300 flex justify-center items-center gap-2 bg-white duration-150`}
                                >
                                    <FcGoogle size={24} />
                                    <span className="font-bold text-sm text-gray-700">
                                        Sign in with Google
                                    </span>
                                </a>
                            </div>
                            <div className="create-account text-left">
                                <span className="font-medium">
                                    Don't have an account?{" "}
                                    <Link to={"/signup"}>
                                        <span className="text-blue-500">
                                            Sign up
                                        </span>
                                    </Link>{" "}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="section-image md:block hidden">
                        <img
                            src={ConcertImage}
                            alt=""
                            srcset=""
                            className="h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
