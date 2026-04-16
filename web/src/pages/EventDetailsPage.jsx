import { useParams } from 'react-router-dom';
import { baseUrl } from '../constants/api';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';


const EventDetailsPage = () => {
  const { id } = useParams();
  const [event,setEventDetails] = useState([])
  const fetchEventsDetails = async()=>{
    const res = await fetch(`${baseUrl}/events/${id}`)
    const data = await res.json()
    // console.log(data.data.data)
    setEventDetails(data.data.data)
  }
  useEffect(()=>{
    fetchEventsDetails()
  },[])

  const {user} = useAuth()
  const registerEvent = async()=>{
    // console.log("register for event",user)
    if(!user){
      toast.error("please login to rigister for an event")
      return
    }
    try {
      if(user){
      const res =  await axios.post(`${baseUrl}/eventregister/register/${id}`,{},{
        headers:{Authorization:`Bearer ${user.token}`}
        })
       if(user.status === 201){
        toast.success(res.data.data.message)
      }
    }
    } catch (error) {
      if(error.response.status === 409){
        // console.log(error.response)
        // toast.warning(error.response.data.message)
        toast.warning("already registerd for event")
        
      }
      else{
        toast.error("something went wrong")
      }
    }

    
    

  }

  if (!event) return <div>Event not found</div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
    
    <div className="overflow-hidden">
      <img
        src={event.posterImage}
        alt={event.title}
        className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div className="p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        {event.title}
      </h1>

      <p className="text-gray-600 leading-relaxed mb-6">
        {event.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-gray-50 rounded-xl p-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Event Details
          </h2>

          <div className="space-y-2 text-gray-600">
            <p><span className="font-medium text-gray-700">Date:</span> {new Date(event.date).toLocaleString()}</p>
            <p><span className="font-medium text-gray-700">Location:</span> {event.location}</p>
            <p><span className="font-medium text-gray-700">Capacity:</span> {event.capacity}</p>
            <p><span className="font-medium text-gray-700">Category:</span> {event.category}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Join this event
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Don’t miss out—secure your spot and be part of the experience.
            </p>
          </div>

          <button
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            onClick={registerEvent}
          >
            Register for Event
          </button>
        </div>

      </div>
    </div>
  </div>
</div>
  );
};

export default EventDetailsPage;