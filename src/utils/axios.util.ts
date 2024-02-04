import Axios from 'axios';

export const axiosInstance = () => {
    return Axios.create({
        baseURL: "http://localhost:9005",
        withCredentials: true
    })
}