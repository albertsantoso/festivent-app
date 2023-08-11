import "./EventCard.css"

export default function EventCard({ image, title, dateTime, venue, price, maker }) {
    return (
        <>
            <div className="EventCard">
                <div className="event-card">
                    <div className="event-card-container shadow-card drop-shadow-lg hover:drop-shadow-2xl md:h-[420px] bg-white rounded-lg  hover:scale-105 duration-150">
                        <div className="event-thumbnail">
                            <img src={image} className="rounded-t-lg" alt="" />
                        </div>
                        <div className="event-meta px-4 py-6">
                            <div className="event-meta-container text-left flex flex-col ">
                                <div className="event-heading">
                                    <h2 className="event-title text-lg font-bold line-clamp-2">{title}</h2>
                                    <span className="event-time text-sm font-medium text-red-500">{dateTime}</span>
                                    <div className="event-location text-sm font-medium text-gray-600 mb-4 line-clamp-2">{venue}</div>
                                </div>
                                <div className="event-content">
                                    <div className="event-price text-sm font-bold">{price}</div>
                                    <div className="event-maker text-sm font-bold">{maker}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}