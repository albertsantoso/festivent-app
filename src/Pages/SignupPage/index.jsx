import FestiventLogoBlack from "./../../Assets/Logo/festivent-logo-black.png";
import ConcertImage from "./../../Assets/Images/concert_login.jpg";
import "./SignupPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { setEmail, setFullname } from "../../Redux/Features/Users";

export default function SignupPage() {
    const email = useSelector((state) => state.users.email);

    const inputFullname = useRef();
    const inputEmail = useRef();
    const inputPassword = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const postData = async () => {
        const email = inputEmail.current.value;
        const fullname = inputFullname.current.value;
        const password = inputPassword.current.value;

        const dataToSend = {
            fullname: fullname,
            email: email,
            password: password,
            ref_points: 0,
        };

        await axios.post("http://localhost:5000/users", dataToSend);
    };

    const onSignUp = async () => {
        try {
            const email = inputEmail.current.value;
            const password = inputPassword.current.value;
            const res = await axios.get(
                `http://localhost:5000/users?email=${email}`
            );
            if (res.data.length) {
                return toast.error("Email already registered!");
            }
            if (password.length < 6) {
                return toast.error("Password minimum of 6 characters!");
            }
            await postData();
            toast.success("Successfully created!");

            const resp = await axios.get(
                `http://localhost:5000/users?email=${email}`
            );

            localStorage.setItem("idLogin", resp.data[0].id);

            setTimeout(() => {
                dispatch(setEmail(resp.data[0].email));
                dispatch(setFullname(resp.data[0].fullname))
            }, 1000);
        } catch (err) {
            console.log(err);
        }
    };

    if (email) {
        return navigate("/");
    }

    return (
        <>
            <Toaster />
            <div className="SignupPage w-full h-[100vh]">
                <div className="signup-page-container flex">
                    <div className="signup-section w-[50%] h-[100vh]">
                        <div className="signup-section-container px-72 py-44 h-full ">
                            <div className="signup-section-heading flex flex-col items-start mb-12">
                                <div className="signup-heading-logo mb-10">
                                    <Link to={"/"}>
                                        <img
                                            src={FestiventLogoBlack}
                                            alt=""
                                            className="h-5 black-shadow-2xl"
                                        />
                                    </Link>
                                </div>
                                <div className="signup-heading-title">
                                    <h1 className="text-black font-extrabold text-5xl text-left">
                                        Create an account
                                    </h1>
                                </div>
                            </div>
                            <div className="signup-form mb-8">
                                <div className="form-container">
                                    <div className="flex flex-col gap-4">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="full"
                                                id="full"
                                                placeholder="Full Name"
                                                ref={inputFullname}
                                                className="w-full py-3 px-4 rounded-lg font-semibold outline-none"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Email address"
                                                ref={inputEmail}
                                                className="w-full py-3 px-4 rounded-lg font-semibold outline-none"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Password"
                                                ref={inputPassword}
                                                className="w-full py-3 px-4 rounded-lg font-semibold outline-none "
                                            />
                                        </div>
                                        <div className="form-group mt-2">
                                            <button
                                                type="submit"
                                                className={`rounded-lg py-3 px-4 w-full`}
                                                onClick={() => {
                                                    onSignUp();
                                                }}
                                            >
                                                <span className="font-bold text-lg text-white [text-shadow:_0_0_4px_rgb(0_0_0_/_70%)]">
                                                    Sign up
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="create-account text-left">
                                <span className="font-medium">
                                    Already have an account?{" "}
                                    <Link to={"/login"}>
                                        <span className="text-blue-500">
                                            Log in
                                        </span>
                                    </Link>{" "}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="section-image w-[50%]">
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
