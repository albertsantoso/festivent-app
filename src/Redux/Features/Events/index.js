import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: []
}

export const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        setEvent: (initialState, { payload }) => {
            initialState.events = payload
        }
    }
})

export const fetchEventsAsync = () => async (dispatchEvent) => {
    try {
        const response = await axios.get("http://localhost:5004/events")
        console.log("🚀 ~ file: index.js:21 ~ fetchEventsAsync ~ response:", response)
        dispatchEvent(setEvent(response.data))
        console.log("🚀 ~ file: index.js:23 ~ fetchEventsAsync ~ response.data:", response.data)
    } catch (error) {
        console.log("🚀 ~ file: index.js:24 ~ fetchEventsAsync ~ error:", error)
    }
}

export const { setEvent } = eventsSlice.actions

export default eventsSlice.reducer