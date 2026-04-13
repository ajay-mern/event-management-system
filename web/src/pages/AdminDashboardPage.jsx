import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminDashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome, {user?.name || 'Admin'}. This dashboard gives you full control over users and events.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link to="/admin/manage-users" className="p-4 bg-blue-50 border rounded-lg hover:shadow-md">Manage Users</Link>
        <Link to="/admin/manage-events" className="p-4 bg-green-50 border rounded-lg hover:shadow-md">Manage Events</Link>
        <Link to="/admin/analytics" className="p-4 bg-purple-50 border rounded-lg hover:shadow-md">Analytics</Link>
        <Link to="/events" className="p-4 bg-gray-50 border rounded-lg hover:shadow-md">Browse Events</Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
