import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateEventForm.css';

const CreateEventForm = () => {
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    roles: [''],
    tasks: [''],
  });

  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      alert("User ID not found. Please log in again.");
      navigate('/login'); // Redirect to login page
    } else {
      setUserId(storedUserId);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleRoleChange = (index, value) => {
    const updatedRoles = [...eventDetails.roles];
    updatedRoles[index] = value;
    setEventDetails((prevDetails) => ({ ...prevDetails, roles: updatedRoles }));
  };

  const handleTaskChange = (index, value) => {
    const updatedTasks = [...eventDetails.tasks];
    updatedTasks[index] = value;
    setEventDetails((prevDetails) => ({ ...prevDetails, tasks: updatedTasks }));
  };

  const addRoleField = () => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      roles: [...prevDetails.roles, ''],
    }));
  };

  const addTaskField = () => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      tasks: [...prevDetails.tasks, ''],
    }));
  };

  const createEvent = async (formData, token) => {
    try {
      const response = await axios.post('http://localhost:8001/api/events/create-event', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('User ID not found. Please log in again.');
      return;
    }

    setErrorMessage('');

    if (!eventDetails.title) {
      setErrorMessage('Event title is required.');
      return;
    }
    if (!eventDetails.date) {
      setErrorMessage('Event date is required.');
      return;
    }
    if (!eventDetails.location) {
      setErrorMessage('Event location is required.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      console.log('Event Details:', eventDetails);
      console.log('Created By (User ID):', userId);

      const response = await createEvent(
        {
          ...eventDetails,
          createdBy: userId,
        },
        token
      );

      alert('Event created successfully!');
      navigate(`/create-event-payment`); // Navigate to the event details page after creation
    } catch (err) {
      if (err.response) {
        setErrorMessage(`Error creating event: ${err.response.data.message || 'Unknown error'}`);
      } else {
        setErrorMessage('Error: ' + err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-event-form">
      <h2>Create Event</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={eventDetails.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Event Description"
        value={eventDetails.description}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="date"
        value={eventDetails.date}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={eventDetails.location}
        onChange={handleInputChange}
      />

      <h3>Roles</h3>
      {eventDetails.roles.map((role, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Role ${index + 1}`}
            value={role}
            onChange={(e) => handleRoleChange(index, e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addRoleField}>Add Another Role</button>

      <h3>Tasks</h3>
      {eventDetails.tasks.map((task, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Task ${index + 1}`}
            value={task}
            onChange={(e) => handleTaskChange(index, e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addTaskField}>Add Another Task</button>

      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEventForm;
