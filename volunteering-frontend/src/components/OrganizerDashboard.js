// // import { useState, useEffect } from 'react';
// // import { 
// //   CalendarPlus, 
// //   Calendar, 
// //   Users, 
// //   BarChart3,
// //   Loader2,
// // } from 'lucide-react'

// // function Button({ children, onClick, className }) {
// //   return (
// //     <button onClick={onClick} className={`h-32 flex flex-col items-center justify-center space-y-2 ${className}`}>
// //       {children}
// //     </button>
// //   )
// // }

// // function Card({ children, className }) {
// //   return (
// //     <div className={`border p-4 rounded-lg bg-white shadow ${className}`}>
// //       {children}
// //     </div>
// //   )
// // }

// // function CardHeader({ children }) {
// //   return <div className="mb-4">{children}</div>
// // }

// // function CardContent({ children }) {
// //   return <div>{children}</div>
// // }

// // function CardTitle({ children }) {
// //   return <h2 className="text-lg font-semibold text-purple-900">{children}</h2>
// // }

// // function ScrollArea({ children, className }) {
// //   return <div className={`overflow-y-auto ${className}`}>{children}</div>
// // }

// // function Progress({ value }) {
// //   return (
// //     <div className="w-full bg-purple-100 rounded-full h-2">
// //       <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${value}%` }}></div>
// //     </div>
// //   )
// // }

// // function OrganizerDashboard() {
// //   const [events, setEvents] = useState([])
// //   const [volunteers, setVolunteers] = useState(0)
// //   const [tasks, setTasks] = useState([])
// //   const [isLoading, setIsLoading] = useState(true)

// //   useEffect(() => {
// //     const fetchDashboardData = async () => {
// //       try {
// //         const eventsResponse = await fetch('/api/events')
// //         const eventsData = await eventsResponse.json()
// //         setEvents(eventsData)

// //         const volunteersResponse = await fetch('/api/volunteers/count')
// //         const volunteersData = await volunteersResponse.json()
// //         setVolunteers(volunteersData.count)

// //         const tasksResponse = await fetch('/api/tasks')
// //         const tasksData = await tasksResponse.json()
// //         setTasks(tasksData)
// //       } catch (error) {
// //         console.error('Error fetching dashboard data:', error)
// //       } finally {
// //         setIsLoading(false)
// //       }
// //     }

// //     fetchDashboardData()
// //   }, [])

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen bg-purple-50/50 flex items-center justify-center">
// //         <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="sidebar">
// //     <h2>Dashboard</h2>
// //     {/* Increased space for a clearer layout */}
// //       {/* Buttons with Icons */}
// //       {/* <Button onClick={() => window.location.href = '/dashboard'} className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md transition">
// //         <Home className="h-5 w-5" />
// //         <span>Home</span>
// //       </Button> */}
// //       <Button onClick={() => window.location.href = '/create-event'} className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md transition">
// //         < CalendarPlus className="h-5 w-5" />
// //         <span>Create Event</span>
// //       </Button>
// //       <Button onClick={() => window.location.href = '/events'} className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md transition">
// //         <Calendar className="h-5 w-5" />
// //         <span>Events</span>
// //       </Button>
// //       <Button onClick={() => window.location.href = '/manage-volunteers'} className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md transition">
// //         <Users className="h-5 w-5" />
// //         <span>Manage Volunteers</span>
// //       </Button>
// //       <Button onClick={() => window.location.href = '/analytics'} className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md transition">
// //         <BarChart3 className="h-5 w-5" />
// //         <span>Analytics</span>
// //       </Button>
// //       {/* <Button onClick={() => window.location.href = '/settings'} className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md transition">
// //         <Settings className="h-5 w-5" />
// //         <span>Settings</span>
// //       </Button> */}
// //       {/* <Button onClick={() => window.location.href = '/logout'} className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md transition">
// //         <LogOut className="h-5 w-5" />
// //         <span>Log Out</span>
// //       </Button> */}
    
// //   </div>);
// // }
// // export default OrganizerDashboard;
// 'use client'

// import { useState, useEffect } from 'react'
// import { 
//   CalendarPlus, 
//   Calendar, 
//   Users, 
//   BarChart3,
//   Loader2,
//   Bell,
//   LogOut,
//   Search,
//   Settings
// } from 'lucide-react'

// export default function OrganizerDashboard() {
//   const [events, setEvents] = useState([])
//   const [volunteers, setVolunteers] = useState(0)
//   const [tasks, setTasks] = useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const eventsResponse = await fetch('/api/events')
//         const eventsData = await eventsResponse.json()
//         setEvents(eventsData)

//         const volunteersResponse = await fetch('/api/volunteers/count')
//         const volunteersData = await volunteersResponse.json()
//         setVolunteers(volunteersData.count)

//         const tasksResponse = await fetch('/api/tasks')
//         const tasksData = await tasksResponse.json()
//         setTasks(tasksData)
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchDashboardData()
//   }, [])

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-purple-50/50 flex items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
//       </div>
//     )
//   }

//   return (
//     <div className="flex h-screen overflow-hidden">
//       <div className="hidden md:flex flex-col bg-white shadow-md w-64">
//         <header className="flex items-center justify-center p-4 border-b">
//           <h1 className="font-bold">Organizer</h1>
//         </header>
//         <nav className="flex flex-col">
//           {/* <a href="/dashboard" className="flex items-center p-4 hover:bg-gray-100">
//             <Home className="mr-2 h-4 w-4" />
//             Dashboard
//           </a> */}
//           <a href="/create-event" className="flex items-center p-4 hover:bg-gray-100">
//             <CalendarPlus className="mr-2 h-4 w-4" />
//             Create Event
//           </a>
//           <a href="/events" className="flex items-center p-4 hover:bg-gray-100">
//             <Calendar className="mr-2 h-4 w-4" />
//             Events
//           </a>
//           <a href="/manage-volunteers" className="flex items-center p-4 hover:bg-gray-100">
//             <Users className="mr-2 h-4 w-4" />
//             Manage Volunteers
//           </a>
//           <a href="/analytics" className="flex items-center p-4 hover:bg-gray-100">
//             <BarChart3 className="mr-2 h-4 w-4" />
//             Analytics
//           </a>
//         </nav>
//       </div>
//       <div className="flex-1 overflow-hidden flex flex-col">
//         <header className="flex items-center justify-between px-6 py-4 border-b">
//           <div className="flex items-center">
//             <div className="relative">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <input
//                 type="search"
//                 placeholder="Search..."
//                 className="pl-8 w-[300px] border rounded p-2"
//               />
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <button className="p-2">
//               <Bell className="h-5 w-5" />
//             </button>
//             <div className="relative">
//               <button className="relative h-8 w-8 rounded-full">
//                 <img src="/placeholder-user.jpg" alt="User" className="h-8 w-8 rounded-full" />
//               </button>
//               <div className="absolute right-0 w-56 bg-white shadow-lg mt-1 hidden">
//                 <div className="p-2 border-b">
//                   <p className="text-sm font-medium">John Doe</p>
//                   <p className="text-xs text-muted-foreground">john@example.com</p>
//                 </div>
//                 <div className="flex flex-col">
//                   <button className="flex items-center p-2 hover:bg-gray-100">
//                     <Settings className="mr-2 h-4 w-4" />
//                     Settings
//                   </button>
//                   <button className="flex items-center p-2 hover:bg-gray-100">
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Log out
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>
//         <main className="flex-1 overflow-y-auto p-6">
//           <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             <div className="bg-white rounded-lg shadow p-4">
//               <h2 className="font-bold">Upcoming Events</h2>
//               <p>You have {events.length} upcoming events</p>
//               <ul className="space-y-2">
//                 {events.slice(0, 3).map((event, index) => (
//                   <li key={index} className="flex justify-between items-center">
//                     <span>{event.name}</span>
//                     <span className="text-muted-foreground">{event.date}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="bg-white rounded-lg shadow p-4">
//               <h2 className="font-bold">Task Progress</h2>
//               <p>Your current project status</p>
//               <div className="space-y-4">
//                 {tasks.map((task, index) => (
//                   <div key={index}>
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm font-medium">{task.name}</span>
//                       <span className="text-sm text-muted-foreground">{task.completed}/{task.total}</span>
//                     </div>
//                     <div className="h-2 bg-gray-200 rounded">
//                       <div
//                         className="h-full bg-purple-600 rounded"
//                         style={{ width: `${(task.completed / task.total) * 100}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow p-4">
//               <h2 className="font-bold">Volunteer Overview</h2>
//               <p>Total active volunteers</p>
//               <div className="text-3xl font-bold">{volunteers}</div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }
// import React from "react"
// import { Calendar, Users, BarChart, Settings, PlusCircle, Bell, LogOut, Clock, Target, TrendingUp } from "lucide-react"
// import './OrganizerDashboard.css';

// export default function Dashboard() {
//   const stats = [
//     { title: "Total Events", value: "24", icon: Calendar, trend: "+2 from last month" },
//     { title: "Active Volunteers", value: "156", icon: Users, trend: "+12 from last month" },
//     { title: "Engagement Rate", value: "85%", icon: TrendingUp, trend: "+5% from last month" },
//   ]

//   const upcomingEvents = [
//     { title: "Beach Cleanup Drive", date: "June 15", participants: 45 },
//     { title: "Food Distribution", date: "June 18", participants: 32 },
//     { title: "Tree Planting", date: "June 20", participants: 28 },
//   ]

//   const recentActivity = [
//     { action: "New volunteer registration", time: "2 minutes ago" },
//     { action: "Event schedule updated", time: "1 hour ago" },
//     { action: "Donation received", time: "3 hours ago" },
//     { action: "New event created", time: "5 hours ago" },
//   ]

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <h1>Organizer Hub</h1>
//         </div>
//         <nav className="sidebar-nav">
//           <button className="sidebar-button">
//             <BarChart className="icon" />
//             Dashboard
//           </button>
//           <button className="sidebar-button">
//             <Calendar className="icon" />
//             Events
//           </button>
//           <button className="sidebar-button">
//             <Users className="icon" />
//             Volunteers
//           </button>
//           <button className="sidebar-button">
//             <Settings className="icon" />
//             Settings
//           </button>
//         </nav>
//         <button className="sidebar-button logout">
//           <LogOut className="icon" />
//           Logout
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Top Bar */}
//         <div className="top-bar">
//           <h2>Dashboard Overview</h2>
//           <div className="top-bar-buttons">
//             <button className="top-bar-button notification">
//               <Bell className="icon" />
//             </button>
//             <button className="top-bar-button add-event">
//               <PlusCircle className="icon" />
//               New Event
//             </button>
//           </div>
//         </div>

//         {/* Dashboard Content */}
//         <div className="dashboard-content">
//           {/* Stats Grid */}
//           <div className="stats-grid">
//             {stats.map((stat, index) => (
//               <div key={index} className="stat-card">
//                 <div className="stat-card-header">
//                   <h3>{stat.title}</h3>
//                   <stat.icon className="stat-icon" />
//                 </div>
//                 <div className="stat-card-content">
//                   <div className="stat-value">{stat.value}</div>
//                   <p className="stat-trend">{stat.trend}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Upcoming Events and Recent Activity */}
//           <div className="events-activity">
//             {/* Upcoming Events */}
//             <div className="card">
//               <div className="card-header">
//                 <Clock className="card-icon" />
//                 <h3>Upcoming Events</h3>
//               </div>
//               <div className="card-content scrollable">
//                 {upcomingEvents.map((event, index) => (
//                   <div key={index} className="event-item">
//                     <div>
//                       <h4>{event.title}</h4>
//                       <p className="event-date">{event.date}</p>
//                     </div>
//                     <div className="event-participants">
//                       <Users className="icon" />
//                       <span>{event.participants}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="card">
//               <div className="card-header">
//                 <Target className="card-icon" />
//                 <h3>Recent Activity</h3>
//               </div>
//               <div className="card-content scrollable">
//                 {recentActivity.map((activity, index) => (
//                   <div key={index} className="activity-item">
//                     <p>{activity.action}</p>
//                     <span className="activity-time">{activity.time}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
import React, { useState, useEffect } from "react";
import { Calendar, Users, BarChart, PlusCircle, Bell, LogOut, Clock, Target, TrendingUp, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import './OrganizerDashboard.css';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [volunteers, setVolunteers] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();  // Initialize the navigate function

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const eventsResponse = await fetch('http://localhost:8001/api/events');
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);

        const volunteersResponse = await fetch('/api/volunteers/count');
        const volunteersData = await volunteersResponse.json();
        setVolunteers(volunteersData.count);

        const tasksResponse = await fetch('/api/tasks');
        const tasksData = await tasksResponse.json();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();

    // Show a welcome message when the organizer first visits the dashboard
    if (!localStorage.getItem("hasVisitedDashboard")) {
      alert("Welcome Organizer... here you can manage your volunteers");
      localStorage.setItem("hasVisitedDashboard", "true");  // Mark that the organizer has visited
    }

  }, []);

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
          <button className="sidebar-button" onClick={() => navigate('/analytics')}>
            <BarChart className="icon" /> Analytics
          </button>
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
              <PlusCircle className="icon" /> New Event
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
                <div className="stat-value">25%</div>
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
                {events.slice(0, 3).map((event, index) => (
                  <div key={index} className="event-item">
                    <div>
                      <h4>{event.name}</h4>
                      <p className="event-date">{event.date}</p>
                    </div>
                    <div className="event-participants">
                      <Users className="icon" />
                      <span>{event.participants}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <div className="card-header">
                <Target className="card-icon" />
                <h3>Recent Activity</h3>
              </div>
              <div className="card-content scrollable">
                {tasks.slice(0, 3).map((task, index) => (
                  <div key={index} className="activity-item">
                    <p>{task.name}</p>
                    <span className="activity-time">{task.status}</span>
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

