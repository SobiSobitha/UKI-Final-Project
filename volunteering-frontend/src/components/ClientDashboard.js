import React, { useState, useEffect } from 'react';
import './ClientDashboard.css';

const ClientDashboard = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8001/api/events', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Server error:', errorData);
          setError(errorData.message || `Error: ${response.status}`);
          return;
        }

        const data = await response.json();
        setEvents(data.events || []);
      } catch (err) {
        console.error('Error fetching events:', err.message);
        setError('Failed to fetch events. Please try again later.');
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="client-dashboard">
      <h1>Event List</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {events.length > 0 ? (
          events.map((event) => (
            <li key={event._id}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </ul>
    </div>
  );
};

export default ClientDashboard;
