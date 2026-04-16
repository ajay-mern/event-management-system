import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { useEffect, useState } from 'react';
import { baseUrl } from '../constants/api';
const LandingPage = () => {
  const [eventsdata,setEventsData] = useState([])
    const fetchEvents = async()=>{
      const res = await fetch(baseUrl+"/events")
      const data = await res.json()
      // console.log(data.data.data)
      setEventsData(data.data.data)
    }
  useEffect(()=>{
fetchEvents()
  },[])
  // const featuredEvents = events.slice(0, 3); // Show first 3
  const topEvents = eventsdata.slice(0,3)

  return (
<div>
  {/* Hero Section */}
  <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-28 overflow-hidden">
    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent)]"></div>

    <div className="relative container mx-auto px-4 text-center max-w-4xl">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
        Find Your Next Event
      </h1>

      <p className="text-lg md:text-xl text-gray-200 mb-10">
        Discover, connect, and experience events around you.
      </p>

      <Link
        to="/events"
        className="inline-block bg-white text-blue-600 px-10 py-3.5 rounded-xl font-semibold shadow-2xl text-lg"
      >
        Explore Events
      </Link>
    </div>
  </section>

  {/* Featured Events */}
  <section className="py-24 bg-gray-50">
    <div className="container mx-auto px-4">
      
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Upcoming Events
        </h2>
        <p className="text-gray-500 mt-3 text-lg">
          Handpicked events just for you
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {topEvents.map(event => (
          <div key={event._id} className="h-full flex">
            <div className="w-full">
              <EventCard event={event} />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-14">
        <Link
          to="/events"
          className="inline-block bg-blue-600 text-white px-10 py-3 rounded-xl font-semibold shadow-lg text-lg"
        >
          See All Events
        </Link>
      </div>

    </div>
  </section>

  {/* Categories */}
  <section className="py-24 bg-white">
    <div className="container mx-auto px-4">

      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Explore Categories
        </h2>
        <p className="text-gray-500 mt-3 text-lg">
          Browse events by your interests
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {['Technology', 'Business', 'Outdoors', 'Health'].map(cat => (
          <div
            key={cat}
            className="bg-gray-50 p-10 rounded-2xl text-center border border-gray-100 shadow-sm"
          >
            <h3 className="font-semibold text-gray-700 text-lg">
              {cat}
            </h3>
          </div>
        ))}
      </div>

    </div>
  </section>
</div>
  );
};

export default LandingPage;