import axios from "axios";
import { useEffect, useState } from "react"
import EventCard from "../../Components/EventCard";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";


export default function AllEventsPageFiltering() {
    const [events, setEvents] = useState(null);
    const [categories, setCategories] = useState(null)
    const [cities, setCities] = useState(null)

    const onFetchEvents = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/events`);
            setEvents(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getEventCategories = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/event_categories");
            setCategories(data);
        } catch (error) {
            alert(error);
        }
    };

    const getCities = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/cities");
            setCities(data);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        onFetchEvents()
        getEventCategories()
        getCities()
    }, [])

    return (
        <>
            <div className="EventsFilteringPage">

                <div className="filtering-page-container py-[140px]">
                    <div className="filtering-page-wrapper mycontainer">
                        <div className="section-header mb-8">
                            <h1 className="font-bold ff-space-g text-6xl text-left">Explore events</h1>
                        </div>
                        <section className="section-filters-container flex gap-2 mb-8">
                            <div className="filter-group category-filter">
                                <select name="city" id="city" className="rounded-lg w-[220px] font-semibold border-2 border-neutral-300 py-4">
                                    <option value="" disabled selected>Select category</option>
                                    {
                                        categories?.map((value) => {
                                            return (
                                                <>
                                                    <option value={value.id} key={value.id}>{value.name}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="filter-group city-filter">
                                <select name="city" id="city" className="rounded-lg w-[220px] font-semibold border-2 border-neutral-300 py-4">
                                    <option value="" disabled selected>Select city</option>
                                    {
                                        cities?.map((value) => {
                                            return (
                                                <>
                                                    <option value={value.id} key={value.id}>{value.city}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="filter-group search-filter w-full relative flex items-center">
                                <FaSearch className="absolute left-[18px]" size={20} />
                                <input type="text" className="w-full rounded-lg text-xl pl-12 font-semibold border-2 border-neutral-300 h-full" />
                            </div>
                        </section>
                        <section className="feed-events-container">
                            <div className="feed-events-wrapper grid gap-6 md:grid-cols-4">
                                {events?.map((event) => {
                                    const date = new Date(event.datetime_start[0])
                                    const dayMonthDate = date.toLocaleDateString(undefined, {
                                        weekday: 'short', month: 'long', day: 'numeric'
                                    })

                                    return (
                                        <>
                                            <Link to={`/event/${event.id}`}>
                                                <EventCard key={event.id}
                                                    image={event.image}
                                                    title={`${event.title}`}
                                                    dateTime={dayMonthDate}
                                                    venue={`${event.location}`}
                                                    price={event.price === 0 ? "Free" : `${event.price.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 })}`} />
                                            </Link>
                                        </>
                                    )
                                })}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}