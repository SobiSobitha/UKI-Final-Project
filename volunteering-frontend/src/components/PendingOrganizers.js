import React from 'react';
import './AdminDashboard.css';

const PendingOrganizers = ({ pendingOrganizers, loading, onApprove, searchTerm }) => {
  const filteredOrganizers = pendingOrganizers.filter(organizer =>
    (organizer.name || 'Unnamed Organizer').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 id="pending-organizers">Pending Organizer Approvals</h2>
      {loading ? (
        <div>Loading organizers...</div>
      ) : (
        <ul className="organizer-list">
          {filteredOrganizers.length > 0 ? (
            filteredOrganizers.map((organizer) => (
              <li key={organizer._id}>
                <h3>{organizer.name || 'Unnamed Organizer'}</h3>
                <p>Email: {organizer.email}</p>
                <button onClick={() => onApprove(organizer._id)}>Approve</button>
              </li>
            ))
          ) : (
            <p>No organizers pending approval.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default PendingOrganizers;
