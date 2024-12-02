import React, { useState, useEffect } from 'react';
import '../App.css'; 

import { 
  // FaUsers, 
  FaCalendarAlt, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaHandsHelping, 
  // FaGlobe, 
  // FaArrowRight,
  FaHeart,
  FaStar,
  FaShieldAlt,
  FaCertificate,
  // FaLightbulb,
  FaQuoteLeft,
 
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import LoginForm from './LoginForm'; 
import RegisterForm from './RegisterForm'; 
// import RegisterAsOrganizer from './RegisterAsOrganizer'; 

// Header Component with Scroll Effect
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(null);
  useState(null); 
  const [activeModal, setActiveModal] = useState(null);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const openSignInModal = () => setActiveModal('signIn');
  const openRegisterModal = () => setActiveModal('register');
  const closeModal = () => {
    setActiveModal(null);
    setShowRegisterModal(null); // Close all register modals when closing
  };


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
    paddingLeft: '8.3%', 
    paddingRight: '10%', 
  };

  const containerStyle = {
    maxWidth: '1950px',
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
        <button onClick={openSignInModal} style={{ backgroundColor: 'transparent', color: '#FAF6E9', marginRight: '0.5rem' }}>Sign In</button>
        <button onClick={openRegisterModal} style={{ backgroundColor: '#E07A5F', color: 'white', borderRadius: '30px',fontWeight:'bold' }}>Volunteer</button>
      </div>
    </div>

    {/* Sign In Modal */}
    <Modal show={activeModal === 'signIn'} onHide={closeModal} centered>
        <LoginForm closeModal={closeModal} />
    </Modal>

    {/* Register Modal */}
    <Modal show={activeModal === 'register'} onHide={closeModal} centered>
        <RegisterForm closeModal={closeModal} />
    </Modal>


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
    height: '120%',
  };

  // Inline styles for the shake animation
  const imageStyle = {
    width: '55%',
    borderRadius: '125px',
    boxShadow: '0 30px 50px rgba(0, 0, 0, 1.2)',
    animation: 'shake 1.5s ease-in-out infinite',
  };

  return (
    <section style={sectionStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ maxWidth: '650px' }}> {/* Restrict text width for better layout */}
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color:'#FDF5E6' }}>Make a Difference<br/> Through <br/>Volunteering</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.6rem'}}>
            Connect with meaningful opportunities <br/>and create positive change in your community.
          </p>
          <a href="/register-organizer">
            <button style={{ backgroundColor: '#E07A5F', color: 'white', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.75rem', width: '29%'  ,textDecoration :'none', fontSize: '19px'}}>
              Organizer 
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


// const Inspiration = () => {
//   const sectionStyle = {
//     padding: '7rem 0',
//     background: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("/people.webp")',
//     backgroundPosition: 'center',
//     color: '#000000',
//     textAlign: 'center',
//     height: 'auto', // Adjust height to accommodate additional content
//     fontWeight: 'bold',
//     backgroundSize: 'cover',
//     height: '650px',
//   };

//   const textStyle = {
//     fontSize: '1.5rem',
//     fontWeight: '500',
//     margin: '0 auto',
//     maxWidth: '800px',
//   };

//   const features = [
//     {
//       icon: <FaHeart size={48} style={{ color: 'coral' }} />,
//       title: 'Make a Difference',
//       description: 'Your efforts can transform lives and bring hope to communities in need.',
//     },
//     {
//       icon: <FaGlobe size={48} style={{ color: 'coral' }} />,
//       title: 'Global Impact',
//       description: 'Expand your reach by contributing to local and international initiatives.',
//     },
//     {
//       icon: <FaUsers size={48} style={{ color: 'coral' }} />,
//       title: 'Join a Community',
//       description: 'Be part of a supportive network of volunteers working together for change.',
//     },
//     {
//       icon: <FaLightbulb size={48} style={{ color: 'coral' }} />,
//       title: 'Inspire Innovation',
//       description: 'Bring fresh ideas and inspire creativity in your volunteer efforts.',
//     },
//   ];

//   const featureContainerStyle = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     marginTop: '3rem',
//   };

//   const featureCardStyle = {
//     width: '250px',
//     margin: '1rem',
//     background: '#fff', // White background
//     borderRadius: '10px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     overflow: 'hidden',
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth animation
//     cursor: 'pointer',
//   };

//   const featureCardHoverStyle = {
//     transform: 'scale(1.05)', // Slightly enlarge on hover
//     boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
//   };

//   const iconStyle = {
//     marginBottom: '1rem',
//   };

//   return (
//     <section style={sectionStyle}>
//       {/* Header */}
//       <h2 style={{ fontSize: '2.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Be Part of Something Great</h2>
//       <p style={textStyle}>
//         Join thousands of volunteers making an impact. Whether you want to help locally or globally, every contribution
//         counts.
//       </p>

//       {/* Features */}
//       <div style={featureContainerStyle}>
//         {features.map((feature, index) => (
//           <div
//             key={index}
//             style={featureCardStyle}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = featureCardHoverStyle.transform;
//               e.currentTarget.style.boxShadow = featureCardHoverStyle.boxShadow;
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = '';
//               e.currentTarget.style.boxShadow = '';
//             }}
//           >
//             <div style={{ textAlign: 'center', padding: '2rem' }}>
//               <div style={iconStyle}>{feature.icon}</div>
//               <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{feature.title}</h3>
//               <p style={{ fontSize: '1rem', color: '#555' }}>{feature.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

const SubscriptionPlans = () => {
  const plans = [
    {
      title: "Starter Plan",
      price: "$25",
      duration: "Monthly",
      features: [
        "List up to 5 events per month",
        "Basic volunteer management tools (e.g., event sign-ups)",
        "Standard email support",
      ],
      link: "/create-event",
    },
    {
      title: "Growth Plan",
      price: "$65",
      duration: "Monthly",
      features: [
        "Unlimited event listings",
        "Priority listing of events on the platform",
        "Marketing support (e.g., newsletters, social media boosts)",
      ],
      link: "/create-event",
    },
    {
      title: "Enterprise Plan",
      price: "$120",
      duration: "Monthly",
      features: [
        "Dedicated account manager for support",
        "Custom branding for events",
        "Customizable event workflows",
      ],
      link: "/create-event",
    },
  ];

  const sectionStyle = {
    padding: "7rem 0",
    backgroundColor: "white",
  };

  const cardContainerStyle = {
    position: "relative",
    width: "300px",
    padding: "2rem",
    backgroundColor: "#41436A",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    zIndex: 1,
    animation: "blinkOutline 1.5s infinite",
  };

  const cardContentStyle = {
    position: "relative",
    zIndex: 2,
    color: "white",
    textAlign: "center",
  };

  const buttonStyle = {
    backgroundColor: "coral",
    color: "white",
    borderRadius: "30px",
    padding: "10px 20px",
    marginTop: "1rem",
    width: "100%",
    fontWeight: "bold",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "white",
    color: "coral",
  };

  const blinkOutlineStyle = `
    @keyframes blinkOutline {
      0%, 100% {
        box-shadow: 0 0 10px 2px coral;
      }
      50% {
        box-shadow: 0 0 10px 6px coral;
      }
    }
  `;

  return (
    <>
      <style>{blinkOutlineStyle}</style>
      <section style={sectionStyle}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          <h2
            style={{
              fontSize: "2.75rem",
              fontWeight: "bold",
              color: "#2F314B",
              marginBottom: "1.5rem",
            }}
          >
            Choose Your Plan
          </h2>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {plans.map((plan, index) => (
              <div key={index} style={cardContainerStyle} className="card-container">
                <div style={cardContentStyle}>
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                    {plan.title}
                  </h3>
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                    }}
                  >
                    {plan.price}
                  </div>
                  <p style={{ fontWeight: "bold" }}>{plan.duration}</p>
                  <ul
                    style={{
                      textAlign: "left",
                      marginTop: "1rem",
                    }}
                  >
                    {plan.features.map((feature, idx) => (
                      <li key={idx} style={{ marginBottom: "0.5rem" }}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href={plan.link}>
                    <button
                      style={buttonStyle}
                      onMouseEnter={(e) =>
                        Object.assign(e.target.style, buttonHoverStyle)
                      }
                      onMouseLeave={(e) =>
                        Object.assign(e.target.style, buttonStyle)
                      }
                    >
                      Subscribe Now
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What is Voluntry?",
      answer: "Voluntry is a platform that connects volunteers with meaningful opportunities to make a difference in their communities.",
    },
    {
      question: "How do I register as a volunteer?",
      answer: "Simply click the 'Volunteer' button at the top right of the page, fill in the required details, and start exploring opportunities!",
    },
    {
      question: "Is there a cost to using Voluntry?",
      answer: "Signing up as a volunteer is free. However, organizations may choose subscription plans for additional features.",
    },
    {
      question: "Can I organize events on Voluntry?",
      answer: "Yes! You can register as an organizer and use our tools to create and manage events.",
    },
    {
      question: "How does the platform ensure verified opportunities?",
      answer: "We thoroughly vet every organization to ensure opportunities are legitimate and impactful.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section style={{ padding: "7rem 0", backgroundColor: "#FAF6E9", color: "#2F314B" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "1rem 0",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onClick={() => toggleAnswer(index)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#2F314B",
                }}
              >
                {faq.question}
              </span>
              <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#DE7357" }}>
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            <div
              style={{
                maxHeight: activeIndex === index ? "500px" : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease",
                color: "#666",
                marginTop: activeIndex === index ? "1rem" : "0",
              }}
            >
              {activeIndex === index && (
                <p style={{ fontSize: "1rem", lineHeight: "1.5rem" }}>{faq.answer}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
const FeedbackSection = () => {
  const feedbacks = [
    {
      name: "John Doe",
      role: "Volunteer",
      quote:
        "This platform has been a game-changer for me. Volunteering has never been so organized and impactful!",
      avatar: "/Untitled design (1).png", // Replace with actual image paths
    },
    {
      name: "Jane Smith",
      role: "Event Organizer",
      quote:
        "The tools provided by this platform made managing my events seamless. I can focus more on creating impact!",
      avatar: "/Untitled design (3).png",
    },
    {
      name: "Alexa Johnson",
      role: "Volunteer",
      quote:
        "I found amazing opportunities to give back to my community. It's an incredible experience every time.",
      avatar: "/Untitled design (2).png",
    },
  ];

  const sectionStyle = {
    padding: "7rem 0",
    backgroundColor: "#F5EBDC",
    textAlign: "center",
  };

  const cardStyle = {
    padding: "2rem",
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    maxWidth: "350px",
    margin: "auto",
  };

  const avatarStyle = {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    marginBottom: "1rem",
    objectFit: "cover",
  };

  const quoteStyle = {
    fontStyle: "italic",
    color: "#41436A",
    marginBottom: "1.5rem",
  };

  const iconStyle = {
    fontSize: "1.5rem",
    color: "coral",
    marginRight: "0.5rem",
  };

  return (
    <section style={sectionStyle}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "2.75rem", fontWeight: "bold", marginBottom: "3rem",color:"coral" }}>
          What Our Users Say
        </h2>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {feedbacks.map((feedback, index) => (
            <div
              key={index}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
              }}
            >
              <img src={feedback.avatar} alt={feedback.name} style={avatarStyle} />
              <p style={quoteStyle}>
                <FaQuoteLeft style={iconStyle} />
                {feedback.quote}
              </p>
              <h4 style={{ margin: "0", color: "#2F314B" }}>{feedback.name}</h4>
              <p style={{ fontSize: "0.9rem", color: "gray" }}>{feedback.role}</p>
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
    padding: '4rem 2rem',
  };

  const sectionStyle = {
    flex: '1',
    minWidth: '200px',
    marginBottom: '2rem',
  };

  const linkStyle = {
    color: '#FAF6E9',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s',
  };

  const linkHoverStyle = {
    color: '#82B6A9', // Mint green on hover
  };

  const iconStyle = {
    color: '#FAF6E9',
    fontSize: '1.5rem',
    transition: 'color 0.3s',
    margin: '0 0.5rem',
  };

  const iconHoverStyle = {
    color: '#82B6A9', // Mint green on hover
  };

  const inputStyle = {
    flex: '1',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #3D8DAE',
    backgroundColor: '#2F314B',
    color: '#FAF6E9',
    outline: 'none',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '4px',
    backgroundColor: '#82B6A9', // Mint green
    color: '#2F314B', // Dark blue for contrast
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#6EA691',
  };

  return (
    <footer style={footerStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', textAlign: 'left' }}>
        {/* About Us Section */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>About Us</h3>
          <p style={{ lineHeight: '1.6' }}>
            Voluntry is dedicated to connecting volunteers with impactful projects worldwide. Join us to make a difference in your community and beyond.
          </p>
        </div>

        {/* Quick Links Section */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
            {['About Us', 'Our Events', 'Become a Volunteer', 'Contact Us'].map((text, idx) => (
              <li key={idx}>
                <a
                  href={`/${text.toLowerCase().replace(/\s+/g, '-')}`}
                  style={linkStyle}
                  onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
                  onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us Section */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Contact Us</h3>
          <p style={{ lineHeight: '1.6' }}>
            Phone: 0753648410<br />
            Email: info@voluntry.com
          </p>
        </div>

        {/* Social Media Links and Newsletter */}
        <div style={{ ...sectionStyle, textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Follow Us</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
              <a
                key={index}
                href="#123"
                style={iconStyle}
                onMouseEnter={(e) => (e.target.style.color = iconHoverStyle.color)}
                onMouseLeave={(e) => (e.target.style.color = iconStyle.color)}
              >
                <Icon />
              </a>
            ))}
          </div>
          <div>
            {/* <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Newsletter</h3> */}
            <p style={{ color: '#FAF6E9', marginBottom: '1rem' }}>Stay updated with our latest opportunities and news.</p>
            <form style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="Your email"
                style={inputStyle}
                required
              />
              <button
                type="submit"
                style={buttonStyle}
                onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.9rem', borderTop: '1px solid #FAF6E9', paddingTop: '1rem' }}>
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
    {/* <Inspiration />  */}
    <SubscriptionPlans />
    <FAQ />
    <FeedbackSection />
    <Footer />
  </div>
);

export default App;
