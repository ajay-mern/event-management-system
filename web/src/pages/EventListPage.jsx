import events from '../data/events.json';
import EventCard from '../components/EventCard';
import { baseUrl } from '../constants/api';
import { useEffect, useState } from 'react';
const EventListPage = () => {
  const [events,setEvents] = useState([])
  async function fetchevents(){
    const res = await fetch(`${baseUrl}/events/`)
    const data = await res.json()
    setEvents(data.data.data)
  }
  useEffect(()=>{
    fetchevents()
  },[])
  // console.log(events.data.data)
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventListPage;