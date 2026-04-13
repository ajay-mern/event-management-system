import { Link } from 'react-router-dom';
import events from '../data/events.json';
import EventCard from '../components/EventCard';

const LandingPage = () => {
  const featuredEvents = events.slice(0, 3); // Show first 3

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Next Event</h1>
          <p className="text-xl mb-8">Connect with people over shared interests and passions.</p>
          <Link to="/events" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">Explore Events</Link>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/events" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">See All Events</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Explore Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Technology', 'Business', 'Outdoors', 'Health'].map(cat => (
              <div key={cat} className="bg-white p-6 rounded-lg text-center hover:shadow-md">
                <h3 className="font-semibold">{cat}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;