import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "../Features/Events";
import userSlice from "../Features/Users";

export const store = configureStore({
    reducer: {
        events: eventsSlice,
        users: userSlice,
    },
});
