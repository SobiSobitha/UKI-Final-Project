import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Replaced useHistory with useNavigate
import { Link } from 'react-router-dom';
import './LoginForm.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // useNavigate for routing

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

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

    // Check for admin credentials
    if (email === 'sobi@gmail.com' && password === 'sobi') {
      // Simulate successful login for the admin
      localStorage.setItem('token', 'admin-token');
      localStorage.setItem('role', 'admin');
      navigate('/admin'); // Redirect to admin dashboard
      return;
    }

    try {
      const response = await fetch('http://localhost:8001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (response.status === 403) {
        setError('Your account is pending admin approval.');
        return;
      }

      if (!response.ok) {
        setError(responseData.message || `Error: ${response.status}`);
        return;
      }

      if (responseData.success && responseData.token) {
        const { token, user } = responseData;

        localStorage.setItem('token', token);

        if (user && user.role) {
          const userRole = user.role.trim().toLowerCase();
          localStorage.setItem('role', userRole);

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
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome Back!</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="input-field"
            />
          </div>
          {error && <div className="alert">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="register-section">
          <p>Don't have an account?</p>
          <div className="register-links">
            <Link to="/register" className="register-link">Register as Volunteer</Link>
            <span>or</span>
            <Link to="/register-organizer" className="register-link">Register as Organizer</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
