import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OrganizerDashboardPage = () => {
  const { user } = useAuth();
  // console.log(user)

  return (
<div className="container mx-auto px-4 py-10 bg-gray-50 min-h-screen">
  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
    Organizer Dashboard
  </h1>

  <p className="text-gray-600 mb-8">
    {console.log(user)}
    Welcome, {user?.userinfo?.name || 'Organizer'}. Manage your events and participants from here.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    
    <Link
      to="/organizer/create-event"
      className="p-6 bg-green-50 border border-green-100 rounded-2xl text-green-700 font-semibold text-center shadow-sm"
    >
      Create Event
    </Link>

    <Link
      to="/organizer/manage-events"
      className="p-6 bg-blue-50 border border-blue-100 rounded-2xl text-blue-700 font-semibold text-center shadow-sm"
    >
      Manage Events
    </Link>

    <Link
      to="/organizer/event-participants"
      className="p-6 bg-purple-50 border border-purple-100 rounded-2xl text-purple-700 font-semibold text-center shadow-sm"
    >
      Event Participants
    </Link>

    <Link
      to="/events"
      className="p-6 bg-gray-100 border border-gray-200 rounded-2xl text-gray-700 font-semibold text-center shadow-sm"
    >
      Browse All Events
    </Link>

  </div>
</div>
  );
};

export default OrganizerDashboardPage;
