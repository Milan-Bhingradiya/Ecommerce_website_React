import axios from "axios";

// const { userAuthToken } = useContext(Usercontext);

// const { isLogin, setIsLogin, userAuthToken } = useContext(Usercontext);

const api = axios.create({
    // baseURL: "http://localhost:4444",
    baseURL: "https://gray-lonely-earthworm.cyclic.cloud",
    headers: {
        authToken: localStorage.getItem("authToken")?localStorage.getItem("authToken"):""
    }
})


export default api;