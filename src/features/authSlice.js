import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userData:null,
    token:null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload;
            state.token = action.payload.accessToken || action.payload.token;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userData = null;
            token:null;
        },
    },
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;