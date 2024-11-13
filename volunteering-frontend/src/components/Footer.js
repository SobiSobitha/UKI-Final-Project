// Footer.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#2F314B',
    color: '#FAF6E9',
    padding: '2rem 0',
  };

  const linkStyle = {
    color: '#FAF6E9',
    textDecoration: 'none',
  };

  return (
    <footer style={footerStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', textAlign: 'left' }}>
        <div style={{ flex: '1', minWidth: '200px', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>About Us</h3>
          <p style={{ lineHeight: '1.6' }}>
            Voluntry is dedicated to connecting volunteers with impactful projects worldwide. Join us to make a difference in your community and beyond.
          </p>
        </div>

        <div style={{ flex: '1', minWidth: '200px', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
            <li><a href="/about" style={linkStyle}>About Us</a></li>
            <li><a href="/events" style={linkStyle}>Our Events</a></li>
            <li><a href="/register" style={linkStyle}>Become a Volunteer</a></li>
            <li><a href="/contact" style={linkStyle}>Contact Us</a></li>
          </ul>
        </div>

        <div style={{ flex: '1', minWidth: '200px', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Contact Us</h3>
          <p style={{ lineHeight: '1.6' }}>
            Phone: 0753648410<br />
            Email: info@voluntry.com
          </p>
        </div>

        <div style={{ flex: '1', minWidth: '200px', marginBottom: '2rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Follow Us</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
              <a key={index} href="#123" style={{ color: '#FAF6E9', fontSize: '1.5rem' }}>
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
        <p>Voluntry © 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
