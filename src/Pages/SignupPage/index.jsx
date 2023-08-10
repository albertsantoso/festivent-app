import FestiventLogoBlack from "./../../Assets/Logo/festivent-logo-black.png"
import ConcertImage from "./../../Assets/Images/concert_login.jpg"
import "./SignupPage.css"
import { Link } from "react-router-dom"

export default function SignupPage() {
    return (
        <>
            <div className="SignupPage w-full h-[100vh]">
                <div className="signup-page-container flex">
                    <div className="signup-section w-[50%] h-[100vh]">
                        <div className="signup-section-container px-72 py-44 h-full ">
                            <div className="signup-section-heading flex flex-col items-start mb-12">
                                <div className="signup-heading-logo mb-10">
                                    <Link to={"/"}>
                                        <img src={FestiventLogoBlack} alt="" className="h-5 black-shadow-2xl" />
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
                                    <form action="" className="flex flex-col gap-4">
                                        <div className="form-group">
                                            <input type="text" name="full" id="full" placeholder="Full Name"
                                                className="w-full py-3 px-4 rounded-lg font-semibold outline-none" />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" name="email" id="email" placeholder="Email address"
                                                className="w-full py-3 px-4 rounded-lg font-semibold outline-none" />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" name="password" id="password" placeholder="Password"
                                                className="w-full py-3 px-4 rounded-lg font-semibold outline-none " />
                                        </div>
                                        <div className="form-group mt-2">
                                            <button
                                                type="submit"
                                                className={`rounded-lg py-3 px-4 w-full`}>
                                                <span className="font-bold text-lg text-white [text-shadow:_0_0_4px_rgb(0_0_0_/_70%)]">
                                                    Sign up
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="create-account text-left">
                                <span className="font-medium">Already have an account? <Link to={"/login"}><span className="text-blue-500">Log in</span></Link> </span>
                            </div>
                        </div>
                    </div>
                    <div className="section-image w-[50%]">
                        <img src={ConcertImage} alt="" srcset="" className="h-full object-cover" />
                    </div>
                </div>
            </div >
        </>
    )
}