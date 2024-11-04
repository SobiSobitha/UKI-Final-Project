import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import axios from 'axios';
import StatsSection from '../components/StatsSection';
import PendingOrganizers from '../components/PendingOrganizers';
import AllUsers from './AllUsers';
import ContactMessages from '../components/ContactMessages'; // Import new component

const AdminDashboard = () => {
  const [pendingOrganizers, setPendingOrganizers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [contactMessages, setContactMessages] = useState([]); // State for contact messages
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState({
    pendingOrganizers: true,
    allUsers: true,
    contactMessages: false, // Add loading state for contact messages
    stats: true,
  });
  const [stats, setStats] = useState({
    totalOrganizers: 0,
    totalVolunteers: 0,
    eventsCreated: 0,
  });

  useEffect(() => {
    fetchPendingOrganizers();
    fetchAllUsers();
    fetchDashboardStats();
    fetchContactMessages();
  }, []);

  const fetchPendingOrganizers = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/admin/pending-organizers');
      setPendingOrganizers(response.data);
    } catch (error) {
      setError('Failed to fetch pending organizers.');
    } finally {
      setLoading(prev => ({ ...prev, pendingOrganizers: false }));
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/admin/stats');
      setStats(response.data);
    } catch (error) {
      setError('Failed to fetch dashboard stats.');
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/users');
      setAllUsers(response.data);
    } catch (error) {
      setError('Failed to fetch users.');
    } finally {
      setLoading(prev => ({ ...prev, allUsers: false }));
    }
  };

  // Fetch contact messages
  const fetchContactMessages = async () => {
    setLoading(prev => ({ ...prev, contactMessages: true }));
    try {
      const response = await axios.get('http://localhost:8001/api/contact/messages');
      console.log("Fetched contact messages:", response.data); // Add this line
      setContactMessages(response.data);
    } catch (error) {
      console.error('Error fetching contact messages:', error); // Add this line
      setError('Failed to fetch contact messages.');
    } finally {
      setLoading(prev => ({ ...prev, contactMessages: false }));
    }
  };

  const handleApproveOrganizer = async (userId) => {
    try {
      const response = await fetch('http://localhost:8001/api/admin/approve-organizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setPendingOrganizers(prev => prev.filter(org => org._id !== userId));
      } else {
        const errorData = await response.json();
        setError(`Failed to approve organizer: ${errorData.message}`);
      }
    } catch (error) {
      setError('Error approving organizer.');
    }
  };

  const handleSuspendUser = async (userId) => {
    try {
      const response = await fetch('http://localhost:8001/api/admin/suspend-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setAllUsers(prev => prev.map(user => user._id === userId ? { ...user, suspended: true } : user));
      } else {
        const errorData = await response.json();
        setError(`Failed to suspend user: ${errorData.message}`);
      }
    } catch (error) {
      setError('Error suspending user.');
    }
  };

  const handleUnsuspendUser = async (userId) => {
    try {
      const response = await fetch('http://localhost:8001/api/admin/unsuspend-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setAllUsers(prev => prev.map(user => user._id === userId ? { ...user, suspended: false } : user));
      } else {
        const errorData = await response.json();
        setError(`Failed to unsuspend user: ${errorData.message}`);
      }
    } catch (error) {
      setError('Error unsuspending user.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Navbar Links */}
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="#pending-organizers">Pending Organizers</a></li>
          <li><a href="#all-users">All Users</a></li>
          <li><a href="#dashboard-stats">Dashboard Stats</a></li>
          <li><a href="#view-payments">View Payments</a></li>
          <li><button onClick={fetchContactMessages} className="fetch-messages-button">Contact Messages</button></li>
        </ul>
      </nav>

      {error && <div className="error-message">{error}</div>}

      <StatsSection loading={loading.stats} stats={stats} />

      <input
        type="text"
        placeholder="Search Organizers"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <PendingOrganizers
        pendingOrganizers={pendingOrganizers}
        loading={loading.pendingOrganizers}
        onApprove={handleApproveOrganizer}
        searchTerm={searchTerm}
      />

      <AllUsers
        allUsers={allUsers}
        loading={loading.allUsers}
        onSuspend={handleSuspendUser}
        onUnsuspend={handleUnsuspendUser}
      />

      {/* Display Contact Messages */}
      <ContactMessages messages={contactMessages} loading={loading.contactMessages} />
    </div>
  );
};

export default AdminDashboard;


