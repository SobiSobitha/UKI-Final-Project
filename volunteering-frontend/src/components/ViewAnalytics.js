import React, { useState, useEffect } from 'react';
import './ViewAnalytics.css';

const ViewAnalytics = () => {
  // State to hold roles and tasks selected by volunteers
  const [roleTaskSelections, setRoleTaskSelections] = useState([]);
  const [fetchedData, setFetchedData] = useState([]); // State to hold fetched roles and tasks

  useEffect(() => {
    // Function to fetch roles and tasks from the backend
    const fetchRoleTaskData = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/roles-tasks'); // Replace with your actual endpoint
        const data = await response.json();
        setFetchedData(data); // Set the fetched data to the state
      } catch (error) {
        console.error('Error fetching role and task data:', error);
      }
    };

    fetchRoleTaskData();
  }, []);

  // Function to notify the organizer of a new selection
  const handleNewSelection = (volunteerName, role, task) => {
    const newSelection = { id: Date.now(), volunteerName, role, task };
    setRoleTaskSelections((prevSelections) => [...prevSelections, newSelection]);
  };

  // Function to delete a selection
  const handleDeleteSelection = (id) => {
    setRoleTaskSelections((prevSelections) => prevSelections.filter((selection) => selection.id !== id));
  };

  return (
    <div className="analytics-container">
      <h1>View Analytics</h1>
      <h2>Selected Roles and Tasks</h2>
      {roleTaskSelections.length > 0 ? (
        <ul>
          {roleTaskSelections.map((selection) => (
            <li key={selection.id} className="selection-item">
              {selection.volunteerName} selected {selection.role} - {selection.task}
              <button onClick={() => handleDeleteSelection(selection.id)} className="delete-button">
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No roles and tasks selected yet.</p>
      )}
      
      <h2>Available Volunteer Selections</h2>
      {fetchedData.length > 0 ? (
        fetchedData.map((data) => (
          <div key={data.id}>
            <p>
              {data.volunteerName} - Role: {data.role}, Task: {data.task}
              <button onClick={() => handleNewSelection(data.volunteerName, data.role, data.task)} className="notify-button">
                Notify Organizer
              </button>
            </p>
          </div>
        ))
      ) : (
        <p>No roles and tasks available.</p>
      )}
    </div>
  );
};

export default ViewAnalytics;
