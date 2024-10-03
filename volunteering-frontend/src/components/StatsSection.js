import React from 'react';
import './AdminDashboard.css';

const StatsSection = ({ loading, stats }) => {
  return (
    <div id="dashboard-stats" className="stats-section">
      {loading ? (
        <div>Loading stats...</div>
      ) : (
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Organizers</h3>
            <p>{stats.totalOrganizers}</p>
          </div>
          <div className="stat-card">
            <h3>Total Volunteers</h3>
            <p>{stats.totalVolunteers}</p>
          </div>
          <div className="stat-card">
            <h3>Events Created</h3>
            <p>{stats.eventsCreated}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsSection;
