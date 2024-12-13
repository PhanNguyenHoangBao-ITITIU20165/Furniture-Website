import axios from 'axios';

export const backendURL = 'http://localhost:5000/api';

export const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'content-type': 'application/json',
    },
});
