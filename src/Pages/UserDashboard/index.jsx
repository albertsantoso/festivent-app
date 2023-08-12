import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserDashboard() {
    const [createdEvents, setCreatedEvents] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [registered, setRegistered] = useState([]);

    const loggedinUserId = Number(localStorage.getItem("idLogin"));

    const getDataUser = async () => {
        const { data } = await axios.get(
            `http://localhost:5000/users/${loggedinUserId}`
        );
        setDataUser(data);
    };

    const getCreatedEvent = async () => {
        const { data } = await axios.get(
            `http://localhost:5000/events?userId=${loggedinUserId}`
        );
        setCreatedEvents(data);
    };

    const getRegistered = async () => {
        const tempRegistered = [];
        const eventIdRefCode = [];
        const res = await axios.get(
            `http://localhost:5000/ref_code?userId=${loggedinUserId}`
        );
        const registeredRefCode = res.data;

        const { data } = await axios.get(
            "http://localhost:5000/tickets?_expand=event"
        );

        const registeredEvents = [];

        data.map((v) => {
            if (v.userId === loggedinUserId) {
                registeredEvents.push(v);
            }
        });

        registeredRefCode.map((v) => {
            eventIdRefCode.push(v.eventId);
        });

        registeredEvents.map((value, index) => {
            if (eventIdRefCode.includes(value.event.id)) {
                let refCode = 0;
                let eId = value.event.id;
                registeredRefCode?.map((value2) => {
                    if (value2.eventId === eId) {
                        refCode = value2.code;
                    }
                });
                tempRegistered.push({ ...value, ref_code: Number(refCode) });
            } else {
                tempRegistered.push({ ...value, ref_code: 0 });
            }
        });

        setRegistered(tempRegistered);
    };

    useEffect(() => {
        getDataUser();
        getRegistered();
        getCreatedEvent();
    }, []);

    return (
        <>
            <div className="UserDashboard">
                <div className="user-dashboard-container py-[220px]">
                    <div>Your points: {dataUser.ref_points}</div>
                    <div>
                        <div className="text-xl font-bold">Created Events</div>
                        {createdEvents?.map((v) => {
                            return (
                                <>
                                    <div className="flex">
                                        <div className="w-[300px]">
                                            <img
                                                className="w-[300px] h-[100px]"
                                                src={`${v.image}`}
                                                alt=""
                                            />
                                            <div>{v.title}</div>
                                            <div>{v.datetime_start[0]}</div>
                                            <Link
                                                className="w-[300px]"
                                                to={`/event/${v.id}`}
                                            >
                                                Go to event
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                    <div>
                        <div className="text-xl font-bold">
                            Registered Events
                        </div>
                        {registered?.map((v) => {
                            return (
                                <>
                                    <div className="flex">
                                        <div className="w-[300px]">
                                            <img
                                                className="w-[300px] h-[100px]"
                                                src={`${v.event.image}`}
                                                alt=""
                                            />
                                            <div>{v.event.title}</div>
                                            <div>
                                                {v.event.datetime_start[0]}
                                            </div>
                                            {v.ref_code ? (
                                                <div>
                                                    Your code: {v.ref_code}
                                                </div>
                                            ) : null}
                                            <Link
                                                className="w-[300px]"
                                                to={`/event/${v.id}`}
                                            >
                                                Go to event
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                        {registered?.map((v) => {
                            return (
                                <>
                                    <div className="flex gap-4">
                                        <div>{v.event.title}</div>
                                        {v.ref_code ? (
                                            <div>{v.ref_code}</div>
                                        ) : null}
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
