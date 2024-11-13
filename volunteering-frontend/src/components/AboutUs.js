import './AboutUs.css';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="container mx-auto px-4 py-8 space-y-12">
        <header className="about-us-header text-center space-y-4">
          <h1 className="about-us-title">About Our Voluntary Platform</h1>
          <p className="about-us-description">
            Connecting hearts, hands, and communities to make a difference in the world.
          </p>
        </header>

        <section className="about-us-mission space-y-6">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-description">
            We strive to create a world where everyone has the opportunity to contribute to their community and make a positive impact. Our platform connects volunteers with meaningful projects and organizations, fostering a global network of compassion and action.
          </p>
        </section>

        <section className="about-us-values space-y-6">
          <h2 className="section-title">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="core-value-card">
              <div className="core-value-card-content">
                <div className="core-value-icon">❤️</div>
                <h3 className="core-value-title">Compassion</h3>
                <p className="core-value-description">We believe in the power of empathy and kindness to transform lives and communities.</p>
              </div>
            </div>
            <div className="core-value-card">
              <div className="core-value-card-content">
                <div className="core-value-icon">👥</div>
                <h3 className="core-value-title">Collaboration</h3>
                <p className="core-value-description">We foster partnerships and teamwork to achieve greater impact together.</p>
              </div>
            </div>
            <div className="core-value-card">
              <div className="core-value-card-content">
                <div className="core-value-icon">🌍</div>
                <h3 className="core-value-title">Global Impact</h3>
                <p className="core-value-description">We connect local actions to global change, creating a ripple effect of positive transformation.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-us-story space-y-6">
          <h2 className="section-title">Our Story</h2>
          <p className="section-description">
            Founded in 2024, our platform was born from a simple idea: to make volunteering accessible to everyone. What started as a local initiative has grown into a global community of changemakers, connecting thousands of volunteers with impactful projects around the world.
          </p>
        </section>

        <section className="join-community-bg space-y-6">
          <h2 className="section-title">Join Our Community</h2>
          <p className="section-description">
            Whether you're looking to volunteer, start a project, or partner with us, there's a place for you in our community. Together, we can create lasting change and build a better world for all.
          </p>
          <div className="join-community-button">
            <Link to="/">
              <button className="get-involved-button">
                Get Involved <span className="ml-2 h-4 w-4">➡</span>
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
