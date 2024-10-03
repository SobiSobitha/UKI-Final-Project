import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../components/VOLUNTRY.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import TermsAndConditions from './TermsAndConditions'; // Import the new component
import './LandingPage.css';

const LandingPage = () => {
    const [showTerms, setShowTerms] = useState(false);

    const handleOrganizerRegisterClick = () => {
        setShowTerms(true);
    };

    const handleAgreeTerms = () => {
        setShowTerms(false);
        window.location.href = '/register-organizer'; // Navigate to Organizer registration form
    };

    return (
        <div className="landing-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={logo} alt="Voluntry Logo" />
                    <h1>VOLUNTRY</h1>
                </div>
                <ul className="navbar-links">
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>

            {/* Section with Text and Buttons */}
            <section className="image-album">
                <div className="left-side">
                    <p>Discover the impact of volunteering and join our community to make a difference. We offer a variety of opportunities to engage with meaningful causes and help those in need. Explore our events and get involved today!</p>
                </div>
                <div className="right-side">
                    <button onClick={handleOrganizerRegisterClick} className="button">Register as Organizer</button>
                    <Link to="/events" className="button1">See Event List</Link>
                </div>

                {/* Text Runner */}
                <div className="text-runner">
                    <div className="scrolling-text">Join us to make a difference. Upcoming events and volunteer opportunities await you!</div>
                </div>
            </section>

            {/* Modal for Terms and Conditions */}
            {showTerms && (
                <TermsAndConditions 
                    onAgree={handleAgreeTerms} 
                    onCancel={() => setShowTerms(false)} 
                />
            )}

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 Voluntry. All Rights Reserved.</p>
                    <p>Contact us: info@voluntry.com | Follow us on social media for updates.</p>
                </div>
                <div className="social-media">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
