'use client'

import { useEffect, useState } from 'react'
import { Bell, Calendar, CheckSquare, LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './VolunteerDashboard.css'; // Importing the external CSS file

export default function VolunteerDashboard() {
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [currentTasks, setCurrentTasks] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  const [notifications, setNotifications] = useState([])
  const [volunteerName, setVolunteerName] = useState('')
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchVolunteerDetails = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/volunteer/details')
        const data = await response.json()
        setVolunteerName(data.name)
      } catch (error) {
        console.error('Error fetching volunteer details:', error)
      }
    }

    const fetchUpcomingEvents = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/volunteer/upcoming-events')
        const data = await response.json()
        setUpcomingEvents(data)
      } catch (error) {
        console.error('Error fetching upcoming events:', error)
      }
    }

    const fetchCurrentTasks = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/volunteer/current-tasks')
        const data = await response.json()
        setCurrentTasks(data)
      } catch (error) {
        console.error('Error fetching current tasks:', error)
      }
    }

    const fetchPastEvents = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/volunteer/past-events')
        const data = await response.json()
        setPastEvents(data)
      } catch (error) {
        console.error('Error fetching past events:', error)
      }
    }

    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/volunteer/notifications')
        const data = await response.json()
        setNotifications(data)
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    }

    fetchVolunteerDetails()
    fetchUpcomingEvents()
    fetchCurrentTasks()
    fetchPastEvents()
    fetchNotifications()
  }, [])

  const handleLogout = () => {
    // Add logout logic here (if needed)
    alert("Logging out...")
    navigate('/') // Navigate to the home page
  }

  const handleLeaveFeedback = (eventId) => {
    // Navigate to feedback page for the selected event
    navigate(`/feedback/:eventId`) // Assuming the feedback page accepts an event ID as a query parameter
  }

  const handleViewOpportunities = () => {
    navigate('/events') // Navigate to the events page
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="header">
          <div className="header-left">
            {/* <div className="avatar-container">
              <img src="/untitled design.png?height=50&width=50" alt={volunteerName} className="avatar-image" />
              <span className="avatar-fallback">{volunteerName.charAt(0)}</span>
            </div> */}
            <div>
              <h1 className="header-title">Welcome, {volunteerName || 'Volunteer'}!</h1>
              <p className="header-subtitle">Volunteer Dashboard</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </button>
        </div>

        <div className="tabs-container">
          <div className="tabs-list">
            <button>Upcoming Events</button>
            <button>Current Tasks</button>
            <button>Past Events</button>
            <button>Notifications</button>
          </div>
          <div className="tabs-content">
            {/* Upcoming Events */}
            <div>
              <div className="card-header">
                <h2 className="flex items-center">
                  <Calendar className="mr-2" style={{ color: '#E27D60' }} />
                  Upcoming Events
                </h2>
              </div>
              <div className="card-content">
                <ul className="space-y-2">
                  {upcomingEvents.map(event => (
                    <li key={event.id} className="card-item">
                      <span>{event.title}</span>
                      <span className="text-sm">{event.date} | {event.location}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Current Tasks */}
            <div>
              <div className="card-header">
                <h2 className="flex items-center">
                  <CheckSquare className="mr-2" style={{ color: '#E27D60' }} />
                  Current Tasks
                </h2>
              </div>
              <div className="card-content">
                <ul className="space-y-2">
                  {currentTasks.map(task => (
                    <li key={task.id} className="card-item">
                      <span>{task.task}</span>
                      <span className="text-sm">Status: {task.status}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Past Events */}
            <div>
              <div className="card-header">
                <h2 className="flex items-center">
                  <Calendar className="mr-2" style={{ color: '#E27D60' }} />
                  Past Events
                </h2>
              </div>
              <div className="card-content">
                <ul className="space-y-2">
                  {pastEvents.map(event => (
                    <li key={event.id} className="card-item">
                      <span>{event.title}</span>
                      <button 
                        style={{ color: '#E27D60' }} 
                        onClick={() => handleLeaveFeedback(event.id)}
                      >
                        Leave Feedback
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <div className="card-header">
                <h2 className="flex items-center">
                  <Bell className="mr-2" style={{ color: '#E27D60' }} />
                  Notifications
                </h2>
              </div>
              <div className="card-content">
                <ul className="space-y-2">
                  {notifications.map((notification, index) => (
                    <li key={index} className="card-item">
                      {notification.message}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button className="tabs-button" onClick={handleViewOpportunities}>
            View Available Opportunities
          </button>
          <button className="profile-button">
            <User className="mr-2 h-4 w-4" /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}
