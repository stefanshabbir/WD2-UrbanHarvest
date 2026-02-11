export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const endpoints = {
    products: `${API_URL}/api/products`,
    bookings: `${API_URL}/api/bookings`,
};
