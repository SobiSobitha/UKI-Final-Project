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

      if (responseData.success && responseData.token) {
        const { token, user } = responseData; // Now this should contain user info

        // Save token and role in local storage
        localStorage.setItem('token', token);
        
        if (user && user.role) {
          const userRole = user.role.trim().toLowerCase();
          
          // Save user role in local storage
          localStorage.setItem('role', userRole); // Save the role in local storage
          
          // Role-based navigation
          if (userRole === 'organizer') {
            navigate('/organizer-dashboard');
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
      <h1>Please login here!!</h1>
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
        Don't have an account? 
        <br />
        <Link to="/register">Register as Volunteer</Link> 
        or 
        <Link to="/register-organizer">Register as Organizer</Link>
      </p> {/* Add links for both types of registration */}
    </div>
  );
};

export default LoginForm;
