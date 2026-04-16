import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminDashboardPage = () => {
  const { user } = useAuth();

  return (
<div className="container mx-auto px-4 py-10 bg-gray-50 min-h-screen">
  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
    Admin Dashboard
  </h1>

  <p className="text-gray-600 mb-8">
    Welcome, {user?.name || 'Admin'}. This dashboard gives you full control over users and events.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    <Link
      to="/admin/manage-users"
      className="p-6 bg-blue-50 border border-blue-100 rounded-2xl text-blue-700 font-semibold text-center shadow-sm"
    >
      Manage Users
    </Link>

    <Link
      to="/admin/manage-events"
      className="p-6 bg-green-50 border border-green-100 rounded-2xl text-green-700 font-semibold text-center shadow-sm"
    >
      Manage Events
    </Link>

    <Link
      to="/admin/analytics"
      className="p-6 bg-purple-50 border border-purple-100 rounded-2xl text-purple-700 font-semibold text-center shadow-sm"
    >
      Analytics
    </Link>

    <Link
      to="/events"
      className="p-6 bg-gray-100 border border-gray-200 rounded-2xl text-gray-700 font-semibold text-center shadow-sm"
    >
      Browse Events
    </Link>
  </div>
</div>
  );
};

export default AdminDashboardPage;
