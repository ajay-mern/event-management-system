import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OrganizerDashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Organizer Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome, {user?.name || 'Organizer'}. Manage your events and participants from here.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link to="/organizer/create-event" className="p-4 bg-green-50 border rounded-lg hover:shadow-md">Create Event</Link>
        <Link to="/organizer/manage-events" className="p-4 bg-blue-50 border rounded-lg hover:shadow-md">Manage Events</Link>
        <Link to="/organizer/event-participants" className="p-4 bg-purple-50 border rounded-lg hover:shadow-md">Event Participants</Link>
        <Link to="/events" className="p-4 bg-gray-50 border rounded-lg hover:shadow-md">Browse All Events</Link>
      </div>
    </div>
  );
};

export default OrganizerDashboardPage;
