import axios from "axios"
import { useEffect, useState } from "react"


export default function UserDashboard() {
    const [createdEvents, setCreatedEvents] = useState([])
    const [eventIds, setEventIds] = useState([])

    const [registeredEvents, setRegisteredEvents] = useState([])
    const [registeredRefCode, setRegisteredRefCode] = useState([])

    const [registered, setRegistered] = useState({})

    const [isDone, setIsDone] = useState(false)

    const loggedinUserId = localStorage.getItem("idLogin")

    const getCreatedEvent = async () => {
        const { data } = await axios.get(`http://localhost:5000/events?userId=${loggedinUserId}`)
        setCreatedEvents(data)
    }

    const getEventIds = async () => {
        const { data } = await axios.get(`http://localhost:5000/tickets?userId=${loggedinUserId}`)

        data?.map((value) => {
            eventIds.push(value.eventId);
        })
    }

    const getRegisteredEvents = async () => {
        const tempEvents = []

        eventIds?.map(async (value) => {
            const { data } = await axios.get(`http://localhost:5000/events/${value}`)
            tempEvents.push(data)
        })

        setRegisteredEvents(tempEvents)
    }

    const getRegisteredRefCode = async () => {
        const { data } = await axios.get(`http://localhost:5000/ref_code?userId=${loggedinUserId}`)
        setRegisteredRefCode(data)
    }

    const getRegistered = () => {
        const tempRegistered = []
        const eventIdRefCode = []

        registeredRefCode?.map((value) => {
            eventIdRefCode.push(value.eventId)
        })

        registeredEvents?.map((value, index) => {
            if (eventIdRefCode.includes(value.eventId)) {
                let refCode = 0
                let eId = value.eventId
                registeredRefCode?.map((value2) => {
                    if (value2.eventId === eId) {
                        refCode = value2.code
                    }
                })
                tempRegistered.push({ ...value, ref_code: Number(refCode) })
            } else {
                tempRegistered.push({ ...value, ref_code: 0 })
            }
        })

        setRegistered(tempRegistered)
    }

    useEffect(() => {
        getRegisteredRefCode()
        getCreatedEvent()
        getEventIds()
        getRegisteredEvents()
        setIsDone(true)
        // console.log(eventIds);
    }, [])

    useEffect(() => {
        getRegistered()
        console.log("1", registeredRefCode);
        console.log("2", registeredEvents);
        console.log("3", createdEvents);
        console.log("4", eventIds);
    }, [isDone])

    useEffect(() => { getRegisteredEvents() }, [eventIds])

    // useEffect(() => {
    //     // getRegistered()
    // }, [registeredRefCode])

    useEffect(() => {
        console.log(registered);
    }, [registered])

    return (
        <>
            <div className="UserDashboard">
                <div className="user-dashboard-container py-[220px]">
                    <div className="user-dashboard-wrapper">
                        <button onClick={() => setIsDone(false)}>
                            FALSE
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}