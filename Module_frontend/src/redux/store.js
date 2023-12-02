import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from './slices/ThemeSlice';
import UserReducer from "./slices/UserSlice"


const store = configureStore({
    reducer: {
        theme: ThemeReducer,
        user: UserReducer
    }
})

export default store;