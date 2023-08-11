import { AiTwotoneCalendar } from "react-icons/ai"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PrimaryButton from "../../Components/PrimaryButton";
import { useState } from "react";
import { Modal } from "flowbite-react";
import { FaCreditCard } from "react-icons/fa"
import { RiPaypalFill } from "react-icons/ri"

export default function EventDetailPage() {
    const [openModal, setOpenModal] = useState(undefined);

    const FlowbiteCustomThemeContent = {
        "root": {
            "base": "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
            "show": {
                "on": "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
                "off": "hidden"
            }
        },
        "content": {
            "base": "relative h-full w-full p-4 md:h-auto",
            "inner": "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]"
        }
    }

    const handleClick = () => setOpenModal("default");

    return (
        <>
            <div className="EventDetailPage">
                <section className="py-[82px]">
                    <div className="event-detail-container mycontainer">
                        <main className="event-details-structure-main">
                            <div className="event-details">
                                <div className="event-hero-wrapper py-12">
                                    <div className="event-hero">
                                        <img src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F480287939%2F280287688191%2F1%2Foriginal.20230329-100333?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C1080%2C540&s=92382bd2385c2e6717c96cb88e3d1202" alt="" className="mx-auto" />
                                    </div>
                                </div>

                                <div className="event-details-wrapper grid grid-cols-6">
                                    <div className="event-details-main text-left col-span-4 max-w-[720px]">
                                        <div className="event-details-main-heading main-inner ff-space-g">
                                            <section className="event-details-head mb-12">
                                                <div id="time" className="font-semibold text-2xl text-neutral-700 mb-2">
                                                    Friday, October 13
                                                </div>
                                                <div className="event-details-title font-bold text-6xl mb-6">
                                                    <h1>
                                                        Learning Management Conference - Jakarta
                                                    </h1>
                                                </div>
                                                <div className="event-details-summary font-medium text-neutral-500 text-sm">
                                                    <p>Join us in Jakarta for a 2-day professional development and community event to learn and network with fellow educators in your region!</p>
                                                </div>
                                            </section>
                                            <section className="organizer-info flex justify-between items-center bg-gradient-to-r from-blue-50 to-green-50 py-4 px-6 w-full rounded-lg mb-16">
                                                <div className="organizer-info-profile flex items-center">
                                                    <div className="organizer-info-avatar mr-4">
                                                        <img src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F242249829%2F280287688191%2F1%2Foriginal.png?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C3084%2C3084&s=badbeb71947e962eb4060bc7383a1042" alt="profile" className="w-[52px] rounded-full" />
                                                    </div>
                                                    <div className="organizer-info-profile">
                                                        <span className="organizer-info-name">By <strong>Faria Education Group</strong></span>
                                                    </div>
                                                </div>
                                                <div className="organizer-account-follow justify-self-end">
                                                    {/* <button className="bg-blue-600 py-2 px-6 rounded-lg text-white">Follow</button> */}
                                                    <PrimaryButton bgColor={"black"} buttonText={"Follow"} />
                                                </div>
                                            </section>
                                        </div>
                                        <section className="event-details-section mb-20">
                                            <div className="event-details-section-title mb-4">
                                                <h2 className="font-bold text-2xl ff-space-g">When and where</h2>
                                            </div>
                                            <div className="event-details-grid grid grid-cols-2">
                                                <section className="time-date-heading">
                                                    <div className="detail">
                                                        <div className="detail-inner flex pr-8">
                                                            <div className="detail-time-date-icon mr-4">
                                                                <AiTwotoneCalendar size={40} className="p-2 rounded-lg bg-gradient-to-r from-yellow-50 to-pink-50" />
                                                            </div>
                                                            <div className="detail-time-date-content">
                                                                <div className="time-date-heading ">
                                                                    <h3 className="ff-space-g font-bold text-lg">Date and time</h3>
                                                                </div>
                                                                <div className="detail-time-date-details">
                                                                    <p className="font-medium text-sm"><span>October 13 · 8:30am - October 14 · 4:30pm WIB</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>

                                                <section className="location-heading">
                                                    <div className="detail">
                                                        <div className="detail-inner flex pl-8">
                                                            <div className="detail-location-icon mr-4">
                                                                <LocationOnIcon sx={{ fontSize: 40 }} className="p-2 rounded-lg bg-gradient-to-r from-yellow-50 to-pink-50" />
                                                            </div>
                                                            <div className="detail-location-content">
                                                                <div className="location-heading ">
                                                                    <h3 className="ff-space-g font-bold text-lg">Location</h3>
                                                                </div>
                                                                <div className="detail-location-details">
                                                                    <p className="font-medium text-sm"><span className="font-semibold">Sekolah Pelita Harapan Lippo Village</span> 2500 Jalan Boulevard Palem Raya Kec. Klp. Dua, Banten 15810</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </section>
                                        <section className="event-details-content">
                                            <div className="event-details-about">
                                                <div className="event-details-section-title mb-4">
                                                    <h2 className="font-bold text-2xl ff-space-g">About this event</h2>
                                                </div>
                                                <div className="event-details-description">
                                                    <div className="description">
                                                        <div className="description-texts">
                                                            <p className="mb-4">
                                                                <span>
                                                                    We welcome you to join our first ever Learning Management Conference hosted at Sekolah Pelita Harapan Lippo Village on 13 & 14 October 2023.
                                                                </span>
                                                            </p>
                                                            <p className="mb-4">
                                                                With an array of workshops, enlightening keynotes, panel discussions, and interactive sessions, participants explore themes such as seamless tech integration in education, personalized learning paths, gamification, effective assessment methods, and the potential of data-driven insights.
                                                            </p>
                                                            <p className="mb-4">
                                                                What sets this conference apart is its emphasis on collaboration and networking. Attendees connect with peers, exchange insights, and establish lasting professional relationships. The event's interactive workshops allow participants to experiment with tools and techniques for their teaching environments.
                                                            </p>
                                                            <p className="mb-4">
                                                                The Learning Management Conference serves as a wellspring of inspiration, featuring esteemed speakers who leave attendees invigorated and armed with innovative ideas. Amid an enthusiastic atmosphere, it cements a commitment to shaping the future of learning through technology and pedagogical advances, ultimately transforming education into a dynamic, engaging, and transformative experience.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <div className="event-details-aside col-span-2 ml-12">
                                        <div className="price-get-tickets-container bg-neutral-100 drop-shadow-lg rounded-lg sticky top-[114px] bottom-auto">
                                            <div className="price-get-tickets-inner flex flex-col p-6 text-neutral-700">
                                                <div className="price-bar flex justify-between items-end">
                                                    <h2 className="font-semibold text-xl ">Price</h2>
                                                    <span className="flex items-end">
                                                        <h3 className="mr-2 font-semibold line-through decoration-2 text-red-500">$399</h3>
                                                        <h3 className="font-bold text-xl">$299</h3>
                                                    </span>
                                                </div>
                                                <div className="buy-tickets-wrapper mt-8">
                                                    {/* <button type="submit" value="" name=""
                                                        className="bg-gradient-to-r from-yellow-50 to-pink-50 w-full py-4 ">Buy Tickets Now</button> */}
                                                    <PrimaryButton handleFunction={handleClick} textColor={"white"} buttonText={"Get tickets now"} bgColor={"bg-gradient-animation-1"} width={"full"}
                                                        customStyle={"hover:scale-105 active:scale-100"} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Modal show={openModal === 'default'} size={"6xl"} onClose={() => setOpenModal(undefined)} theme={FlowbiteCustomThemeContent}>
                                        <Modal.Header>
                                            <h1 className="ff-space-g font-bold text-2xl">
                                                Checkout - <span>Learning Management Conference</span>
                                            </h1>
                                        </Modal.Header>
                                        <Modal.Body className="p-0">
                                            <div className="modal-body-container">
                                                <div className="modal-panel-wrapper ff-inter grid grid-cols-6">
                                                    <div className="panel-left-wrapper col-span-4 pl-12 pt-6 pb-12">
                                                        <main className="panel-left-main pr-8">
                                                            <div className="modal-content-children">
                                                                <div className="modal-content-children-wrapper mb-4">
                                                                    <h4 className="font-medium text-sm w-[90%]">Please make sure to fill in your information correctly, preferably with your work email. Thank you!</h4>
                                                                </div>
                                                                <div className="form-modal-container flex flex-col gap-10">
                                                                    <section className="billing-info">
                                                                        <div className="billing-info-containr">
                                                                            <h2 className="title-section ff-space-g font-bold text-2xl mb-2">Billing Information</h2>
                                                                            <div className="subtitle-section text-sm mb-4">
                                                                                Logged in as <strong>albertsantosot@gmail.com</strong>.
                                                                            </div>
                                                                            <div className="form-modal-name-group grid grid-cols-2 gap-2 mb-4">
                                                                                <div className="form-modal-group flex flex-col">
                                                                                    <label htmlFor="first_name" className="font-medium mb-2">First name <span className="text-red-500">*</span></label>
                                                                                    <input type="text" name="first_name" id="first_name" className="bg-neutral-100 border-2 rounded-lg border-neutral-300 font-medium" />
                                                                                </div>
                                                                                <div className="form-modal-group flex flex-col">
                                                                                    <label htmlFor="last_name" className="font-medium mb-2">Last name <span className="text-red-500">*</span></label>
                                                                                    <input type="text" name="last_name" id="last_name" className="bg-neutral-100 border-2 rounded-lg border-neutral-300 font-medium" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-modal-group flex flex-col">
                                                                                <label htmlFor="email" className="font-medium mb-2">Email address <span className="text-red-500">*</span></label>
                                                                                <input type="text" name="email" id="email" className="bg-neutral-100 border-2 rounded-lg border-neutral-300 font-medium" />
                                                                            </div>
                                                                        </div>
                                                                    </section>
                                                                    <section className="payment-method">
                                                                        <div className="paymend-method-container">
                                                                            <h2 className="title-section ff-space-g font-bold text-2xl mb-4">Select payment method</h2>
                                                                            <div className="form-payment-method-group rounded-lg border-2 divide-y-2">
                                                                                <div className="form-modal-group flex justify-between px-6 py-6 hover:bg-neutral-50 duration-150">
                                                                                    <label htmlFor="paypal" className="flex items-center gap-2 font-medium">
                                                                                        <input type="radio" name="payment" id="paypal" />
                                                                                        Paypal
                                                                                    </label>
                                                                                    <RiPaypalFill size={30} />
                                                                                </div>
                                                                                <div className="form-modal-group flex justify-between px-6 py-6 hover:bg-neutral-50 duration-150">
                                                                                    <label htmlFor="crorcc" className="flex items-center gap-2 font-medium ">
                                                                                        <input type="radio" name="payment" id="crorcc" />
                                                                                        Credit card or debit card
                                                                                    </label>
                                                                                    <FaCreditCard size={26} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </section>
                                                                    <section className="place-order">
                                                                        <div className="place-order-container">
                                                                            <div className="form-modal-group flex items-center gap-2 mb-4">
                                                                                <input type="checkbox" name="tnc" id="tnc" />
                                                                                <label htmlFor="tnc" className="font-medium text-sm">By selecting Place Order, I agree to the Festivent Terms of Service</label>
                                                                            </div>
                                                                            <PrimaryButton handleFunction={handleClick} textColor={"white"} buttonText={"Place Order"} bgColor={"bg-gradient-animation-1"} customStyle={"hover:scale-105 active:scale-100 px-8"} />
                                                                        </div>
                                                                    </section>

                                                                </div>
                                                            </div>
                                                        </main>
                                                    </div>
                                                    <div className="panel-right-wrapper col-span-2 bg-neutral-100 rounded-br-lg">
                                                        <div className="panel-right-content ">
                                                            <aside className="">
                                                                <div className="aside-image-wrapper">
                                                                    <img src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F480287939%2F280287688191%2F1%2Foriginal.20230329-100333?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C1080%2C540&s=92382bd2385c2e6717c96cb88e3d1202" alt="" className="mx-auto" />
                                                                </div>
                                                                <div className="order-summary-wrapper p-8">
                                                                    <h2 className="order-summary-event-title ff-space-g font-bold text-lg mb-6">Learning Management Conference</h2>
                                                                    <h4 className="font-medium text-l mb-6">Order summary</h4>
                                                                    <div className="order-summary-calc ">
                                                                        <div className="summary-calc grid grid-rows-6 h-[380px]">
                                                                            <div className="summary flex justify-between row-span-5">
                                                                                <span>1 x eTicket</span> <span>$299</span>
                                                                            </div>

                                                                            <div className="total flex justify-between border-t-2 pt-4">
                                                                                <strong>Total</strong> <strong>$299</strong>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </aside>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </div >
                        </main >
                    </div >
                </section >
            </div >
        </>
    )
}