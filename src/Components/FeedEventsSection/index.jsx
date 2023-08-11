import axios from "axios";
import SectionHeading from "../SectionHeading";
import { useEffect, useState } from "react";
import EventCard from "../EventCard";
import { Link } from "react-router-dom";

export default function FeedEventsSection() {
    const [events, setEvents] = useState(null)

    const onFetchEvents = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/events`)
            console.log(data);
            setEvents(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        onFetchEvents()
    }, [])

    return (
        <>
            <section className="mycontainer">
                <SectionHeading sectionTitle="Upcoming Events" />

                <div className="feed-events-container grid grid-cols-4 gap-4 md:grid-cols-4">
                    {
                        events?.map((event, index) => {
                            const date = new Date(event.datetime_start[0])
                            const dayMonthDate = date.toLocaleDateString(undefined, {
                                weekday: 'short', month: 'long', day: 'numeric'
                            })

                            // console.log(date);
                            return (
                                <>
                                    <Link>
                                        <EventCard key={index}
                                            image={event.image}
                                            title={`${event.title}`}
                                            dateTime={dayMonthDate}
                                            venue={`${event.location}`}
                                            price={event.price === 0 ? "Free" : `${event.price.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 })}`}
                                            maker={`${event.organizer}`} />
                                    </Link>
                                </>
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}