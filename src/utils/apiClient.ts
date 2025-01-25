import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:4000"
});

axiosInstance.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response && error.response.status === 401) {
        window.open(`/`, "_self")
    }
    return Promise.reject(error)
}
)