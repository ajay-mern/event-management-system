import events from '../data/events.json';

const AdminManageEventsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Manage Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600">{event.location} • {new Date(event.date).toLocaleDateString()}</p>
            <div className="mt-3 flex gap-2">
              <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminManageEventsPage;
