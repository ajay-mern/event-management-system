import { useParams } from 'react-router-dom';
import events from '../data/events.json';
import users from '../data/users.json';

const EventDetailsPage = () => {
  const { id } = useParams();
  const event = events.find(e => e._id === id);
  const organizer = users.find(u => u._id === event?.organizerId);

  if (!event) return <div>Event not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <img src={event.posterImage} alt={event.title} className="w-full h-64 object-cover rounded-lg mb-8" />
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
          <h2 className="text-xl font-semibold mb-2">Organizer</h2>
          <p>{organizer?.name}</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700">Register for Event</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;