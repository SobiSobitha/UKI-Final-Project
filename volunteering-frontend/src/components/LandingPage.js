import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaEnvelope, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaHandsHelping, 
  FaLightbulb, 
  FaGlobe, 
  FaSearch, 
  FaUserPlus,
  FaArrowRight,
  FaHeart,
  FaStar
} from 'react-icons/fa';

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
    zIndex: 50,
    transition: 'all 0.3s',
    backgroundColor: isScrolled ? 'rgba(75, 117, 185, 0.9)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(8px)' : 'none',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '5rem',
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2F314B',
    textDecoration: 'none',
    transition: 'color 0.3s',
  };

  const navStyle = {
    display: 'flex',
    gap: '2rem',
  };

  const linkStyle = {
    color: '#2F314B',
    textDecoration: 'none',
    transition: 'color 0.3s',
    position: 'relative',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#DE7357',
    color: 'white',
    border: 'none',
    borderRadius: '9999px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <a href="#" style={logoStyle}>Voluntry</a>
        <nav style={navStyle}>
          {['About', 'Events', 'Impact', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={linkStyle}
            >
              {item}
            </a>
          ))}
        </nav>
        <div>
          <button style={{ ...buttonStyle, backgroundColor: 'transparent' }}>Sign In</button>
          <button style={buttonStyle}>Register</button>
        </div>
      </div>
    </header>
  );
};

const Hero = () => {
  const sectionStyle = {
    paddingTop: '8rem',
    paddingBottom: '5rem',
    background: 'linear-gradient(to bottom right, #4B75B9, #9CCAF6)',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    alignItems: 'center',
  };

  const textStyle = {
    color: 'white',
  };

  const headingStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  };

  const paragraphStyle = {
    fontSize: '1.25rem',
    marginBottom: '2rem',
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#DE7357',
    color: 'white',
    border: 'none',
    borderRadius: '9999px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const imageContainerStyle = {
    position: 'relative',
  };

  const imageStyle = {
    width: '100%',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={textStyle}>
          <h1 style={headingStyle}>Make a Difference Through Volunteering</h1>
          <p style={paragraphStyle}>
            Connect with meaningful opportunities and create positive change in your community.
          </p>
          <button style={buttonStyle}>
            Get Started
            <FaArrowRight />
          </button>
        </div>
        <div style={imageContainerStyle}>
          <img
            src="/placeholder.svg?height=500&width=500"
            alt="Volunteering"
            style={imageStyle}
          />
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: FaHandsHelping,
      title: "Easy Matching",
      description: "Find the perfect volunteering opportunities that align with your interests and skills."
    },
    {
      icon: FaCalendarAlt,
      title: "Flexible Scheduling",
      description: "Choose opportunities that fit your schedule and availability."
    },
    {
      icon: FaHeart,
      title: "Impact Tracking",
      description: "Monitor and celebrate your contributions to the community."
    },
    {
      icon: FaStar,
      title: "Recognition",
      description: "Earn badges and certificates for your volunteering achievements."
    }
  ];

  const sectionStyle = {
    padding: '5rem 0',
    backgroundColor: 'white',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#4B75B9',
    textAlign: 'center',
    marginBottom: '1rem',
  };

  const subheadingStyle = {
    fontSize: '1.25rem',
    color: '#666',
    textAlign: 'center',
    marginBottom: '3rem',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  };

  const featureStyle = {
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s',
  };

  const iconStyle = {
    fontSize: '2.5rem',
    color: '#DE7357',
    marginBottom: '1rem',
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#4B75B9',
    marginBottom: '0.5rem',
  };

  const descriptionStyle = {
    color: '#666',
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Why Choose Voluntry?</h2>
        <p style={subheadingStyle}>Discover how we make volunteering accessible and rewarding.</p>
        <div style={gridStyle}>
          {features.map((feature, index) => (
            <div key={index} style={featureStyle}>
              <feature.icon style={iconStyle} />
              <h3 style={titleStyle}>{feature.title}</h3>
              <p style={descriptionStyle}>{feature.description}</p>
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
    padding: '5rem 0',
    background: 'linear-gradient(to bottom right, #9CCAF6, rgba(255, 177, 122, 0.2))',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#4B75B9',
    textAlign: 'center',
    marginBottom: '1rem',
  };

  const subheadingStyle = {
    fontSize: '1.25rem',
    color: '#666',
    textAlign: 'center',
    marginBottom: '3rem',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '2rem',
    textAlign: 'center',
  };

  const statStyle = {
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s',
  };

  const iconStyle = {
    fontSize: '2rem',
    color: '#DE7357',
    marginBottom: '0.5rem',
  };

  const valueStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2F314B',
  };

  const labelStyle = {
    color: '#666',
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Our Impact</h2>
        <p style={subheadingStyle}>Together, we can create lasting change.</p>
        <div style={gridStyle}>
          {stats.map((stat, index) => (
            <div key={index} style={statStyle}>
              <stat.icon style={iconStyle} />
              <div style={valueStyle}>{stat.value}</div>
              <div style={labelStyle}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const footerStyle = {
    padding: '2rem 0',
    backgroundColor: '#2F314B',
    color: 'white',
    textAlign: 'center',
  };

  const socialIconsStyle = {
    margin: '1rem 0',
  };

  const iconStyle = {
    margin: '0 0.5rem',
    color: 'white',
    transition: 'color 0.3s',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
  };

  return (
    <footer style={footerStyle}>
      <div>
        <p>© 2024 Voluntry. All Rights Reserved.</p>
        <div style={socialIconsStyle}>
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
            <a key={index} href="#" style={linkStyle}>
              <Icon style={iconStyle} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Impact />
      <Footer />
    </div>
  );
};

export default App;
