import { configureStore } from "@reduxjs/toolkit";
import reducers from "../features/authSlice"

const store = configureStore({
    reducer: {reducers},
})

export default store;