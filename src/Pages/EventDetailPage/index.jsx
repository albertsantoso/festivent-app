import { AiTwotoneCalendar } from "react-icons/ai";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PrimaryButton from "../../Components/PrimaryButton";
import { useEffect, useRef, useState } from "react";
import { Modal } from "flowbite-react";
import { FaCreditCard } from "react-icons/fa";
import { RiPaypalFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { LegendToggleOutlined } from "@mui/icons-material";

export default function EventDetailPage() {
    const [openModal, setOpenModal] = useState(undefined);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const userId = localStorage.getItem("idLogin");
    const [date, setDate] = useState(null);
    const [availableRefCode, setAvailableRefCode] = useState(null);
    const [finalPrice, setFinalPrice] = useState(0);
    const [tickets, setTickets] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [discountRefCode, setDiscountRefCode] = useState(0);
    const [statusRefCode, setStatusRefCode] = useState("");
    const [usePoints, setUsePoints] = useState(0);
    const [newRefCode, setNewRefCode] = useState(0);
    const [refCodeOwner, setRefCodedOwner] = useState(null);
    const [refCodeUsed, setRefCodeUsed] = useState(false);
    const inputRefCode = useRef();
    const navigate = useNavigate();

    const getDataLoggedInUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/users/${userId}`);
            setLoggedInUser(data);
        } catch (error) {
            console.log("🚀 ~ file: index.jsx:32 ~ getDataLoggedInUser ~ error:", error);
        }
    };

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/events/${id}?_expand=user`);
            const res2 = await axios.get(`http://localhost:5000/tickets?eventId=${id}`);
            const res3 = await axios.get(`http://localhost:5000/ref_code?eventId=${id}`);
            setEvent(res.data);
            setTickets(res2.data);
            setAvailableRefCode(res3.data);
        } catch (error) {
            console.log(error);
        }
    };

    const onRefCode = () => {
        availableRefCode.map((v) => {
            if (Number(v.code) === Number(inputRefCode.current.value)) {
                const diskon = event.price * (event.discount / 100);
                setStatusRefCode("code found");
                setRefCodedOwner(v.userId);
                setRefCodeUsed(true);
                return setDiscountRefCode(diskon);
            } else {
                setRefCodeUsed(false);
                setDiscountRefCode(0);
                setRefCodedOwner(null);
                setStatusRefCode("code is not found");
            }
        });
    };


    const onPoints = () => {
        if (!usePoints) {
            setUsePoints(loggedInUser.ref_points);
        } else {
            setUsePoints(0);
        }
    };

    const checkIsRegistered = () => {
        if (tickets) {
            tickets.map((v) => {
                if (Number(v.userId) === Number(userId)) {
                    setIsRegistered(true);
                }
            });
        }
    };
    
    useEffect(() => {
        getDataLoggedInUser();
        fetchData();
    }, []);

    useEffect(() => {
        checkIsRegistered();
    }, [tickets]);

    useEffect(() => {
        if (event) {
            const date = new Date(event.datetime_start[0]);
            const dayMonthDate = date.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            setDate(dayMonthDate);
        }
    }, [event]);

    const generateRandomNumber = () => {
        var minm = 100000;
        var maxm = 999999;
        return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    };

    const FlowbiteCustomThemeContent = {
        root: {
            base: "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
            show: {
                on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
                off: "hidden",
            },
        },
        content: {
            base: "relative h-full w-full p-4 md:h-auto",
            inner: "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]",
        },
    };

    const belumLogin = () => {
        alert("Please login first");
        navigate("/login");
    };

    const handleClick1 = () => setOpenModal("default1");
    const handleClick2 = () => setOpenModal("default2");
    const handleClick3 = async () => {
        setOpenModal("final");
        const ticket = {
            eventId: Number(id),
            userId: Number(userId),
            price: finalPrice,
        };
        await axios.post("http://localhost:5000/tickets", ticket);
    };

    const onPlaceOrder = async () => {
        setOpenModal("final");
        const fp = event.price - usePoints - discountRefCode;
        const ticket = {
            eventId: Number(id),
            userId: Number(userId),
            price: fp,
        };
        let pointAkhir = 0;
        if (usePoints - (event.price - discountRefCode) > 0) {
            pointAkhir = usePoints - (event.price - discountRefCode);
        } else if (usePoints - (event.price - discountRefCode) <= 0) {
            pointAkhir = 0;
        }

        const randomNumber = generateRandomNumber();
        setNewRefCode(randomNumber);
        const dataRef = {
            eventId: Number(id),
            userId: Number(userId),
            code: randomNumber,
        };
        await axios.post("http://localhost:5000/tickets", ticket);
        await axios.post("http://localhost:5000/ref_code", dataRef);
        await axios.patch(`http://localhost:5000/users/${userId}`, {
            ref_points: Number(pointAkhir),
        });
        if (refCodeUsed) {
            await axios.patch(`http://localhost:5000/events/${id}`, {
                count: Number(event.count) + 1,
            });
        }
        if (refCodeOwner) {
            const res = await axios.get(`http://localhost:5000/users/${refCodeOwner}`);
            await axios.patch(`http://localhost:5000/users/${refCodeOwner}`, {
                ref_points: Number(Number(res.data.ref_points) + 5000),
            });
        }
    };
    return (
        <>
            {!event ? null : (
                <div className="EventDetailPage">
                    <section className="py-[82px]">
                        <div className="event-detail-container mycontainer">
                            <main className="event-details-structure-main">
                                <div className="event-details">
                                    <div className="event-hero-wrapper py-12">
                                        <div className="event-hero">
                                            <img src={`${event.image}`} alt="" className="mx-auto" />
                                        </div>
                                    </div>

                                    <div className="event-details-wrapper grid grid-cols-6">
                                        <div className="event-details-main text-left col-span-4 max-w-[720px]">
                                            <div className="event-details-main-heading main-inner ff-space-g">
                                                <section className="event-details-head mb-12">
                                                    <div id="time" className="font-semibold text-2xl text-neutral-700 mb-2">
                                                        {date}
                                                    </div>
                                                    <div className="event-details-title font-bold text-6xl mb-6">
                                                        <h1>{event.title}</h1>
                                                    </div>
                                                    <div className="event-details-summary font-medium text-neutral-500 text-sm">
                                                        <p>{event.summary}</p>
                                                    </div>
                                                </section>
                                                <section className="organizer-info flex justify-between items-center bg-gradient-to-r from-blue-50 to-green-50 py-4 px-6 w-full rounded-lg mb-16">
                                                    <div className="organizer-info-profile flex items-center">
                                                        <div className="organizer-info-avatar mr-4">
                                                            <img
                                                                src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F242249829%2F280287688191%2F1%2Foriginal.png?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C3084%2C3084&s=badbeb71947e962eb4060bc7383a1042"
                                                                alt="profile"
                                                                className="w-[52px] rounded-full"
                                                            />
                                                        </div>
                                                        <div className="organizer-info-profile">
                                                            <span className="organizer-info-name">
                                                                By <strong>{event.user.fullname}</strong>
                                                            </span>
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
                                                                        <p className="font-medium text-sm">
                                                                            <span>
                                                                                {event.datetime_start[0]}·{event.datetime_start[1]}-{event.datetime_end[0]}·{event.datetime_end[1]}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>

                                                    <section className="location-heading">
                                                        <div className="detail">
                                                            <div className="detail-inner flex pl-8">
                                                                <div className="detail-location-icon mr-4">
                                                                    <LocationOnIcon
                                                                        sx={{
                                                                            fontSize: 40,
                                                                        }}
                                                                        className="p-2 rounded-lg bg-gradient-to-r from-yellow-50 to-pink-50"
                                                                    />
                                                                </div>
                                                                <div className="detail-location-content">
                                                                    <div className="location-heading ">
                                                                        <h3 className="ff-space-g font-bold text-lg">Location</h3>
                                                                    </div>
                                                                    <div className="detail-location-details">
                                                                        <p className="font-medium text-sm">{event.location}</p>
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
                                                                    <span>{event.description}</span>
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
                                                            <h3 className="font-bold text-xl">{event.price === 0 ? "Free" : event.price}</h3>
                                                        </span>
                                                    </div>
                                                    <div className="buy-tickets-wrapper mt-8">
                                                        {/* <button type="submit" value="" name=""
                                                        className="bg-gradient-to-r from-yellow-50 to-pink-50 w-full py-4 ">Buy Tickets Now</button> */}
                                                        {isRegistered ? (
                                                            <>
                                                                <PrimaryButton
                                                                    handleFunction={null}
                                                                    customStyle={"cursor-not-allowed"}
                                                                    textColor={"white"}
                                                                    buttonText={"Registered"}
                                                                    bgColor={"bg-gradient-animation-1"}
                                                                    width={"full"}
                                                                />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <PrimaryButton
                                                                    handleFunction={loggedInUser ? handleClick1 : belumLogin}
                                                                    textColor={"white"}
                                                                    buttonText={"Get tickets now"}
                                                                    bgColor={"bg-gradient-animation-1"}
                                                                    width={"full"}
                                                                    customStyle={"hover:scale-105 active:scale-100"}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {loggedInUser ? (
                                            <>
                                                <Modal show={openModal === "default1"} size={"2xl"} onClose={() => setOpenModal(undefined)} theme={FlowbiteCustomThemeContent}>
                                                    <Modal.Header>
                                                        <h1 className="ff-space-g font-bold text-2xl">
                                                            <span>{event.title}</span>
                                                        </h1>
                                                    </Modal.Header>
                                                    <Modal.Body className="p-0">
                                                        <div className="modal-body-container">
                                                            <div className="modal-panel-wrapper ff-inter">
                                                                <div className="panel-left-wrapper px-12 py-6 pb-8">
                                                                    <main className="panel-left-main">
                                                                        <div className="modal-content-children">
                                                                            <div className="modal-content-children-wrapper mb-4">
                                                                                <h4 className="font-medium text-sm w-[90%]">Please make sure that the information below is yours, Thank you!</h4>
                                                                            </div>
                                                                            <div className="form-modal-container flex flex-col gap-10">
                                                                                <section className="billing-info">
                                                                                    <div className="billing-info-containr">
                                                                                        <h2 className="title-section ff-space-g font-bold text-2xl mb-2">Is this you?</h2>
                                                                                        <div className="subtitle-section text-sm mb-4">
                                                                                            Logged in as <strong>{loggedInUser.email}</strong>.
                                                                                        </div>
                                                                                        <div className="form-modal-name-group mb-4">
                                                                                            <div className="form-modal-group flex flex-col">
                                                                                                <label htmlFor="last_name" className="font-medium mb-2">
                                                                                                    Full name <span className="text-red-500">*</span>
                                                                                                </label>
                                                                                                <input
                                                                                                    disabled
                                                                                                    type="text"
                                                                                                    name="last_name"
                                                                                                    id="last_name"
                                                                                                    className="bg-neutral-100 border-2 rounded-lg border-neutral-300 font-medium"
                                                                                                    value={loggedInUser.fullname}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="form-modal-group flex flex-col">
                                                                                            <label htmlFor="email" className="font-medium mb-2">
                                                                                                Email address <span className="text-red-500">*</span>
                                                                                            </label>
                                                                                            <input
                                                                                                disabled
                                                                                                type="text"
                                                                                                name="email"
                                                                                                id="email"
                                                                                                className="bg-neutral-100 border-2 rounded-lg border-neutral-300 font-medium"
                                                                                                value={loggedInUser.email}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </section>
                                                                                <section className="place-order">
                                                                                    <div className="place-order-container flex gap-2 justify-end">
                                                                                        {event.price === 0 ? (
                                                                                            <>
                                                                                                <PrimaryButton
                                                                                                    handleFunction={handleClick3}
                                                                                                    textColor={"white"}
                                                                                                    buttonText={"Confirm"}
                                                                                                    bgColor={"bg-gradient-animation-1"}
                                                                                                    customStyle={"hover:scale-105 active:scale-100 px-8"}
                                                                                                />
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                                <PrimaryButton
                                                                                                    handleFunction={handleClick2}
                                                                                                    textColor={"white"}
                                                                                                    buttonText={"Confirm"}
                                                                                                    bgColor={"bg-gradient-animation-1"}
                                                                                                    customStyle={"hover:scale-105 active:scale-100 px-8"}
                                                                                                />
                                                                                            </>
                                                                                        )}
                                                                                        <PrimaryButton
                                                                                            handleFunction={() => setOpenModal(undefined)}
                                                                                            textColor={"white"}
                                                                                            buttonText={"No"}
                                                                                            bgColor={"black"}
                                                                                            customStyle={"hover:scale-105 active:scale-100 px-8"}
                                                                                        />
                                                                                    </div>
                                                                                </section>
                                                                            </div>
                                                                        </div>
                                                                    </main>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Modal.Body>
                                                </Modal>
                                                <Modal show={openModal === "default2"} size={"6xl"} onClose={() => setOpenModal(undefined)} theme={FlowbiteCustomThemeContent}>
                                                    <Modal.Header>
                                                        <h1 className="ff-space-g font-bold text-2xl">
                                                            Checkout - <span>{event.title}</span>
                                                        </h1>
                                                    </Modal.Header>
                                                    <Modal.Body className="p-0">
                                                        <div className="modal-body-container">
                                                            <div className="modal-panel-wrapper ff-inter grid grid-cols-6">
                                                                <div className="panel-left-wrapper col-span-4 pl-12 pt-6 pb-12">
                                                                    <main className="panel-left-main pr-8">
                                                                        <div className="modal-content-children">
                                                                            <div className="form-modal-container flex flex-col gap-4">
                                                                                <section className="billing-info">
                                                                                    <div className="billing-info-containr">
                                                                                        <div className="subtitle-section text-sm">
                                                                                            Logged in as <strong>{loggedInUser.email}</strong>.
                                                                                        </div>
                                                                                    </div>
                                                                                </section>
                                                                                <section className="payment-method">
                                                                                    <div className="paymend-method-container mb-8">
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
                                                                                <section className="payment-method">
                                                                                    <div className="paymend-method-container mb-2">
                                                                                        <div className="form-payment-method-group grid grid-cols-2 gap-2">
                                                                                            <div className="form-modal-group flex flex-col">
                                                                                                <label htmlFor="ref_code" className="font-medium mb-2">
                                                                                                    Referral code
                                                                                                </label>
                                                                                                {event.count >= event.max ? (
                                                                                                    <>
                                                                                                        <div className="flex gap-4">
                                                                                                            <input
                                                                                                                disabled
                                                                                                                type="text"
                                                                                                                name="ref_code"
                                                                                                                id="ref_code"
                                                                                                                ref={inputRefCode}
                                                                                                                className="border-2 rounded-lg border-neutral-300 font-medium mb-2"
                                                                                                            />
                                                                                                        </div>
                                                                                                        <div>Discount used up</div>
                                                                                                    </>
                                                                                                ) : (
                                                                                                    <>
                                                                                                        <div className="flex gap-4">
                                                                                                            <input
                                                                                                                onChange={() => onRefCode()}
                                                                                                                type="text"
                                                                                                                name="ref_code"
                                                                                                                id="ref_code"
                                                                                                                ref={inputRefCode}
                                                                                                                className="border-2 rounded-lg border-neutral-300 font-medium mb-2"
                                                                                                            />
                                                                                                        </div>
                                                                                                        <div>{statusRefCode}</div>
                                                                                                    </>
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </section>
                                                                                <section className="payment-method">
                                                                                    <div className="paymend-method-container mb-8">
                                                                                        <div className="form-payment-method-group">
                                                                                            <div className="font-medium mb-2">
                                                                                                {`Your point(s): `} {loggedInUser.ref_points}
                                                                                            </div>
                                                                                            <div className="form-modal-group flex items-center gap-2">
                                                                                                <input
                                                                                                    onClick={() => {
                                                                                                        onPoints();
                                                                                                    }}
                                                                                                    type="checkbox"
                                                                                                    name="use_point"
                                                                                                    id="use_point"
                                                                                                    className="border-2 border-neutral-300 font-medium w-[20px] h-[20px]"
                                                                                                    value={loggedInUser.fullname}
                                                                                                />
                                                                                                <label htmlFor="use_points" className="font-medium">
                                                                                                    Use points
                                                                                                </label>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </section>
                                                                                <section className="place-order">
                                                                                    <div className="place-order-container">
                                                                                        <div className="form-modal-group flex items-center gap-2 mb-4">
                                                                                            <input type="checkbox" name="tnc" id="tnc" className="border-2 border-neutral-300 font-medium" />
                                                                                            <label htmlFor="tnc" className="font-medium text-sm">
                                                                                                By selecting Place Order, I agree to the Festivent Terms of Service
                                                                                            </label>
                                                                                        </div>
                                                                                        <PrimaryButton
                                                                                            handleFunction={onPlaceOrder}
                                                                                            textColor={"white"}
                                                                                            buttonText={"Place Order"}
                                                                                            bgColor={"bg-gradient-animation-1"}
                                                                                            customStyle={"hover:scale-105 active:scale-100 px-8"}
                                                                                        />
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
                                                                                <img src={`${event.image}`} alt="" className="mx-auto" />
                                                                            </div>
                                                                            <div className="order-summary-wrapper p-8">
                                                                                <h2 className="order-summary-event-title ff-space-g font-bold text-lg mb-6">{event.title}</h2>
                                                                                <h4 className="font-medium text-l mb-6">Order summary</h4>
                                                                                <div className="order-summary-calc ">
                                                                                    <div className="summary-calc grid grid-rows-6">
                                                                                        <div className="summary flex justify-between">
                                                                                            <span>1 x eTicket</span> <span>{event.price}</span>
                                                                                        </div>
                                                                                        <div className="summary flex justify-between">
                                                                                            <span>Discount</span> <span>{discountRefCode}</span>
                                                                                        </div>
                                                                                        <div className="summary flex justify-between">
                                                                                            <span>Points</span>{" "}
                                                                                            <span>{usePoints - (event.price - discountRefCode) > 0 ? event.price - discountRefCode : usePoints}</span>
                                                                                        </div>
                                                                                        <div className="total flex justify-between border-t-2 pt-4">
                                                                                            <strong>Total</strong>{" "}
                                                                                            <strong>
                                                                                                {event.price - discountRefCode - usePoints > 0 ? event.price - discountRefCode - usePoints : 0}
                                                                                            </strong>
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
                                                <Modal
                                                    dismissible
                                                    show={openModal === "final"}
                                                    size={"6xl"}
                                                    onClose={() => {
                                                        setOpenModal(undefined);
                                                        window.location.reload(false);
                                                    }}
                                                    theme={FlowbiteCustomThemeContent}
                                                >
                                                    <Modal.Body className="p-12">
                                                        <div className="modal-body-container">
                                                            <div className="modal-panel-wrapper ff-inter text-center">
                                                                <h1 className="text-4xl font-bold ff-space-g bg-green-400 py-8 rounded-lg mb-12 text-white">Successfully Registered</h1>
                                                                <h2 className="text-2xl font-medium">{loggedInUser.fullname}</h2>
                                                                <h3>
                                                                    for <span className="text-2xl font-medium">{event.title}</span>
                                                                </h3>
                                                                <h3 className="mb-12">
                                                                    on <span className="text-2xl font-medium ">{date}</span>{" "}
                                                                </h3>
                                                                {event.price === 0 ? null : (
                                                                    <>
                                                                        <h3 className="text-xl font-medium mb-2">Here is your referral code:</h3>
                                                                        <h1 className="text-7xl font-medium mb-12">{newRefCode}</h1>
                                                                    </>
                                                                )}

                                                                <h2 className="font-medium text-2xl">See you on the event! Thank you!</h2>
                                                            </div>
                                                        </div>
                                                    </Modal.Body>
                                                </Modal>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </main>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
}
