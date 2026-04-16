import { useEffect, useState } from 'react';
// import events from '../data/events.json';
import axios from "axios"
import {baseUrl} from "../constants/api.js"
import {useAuth} from "../context/AuthContext.jsx"
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ManageEventsPage = () => {
  const {user} = useAuth()
  const[data,setData] = useState([])
  const navigate = useNavigate()
  const fetchMyEvents = async()=>{
    const res = await axios.get(baseUrl+"/events/my-events",{headers:{Authorization:"Bearer "+ user.token}})
    // setData(res.data.data)
    // console.log(res.data.data.userdata)
    setData(res.data.data.userdata)
  }
  useEffect(()=>{
    fetchMyEvents()
  },[])
  console.log(data)
  const deleteEvent =async(eventId)=>{
    // console.log("deleted",id)
    const res = await axios.delete(baseUrl+"/events/"+eventId,{headers:{Authorization:"Bearer "+user.token}})
    console.log(res.data)
    toast.success(res.data.message)
    fetchMyEvents()
  }
  return (
<div className="container mx-auto px-4 py-10 bg-gray-50 min-h-screen">
  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
    Manage Events
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {data.length > 0 ? data.map((event) => (
      <div key={event._id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        
        <img
          src={event.posterImage}
          alt=""
          className="w-full h-48 object-cover"
        />

        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-semibold text-gray-800 leading-snug line-clamp-1">
              {event.title}
            </h2>

            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
              {event.category}
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-3">
            {event.location} • {new Date(event.date).toLocaleDateString()}
          </p>

          <div className="flex gap-4 text-sm mb-4">
            <span className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-lg font-medium">
              ₹{event.price}
            </span>
            <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-medium">
              {event.capacity} seats
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-5 leading-relaxed line-clamp-3 min-h-[72px]">
            {event.description}
          </p>

          <div className="flex gap-4">
            <button
              className="flex-1 bg-yellow-500 text-white py-2.5 rounded-xl font-medium"
              onClick={() => { navigate("/organizer/update-event/" + event._id) }}
            >
              Edit
            </button>

            <button
              className="flex-1 bg-red-500 text-white py-2.5 rounded-xl font-medium"
              onClick={() => { deleteEvent(event._id) }}
            >
              Delete
            </button>
          </div>
        </div>

      </div>
    )) : (
      <p className="col-span-full text-center text-2xl text-gray-500">
        Loading...
      </p>
    )}
  </div>
</div>
  );
};

export default ManageEventsPage;
