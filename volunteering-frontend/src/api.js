import axios from 'axios';

// Configure the base API with axios
const API = axios.create({
    baseURL: 'http://localhost:8001/api', // Ensure this matches your backend URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include token in headers
API.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Fixed string interpolation
        }
        return config;
    },
    error => Promise.reject(error)
);

/**
 * Payment method for organizers or volunteers
 * @param {Object} selectedPlan - The plan that the user selects for payment
 */
export const paymentMethod = async (selectedPlan) => {
    try {
        const response = await API.post('/payments/create-event-payment', { selectedPlan });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

/**
 * Suspend a volunteer or organizer by admin
 * @param {String} userId - ID of the user to suspend
 */
export const suspendUser = async (userId) => {
    try {
        const response = await API.post('/admin/suspend-user', { userId });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

/**
 * Approve organizer request
 * @param {String} organizerId - ID of the organizer to approve
 */
export const approveOrganizer = async (organizerId) => {
    try {
        const response = await API.post('/admin/approve-organizer', { organizerId });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

/**
 * Reject organizer request
 * @param {String} organizerId - ID of the organizer to reject
 */
export const rejectOrganizer = async (organizerId) => {
    try {
        const response = await API.post('/admin/reject-organizer', { organizerId });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

/**
 * Register a volunteer or organizer
 * @param {Object} formData - Registration form data
 * @param {String} role - 'volunteer' or 'organizer'
 */
export const register = async (formData, role) => {
    try {
        const endpoint = role === 'volunteer' ? '/register/volunteer' : '/register/organizer';
        const response = await API.post(endpoint, formData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

/**
 * Create an event by an organizer
 * @param {Object} formData - Event form data
 */
export const createEvent = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await API.post('/events/create-event', formData, {
            headers: {
                Authorization: `Bearer ${token}`, // Fixed string interpolation
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

/**
 * Fetch all events (for volunteers or organizers)
 */
export const getEvents = async () => {
    try {
        const response = await API.get('/events');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

/**
 * Fetch a specific event by ID
 * @param {String} id - Event ID
 */
export const getEventById = async (id) => {
    try {
        const response = await API.get(`/events/${id}`); // Fixed string interpolation
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

/**
 * Fetch all volunteers
 */
export const getVolunteers = async () => {
    try {
        const response = await API.get('/users/volunteers');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

/**
 * Fetch all organizers
 */
export const getOrganizers = async () => {
    try {
        const response = await API.get('/users/organizers');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

/**
 * Assign a task to a volunteer
 * @param {String} taskId - Task ID
 * @param {String} volunteerId - Volunteer ID
 */
export const assignTask = async (taskId, volunteerId) => {
    try {
        const response = await API.post('/tasks/assign', { taskId, volunteerId });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

/**
 * Fetch all tasks for a specific event
 * @param {String} eventId - Event ID
 */
export const getTasksByEvent = async (eventId) => {
    try {
        const response = await API.get(`/tasks/event/${eventId}`); // Fixed string interpolation
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

/**
 * Submit feedback for an event
 * @param {String} eventId - Event ID
 * @param {Object} feedbackData - Feedback data
 */
export const submitFeedback = async (eventId, feedbackData) => {
    try {
        const response = await API.post(`/feedback/${eventId}`, feedbackData); // Fixed string interpolation
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

/**
 * Fetch feedback for an event
 * @param {String} eventId - Event ID
 */
export const getEventFeedback = async (eventId) => {
    try {
        const response = await API.get(`/feedback/${eventId}`); // Fixed string interpolation
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

/**
 * Handle API errors
 * @param {Error} error - The error object
 */
const handleError = (error) => {
    if (error.response) {
        console.error('Error response:', error.response.data);
    } else if (error.request) {
        console.error('No response received:', error.request);
    } else {
        console.error('Error:', error.message);
    }
    throw error;
};
/**
 * Block a user account after the session
 * @param {String} email - Email of the user to be blocked
 */
export const blockAccount = async (email) => {
    try {
        const response = await API.post('/auth/block-account', { email });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export default API;
