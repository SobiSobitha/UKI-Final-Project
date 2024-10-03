import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrganizerDashboard.css';

const OrganizerDashboard = () => {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate('/create-event'); // Navigate to the Create Event page
  };

  const handleViewEvents = () => {
    navigate('/events'); // Navigate to the Events list page
  };

  const handleManageVolunteers = () => {
    navigate('/manage-volunteers'); // Navigate to manage volunteers
  };

  const handleViewPayments = () => {
    navigate('/view-payments'); // Navigate to payments page
  };

  const handleViewAnalytics = () => {
    navigate('/view-analytics'); // Navigate to analytics page
  };

  const handleBackToHome = () => {
    navigate('/'); // Navigate back to the home page
  };

  return (
    <div className="dashboard-container">
      <h1>Organizer Dashboard</h1>
      <div className="dashboard-navbar">
        <button onClick={handleCreateEvent} className="dashboard-button">
          Create Event
        </button>
        <button onClick={handleViewEvents} className="dashboard-button">
          View Events
        </button>
        <button onClick={handleManageVolunteers} className="dashboard-button">
          Manage Volunteers
        </button>
        <button onClick={handleViewPayments} className="dashboard-button">
          View Payments
        </button>
        <button onClick={handleViewAnalytics} className="dashboard-button">
          View Analytics
        </button>
        <button onClick={handleBackToHome} className={`dashboard-button back-home-button`}>
          Back to Home
        </button>
      </div>
      <div className="dashboard-info">
        <h2>Welcome, Organizer!</h2>
        <p>Manage your events, volunteers, and payments, and track event performance.</p>
        <p>Use the buttons above to perform the respective actions.</p>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
