import axios from "axios";
import { useContext } from "react";
import Merchantcontext from "./context/Merchantcontext";

// const { userAuthToken } = useContext(Usercontext);

// const { isLogin, setIsLogin, userAuthToken } = useContext(Usercontext);

const api = axios.create({
    // baseURL: "http://localhost:4444",
    baseURL: "https://gray-lonely-earthworm.cyclic.cloud/",
    headers: {
        authToken: localStorage.getItem("authToken")?"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yzc4MWVkMGE1ZTcwMjdjOTVlZGFhNyIsImlhdCI6MTY5MDc5Njk4MX0.3YAbFg8f-2cBvyXcWZOLgdiannHArUikNf_qrrZ1xPU":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yzc4MWVkMGE1ZTcwMjdjOTVlZGFhNyIsImlhdCI6MTY5MDc5Njk4MX0.3YAbFg8f-2cBvyXcWZOLgdiannHArUikNf_qrrZ1xPU"
    }
})


export default api;

