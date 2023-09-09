import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
    const [eventCategories, setEventCategories] = useState(null);
    const [eventCities, setEventCities] = useState(null);
    const navigate = useNavigate();
    const inputTitle = useRef();
    const inputImage = useRef();
    const inputSummary = useRef();
    const inputDescription = useRef();
    const inputPrice = useRef();
    const inputDiscount = useRef();
    const inputMaxUse = useRef();
    const inputCategory = useRef();
    const inputLocation = useRef();
    const inputCity = useRef();
    const inputDateStart = useRef();
    const inputTimeStart = useRef();
    const inputDateEnd = useRef();
    const inputTimeEnd = useRef();

    const getEventCategories = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/event_categories"
            );
            const res2 = await axios.get("http://localhost:5000/event_cities");
            setEventCategories(res.data);
            setEventCities(res2.data);
        } catch (error) {
            alert(error);
        }
    };

    const onCreate = async () => {
        try {
            const id = localStorage.getItem("idLogin");
            if (inputTitle.current.value === "") {
                return toast.error("Please provide the title for your event");
            }
            if (!inputSummary.current.value) {
                return toast.error("Please provide the summary for your event");
            }
            if (!inputDescription.current.value) {
                return toast.error("Please provide the description for your event");
            }
            if (!inputPrice.current.value) {
                return toast.error("Please put the price for your event");
            }
            if (!inputCategory.current.value) {
                return toast.error("Please choose category for your event");
            }
            if (inputLocation.current.value === "") {
                return toast.error("Please provide the location for your event");
            }
            if (inputCity.current.value === "") {
                return toast.error("Please select the city for your event");
            }
            if (!inputDateStart.current.value) {
                return toast.error("Date and time is required");
            }
            if (!inputTimeStart.current.value) {
                return toast.error("Date and time is required");
            }
            if (!inputDateEnd.current.value) {
                return toast.error("Date and time is required");
            }
            if (!inputTimeEnd.current.value) {
                return toast.error("Date and time is required");
            }
            const eventDetails = {
                title: inputTitle.current.value,
                image: inputImage.current.value || "data:image/png;base64,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",
                summary: inputSummary.current.value,
                description: inputDescription.current.value,
                price: Number(inputPrice.current.value),
                event_category: inputCategory.current.value,
                location: inputLocation.current.value,
                city: inputCity.current.value,
                datetime_start: [inputDateStart.current.value, inputTimeStart.current.value],
                datetime_end: [inputDateEnd.current.value, inputTimeEnd.current.value],
                discount: Number(inputDiscount.current.value) || 0,
                count: 0,
                max: Number(inputMaxUse.current.value) || 0,
                userId: id,
            };
            // Post ke db
            const res = await axios.post("http://localhost:5000/events", eventDetails);
            console.log("res", res);
            toast.success("Event created!");

            setTimeout(() => {
                navigate(`/event/${res.data.id}`);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getEventCategories();
    }, []);

    return (
        <>
            <Toaster />
            <div className="CreateEvent">
                <section className="create-event py-[80px] md:py-[140px]">
                    <div className="create-event-container md:px-[30px] md:mx-auto md:max-w-[1300px] px-6">
                        <div className="create-event-wrapper text-left">
                            <section className="create-event-title mb-4 md:mb-12">
                                <h1 className="text-5xl md:text-6xl font-bold ff-space-g">Create your own event!</h1>
                            </section>
                            <section className="basic-info-container">
                                <div className="basic-info-wrapper flex flex-col items-start">
                                    <div className="basic-info-heading mb-4">
                                        <div className="section-title basic-info-title text-left md:w-[700px]">
                                            <h1 className="text-3xl md:text-4xl font-bold ff-space-g">Basic Info</h1>
                                            <p className="text-sm md:text-base font-medium text-neutral-700">
                                                Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="form-basic-info w-full md:w-[720px]">
                                        <div className="form-group flex flex-col items-start w-full mb-4">
                                            <label htmlFor="event_title" className="font-semibold mb-2">
                                                Event title <sup className="font-bold text-red-500">*</sup>{" "}
                                            </label>
                                            <input
                                                type="text"
                                                name="event_title"
                                                id="event_title"
                                                ref={inputTitle}
                                                placeholder="Be clear and descriptive."
                                                className="border-neutral-300 p-2 md:p-4 w-full border-2 font-bold text-base md:text-lg rounded-lg placeholder:font-medium"
                                            />
                                        </div>
                                        <div className="form-group flex flex-col items-start w-full mb-4">
                                            <label htmlFor="event_image" className="font-semibold mb-2">
                                                Image
                                            </label>
                                            <input
                                                type="text"
                                                name="event_image"
                                                id="event_image"
                                                ref={inputImage}
                                                placeholder="Please put in your image url."
                                                className="border-neutral-300 p-2 md:p-4 w-full border-2 font-bold text-base md:text-lg rounded-lg placeholder:font-medium"
                                            />
                                        </div>
                                        <div className="form-group flex flex-col items-start w-full mb-4">
                                            <label htmlFor="event_summary" className="font-semibold mb-2">
                                                Summary <sup className="font-bold text-red-500">*</sup>{" "}
                                            </label>
                                            <input
                                                type="text"
                                                name="event_summary"
                                                id="event_summary"
                                                ref={inputSummary}
                                                placeholder="Please give a brief summary for your event"
                                                className="border-neutral-300 p-2 md:p-4 w-full border-2 font-bold text-base md:text-lg rounded-lg placeholder:font-medium"
                                            />
                                        </div>
                                        <div className="form-group flex flex-col items-start w-full mb-4">
                                            <label htmlFor="event_description" className="font-semibold mb-2">
                                                Description <sup className="font-bold text-red-500">*</sup>{" "}
                                            </label>
                                            <input
                                                type="text"
                                                name="event_description"
                                                id="event_description"
                                                ref={inputDescription}
                                                placeholder="Describe your event"
                                                className="border-neutral-300 p-2 md:p-4 w-full border-2 font-bold text-base md:text-lg rounded-lg placeholder:font-medium"
                                            />
                                        </div>
                                        <div className="form-group flex flex-col items-start w-full mb-4">
                                            <label htmlFor="event_price" className="font-semibold mb-2">
                                                Price <sup className="font-bold text-red-500">*</sup>{" "}
                                            </label>
                                            <input
                                                type="text"
                                                name="event_price"
                                                id="event_price"
                                                ref={inputPrice}
                                                placeholder="Put 0 if your event is free"
                                                className="border-neutral-300 p-2 md:p-4 w-full border-2 font-bold text-base md:text-lg rounded-lg placeholder:font-medium"
                                            />
                                        </div>
                                        <div className="form-group flex flex-col items-start w-full mb-4">
                                            <label
                                                htmlFor="event_discount"
                                                className="font-semibold mb-2"
                                            >
                                                Discount from using referall
                                                code{" "}
                                            </label>
                                            <input
                                                type="number"
                                                name="event_discount"
                                                id="event_discount"
                                                ref={inputDiscount}
                                                placeholder="%"
                                                min={0}
                                                max={90}
                                                className="border-neutral-300 p-2 md:p-4 w-full border-2 font-bold text-base md:text-lg rounded-lg placeholder:font-medium"
                                            />
                                        </div>
                                        <div className="form-group flex flex-col items-start w-full mb-4">
                                            <label htmlFor="event_maxuse" className="font-semibold mb-2">
                                                Max Use
                                            </label>
                                            <input
                                                type="number"
                                                name="event_maxuse"
                                                id="event_maxuse"
                                                ref={inputMaxUse}
                                                placeholder="uses"
                                                min={0}
                                                className="border-neutral-300 p-2 md:p-4 w-full border-2 font-bold text-base md:text-lg rounded-lg placeholder:font-medium"
                                            />
                                        </div>
                                        <div className="form-group flex flex-col items-start w-full mb-4">
                                            <label className="font-semibold mb-2">
                                                Category <sup className="font-bold text-red-500">*</sup>{" "}
                                            </label>
                                            <select name="category" id="category" className="border-neutral-300 p-2 md:p-4 w-full border-2 font-bold text-base md:text-lg rounded-lg" ref={inputCategory}>
                                                <option value="" disabled selected>
                                                    Select Category
                                                </option>
                                                {eventCategories?.map((value, index) => {
                                                    return (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <hr className="my-12 mb-14 border-t-2 drop-shadow-sm" />

                            <section className="location-container">
                                <div className="location-wrapper flex flex-col items-start">
                                    <div className="location-heading mb-4">
                                        <div className="section-title location-title text-left md:w-[700px]">
                                            <h1 className="text-3xl md:text-4xl font-bold ff-space-g">Location</h1>
                                            <p className="text-sm md:text-base md:font-medium text-neutral-700">Help people in the area discover your event and let attendees know where to show up.</p>
                                        </div>
                                    </div>
                                    <div className="form-location w-full md:w-[720px]">
                                        <div className="form-group flex flex-col items-start w-full mb-4 relative">
                                            <label htmlFor="search_location" className="font-semibold mb-2">
                                                Venue location <sup className="font-bold text-red-500">*</sup>{" "}
                                            </label>
                                            <div className="input-group-search relative flex items-center w-full">
                                                <FaSearch className="search-icon absolute left-4 md:left-6" size={20} fill="black" />
                                                <input
                                                    type="search"
                                                    name="search_location"
                                                    id="search_location"
                                                    ref={inputLocation}
                                                    className="border-neutral-300 py-2 md:py-4 pr-4 pl-12 md:pl-14 w-full border-2 font-bold text-lg rounded-lg placeholder:font-medium"
                                                />
                                            </div>
                                        </div>
                                        {/* //! SELECT CITY */}
                                        <div className="form-group flex flex-col items-start w-full mb-4">
                                            <label className="font-semibold mb-2">
                                                City <sup className="font-bold text-red-500">*</sup>{" "}
                                            </label>
                                            <select name="city" id="city" className="border-neutral-300 p-2 md:p-4 w-full border-2 font-bold text-base md:text-lg rounded-lg" ref={inputCity}>
                                                <option value="" disabled selected>
                                                    Select City
                                                </option>
                                                {eventCities?.map(
                                                    (value, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={value.id}
                                                            >
                                                                {value.name}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <hr className="my-12 mb-14 border-t-2 drop-shadow-sm" />

                            <section className="date-time-container mb-12">
                                <div className="date-time-wrapper flex flex-col items-start">
                                    <div className="date-time-heading mb-4">
                                        <div className="section-title date-time-title text-left md:w-[700px]">
                                            <h1 className="text-3xl md:text-4xl font-bold ff-space-g">Date and time</h1>
                                            <p className="text-base font-medium text-neutral-700">Tell event-goers when your event starts and ends so they can make plans to attend.</p>
                                        </div>
                                    </div>
                                    <div className="form-date-time w-full md:w-[720px]">
                                        <div className="form-group flex flex-col gap-6 items-start w-full mb-4 relative">
                                            <div className="event-starts-date-time grid grid-cols-2 gap-2 w-full">
                                                <div className="event-starts flex flex-col items-start">
                                                    <label htmlFor="event_starts" className="font-semibold mb-2">
                                                        Event starts <sup className="font-bold text-red-500">*</sup>{" "}
                                                    </label>
                                                    <div className="input-group-search relative flex items-center w-full">
                                                        <input
                                                            type="date"
                                                            name="event_starts"
                                                            id="event_starts"
                                                            ref={inputDateStart}
                                                            className="border-neutral-300 p-2 md:p-4 w-full border-2 font-bold text-sm md:text-lg rounded-lg placeholder"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="start-time flex flex-col items-start">
                                                    <label htmlFor="start_time" className="font-semibold mb-2">
                                                        Start time <sup className="font-bold text-red-500">*</sup>{" "}
                                                    </label>
                                                    <div className="input-group-search relative flex items-center w-full">
                                                        <input
                                                            type="time"
                                                            name="start_time"
                                                            id="start_time"
                                                            ref={inputTimeStart}
                                                            defaultValue={"07:00"}
                                                            className="border-neutral-300 p-2 md:p-4 w-full border-2 font-bold text-sm md:text-lg rounded-lg placeholder:font-medium"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="event-ends-date-time grid grid-cols-2 gap-2 w-full">
                                                <div className="event-ends flex flex-col items-start">
                                                    <label htmlFor="event_ends" className="font-semibold mb-2">
                                                        Event ends <sup className="font-bold text-red-500">*</sup>{" "}
                                                    </label>
                                                    <div className="input-group-search relative flex items-center w-full">
                                                        <input
                                                            type="date"
                                                            name="event_ends"
                                                            id="event_ends"
                                                            ref={inputDateEnd}
                                                            className="border-neutral-300 p-2 md:p-4 w-full border-2 font-bold text-sm md:text-lg rounded-lg placeholder:font-medium"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="end-time flex flex-col items-start">
                                                    <label htmlFor="end_time" className="font-semibold mb-2">
                                                        End time <sup className="font-bold text-red-500">*</sup>{" "}
                                                    </label>
                                                    <div className="input-group-search relative flex items-center w-full">
                                                        <input
                                                            type="time"
                                                            name="end_time"
                                                            id="end_time"
                                                            ref={inputTimeEnd}
                                                            defaultValue={"07:00"}
                                                            className="border-neutral-300 p-2 md:p-4 w-full border-2 font-bold text-sm md:text-lg rounded-lg placeholder:font-medium"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="action-button">
                                <div className="action-button-wrapper w-full md:w-[720px]">
                                    <button onClick={onCreate} className={"bg-gradient-animation-1 hover:scale-[1.02] active:scale-[.99] w-full h-[60px] text-white font-bold rounded-lg duration-150"}>Create event!</button>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
