import events from '../data/events.json';
import registrations from '../data/registrations.json';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../constants/api';
import { toast } from 'react-toastify';

const MyEventsPage = () => {
  const { user } = useAuth();
  const [loading,setLoading] = useState(false)
  const [eventsData,setEventsData] =useState([]) 
  const [disable,setDisable] = useState(false)
  const fetchmyEvents = async()=>{
    try {
      setLoading(true)
      const res = await axios.get(baseUrl+"/eventregister/myEvents",{headers:{
        Authorization:`Bearer ${user.token}`

      }})
      console.log(res.data.data.data)
      setEventsData(res.data.data.data)
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchmyEvents()
  },[])
  // const myRegistrations = registrations.filter(reg => reg.userId === '2' || user?.email === 'sharath@gmail.com');
  // const myEvents = myRegistrations.map(reg => events.find(event => event._id === reg.eventId)).filter(Boolean);
const cancelEvent =async(id)=>{
try {
  setDisable(true)
  const res = await axios.delete(baseUrl+"/eventregister/cancel/"+id,{headers:{
    Authorization:`Bearer ${user.token}`
  }
  })
  // console.log(res.data)
  toast.success(res.data.message)
} catch (error) {
  console.log(error)
}
finally{
  setDisable(false)
}
}
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">My Events</h1>
      <p className="text-gray-600 mb-6">Showing events registered by <strong>{user?.name || 'you'}</strong>.</p>
        {loading && (
          <p className='text-2xl text-center'>
             <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
             Loading.....
          </p>
        )}
      {eventsData.length === 0 ? (
        <p className="text-gray-600">No registered events yet. Explore events to join.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventsData.map(event => (
            <div key={event._id} className="rounded-lg border p-4 bg-white">
              {/* {console.log(event.eventId)} */}
              <img src={event.eventId.posterImage} alt={event.eventId.title} className="w-full h-40 object-cover rounded" />
              <h2 className="text-xl font-semibold mt-3">{event.eventId.title}</h2>
              <p className="text-gray-500">{event.eventId.location} • {new Date(event.eventId.date).toLocaleDateString()}</p>
              <p>{event.eventId.description}</p>
              <span className="inline-block bg-blue-100 text-blue-800 mt-2 px-2 py-1 rounded">{event.eventId.category}</span>
              <span className="inline-block bg-white-100 text-red-800 mt-2 ml-3 px-2 py-1 rounded">{event.status}</span>
              {/* <button className='bg-red-700 text-white rounded-sm text-2xl'>Cancel</button> */}
              <p>
                {
                  event.status ==="canceled" ? null:<button className='bg-red-100 text-red-800 mt-2 ml-2 px-2 py-1 rounded' onClick={()=>cancelEvent(event.eventId._id)} disabled ={disable}>Cancel Event</button>
                }
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEventsPage;
