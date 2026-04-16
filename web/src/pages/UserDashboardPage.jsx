import { Link } from 'react-router-dom';
import events from '../data/events.json';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../constants/api';

const UserDashboardPage = () => {
  const { user } = useAuth();
const [data,setData] = useState([])
  const fetchEvents = async()=>{
    const res = await axios.get(`${baseUrl}/events`)
    // console.log(res.data.data.data)
    setData(res?.data?.data?.data)
  }
  useEffect(()=>{
    fetchEvents()
  },[])
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome back, {user?.name || 'Participant'}!</h1>
      {/* <p className="text-gray-600 mb-6">You are logged in as <strong>{user?.role}</strong>.</p> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/my-events" className="block p-5 bg-blue-50 border rounded-lg hover:shadow-md">
          <h3 className="text-xl font-semibold">My Events</h3>
          <p className="text-gray-600">View, cancel, or manage your registrations.</p>
        </Link>
        <Link to="/profile" className="block p-5 bg-blue-50 border rounded-lg hover:shadow-md">
          <h3 className="text-xl font-semibold">My Profile</h3>
          <p className="text-gray-600">Update profile details and preferences.</p>
        </Link>
        <Link to="/events" className="block p-5 bg-blue-50 border rounded-lg hover:shadow-md">
          <h3 className="text-xl font-semibold">Browse Events</h3>
          <p className="text-gray-600">Find new events to join.</p>
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Recommended Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.slice(0, 3).map(event => (
          <div key={event._id} className="bg-white p-4 rounded-lg shadow-sm">
            <img src={event.posterImage} alt={event.title} className="h-36 w-full object-cover rounded-md mb-3" />
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <span>{event.description}</span>
          
            <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboardPage;
