import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from './slices/ThemeSlice';


const store = configureStore({
    reducer: {
        theme: ThemeReducer
    }
})

export default store;