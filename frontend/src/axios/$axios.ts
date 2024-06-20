import axios from "axios";
import { refreshUser } from "./UserAPI";


export const API_URL = `http://localhost:9000/api/v1`;

const $host = axios.create({
    baseURL: API_URL
});

$host.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if(!token) return config;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

$host.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const { data } = await refreshUser();
            localStorage.setItem('accessToken', data.access);
            return $host.request(originalRequest);
        } catch (error) {
            localStorage.removeItem("accessToken");
            console.error(error);
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
});

export default $host;