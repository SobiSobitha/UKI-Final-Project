'use client'

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3, Users, Calendar, Settings, Bell, Search, Menu, ChevronDown, LogOut, User, Mail, MessageSquare, PlusCircle, FileText, LayoutDashboard, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [showMessages, setShowMessages] = useState(false); 
  const [messages, setMessages] = useState([ 
    { id: '66f51110f106484838c17c04', sender: "Abhimanyu", content: "Hiiiiii....." },
    { id: '66f508de5c41a030788b7f8e', sender: "VimalRaj", content: "Helloo,How we can join in this platform?" },
    { id: '66f97767e6d667d9b9a8a1da', sender: "Shiva", content: "How we can contact you in social medias?" },
  ]);

  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Handle logout and navigate to login page
  const handleLogout = () => {
    // You can also clear user data or tokens here if needed
    navigate("/"); // Redirect to the login page
  };

  // Fetch all users from API
  const fetchAllUsers = async () => {
    setLoading(true); // Set loading state to true while fetching
    try {
      const response = await fetch('http://localhost:8001/api/users'); // Replace with your actual API endpoint
      const data = await response.json();
      setUsers(data); // Store fetched users in state
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
  };

  // Function to suspend a user
  const suspendUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8001/api/admin/suspend-user/${userId}`, {
        method: 'POST', // Assuming you use POST to suspend a user
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // After successful suspension, refetch the users
        fetchAllUsers();
        alert('User suspended successfully');
      } else {
        alert('Failed to suspend user');
      }
    } catch (error) {
      console.error("Error suspending user:", error);
      alert('Error suspending user');
    }
  };

  useEffect(() => {
    fetchAllUsers(); // Fetch users when component mounts
  }, []);

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="menu-btn"
            >
              <Menu className="icon" />
            </button>
            <h1 className="title">Admin Dashboard</h1>
          </div>
          <div className="header-right">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
            </div>
            <button className="notification-btn">
              <Bell className="icon" />
              <span className="notification-badge" />
            </button>
            <div className="dropdown-menu">
              <button className="account-btn">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="Avatar"
                  className="avatar"
                />
                <ChevronDown className="icon" />
              </button>
              <div className="dropdown-menu-content">
                <div className="dropdown-menu-label">My Account</div>
                <div className="dropdown-menu-separator" />
                <div className="dropdown-menu-item">Profile</div>
                <div className="dropdown-menu-item">Settings</div>
                <div className="dropdown-menu-item text-red-600" onClick={handleLogout}>Logout</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="content-wrapper">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <nav className="sidebar-nav">
            <button className="sidebar-btn" onClick={fetchAllUsers}>
              <Users className="icon" />
              All Users
            </button>
            {/* <button className="sidebar-btn">
              <BarChart3 className="icon" />
              Analytics
            </button> */}
            <button className="sidebar-btn" onClick={() => setShowMessages(!showMessages)}>
              <MessageSquare className="icon" />
              Messages
            </button>
            <button className="sidebar-btn">
              <Settings className="icon" />
              Settings
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut className="icon" />
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {showMessages ? (
            <div className="message-section">
              <h2 className="section-title">Messages</h2>
              <ul className="message-list">
                {messages.map((message) => (
                  <li key={message.id} className="message-item">
                    <strong>{message.sender}:</strong> {message.content}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="stats-grid">
                {/* Stats Cards */}
                <div className="stat-card">
                  <div className="card-header">
                    <h2 className="card-title">Total Users</h2>
                    <Users className="icon stat-icon" />
                  </div>
                  <div className="card-content">
                    <div className="stat-value">46</div>
                    <p className="stat-info">+12% from this month</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="card-header">
                    <h2 className="card-title">Active Sessions</h2>
                    <TrendingUp className="icon stat-icon" />
                  </div>
                  <div className="card-content">
                    <div className="stat-value">0</div>
                    <p className="stat-info">No Active Sessions</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="card-header">
                    <h2 className="card-title">Messages</h2>
                    <Mail className="icon stat-icon" />
                  </div>
                  <div className="card-content">
                    <div className="stat-value">6</div>
                    <p className="stat-info">From this month</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="card-header">
                    <h2 className="card-title">Events</h2>
                    <Calendar className="icon stat-icon" />
                  </div>
                  <div className="card-content">
                    <div className="stat-value">6</div>
                    <p className="stat-info">3 upcoming today</p>
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="user-card">
                <div className="card-header">
                  <h2 className="card-title">All Users</h2>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <div className="card-content">
                      <div className="user-scroll-area" style={{ overflowY: 'scroll', maxHeight: '350px' }}>
                        <table>
                          <thead>
                            <tr>
                              <th>Email</th>
                              <th>Role</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user, index) => (
                              <tr key={index}>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                  <button onClick={() => suspendUser(user.id)} className="suspend-btn">
                                    Suspend
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
