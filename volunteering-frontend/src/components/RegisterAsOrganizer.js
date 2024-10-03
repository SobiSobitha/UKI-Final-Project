import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios';
import './RegisterAsOrganizer.css'; // Import your CSS file for styling

const RegisterAsOrganizer = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Validate the form inputs
        if (!formData.username || !formData.email || !formData.password) {
            setError("All fields are required");
            return;
        }

        // Basic email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            setError("Please enter a valid email address");
            return;
        }

        setError('');
        setIsLoading(true); // Start loading state

        try {
            const response = await axios.post('http://localhost:8001/api/auth/register/Organizer', {
                ...formData,
                role: 'Organizer', // Ensure correct role
            });
            alert(response.data.message); // Show success message

            // Redirect to Create Event form
            navigate('/organizer-dashboard'); // Navigate to the create event page
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false); // End loading state
        }
    };

    return (
        <div className="register-container">
            <h2>Register as Organizer</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        placeholder="Username" 
                        value={formData.username} 
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default RegisterAsOrganizer;
