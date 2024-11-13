// Header.js
import React, { useEffect, useState } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 95,
    transition: 'all 0.5s ease',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '5rem',
  };

  const logoStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#6495ED',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  };

  const linkStyle = {
    color: '#6495ED',
    textDecoration: 'none',
    fontWeight: '900',
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <a href="/" style={logoStyle}>Voluntry</a>
        <nav style={{ display: 'flex', gap: '2.5rem' }}>
          <a href="/about" style={linkStyle}>About</a>
          <a href="/events" style={linkStyle}>Events</a>
          <a href="/contact" style={linkStyle}>Contact</a>
        </nav>
        <div style={{ display: 'flex' }}>
          <a href="/login">
            <button style={{ backgroundColor: 'transparent', color: '#6495ED', marginRight: '0.5rem' }}>Sign In</button>
          </a>
          <a href="/register">
            <button style={{ backgroundColor: '#E07A5F', color: '#6495ED', borderRadius: '30px' }}>Register</button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
