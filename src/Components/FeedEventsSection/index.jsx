import axios from "axios";
import SectionHeading from "../SectionHeading";
import { useEffect, useState } from "react";
import EventCard from "../EventCard";
import { Link } from "react-router-dom";

export default function FeedEventsSection() {
    const [events, setEvents] = useState(null);

    const onFetchEvents = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/events`);
            setEvents(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        onFetchEvents();
    }, []);

    return (
        <>
            <section className="mycontainer">
                <SectionHeading sectionTitle="Upcoming Events" />

                <div className="feed-events-container grid grid-cols-4 gap-4 md:grid-cols-4">
                    {events?.map((event, index) => {
                        return (
                            <>
                                <Link to={`/event/${event.id}`}>
                                    <EventCard
                                        key={index}
                                        title={`${event.title}`}
                                        dateTime={`${event.datetime_start[0]} at ${event.datetime_start[1]} `}
                                        venue={`${event.venue}`}
                                        price={`${event.price.toLocaleString(
                                            "en-US",
                                            {
                                                style: "currency",
                                                currency: "USD",
                                            }
                                        )}`}
                                        maker={`${event.organizer}`}
                                    />
                                </Link>
                            </>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
