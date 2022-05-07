import axios from "axios";

const API = axios.create({
    // baseURL: 'http://192.168.1.200:8000',
    baseURL: 'http://localhost:8000',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default API