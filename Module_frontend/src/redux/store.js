import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from './slices/ThemeSlice';

import ScheduleReducer from "./slices/ScheduleSlice";

import UserReducer from "./slices/UserSlice"

import AutoChatReducer from "./slices/AutoChatSlice"
import ResourceReducer from "./slices/ResourceSlice"



const store = configureStore({
    reducer: {
        theme: ThemeReducer,
        users: UserReducer,
        schedule: ScheduleReducer,
        autoChat: AutoChatReducer,
        resource: ResourceReducer,
    },
})

export default store;