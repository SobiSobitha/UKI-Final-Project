import React from 'react';
import './EventCard.css';

const EventCard = ({ event, onClick }) => {
  return (
    <div className="event-card" onClick={onClick}>
      <h3>{event.createdBy.organizationName}</h3>
      <p>Organizer: {event.createdBy.name}</p>
    </div>
  );
};

export default EventCard;
