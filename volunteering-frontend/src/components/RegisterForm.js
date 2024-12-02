'use client'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correctly use useNavigate
import { Link } from 'react-router-dom'; // Import Link for navigation
import './RegisterForm.css';

export default function RegisterVolunteer() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate(); // Correctly use useNavigate
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(''); // For password validation message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time password validation
    if (name === 'password' || name === 'confirmPassword') {
      validatePasswordMatch(
        name === 'password' ? value : formData.password,
        name === 'confirmPassword' ? value : formData.confirmPassword
      );
    }
  };

  const validatePasswordMatch = (password, confirmPassword) => {
    if (!confirmPassword) {
      setPasswordMessage('');
    } else if (password === confirmPassword) {
      setPasswordMessage('Passwords match ');
    } else {
      setPasswordMessage('Passwords do not match ');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    if (!formData.name || !formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage('Please fill all required fields');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8001/api/auth/register/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'volunteer' }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      if (data.token) {
        const token = data.token;
        const userId = data.user ? data.user.id : null;

        if (userId) {
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          setSuccessMessage('Registration successful!');
          navigate('/events');
        } else {
          setErrorMessage('User data not found in response');
        }
      } else {
        setErrorMessage('Token not found in response');
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2 className="register-title">Welcome Volunteer!</h2>
          <p className="register-description">Register your account to start volunteering</p>
        </div>
        <div className="register-content">
          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
              <label htmlFor="name" className="input-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label htmlFor="username" className="input-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label htmlFor="email" className="input-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
                className="input-field"
              />
              {passwordMessage && (
                <span className="password-message">{passwordMessage}</span>
              )}
            </div>
            {errorMessage && (
              <div className="alert error-alert">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="alert success-alert">{successMessage}</div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="register-button"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="register-footer">
            Already have an account?{' '}
            <Link to="/login" className="login-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
