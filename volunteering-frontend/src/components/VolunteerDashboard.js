import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const VolunteerDashboard = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [currentTasks, setCurrentTasks] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch upcoming events
    useEffect(() => {
        fetch('http://localhost:8001/api/volunteer/upcoming-events')
            .then(response => response.json())
            .then(data => setUpcomingEvents(data))
            .catch(error => console.error('Error fetching upcoming events:', error));
    }, []);

    // Fetch current tasks
    useEffect(() => {
        fetch('http://localhost:8001/api/volunteer/current-tasks')
            .then(response => response.json())
            .then(data => setCurrentTasks(data))
            .catch(error => console.error('Error fetching current tasks:', error));
    }, []);

    // Fetch past events
    useEffect(() => {
        fetch('http://localhost:8001/api/volunteer/past-events')
            .then(response => response.json())
            .then(data => setPastEvents(data))
            .catch(error => console.error('Error fetching past events:', error));
    }, []);

    // Fetch notifications
    useEffect(() => {
        fetch('http://localhost:8001/api/volunteer/notifications')
            .then(response => response.json())
            .then(data => setNotifications(data))
            .catch(error => console.error('Error fetching notifications:', error));
    }, []);

    const handleBackToHome = () => {
        navigate('/'); // Navigate back to home
    };

    return (
        <div className="dashboard">
            <h1>Welcome, [Volunteer Name]!</h1>

            <section>
                <h2>Upcoming Events:</h2>
                <ul>
                    {upcomingEvents.map(event => (
                        <li key={event.id}>
                            {event.title} - Date: {event.date} | Location: {event.location}
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Current Tasks:</h2>
                <ul>
                    {currentTasks.map(task => (
                        <li key={task.id}>
                            {task.task} - Status: {task.status}
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Past Events:</h2>
                <ul>
                    {pastEvents.map(event => (
                        <li key={event.id}>
                            {event.title} - <Link to={`/feedback/${event.id}`}>Leave Feedback</Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Notifications:</h2>
                <ul>
                    {notifications.map((notification, index) => (
                        <li key={index}>
                            {notification.message} {/* Access the 'message' property of the notification object */}
                        </li>
                    ))}
                </ul>
            </section>

            <div className="dashboard-actions">
                <button onClick={() => alert("View Available Opportunities")}>
                    View Available Opportunities
                </button>
                <button onClick={() => alert("Edit Profile")}>
                    Edit Profile
                </button>
                <button onClick={() => alert("Logging out...")}>
                    Logout
                </button>
            </div>

            {/* Back to Home Button */}
            <button className="back-to-home" onClick={handleBackToHome}>
                Back to Home
            </button>
        </div>
    );
};

export default VolunteerDashboard;
