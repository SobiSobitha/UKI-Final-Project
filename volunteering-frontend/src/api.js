import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8001/api', // Make sure this matches your backend URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to include token in headers
API.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);
// Suspend user function
export const suspendUser = async (userId, token) => {
    try {
        const response = await API.post('/admin/suspend-user', { userId }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error suspending user:', error.response ? error.response.data : error.message);
        throw error; // Propagate the error for handling in the component
    }
};
// Approve organizer function
export const approveOrganizer = async (organizerId) => {
    try {
        const response = await API.post('/admin/approve-organizer', { organizerId });
        return response.data;
    } catch (error) {
        console.error('Error approving organizer:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Reject organizer function
export const rejectOrganizer = async (organizerId) => {
    try {
        const response = await API.post('/admin/reject-organizer', { organizerId });
        return response.data;
    } catch (error) {
        console.error('Error rejecting organizer:', error.response ? error.response.data : error.message);
        throw error;
    }
};
// payment method
// export const paymentMethod = async (sessionId) => {
//     try {
//         const response = await API.post('/payments/create-payment', { sessionId });
//         return response.data;
//     } catch (error) {
//         console.error('Error to create checkout session:', error.response ? error.response.data: error.message);
//         throw error;
//     }
// }
// Register function
export const register = async (formData, role) => {
    try {
        // Adjust the endpoint based on the role
        const endpoint = role === 'volunteer' ? '/register/volunteer' : '/register/Organizer';
        const response = await API.post(endpoint, formData); 
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
        throw error;
    }
};


export const login = async (formData) => {
    console.log('Logging in with data:', formData); // Debug log
    try {
        const response = await API.post('/login', formData); // Adjust the endpoint
        console.log('Response data:', response.data); // Log response data
        const token = response.data.token;
        if (token) {
            localStorage.setItem('token', token); // Save token to localStorage
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Create Event function
export const createEvent = async (formData) => {
    try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        const response = await API.post('/events/create-event', formData, {
            headers: {
                Authorization: `Bearer ${token}`, // Add the token to the headers if needed
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error.response ? error.response.data : error.message);
        throw error; // Propagate the error to the calling function
    }
};

// Fetch all events
export const getEvents = async () => {
    try {
        const response = await API.get('/events');
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Fetch specific event by ID
export const getEventById = async (id) => {
    try {
        const response = await API.get(`/events/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching event ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

// Fetch all volunteers
export const getVolunteers = async () => {
    try {
        const response = await API.get('/users/volunteers');
        return response.data;
    } catch (error) {
        console.error('Error fetching volunteers:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Fetch all organizers
export const getOrganizers = async () => {
    try {
        const response = await API.get('/users/organizers');
        return response.data;
    } catch (error) {
        console.error('Error fetching organizers:', error.response ? error.response.data : error.message);
        throw error;
    }
};
export const submitFeedback = async (eventId, feedbackData) => {
    try {
        const response = await API.post(`/feedback/${eventId}`, feedbackData); 
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error submitting feedback:', error.response ? error.response.data : error.message);
        throw error; // Propagate the error for handling in the component
    }
};

// Export API for additional use if needed
export default API;
