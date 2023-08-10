import { configureStore } from "@reduxjs/toolkit";
import { eventsSlice } from "../Features/Events";


export const store = configureStore({
    reducer: {
        events: eventsSlice
    }
})
