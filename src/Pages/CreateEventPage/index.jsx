import axios from "axios";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"
import PrimaryButton from "../../Components/PrimaryButton";

export default function CreateEvent() {

    const [eventCategories, setEventCategories] = useState(null)

    const getEvents = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/event_categories");
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
            <div className="CreateEvent">
                <section className="create-event py-[140px]">
                    <div className="create-event-container mycontainer">
                        <div className="create-event-wrapper">
                            <section className="basic-info-container">
                                <div className="basic-info-wrapper flex flex-col items-start">
                                    <div className="basic-info-heading mb-4">
                                        <div className="section-title basic-info-title text-left w-[700px]">
                                            <h1 className="text-4xl font-bold ff-space-g">Basic Info</h1>
                                            <p className="text-base font-medium text-neutral-700">
                                                Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="form-basic-info w-[720px]">
                                        <div className="form-group flex flex-col items-start w-full mb-4">
                                            <label htmlFor="event_title" className="font-semibold mb-2" >Event title <sup className="font-bold text-red-500">*</sup> </label>
                                            <input type="text" name="event_title" id="event_title"
                                                placeholder="Be clear and descriptive."
                                                className="bg-neutral-100 py-4 px-4 w-full border-2 font-bold text-lg rounded-lg placeholder:font-medium" />
                                        </div>
                                        <div className="form-group flex flex-col items-start w-full mb-4">
                                            <label htmlFor="event_organizer" className="font-semibold mb-2" >Organizer <sup className="font-bold text-red-500">*</sup> </label>
                                            <input type="text" name="event_organizer" id="event_organizer"
                                                placeholder="Be clear and descriptive."
                                                className="bg-neutral-100 py-4 px-4 w-full border-2 font-bold text-lg rounded-lg placeholder:font-medium" />
                                        </div>
                                        <div className="form-group flex flex-col items-start w-full mb-4">
                                            <label className="font-semibold mb-2" >Category <sup className="font-bold text-red-500">*</sup> </label>
                                            <select name="category" id="category" className="bg-neutral-100 py-4 px-4 w-full border-2 font-bold text-lg rounded-lg">
                                                <option value="" disabled selected >Select Category</option>
                                                {
                                                    eventCategories?.map((value, index) => {
                                                        return (
                                                            <option key={index} value={value.name}>{value.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <hr className="my-12 mb-14 border-t-2 drop-shadow-sm" />

                            <section className="location-container">
                                <div className="location-wrapper flex flex-col items-start">
                                    <div className="location-heading mb-4">
                                        <div className="section-title location-title text-left w-[700px]">
                                            <h1 className="text-4xl font-bold ff-space-g">Location</h1>
                                            <p className="text-base font-medium text-neutral-700">
                                                Help people in the area discover your event and let attendees know where to show up.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="form-location w-[720px]">
                                        <div className="form-group flex flex-col items-start w-full mb-4 relative">
                                            <label htmlFor="search_location" className="font-semibold mb-2" >Venue location <sup className="font-bold text-red-500">*</sup> </label>
                                            <div className="input-group-search relative flex items-center w-full">
                                                <FaSearch className="search-icon absolute left-6" size={20} fill="black" />
                                                <input type="search" name="search_location" id="search_location"
                                                    className="bg-neutral-100 py-4 pr-4 pl-14 w-full border-2 font-bold text-lg rounded-lg placeholder:font-medium" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <hr className="my-12 mb-14 border-t-2 drop-shadow-sm" />

                            <section className="date-time-container">
                                <div className="date-time-wrapper flex flex-col items-start">
                                    <div className="date-time-heading mb-4">
                                        <div className="section-title date-time-title text-left w-[700px]">
                                            <h1 className="text-4xl font-bold ff-space-g">Date and time</h1>
                                            <p className="text-base font-medium text-neutral-700">
                                                Tell event-goers when your event starts and ends so they can make plans to attend.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="form-date-time w-[720px]">
                                        <div className="form-group flex flex-col gap-6 items-start w-full mb-4 relative">
                                            <div className="event-starts-date-time grid grid-cols-2 gap-2 w-full">
                                                <div className="event-starts flex flex-col items-start">
                                                    <label htmlFor="event_starts" className="font-semibold mb-2" >Event starts <sup className="font-bold text-red-500">*</sup> </label>
                                                    <div className="input-group-search relative flex items-center w-full">
                                                        <input type="date" name="event_starts" id="event_starts"
                                                            className="bg-neutral-100 py-4 pr-4 pl-4 w-full border-2 font-bold text-lg rounded-lg placeholder:font-medium" />
                                                    </div>
                                                </div>
                                                <div className="start-time flex flex-col items-start">
                                                    <label htmlFor="start_time" className="font-semibold mb-2" >Start time <sup className="font-bold text-red-500">*</sup> </label>
                                                    <div className="input-group-search relative flex items-center w-full">
                                                        <input type="time" name="start_time" id="start_time" defaultValue={"07:00"}
                                                            className="bg-neutral-100 py-4 pr-4 pl-4 w-full border-2 font-bold text-lg rounded-lg placeholder:font-medium" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="event-ends-date-time grid grid-cols-2 gap-2 w-full">
                                                <div className="event-ends flex flex-col items-start">
                                                    <label htmlFor="event_ends" className="font-semibold mb-2" >Event ends <sup className="font-bold text-red-500">*</sup> </label>
                                                    <div className="input-group-search relative flex items-center w-full">
                                                        <input type="date" name="event_ends" id="event_ends"
                                                            className="bg-neutral-100 py-4 pr-4 pl-4 w-full border-2 font-bold text-lg rounded-lg placeholder:font-medium"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="end-time flex flex-col items-start">
                                                    <label htmlFor="end_time" className="font-semibold mb-2" >End time <sup className="font-bold text-red-500">*</sup> </label>
                                                    <div className="input-group-search relative flex items-center w-full">
                                                        <input type="time" name="end_time" id="end_time" defaultValue={"07:00"}
                                                            className="bg-neutral-100 py-4 pr-4 pl-4 w-full border-2 font-bold text-lg rounded-lg placeholder:font-medium"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="action-button">
                                <div className="action-button">
                                    <PrimaryButton buttonText={"Create event"} bgColor={"black"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}