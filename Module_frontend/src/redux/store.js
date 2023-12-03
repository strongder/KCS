import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from './slices/ThemeSlice';

import ScheduleReducer from "./slices/ScheduleSlice";

import UserReducer from "./slices/UserSlice"



const store = configureStore({
    reducer: {
        theme: ThemeReducer,
        users: UserReducer
    }
})

export default store;