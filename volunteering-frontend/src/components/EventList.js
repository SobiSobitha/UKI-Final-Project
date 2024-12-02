// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from './Header'; // Import the Header component
// import Footer from './Footer'; // Import the Footer component
// import './EventList.css';

// const EventList = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedRoles, setSelectedRoles] = useState({}); // Track selected roles for each event
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch('http://localhost:8001/api/events');
//         if (!response.ok) {
//           throw new Error('Failed to fetch events');
//         }
//         const data = await response.json();
//         setEvents(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const handleRoleChange = async (eventId, role) => {
//     try {
//       // Update selected role locally
//       setSelectedRoles((prevSelectedRoles) => ({
//         ...prevSelectedRoles,
//         [eventId]: role,
//       }));

//       // Send notification to the backend (you might need to create a new API endpoint for this)
//       const response = await fetch(`http://localhost:8001/api/notify-organizer/${eventId}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ eventId, role }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to notify organizer');
//       }
//       console.log('Organizer notified about role selection');
//     } catch (error) {
//       console.error('Error notifying organizer:', error);
//     }
//   };

//   // const handleBackToHome = () => {
//   //   navigate('/');
//   // };

//   const handleSeeMore = (eventId) => {
//     navigate(`/volunteer-dashboard`); // Navigate to detailed event page
//   };

//   if (loading) {
//     return <div className="loading">Loading events...</div>;
//   }

//   if (error) {
//     return <div className="error">Error: {error}</div>;
//   }

//   return (
//     <div className="event-list-page">
//       <Header /> {/* Include Header component */}
//       <div className="event-list-container">
//         {/* <h1>Event List</h1>
//         <button className="back-to-home" onClick={handleBackToHome}>
//           Back to Home
//         </button> */}

//         <table className="event-table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Description</th>
//               <th>Location</th>
//               <th>Date</th>
//               <th>Organizer</th>
//               <th>Roles</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {events.map((event) => (
//               <tr key={event._id}>
//                 <td>{event.title}</td>
//                 <td>{event.description}</td>
//                 <td>{event.location}</td>
//                 <td>{new Date(event.date).toLocaleDateString()}</td>
//                 <td>{event.createdBy?.name || 'Unknown Organizer'}</td>
//                 <td>
//                   {event.roles && event.roles.length > 0 ? (
//                     <div className="roles">
//                       {event.roles.map((role, index) => (
//                         <div key={index}>
//                           <input
//                             type="radio"
//                             id={`role-${index}`}
//                             name={`event-${event._id}-role`}
//                             value={role}
//                             onChange={() => handleRoleChange(event._id, role)}
//                           />
//                           {role}
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p>No roles assigned</p>
//                   )}
//                 </td>
//                 <td>
//                   <button
//                     className={`see-more ${selectedRoles[event._id] ? 'active' : 'inactive'}`}
//                     onClick={() => handleSeeMore(event._id)}
//                     disabled={!selectedRoles[event._id]} // Disable button if no role is selected
//                   >
//                     See More
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Footer /> {/* Include Footer component */}
//     </div>
//   );
// };

// export default EventList;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Import the Header component
import Footer from './Footer'; // Import the Footer component
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState({});
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

  const handleRoleChange = async (eventId, role) => {
    try {
      setSelectedRoles((prevSelectedRoles) => ({
        ...prevSelectedRoles,
        [eventId]: role,
      }));

      const response = await fetch(`http://localhost:8001/api/notify-organizer/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, role }),
      });

      if (!response.ok) {
        throw new Error('Failed to notify organizer');
      }
      console.log('Organizer notified about role selection');
    } catch (error) {
      console.error('Error notifying organizer:', error);
    }
  };

  const handleSeeMore = (eventId) => {
    navigate(`/volunteer-dashboard`);
  };

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="event-list-page">
      <Header />
      <div className="event-list-container">
        <h1 className="event-list-title">Explore Events</h1>
        <div className="event-cards">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-description">{event.description}</p>
              <p className="event-location">📍 {event.location}</p>
              <p className="event-date">📅 {new Date(event.date).toLocaleDateString()}</p>
              <p className="event-organizer">👤 {event.createdBy?.name || 'Unknown Organizer'}</p>
              <div className="roles-container">
                {event.roles && event.roles.length > 0 ? (
                  event.roles.map((role, index) => (
                    <label key={index} className="role-option">
                      <input
                        type="radio"
                        name={`event-${event._id}-role`}
                        value={role}
                        onChange={() => handleRoleChange(event._id, role)}
                      />
                      {role}
                    </label>
                  ))
                ) : (
                  <p className="no-roles">No roles available</p>
                )}
              </div>
              <button
                className={`see-more-button ${selectedRoles[event._id] ? 'active' : 'inactive'}`}
                onClick={() => handleSeeMore(event._id)}
                disabled={!selectedRoles[event._id]}
              >
                See More
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventList;
