import React, { useState, useEffect } from 'react';
import './ManageVolunteers.css';

const ManageVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editVolunteerData, setEditVolunteerData] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
  });

  // const predefinedTasks = [
  //   'Set up event',
  //   'Manage registration',
  //   'Assist with logistics',
  //   'Coordinate with vendors',
  //   'Clean up after event',
  // ];

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/users/volunteers');
        if (!response.ok) {
          throw new Error('Failed to fetch volunteers');
        }
        const data = await response.json();
        setVolunteers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  const handleCardClick = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setEditVolunteerData({
      name: volunteer.name || '',
      email: volunteer.email || '',
      role: volunteer.role || '',
      phone: volunteer.phone || '',
    });
  };

  const handleCloseModal = () => {
    setSelectedVolunteer(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditVolunteerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8001/api/users/volunteers/${selectedVolunteer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editVolunteerData),
      });

      if (!response.ok) {
        throw new Error('Failed to update volunteer details');
      }

      const updatedVolunteer = await response.json();
      setVolunteers((prevVolunteers) =>
        prevVolunteers.map((vol) => (vol._id === updatedVolunteer._id ? updatedVolunteer : vol))
      );

      setIsEditing(false);
      alert('Volunteer updated successfully!');
    } catch (error) {
      console.error(error.message);
      alert('Failed to update volunteer. Please try again.');
    }
  };

  const handleAssign = async (volunteerId, task) => {
    try {
      const response = await fetch(`http://localhost:8001/api/users/volunteers/${volunteerId}/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign task');
      }

      alert(`Task "${task}" has been assigned to ${selectedVolunteer.name}!`);
      handleCloseModal(); // Close modal after assigning
    } catch (error) {
      console.error(error.message);
      alert('Failed to assign task. Please try again.');
    }
  };

  if (loading) return <p>Loading volunteers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="manage-volunteers-container">
    <h1>Manage Volunteers</h1>
    <div className="volunteers-grid">
      {volunteers.length > 0 ? (
        volunteers.map((volunteer) => (
          <div
            key={volunteer._id}
            className="volunteer-card"
            onClick={() => handleCardClick(volunteer)}
          >
            <div className="volunteer-avatar">
              {volunteer.image ? (
                <img
                  src={volunteer.image}
                  alt={`${volunteer.name}'s avatar`}
                  className="volunteer-image"
                />
              ) : (
                <img
                  src="/Profile.png"
                  alt="Default avatar"
                  className="volunteer-image"
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No volunteers found</p>
      )}
    </div>

      {/* Modal Section */}
      {selectedVolunteer && (
        <div className="volunteer-modal">
          <div className="view-modal">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>

            {isEditing ? (
              // Edit Mode: Form for editing volunteer details
              <div>
                <h2>Edit Volunteer</h2>
                <form>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={editVolunteerData.name}
                    onChange={handleInputChange}
                  />
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={editVolunteerData.email}
                    onChange={handleInputChange}
                  />
                  <label>Role:</label>
                  <input
                    type="text"
                    name="role"
                    value={editVolunteerData.role}
                    onChange={handleInputChange}
                  />
                  <label>Phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editVolunteerData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                  <button type="button" onClick={handleSave}>Save</button>
                </form>
              </div>
            ) : (
              // View Mode: Display volunteer details
              <div>
                <div className="animated-message">You can manage the volunteers</div>
                <h2>{selectedVolunteer.name}</h2>
                <p><strong>Email:</strong> {selectedVolunteer.email}</p>
                <p><strong>Role:</strong> {selectedVolunteer.role}</p>
                <p><strong>Phone:</strong> {selectedVolunteer.phone || 'N/A'}</p>
                <div className="modal-actions">
                  {/* {predefinedTasks.map((task) => (
                    <button key={task} onClick={() => handleAssign(selectedVolunteer._id, task)}>
                      Assign "{task}"
                    </button>
                  ))} */}
                  <button onClick={handleEdit}>Edit</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVolunteers;

