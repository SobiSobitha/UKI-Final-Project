import React, { useState, useEffect } from 'react';
import '../App.css'; 

import { 
  FaUsers, 
  FaCalendarAlt, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaHandsHelping, 
  FaGlobe, 
  FaArrowRight,
  FaHeart,
  FaStar,
  FaShieldAlt,
  FaCertificate,
 
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

// Header Component with Scroll Effect
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
    backgroundColor: isScrolled ? 'rgba(47, 49, 75, 0.95)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
    width: '100%', // Expand the width of the section
    paddingLeft: '10%', 
    paddingRight: '10%', 
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
    color: '#FAF6E9' ,
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  };

  const linkStyle = {
    color:  '#FAF6E9' ,
    textDecoration: 'none',
    fontWeight: '900',
    position: 'relative',
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
            <button style={{ backgroundColor: 'transparent', color: '#FAF6E9', marginRight: '0.5rem' }}>Sign In</button>
          </a>
          <a href="/register">
            <button style={{ backgroundColor: '#E07A5F', color: 'white', borderRadius: '30px' }}>Register</button>
          </a>
        </div>
      </div>
    </header>
  );
};

const Hero = () => {
  const sectionStyle = {
    paddingTop: '8rem',
    paddingBottom: '9rem',
    background: 'linear-gradient(135deg, #2F314B 0%, #3D8DAE 100%)',
    color: '#FDF5E6',
    width: '100%', // Expand the width of the section
    paddingLeft: '10%', // Add some padding on the left
    paddingRight: '10%', // Add some padding on the right
  };

  // Inline styles for the shake animation
  const imageStyle = {
    width: '65%',
    borderRadius: '125px',
    boxShadow: '0 30px 50px rgba(0, 0, 0, 1.2)',
    animation: 'shake 1.5s ease-in-out infinite',
  };

  return (
    <section style={sectionStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ maxWidth: '650px' }}> {/* Restrict text width for better layout */}
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color:'#FDF5E6' }}>Make a <br/>Difference Through Volunteering</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.6rem'}}>
            Connect with meaningful opportunities <br/>and create positive change in your community.
          </p>
          <a href="/register-organizer">
            <button style={{ backgroundColor: '#E07A5F', color: 'white', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.75rem', width: '35%' , fontWeight:'bold' }}>
              Get Started <FaArrowRight />
            </button>
          </a>
        </div>
        <img src="/Volunteering.webp" alt="Volunteering" style={imageStyle} />
      </div>
      <style>
        {`
          @keyframes shake {
            0% { transform: translateY(0); }
            25% { transform: translateY(-8px); }
            50% { transform: translateY(0); }
            75% { transform: translateY(8px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </section>
  );
};



// Features Section Component
const Features = () => {
  const features = [
    { icon: FaHandsHelping, title: "Smart Matching", description: "AI-powered system connects you with perfect opportunities." },
    { icon: FaCalendarAlt, title: "Flexible Scheduling", description: "Choose opportunities that fit your schedule." },
    { icon: FaHeart, title: "Impact Tracking", description: "Monitor your contributions with detailed analytics." },
    { icon: FaStar, title: "Recognition Program", description: "Earn badges and rewards for your contributions." },
    { icon: FaShieldAlt, title: "Verified Organizations", description: "Connect with thoroughly vetted non-profits." },
    { icon: FaCertificate, title: "Skill Development", description: "Access training resources and certifications." }
  ];

  const sectionStyle = {
    padding: '7rem 0',
    backgroundColor: '#FAF6E9',
  };

  return (
    <section style={sectionStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.75rem', fontWeight: 'bold', color: '#2F314B', marginBottom: '1.5rem' }}>Why Choose Voluntry?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {features.map((feature, index) => (
            <div key={index} style={{ padding: '2.5rem', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
              <feature.icon style={{ fontSize: '3rem', color: '#E07A5F', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', color: '#2F314B' }}>{feature.title}</h3>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const Inspiration = () => {
  const sectionStyle = {
    padding: '7rem 0',
    background: ' url("/people.webp")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    textAlign: 'center',
    height:'420px',
  };

  const imageStyle = {
    display: 'none', // Hide the image as it's now a background
  };

  const textStyle = {
    fontSize: '1.5rem',
    fontWeight: '500',
    margin: '0 auto',
    maxWidth: '800px',
  };

  return (
    <section style={sectionStyle}>
      <h2 style={{ fontSize: '2.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Be Part of Something Great</h2>
      <p style={textStyle}>Join thousands of volunteers making an impact. Whether you want to help locally or globally, every contribution counts.</p>
      {/* The img tag is removed as the background image is now handled by CSS */}
    </section>
  );
};

const SubscriptionPlans = () => {
  const plans = [
    {
      title: "1-Month Plan",
      price: "₹500",
      duration: "Monthly",
      features: [
        "Access to all events",
        "Basic support",
        "Volunteer match recommendations",
        "Renewable monthly",
      ],
      link: "/create-event-payment",
    },
    {
      title: "6-Month Plan",
      price: "₹1000",
      duration: "6 Months",
      features: [
        "Priority support",
        "All 1-month plan features",
        "Access to premium events",
        "50% discount ",
      ],
      link: "/create-event-payment",
    },
    {
      title: "1-Year Plan",
      price: "₹1500",
      duration: "Annual",
      features: [
        "Premium support",
        "All 6-month plan features",
        "Free access to exclusive webinars",
        "Recognition ",
      ],
      link: "/create-event-payment",
    },
  ];

  const sectionStyle = {
    padding: '7rem 0',
    backgroundColor: 'white',
  };

  const cardStyle = {
    width: '300px',
    padding: '2rem',
    backgroundColor: '#41436A',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    border: '2px solid transparent',
    transition: 'border-color 0.3s ease',
  };

  const cardHoverStyle = {
    border: '2px solid coral', // Set border color to blue on hover
  };

  const buttonStyle = {
    backgroundColor: 'coral',
    color: 'white',
    borderRadius: '30px',
    padding: '10px 20px',
    marginTop: '1rem',
    width: '100%',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: 'white',
    color: 'coral',
  };

  return (
    <section style={sectionStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', fontWeight: 'bold' }}>
        <h2 style={{ fontSize: '2.75rem', fontWeight: 'bold', color: '#2F314B', marginBottom: '1.5rem' }}>Choose Your Plan</h2>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {plans.map((plan, index) => (
            <div 
              key={index} 
              style={cardStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
            >
              <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>{plan.title}</h3>
              <div style={{ fontSize: '2rem', color: 'white', fontWeight: 'bold' }}>{plan.price}</div>
              <p style={{ color: 'white', fontWeight: 'bold' }}>{plan.duration}</p>
              <ul style={{ textAlign: 'left', marginTop: '1rem', color: 'white' }}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} style={{ marginBottom: '0.5rem' }}>{feature}</li>
                ))}
              </ul>
              <a href={plan.link}>
                <button 
                  style={buttonStyle}
                  onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)} 
                  onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
                >
                  Subscribe Now
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Impact = () => {
  const stats = [
    { icon: FaUsers, value: "10,000+", label: "Volunteers" },
    { icon: FaHandsHelping, value: "500+", label: "Projects" },
    { icon: FaGlobe, value: "50+", label: "Communities" }
  ];

  const sectionStyle = {
    padding: '7rem 0',
    background: 'linear-gradient(135deg, rgba(250, 246, 233, 0.85), rgba(47, 49, 75, 0.85)), url("/voluntry.webp")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#41436A',
  };

  const cardStyle = {
    padding: '2rem',
    backgroundColor: '#41436A',
    color: 'white',
    borderRadius: '20px',
    transition: 'background-color 0.3s ease',
  };

  const cardHoverStyle = {
    backgroundColor: 'white', // Light blue hover effect
    color: '#41436A',
  };

  return (
    <section style={sectionStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.75rem', fontWeight: 'bold' }}>Our Impact</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              style={cardStyle} 
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
            >
              <stat.icon style={{ fontSize: '2.5rem', color: '#E07A5F' }} />
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stat.value}</div>
              <div>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Footer = () => {
  const footerStyle = {
    background: 'linear-gradient(135deg, #2F314B 0%, #3D8DAE 100%)',
    color: '#FAF6E9',
    padding: '4rem 0',
  };

  const linkStyle = {
    color: '#FAF6E9',
    textDecoration: 'none',
    fontSize: '1rem',
  };

  return (
    <footer style={footerStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', textAlign: 'left' }}>
        {/* About Us Section */}
        <div style={{ flex: '1', minWidth: '200px', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>About Us</h3>
          <p style={{ lineHeight: '1.6' }}>
            Voluntry is dedicated to connecting volunteers with impactful projects worldwide. Join us to make a difference in your community and beyond.
          </p>
        </div>

        {/* Quick Links Section */}
        <div style={{ flex: '1', minWidth: '200px', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
            <li><a href="/about" style={linkStyle}>About Us</a></li>
            <li><a href="/events" style={linkStyle}>Our Events</a></li>
            <li><a href="/register" style={linkStyle}>Become a Volunteer</a></li>
            <li><a href="/contact" style={linkStyle}>Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div style={{ flex: '1', minWidth: '200px', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Contact Us</h3>
          <p style={{ lineHeight: '1.6' }}>
            Phone: 0753648410<br />
            Email: info@voluntry.com
          </p>
        </div>

        {/* Social Media Links */}
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

      {/* Copyright Section */}
      <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
        <p>Voluntry © 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => (
  <div>
    <Header />
    <Hero />
    <Features />
    <Inspiration /> 
    <SubscriptionPlans />
    <Impact />
    <Footer />
  </div>
);

export default App;
