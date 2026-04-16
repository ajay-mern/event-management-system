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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <img src={event.posterImage} alt={event.title} className="w-full h-64 object-cover rounded-md mb-6" />
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Details</h2>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Capacity:</strong> {event.capacity}</p>
          <p><strong>Category:</strong> {event.category}</p>
        </div>
        <div>
          {/* <h2 className="text-xl font-semibold mb-2">Organizer</h2> */}
          {/* <p>{organizer?.name}</p> */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700" onClick={registerEvent}>Register for Event</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;