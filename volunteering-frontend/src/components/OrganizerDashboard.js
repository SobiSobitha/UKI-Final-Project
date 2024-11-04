import { useState, useEffect } from 'react';
import { 
  CalendarPlus, 
  Calendar, 
  Users, 
  BarChart3,
  Loader2,
} from 'lucide-react'

function Button({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={`h-32 flex flex-col items-center justify-center space-y-2 ${className}`}>
      {children}
    </button>
  )
}

function Card({ children, className }) {
  return (
    <div className={`border p-4 rounded-lg bg-white shadow ${className}`}>
      {children}
    </div>
  )
}

function CardHeader({ children }) {
  return <div className="mb-4">{children}</div>
}

function CardContent({ children }) {
  return <div>{children}</div>
}

function CardTitle({ children }) {
  return <h2 className="text-lg font-semibold text-purple-900">{children}</h2>
}

function ScrollArea({ children, className }) {
  return <div className={`overflow-y-auto ${className}`}>{children}</div>
}

function Progress({ value }) {
  return (
    <div className="w-full bg-purple-100 rounded-full h-2">
      <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${value}%` }}></div>
    </div>
  )
}

function OrganizerDashboard() {
  const [events, setEvents] = useState([])
  const [volunteers, setVolunteers] = useState(0)
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const eventsResponse = await fetch('/api/events')
        const eventsData = await eventsResponse.json()
        setEvents(eventsData)

        const volunteersResponse = await fetch('/api/volunteers/count')
        const volunteersData = await volunteersResponse.json()
        setVolunteers(volunteersData.count)

        const tasksResponse = await fetch('/api/tasks')
        const tasksData = await tasksResponse.json()
        setTasks(tasksData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-purple-50/50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="sidebar">
    <h2>Dashboard</h2>
    {/* Increased space for a clearer layout */}
      {/* Buttons with Icons */}
      {/* <Button onClick={() => window.location.href = '/dashboard'} className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md transition">
        <Home className="h-5 w-5" />
        <span>Home</span>
      </Button> */}
      <Button onClick={() => window.location.href = '/create-event'} className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md transition">
        < CalendarPlus className="h-5 w-5" />
        <span>Create Event</span>
      </Button>
      <Button onClick={() => window.location.href = '/events'} className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md transition">
        <Calendar className="h-5 w-5" />
        <span>Events</span>
      </Button>
      <Button onClick={() => window.location.href = '/manage-volunteers'} className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md transition">
        <Users className="h-5 w-5" />
        <span>Manage Volunteers</span>
      </Button>
      <Button onClick={() => window.location.href = '/analytics'} className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md transition">
        <BarChart3 className="h-5 w-5" />
        <span>Analytics</span>
      </Button>
      {/* <Button onClick={() => window.location.href = '/settings'} className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md transition">
        <Settings className="h-5 w-5" />
        <span>Settings</span>
      </Button> */}
      {/* <Button onClick={() => window.location.href = '/logout'} className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md transition">
        <LogOut className="h-5 w-5" />
        <span>Log Out</span>
      </Button> */}
    
  </div>);
}
export default OrganizerDashboard;
