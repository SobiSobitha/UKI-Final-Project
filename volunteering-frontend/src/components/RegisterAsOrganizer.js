import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterAsOrganizer.css';

export default function RegisterAsOrganizer() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8001/api/auth/register/Organizer', {
        ...formData,
        role: 'Organizer',
      });

      alert(response.data.message);
      navigate('/home');
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overlay">
      <header className="navbar">
        <div className="navbar-container">
          <a href="/" className="logo">Voluntry</a>
          <nav className="nav-links">
            <a href="/about">About</a>
            <a href="/events">Events</a>
            <a href="/contact">Contact</a>
            {/* <a href="/login">Sign In</a> */}
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="register-box">
          <h2 className="register-title">Register as Organizer</h2>
          <p className="register-description">Create an account to start organizing events</p>

          <form onSubmit={handleRegister} className="register-form">
            <div className="input-group">
              <label htmlFor="username" className="input-label">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-field"
                required
              />
            </div>

            {error && <p className="alert">{error}</p>}

            <button type="submit" className="register-button" disabled={isLoading}>
              {isLoading ? "Creating your account..." : "Register"}
            </button>

            <p className="register-agreement">
              By registering, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>Voluntry © 2024. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
