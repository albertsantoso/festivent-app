import "./Footer.css"
import { FaArrowRight } from "react-icons/fa"
import FestiventLogoBlack from "./../../Assets/Logo/festivent-logo-black.png"
import ReactCountryFlag from "react-country-flag"
import { useEffect, useState } from "react"
import axios from "axios"
import AppStore from "./../../Assets/Badges/app_store.png"
import { Link } from "react-router-dom"



export default function Footer() {
    const [eventCategories, setEventCategories] = useState(null)

    const getEvents = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/event_categories");
            // console.log(data);
            setEventCategories(data)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <>
            <div className={`Footer border-t-2 md:p-[60px] pt-4 pb-10`}>
                <div className="md:footer-container container md:px-[30px] md:mx-auto md:max-w-[1300px] px-6 bg-white">
                    <div className="footer-body md:flex block">
                        <div className="download-column mb-2 w-full text-left">
                            <h3 className="font-bold text-lg md:mb-4">Download the app</h3>
                            <div className="download-input w-[400px] hidden items-center justify-between relative md:flex">
                                <form action="" className="w-full">
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Enter email to get an update news"
                                            className="py-2 px-4 w-full rounded-lg border-2" />
                                    </div>
                                </form>
                                <span className="pr-4 absolute right-0">
                                    <FaArrowRight />
                                </span>
                            </div>
                            <p className="text-sm font-medium text-gray-400 mt-4 md:inline hidden">Message and data rates may apply.</p>
                            <div className="download-links flex items-center w-[300px] md:w-[360px] md:mt-6">
                                <div className="app-store">
                                    <a href='https://play.google.com/store/apps/details?id=com.twitter.android&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Download on the App Store' src={AppStore} /></a>
                                </div>
                                <div className="play-store">
                                    <a href='https://play.google.com/store/apps/details?id=com.twitter.android&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' className="w-[600px]" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="menus-column w-full grid grid-cols-2 gap-y-4 gap-x-6 mb-4 mt-4 md:mt-0 md:flex md:justify-between md:pl-20">
                            <div className="footer-categories text-left row-span-2">
                                <h3 className="font-bold mb-2 md:mb-4">Categories</h3>
                                <div className="flex flex-col gap-2">
                                    {
                                        eventCategories?.map((eventCategory) => {
                                            return (
                                                <Link>
                                                    <span className="hover:underline">
                                                        {eventCategory.name}
                                                    </span>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="footer-social text-left">
                                <h3 className="font-bold mb-2 md:mb-4">Social</h3>
                                <div className="flex flex-col gap-2">
                                    <Link>
                                        <span className="hover:underline">Instagram</span>
                                    </Link>
                                    <Link>
                                        <span className="hover:underline">Twitter</span>
                                    </Link>
                                    <Link>
                                        <span className="hover:underline">Facebook</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="footer-developer text-left">
                                <h3 className="font-bold mb-2 md:mb-4">Use eventbrite</h3>
                                <div className="flex flex-col gap-2">
                                    <Link>
                                        <span className="hover:underline">Create an Event</span>
                                    </Link>
                                    <Link>
                                        <span className="hover:underline">Pricing</span>
                                    </Link>
                                    <Link>
                                        <span className="hover:underline">Content Standards</span>
                                    </Link>
                                    <Link>
                                        <span className="hover:underline">FAQs</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom md:pt-10 mt-4 md:mt-20 border-t-[1px] gap-y-4 grid md:grid-cols-2 grid-cols-1 grid-rows-2 grid-flow-dense">
                        <span className="legal-logo flex items-center gap-6 w-full">
                            <a href="/">
                                <img src={FestiventLogoBlack} alt="" srcset="" className="w-[140px] md:h-[20px]" />
                            </a>
                            <h3 className="mt-[2px] md:text-base text-sm text-left">© 2023 Festivent. All rights reserved.</h3>
                        </span>
                        <span className="legal-links w-full">
                            <ul className="flex flex-wrap md:justify-between items-center gap-4 font-medium text-gray-500">
                                <li>
                                    <button className="flex items-center">
                                        <span className="flag mr-2">
                                            <ReactCountryFlag
                                                countryCode="ID"
                                                svg
                                                style={{
                                                    width: '1.4em',
                                                    boxShadow: "0 0 4px rgba(0,0,0,.4)",
                                                    marginTop: "-2px",
                                                }} />
                                        </span>
                                        <p>IDR</p>
                                    </button>
                                </li>
                                <li>
                                    <button className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 14" height="16"><path d="M7.4 12.8h6.8l3.1-11.6H7.4C4.2 1.2 1.6 3.8 1.6 7s2.6 5.8 5.8 5.8z" style={{ fillRule: "evenodd", clipRule: "evenodd", fill: "#fff" }}></path><path d="M22.6 0H7.4c-3.9 0-7 3.1-7 7s3.1 7 7 7h15.2c3.9 0 7-3.1 7-7s-3.2-7-7-7zm-21 7c0-3.2 2.6-5.8 5.8-5.8h9.9l-3.1 11.6H7.4c-3.2 0-5.8-2.6-5.8-5.8z" style={{ fillRule: "evenodd", clipRule: "evenodd", fill: "#06f" }}></path><path d="M24.6 4c.2.2.2.6 0 .8L22.5 7l2.2 2.2c.2.2.2.6 0 .8-.2.2-.6.2-.8 0l-2.2-2.2-2.2 2.2c-.2.2-.6.2-.8 0-.2-.2-.2-.6 0-.8L20.8 7l-2.2-2.2c-.2-.2-.2-.6 0-.8.2-.2.6-.2.8 0l2.2 2.2L23.8 4c.2-.2.6-.2.8 0z" style={{ fill: "#fff" }} ></path><path d="M12.7 4.1c.2.2.3.6.1.8L8.6 9.8c-.1.1-.2.2-.3.2-.2.1-.5.1-.7-.1L5.4 7.7c-.2-.2-.2-.6 0-.8.2-.2.6-.2.8 0L8 8.6l3.8-4.5c.2-.2.6-.2.9 0z" style={{ fill: "#06f" }}></path></svg>
                                        <span className="ml-2">
                                            Your privacy choices
                                        </span>
                                    </button>
                                </li>
                                <li><a href="http://">Terms</a></li>
                                <li><a href="http://">Privacy</a></li>
                                <li><a href="http://">Site map</a></li>
                            </ul>
                        </span>
                    </div>
                </div>
            </div >
        </>
    )
}