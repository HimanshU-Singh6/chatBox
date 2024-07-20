import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URI,
    withCredentials: true,
    timeout: 120000,
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
        console.log("hello bhai")
    }
);

const loginUser = async ({password,username}) => {
    try {
        const responce = await  apiClient.post('/users/login', {password,username})
        return responce;
    
    } catch (error) {
        if (error.response) {
            
            console.error("Request made, but server responded with error:", error.response.data);
            return error.response.data; 
        } else if (error.request) {
            // The request was made but no response was received
            console.error("Request made, but no response received:", error.request);
            throw error.request; // Throw the request object itself
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up the request:", error.message);
            throw error; // Throw the original error
        }
    }
}

const signupUser = async ({username,password,email}) => {
    try {
       const responce = await apiClient.post("/users/register",{username,password,email})
       return responce;

    } catch (error) {
        console.log("Error setting up the signup:", error.message);
    }
}

const logoutUser = async () => {
    try {
        return await apiClient.post('/users/logout')
    } catch (error) {
        console.log("Error setting up the signup:", error.message);
    }
}

const getUserChat = async () => {
    try {
        const res = await apiClient.get('/chat-app/chats')
        return res;

    } catch (error) {
        console.log("Error in reteriving the user chat list:", error.message);
    }
}

export {getUserChat, loginUser, signupUser , logoutUser}