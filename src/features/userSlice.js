import { createSlice } from "@reduxjs/toolkit";


const users = createSlice({
    name:'users',
    initialState:[{}],
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
        },
        deleteUser: (state, action) => {
            return state.filter(user => user.id!== action.payload);
        },
    }
})

const chatUsers = createSlice({
    name:'chatUsers',
    initialState:[],
    reducers: {
        addChatUser: (state, action) => {
            state.push(action.payload);
        },
        deleteChatUser: (state, action) => {
            return [];
        },
    }
})
export const chatReducer = chatUsers.reducer;


export const { addChatUser, deleteChatUser } = chatUsers.actions;

export const { addUser, deleteUser } = users.actions;

export default users.reducer;