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
    initialState:{
      selectedUserData:null,
      currentChatUsers:[],
    },
    reducers: {
        addChatUser: (state, action) => {
            state.currentChatUsers.push(action.payload);
        },
        addSelectedUserData: (state, action) => {
            state.selectedUserData = action.payload;
        },
        deleteChatUser: (state) => {
            state.currentChatUsers = [];
        },
    }
})
export const chatReducer = chatUsers.reducer;


export const { addChatUser, deleteChatUser,addSelectedUserData } = chatUsers.actions;

export const { addUser, deleteUser } = users.actions;

export default users.reducer;