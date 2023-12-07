import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from './slices/ThemeSlice';

import ScheduleReducer from "./slices/ScheduleSlice";

import UserReducer from "./slices/UserSlice"
// import ScheduleSlice from "./slices/ScheduleSlice";



const store = configureStore({
    reducer: {
        theme: ThemeReducer,
        users: UserReducer,
        schedule: ScheduleReducer,
    }
})

export default store;