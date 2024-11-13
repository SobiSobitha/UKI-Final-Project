'use client'

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3, Users, Calendar, Settings, Bell, Search, Menu, ChevronDown, LogOut, User, Mail, MessageSquare, PlusCircle, FileText, LayoutDashboard, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);  // State to store fetched users
  const [loading, setLoading] = useState(false);  // Loading state for fetching data
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const analyticsData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
    { name: "Jun", value: 700 },
  ];

  // const recentUsers = [
  //   { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  //   { name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  //   { name: "Mike Johnson", email: "mike@example.com", role: "User", status: "Inactive" },
  //   { name: "Sarah Wilson", email: "sarah@example.com", role: "Editor", status: "Active" },
  // ];

  // Handle logout and navigate to login page
  const handleLogout = () => {
    // You can also clear user data or tokens here if needed
    navigate("/login"); // Redirect to the login page
  };

  // Fetch all users from API
  const fetchAllUsers = async () => {
    setLoading(true);  // Set loading state to true while fetching
    try {
      const response = await fetch('http://localhost:8001/api/users');  // Replace with your actual API endpoint
      const data = await response.json();
      setUsers(data);  // Store fetched users in state
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);  // Set loading state to false after fetching
    }
  };
  const fetchContactMessages = async () => {
    setLoading(true);  // Set loading state to true while fetching
    try {
      const response = await fetch('http://localhost:8001/api/users/messages');  // Replace with your actual API endpoint
      const data = await response.json();
      setUsers(data);  // Store fetched users in state
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);  // Set loading state to false after fetching
    }
  };
  const fetchPendingOrganizers = async () => {
    setLoading(true);  // Set loading state to true while fetching
    try {
      const response = await fetch('http://localhost:8001/api/users/organizers');  // Replace with your actual API endpoint
      const data = await response.json();
      setUsers(data);  // Store fetched users in state
    } catch (error) {
      console.error("Error fetching organizers:", error);
    } finally {
      setLoading(false);  // Set loading state to false after fetching
    }
  };


  useEffect(() => {
    // Optionally fetch users when the component mounts (e.g., on initial load)
    // fetchAllUsers();
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
            <button className="sidebar-btn" onClick={fetchPendingOrganizers}>
              <FileText className="icon" />
              Pending Organizers
            </button>
            <button className="sidebar-btn">
              <BarChart3 className="icon" />
              Analytics
            </button>
            <button className="sidebar-btn" onClick={fetchContactMessages}>
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
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="card-header">
                <h2 className="card-title">
                  Total Users
                </h2>
                <Users className="icon stat-icon" />
              </div>
              <div className="card-content">
                <div className="stat-value">46</div>
                <p className="stat-info">+12% from this month</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="card-header">
                <h2 className="card-title">
                  Active Sessions
                </h2>
                <TrendingUp className="icon stat-icon" />
              </div>
              <div className="card-content">
                <div className="stat-value">0</div>
                <p className="stat-info">No Active Sessions</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="card-header">
                <h2 className="card-title">
                  Messages
                </h2>
                <Mail className="icon stat-icon" />
              </div>
              <div className="card-content">
                <div className="stat-value">6</div>
                <p className="stat-info">From this month</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="card-header">
                <h2 className="card-title">
                  Events
                </h2>
                <Calendar className="icon stat-icon" />
              </div>
              <div className="card-content">
                <div className="stat-value">12</div>
                <p className="stat-info">3 upcoming today</p>
              </div>
            </div>
          </div>

          <div className="charts-and-users">
            <div className="chart-card">
              <div className="card-header">
                <h2 className="card-title">Analytics Overview</h2>
              </div>
              <div className="card-content">
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#84A59D" />
                      <XAxis dataKey="name" stroke="#41436A" />
                      <YAxis stroke="#41436A" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#E27D60"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
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
                    <div className="user-scroll-area" style={{ overflowY: 'scroll', maxHeight: '300px' }}>
                      <table>
                        <thead>
                          <tr>
                            {/* <th>Name</th> */}
                            <th>Email</th>
                            <th>Role</th>
                            {/* <th>Status</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, index) => (
                            <tr key={index}>
                              {/* <td>{user.name}</td> */}
                              <td>{user.email}</td>
                              <td>{user.role}</td>
                              {/* <td>{user.status}</td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
