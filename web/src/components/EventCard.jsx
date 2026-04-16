import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={event.posterImage} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()}</p>
        <p className="text-gray-500 mb-2">{event.location}</p>
        <p className='text-gray-700 mb-2'>{event.description}</p>
        <span className='inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm'>capacity : {event.capacity}</span>
        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">{event.category}</span>
        <Link to={`/events/${event._id}`} className="block mt-4 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700">View Details</Link>
      </div>
    </div>
  );
};

export default EventCard;