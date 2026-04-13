import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import EventListPage from './pages/EventListPage';
import EventDetailsPage from './pages/EventDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboardPage from './pages/UserDashboardPage';
import MyEventsPage from './pages/MyEventsPage';
import ProfilePage from './pages/ProfilePage';
import OrganizerDashboardPage from './pages/OrganizerDashboardPage';
import CreateEventPage from './pages/CreateEventPage';
import ManageEventsPage from './pages/ManageEventsPage';
import EventParticipantsPage from './pages/EventParticipantsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageUsersPage from './pages/ManageUsersPage';
import AdminManageEventsPage from './pages/AdminManageEventsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="grow">{/* tailwind lint suggests grow for flex-grow */}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/events" element={<EventListPage />} />
              <Route path="/events/:id" element={<EventDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<PrivateRoute element={<UserDashboardPage />} />} />
              <Route path="/my-events" element={<PrivateRoute element={<MyEventsPage />} />} />
              <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
              <Route path="/organizer/dashboard" element={<PrivateRoute element={<OrganizerDashboardPage />} />} />
              <Route path="/organizer/create-event" element={<PrivateRoute element={<CreateEventPage />} />} />
              <Route path="/organizer/manage-events" element={<PrivateRoute element={<ManageEventsPage />} />} />
              <Route path="/organizer/event-participants" element={<PrivateRoute element={<EventParticipantsPage />} />} />
              <Route path="/admin/dashboard" element={<PrivateRoute element={<AdminDashboardPage />} />} />
              <Route path="/admin/manage-users" element={<PrivateRoute element={<ManageUsersPage />} />} />
              <Route path="/admin/manage-events" element={<PrivateRoute element={<AdminManageEventsPage />} />} />
              <Route path="/admin/analytics" element={<PrivateRoute element={<AnalyticsPage />} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App

