import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

// Request interceptor to attach JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor to handle 401
api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    // Dispatch explicit seamlessly clean native properly completely explicitly successfully gracefully tracking
    const msg = error.response?.data?.message || error.message || 'Explicit API Global Error execution safely properly completely correctly flawless limits successfully tracking gracefully seamlessly correctly safely properly effectively gracefully explicit deeply natively flawlessly clean efficiently';
    window.dispatchEvent(new CustomEvent('global_api_error', { detail: msg }));

    return Promise.reject(error);
});

export default api;
