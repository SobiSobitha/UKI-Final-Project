import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './VolunteerDashboard.css';

const VolunteerDashboard = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [currentTasks, setCurrentTasks] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [volunteerName, setVolunteerName] = useState(''); // State to store volunteer name
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch volunteer details (name)
    useEffect(() => {
        const fetchVolunteerDetails = async () => {
            try {
                // Assuming you're fetching volunteer details from an API endpoint
                const response = await fetch('http://localhost:8001/api/volunteer/details');
                const data = await response.json();
                setVolunteerName(data.name); // Set volunteer name
            } catch (error) {
                console.error('Error fetching volunteer details:', error);
            }
        };

        fetchVolunteerDetails();
    }, []);

    // Fetch upcoming events
    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                const response = await fetch('http://localhost:8001/api/volunteer/upcoming-events');
                const data = await response.json();
                setUpcomingEvents(data);
            } catch (error) {
                console.error('Error fetching upcoming events:', error);
            }
        };

        fetchUpcomingEvents();
    }, []);

    // Fetch current tasks
    useEffect(() => {
        const fetchCurrentTasks = async () => {
            try {
                const response = await fetch('http://localhost:8001/api/volunteer/current-ttasks');
                const data = await response.json();
                setCurrentTasks(data);
            } catch (error) {
                console.error('Error fetching current tasks:', error);
            }
        };

        fetchCurrentTasks();
    }, []);

    // Fetch past events
    useEffect(() => {
        const fetchPastEvents = async () => {
            try {
                const response = await fetch('http://localhost:8001/api/volunteer/past-events');
                const data = await response.json();
                setPastEvents(data);
            } catch (error) {
                console.error('Error fetching past events:', error);
            }
        };

        fetchPastEvents();
    }, []);

    // Fetch notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('http://localhost:8001/api/volunteer/notifications');
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    // Handle logout
    const handleLogout = () => {
        // Add any logout logic here (e.g., clearing user data, tokens, etc.)
        alert("Logging out...");
        navigate('/'); // Redirect to home page
    };

    return (
        <div className="dashboard">
            <h1>Welcome, {volunteerName ? volunteerName : 'Volunteer'}!</h1> {/* Use the volunteer's name */}

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
                {event.title} - <Link to={`/feedback/${event.id}`} className="white-link">Leave Feedback</Link>
            </li>
        ))}
    </ul>
</section>


            <section>
                <h2>Notifications:</h2>
                <ul>
                    {notifications.map((notification, index) => (
                        <li key={index}>
                            {notification.message}
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
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default VolunteerDashboard;
