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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.length > 0 ? data.map((event) => (
          <div key={event._id} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <img src={event.posterImage} alt="" />
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-600">{event.location} • {new Date(event.date).toLocaleDateString()}</p>
              </div>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">{event.category}</span>
            </div>
            <div>{event.description}</div>
            <div className="mt-3 flex gap-2">
              <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" onClick={()=>{navigate("/organizer/update-event/"+event._id)}}>Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={()=>{deleteEvent(event._id)}}>Delete</button>
            </div>
          </div>
        )) :<p className='text-center text-4xl'>Loading...</p>}
      </div>
    </div>
  );
};

export default ManageEventsPage;
