import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',  // Add username to form data
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Log the data being sent
    console.log('Registration Data:', { ...formData, role: 'volunteer' }); // Log the data being sent

    // Ensure all fields are filled
    if (!formData.name || !formData.username || !formData.email || !formData.password) {
      setErrorMessage('Please fill all required fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:8001/api/auth/register/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          role: 'volunteer' // Set role to volunteer automatically
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const token = data.token; // Make sure to retrieve the token directly from data

      if (token) {
        localStorage.setItem('token', token);
        setSuccessMessage('Registration successful!'); // Set success message
        navigate('/events'); // Redirect to the events page for volunteers
      } else {
        setErrorMessage('Token not found in response');
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="register-page">
      <nav>
        <ul>
          <li>
            <Link to="/events">Event List</Link>
          </li>
        </ul>
      </nav>
      <h1>Register</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </label>
        <label htmlFor="username">
          Username:  {/* Add username label */}
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
