import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  // console.log(user.userinfo.role)
  function dashboardlink(){
    if(user.userinfo.role === "admin"){
      return "/admin/dashboard"
    }
    else if(user.userinfo.role==="organizer"){
      return "/organizer/dashboard"
    }else{
      return "/dashboard"
    }
  }
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">Event Management System</Link>
        <nav className="flex space-x-4 items-center">
          <Link to="/events" className="text-gray-700 hover:text-blue-600">Events</Link>
          {user ? (
            <>
              <Link
                to={dashboardlink()}
                className="text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/organizer/signup" className="text-gray-700 hover:text-blue-600">Sign-up as Organizer</Link>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Log In</Link>

              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;