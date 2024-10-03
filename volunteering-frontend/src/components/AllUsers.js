import React from 'react';
import './AdminDashboard.css';

const AllUsers = ({ allUsers, loading, onSuspend, onUnsuspend }) => {
  return (
    <div>
      <h2 id="all-users">All Users</h2>
      {loading ? (
        <div>Loading users...</div>
      ) : (
        <ul className="user-list">
          {allUsers.length > 0 ? (
            allUsers.map((user) => (
              <li key={user._id}>
                <h3>{user.name || 'Unnamed User'}</h3>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <p>Status: {user.suspended ? 'Suspended' : 'Active'}</p>
                {!user.suspended ? (
                  <button onClick={() => onSuspend(user._id)}>Suspend User</button>
                ) : (
                  <button onClick={() => onUnsuspend(user._id)}>Unsuspend User</button>
                )}
              </li>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default AllUsers;
