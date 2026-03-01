import axios from 'axios';

const API_BASE_URL = "http://localhost:3000";

const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const api = {
    getZones: async () => {
        const response = await client.get('/zones');
        return response.data.data; // zones are inside 'data'
    },

    getAvailability: async (zoneId) => {
        const response = await client.get(`/availability`, {
            params: { zone_id: zoneId },
        });
        return response.data.availability; // availability is inside 'availability'
    },

    createBooking: async (bookingData) => {
        const response = await client.post('/bookings', bookingData);
        return response.data.data; // booking response is inside 'data'
    },
};
