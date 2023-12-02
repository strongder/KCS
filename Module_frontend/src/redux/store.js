import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from './slices/ThemeSlice';
import ScheduleReducer from "./slices/ScheduleSlice";


const store = configureStore({
    reducer: {
        theme: ThemeReducer,
        schedule: ScheduleReducer
    }
})

export default store;