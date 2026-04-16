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
  <div className="container mx-auto px-6 py-4 flex justify-between items-center">
    
    <Link to="/" className="flex items-center">
      <span className="text-lg md:text-xl font-bold text-blue-600 leading-tight tracking-tight">
        Event Management System
      </span>
    </Link>

    <nav className="flex items-center gap-6 text-sm md:text-base">
      <Link to="/events" className="text-gray-700 font-medium">
        Events
      </Link>

      {user ? (
        <>
          <Link
            to={dashboardlink()}
            className="text-gray-700 font-medium"
          >
            Dashboard
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/organizer/signup" className="text-gray-700 font-medium">
            Organizer
          </Link>

          <Link to="/login" className="text-gray-700 font-medium">
            Log In
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold"
          >
            Sign Up
          </Link>
        </>
      )}
    </nav>

  </div>
</header>
  );
};

export default Header;