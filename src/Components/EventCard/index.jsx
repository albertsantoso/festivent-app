import "./EventCard.css";
import { Link } from "react-router-dom";

export default function EventCard({ image, title, dateTime, venue, price, refCode, goTo }) {
    return (
        <>
            <div className="EventCard">
                <div className="event-card rounded-lg">
                    <div className="event-card-container shadow-card drop-shadow-lg hover:drop-shadow-2xl md:h-[420px] bg-white rounded-lg  hover:scale-105 duration-150">
                        <div className="event-thumbnail max-h-[200px] bg-neutral-200 rounded-t-lg relative">
                            <img src={image} className="object-contain rounded-t-lg h-[200px] m-auto" alt="" />
                        </div>
                        <div className="event-meta px-4 py-6">
                            <div className="event-meta-container text-left flex flex-col ">
                                <div className="event-heading">
                                    <h2 className="event-title text-lg font-bold line-clamp-2">{title}</h2>
                                    <span className="event-time text-sm font-semibold text-red-600">{dateTime}</span>
                                    <div className="event-location text-sm font-medium text-gray-600 mb-4 line-clamp-2">{venue}</div>
                                </div>
                                <div className="event-content">
                                    <div className="event-price text-sm font-bold">
                                        {price}
                                    </div>
                                    {
                                        refCode ?
                                            (
                                                <div className="event-maker text-sm font-semibold">
                                                    Your referral code: <strong>{refCode}</strong>
                                                </div>
                                            )
                                            :
                                            null
                                    }

                                    {
                                        goTo ?
                                            (
                                                <>
                                                    <Link to={goTo}>
                                                        <span className="text-blue-500 text-sm font-medium">
                                                            Go to event
                                                        </span>
                                                    </Link>
                                                </>
                                            ) :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
