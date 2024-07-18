import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"
import usersReducer,{chatReducer} from "../features/userSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    chatUsers: chatReducer,
})

export default rootReducer;