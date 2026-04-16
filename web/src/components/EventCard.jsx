import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
<div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col h-full">
  <div className="overflow-hidden">
    <img
      src={event.posterImage}
      alt={event.title}
      className="w-full h-52 object-cover hover:scale-110 transition-transform duration-500"
    />
  </div>

  <div className="p-5 flex flex-col flex-grow">
    <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
      {event.title}
    </h3>

    <p className="text-sm text-gray-500 mb-1">
      {new Date(event.date).toLocaleDateString()}
    </p>

    <p className="text-sm text-gray-500 mb-3">
      {event.location}
    </p>

    <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[72px]">
      {event.description}
    </p>

    <div className="flex flex-wrap gap-2 mb-4">
      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
        Capacity: {event.capacity}
      </span>
      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
        {event.category}
      </span>
    </div>

    <div className="mt-auto">
      <Link
        to={`/events/${event._id}`}
        className="block w-full text-center bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 hover:shadow-md transition-all duration-300"
      >
        View Details
      </Link>
    </div>
  </div>
</div>
  );
};

export default EventCard;