import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userData:{},
    token:null,
    username:null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload;
            state.token = action.payload.accessToken || action.payload.token;
            state.username = action.payload.username;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userData = {};
            state.token = null;
            state.username = null;
        },
    },
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;