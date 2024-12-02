import React, { useState, useEffect } from "react";
import { Calendar, Users, BarChart, PlusCircle, Bell, LogOut, Clock, Target, TrendingUp, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import './OrganizerDashboard.css';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [volunteers, setVolunteers] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]); // State to hold notification data
  const navigate = useNavigate();  // Initialize the navigate function

  useEffect(() => {
    // Hardcoded notifications
    setNotifications([
      { id: 1, userId: "66f501d6ea1577bde98eaefc", message: "Eco Warriers was selected.", isDisabled: true },
      { id: 2, userId: "66f5081b5c41a030788b7f8b", message: "Community clean up was selected.", isDisabled: true },
      { id: 3, userId: "66f501d6ea1577bde98eaefc", message: "Beach Clean up was selected.", isDisabled: true },
      { id: 4, userId: "66f5081b5c41a030788b7f8b", message: "Community clean up was selected.", isDisabled: true },
      { id: 4, userId: "66f51f36acb4a32a7895ff65", message: "Food Donation was selected", isDisabled: true },
      { id: 5, userId: "66f5081b5c41a030788b7f8b", message: "Shiramadhana Champaign was selected.", isDisabled: true },
      { id: 5, userId: "66f5081b5c41a030788b7f8b", message: "Workshop was selected", isDisabled: true},

    ]);

    // Hardcoded upcoming events
    setEvents([
      { id: '673322e551180b2e9320d6b4', name: "Eco Warriers", date: "2024-12-20" },
      { id: '67349a8e29ed106049cbb5fd', name: "jdfj", date: "2024-12-25" },
      { id: '67349cbb29ed106049cbb611', name: "Community Clean-up", date: "2024-12-02" },
      { id: '66f7a923862a2f1d661b1bae', name: "Shiramadhana Champaign", date: "2024-12-01"},
      { id: '673322e551180b2e9320d6b4', name: "Workshop", date: "2024-12-05"},
      { id: '67349cbb29ed106049cbb611', name: "Food Donation", date: "2024-12-10"},


    ]);

    // Show a welcome message when the organizer first visits the dashboard
    if (!localStorage.getItem("hasVisitedDashboard")) {
      alert("Welcome Organizer... here you can manage your volunteers");
      localStorage.setItem("hasVisitedDashboard", "true");  // Mark that the organizer has visited
    }
  }, []);

  const handleNotificationClick = (notificationId) => {
    // Disable the notification button when clicked
    setNotifications(notifications.map(notification =>
      notification.id === notificationId ? { ...notification, isDisabled: true } : notification
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-purple-50/50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Organizer Dashboard</h1>
        </div>
        <nav className="sidebar-nav">
          <button className="sidebar-button" onClick={() => navigate('/create-event')}>
            <PlusCircle className="icon" /> New Event
          </button>
          <button className="sidebar-button" onClick={() => navigate('/events')}>
            <Calendar className="icon" /> Events
          </button>
          <button className="sidebar-button" onClick={() => navigate('/manage-volunteers')}>
            <Users className="icon" /> Manage Volunteers
          </button>
          {/* <button className="sidebar-button" onClick={() => navigate('/analytics')}>
            <BarChart className="icon" /> Analytics
          </button> */}
        </nav>
        <button className="sidebar-button logout" onClick={() => navigate('/')}>
          <LogOut className="icon" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <h2>Dashboard Overview</h2>
          <div className="top-bar-buttons">
            <button className="top-bar-button notification">
              <Bell className="icon" />
            </button>
            <button className="top-bar-button add-event" onClick={() => navigate('/create-event')}>
              <PlusCircle className="icon" />
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-header">
                <h3>Total Events</h3>
                <Calendar className="stat-icon" />
              </div>
              <div className="stat-card-content">
                <div className="stat-value">{events.length}</div>
                <p className="stat-trend">+2 from last month</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-header">
                <h3>Active Volunteers</h3>
                <Users className="stat-icon" />
              </div>
              <div className="stat-card-content">
                <div className="stat-value">{volunteers}</div>
                <p className="stat-trend">+12 from last month</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-header">
                <h3>Engagement Rate</h3>
                <TrendingUp className="stat-icon" />
              </div>
              <div className="stat-card-content">
                <div className="stat-value">20%</div>
                <p className="stat-trend">+5% from last month</p>
              </div>
            </div>
          </div>

          {/* Upcoming Events and Recent Activity */}
          <div className="events-activity">
            {/* Upcoming Events */}
            <div className="card">
              <div className="card-header">
                <Clock className="card-icon" />
                <h3>Upcoming Events</h3>
              </div>
              <div className="card-content scrollable">
                {events.slice(0, ).map((event) => (
                  <div key={event.id} className="event-item">
                    <div>
                      <h4>{event.name}</h4>
                      <p className="event-date">{event.date}</p>
                    </div>
                    <div className="event-participants">
                      <Users className="icon" />
                      <span>{event.participants}</span>
                    </div>
                    <div className="event-id">
                      <p><strong>Event ID:</strong> {event.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity with Notifications */}
            <div className="card">
              <div className="card-header">
                <Target className="card-icon" />
                <h3>Recent Activity</h3>
              </div>
              <div className="card-content scrollable">
                {notifications.map((notification) => (
                  <div key={notification.id} className="activity-item">
                    <p><strong>User ID:</strong> {notification.userId}</p>
                    <p>{notification.message}</p>
                    <button
                      className={`activity-button ${notification.isDisabled ? "disabled" : ""}`}
                      onClick={() => handleNotificationClick(notification.id)}
                      disabled={notification.isDisabled}
                    >
                      Disable
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
