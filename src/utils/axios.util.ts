import Axios from 'axios';

export const axiosInstance = () => {
    return Axios.create({
        baseURL: "http://localhost:8088", // should keep this configurable  or use origin
        // since we are using ngonc anyway
        withCredentials: true
    })
}