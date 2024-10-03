import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status); // Debug log for response status

      // Handle response as JSON
      const responseData = await response.json();
      console.log('Response data:', responseData); // Log response data

      if (response.status === 403) {
        setError('Your account is pending admin approval.');
        return; // Prevent further execution
      }

      if (!response.ok) {
        setError(responseData.message || `Error: ${response.status}`);
        return; 
      }

      // Check for success message and token in the response
if (responseData.success && responseData.token) {
  const { token, user } = responseData; // Adjusted based on expected structure

  localStorage.setItem('token', token);
  
  // Ensure role is defined before navigating
  if (user && user.role) {
    const userRole = user.role.trim().toLowerCase();
    
    // Role-based navigation
    if (userRole === 'organizer') {
      navigate('/create-event');
    } else if (userRole === 'volunteer') {
      navigate('/events');
    } else {
      console.error('Role not recognized:', userRole);
      setError('Login failed. Please try again.');
    }
  } else {
    console.error('User role is undefined');
    setError('Role information is missing from the response.');
  }
} else {
  setError('Login failed. Please try again.');
}

    } catch (err) {
      console.error('Error during login:', err); 
      setError('Network error. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your Email"
            required // HTML5 validation
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required // HTML5 validation
          />
        </label>
        <br />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginForm;
