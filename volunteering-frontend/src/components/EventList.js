import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRoleChange = (eventId, roleId) => {
    console.log(`Role changed for event ID ${eventId}: Role ID ${roleId}`);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleSeeMore = () => {
    navigate('/volunteer-dashboard'); // Navigate to Volunteer Dashboard
  };

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="event-list-container">
      <h1>Event List</h1>
      <button className="back-to-home" onClick={handleBackToHome}>
        Back to Home
      </button>
      <div className="event-list">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <h2>{event.title}</h2>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Organizer:</strong> {event.createdBy?.name || 'Unknown Organizer'}</p> {/* Handle null organizer */}

            {/* Render roles if they exist */}
            {event.roles && event.roles.length > 0 ? (
              <div className="roles">
                <h3>Roles</h3>
                {event.roles.map((role, index) => (
                  <div key={index} className="role-radio">
                    <label htmlFor={`role-${index}`}>
                      <input
                        type="radio"
                        id={`role-${index}`}
                        name={`event-${event._id}-role`}
                        value={role}
                        onChange={() => handleRoleChange(event._id, role)}
                      />
                      {role}
                    </label>
                    {/* Render tasks if available */}
                    {event.tasks && event.tasks.length > 0 && (
                      <div className="tasks">
                        <h4>Tasks for {role}</h4>
                        <ul>
                          {event.tasks.map((task, taskIndex) => (
                            <li key={taskIndex}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No roles assigned for this event.</p>
            )}

            {/* See More Button */}
            <button className="see-more" onClick={handleSeeMore}>
              See More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
