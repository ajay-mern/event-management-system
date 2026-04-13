import events from '../data/events.json';
import registrations from '../data/registrations.json';
import { useAuth } from '../context/AuthContext';

const MyEventsPage = () => {
  const { user } = useAuth();

  const myRegistrations = registrations.filter(reg => reg.userId === '2' || user?.email === 'sharath@gmail.com');
  const myEvents = myRegistrations.map(reg => events.find(event => event._id === reg.eventId)).filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">My Events</h1>
      <p className="text-gray-600 mb-6">Showing events registered by <strong>{user?.name || 'you'}</strong>.</p>

      {myEvents.length === 0 ? (
        <p className="text-gray-600">No registered events yet. Explore events to join.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myEvents.map(event => (
            <div key={event._id} className="rounded-lg border p-4 bg-white">
              <img src={event.posterImage} alt={event.title} className="w-full h-40 object-cover rounded" />
              <h2 className="text-xl font-semibold mt-3">{event.title}</h2>
              <p className="text-gray-500">{event.location} • {new Date(event.date).toLocaleDateString()}</p>
              <span className="inline-block bg-blue-100 text-blue-800 mt-2 px-2 py-1 rounded">{event.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEventsPage;
