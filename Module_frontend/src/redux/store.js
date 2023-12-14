import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from './slices/ThemeSlice';

import ScheduleReducer from "./slices/ScheduleSlice";

import UserReducer from "./slices/UserSlice"

import AutoChatReducer from "./slices/AutoChatSlice"


const store = configureStore({
    reducer: {
        theme: ThemeReducer,
        users: UserReducer,
        schedule: ScheduleReducer,
        autoChat: AutoChatReducer,
    }
})

export default store;