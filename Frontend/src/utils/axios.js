// Connecting Frontend with Backend

import axios from "axios";
import { BASE_URL } from "./constants";


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    title: 10000,
    headers : {
        "Content-Type" : "application/json"
    }
});

// Axios is promise based so it's code might be weird
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance