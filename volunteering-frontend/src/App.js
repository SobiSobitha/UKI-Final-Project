import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AboutUs from './components/AboutUs';
// import Volunteerpro from './components/VolunteerPro';
import ContactUs from './components/ContactUs';
import RegisterForm from './components/RegisterForm';
import EventList from './components/EventList';
import CreateEventForm from './components/CreateEventForm';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import ClientDashboard from './components/ClientDashboard';
import RegisterAsOrganizer from './components/RegisterAsOrganizer';
import OrganizerDashboard from './components/OrganizerDashboard';
import VolunteerDashboard from './components/VolunteerDashboard';
import FeedbackPage from './components/FeedbackPage';
import PaymentPlan from './components/PaymentPlan';
import ManageVolunteers from './components/ManageVolunteers';
import ViewAnalytics from './components/ViewAnalytics';


const Overview = () => <div>Overview Content</div>;
const EventManagement = () => <div>Event Management Content</div>;
// const ReportGeneration = () => <div>Report Generation Content</div>;
// const UserManagement = () => <div>User Management Content</div>;


function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/register" element={<RegisterForm />} />
            {/* <Route path="/volunteerpro" element={<Volunteerpro />} /> */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/create-event" element={<CreateEventForm />} />
            <Route path="/register-organizer" element={<RegisterAsOrganizer />} />
            <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
            <Route path="/create-event-payment" element={<PaymentPlan />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/view-analytics" element={<ViewAnalytics />} />
            <Route path="/manage-volunteers" element={<ManageVolunteers />} />
            <Route path="/event-manage" element={<EventManagement />} />
            <Route path="/volunteer-dashboard" element={<VolunteerDashboard/>}/>
            <Route path="/feedback/:eventId" element={<FeedbackPage />} />
            <Route path="/client" element={<ClientDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
