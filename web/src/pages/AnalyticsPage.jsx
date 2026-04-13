import events from '../data/events.json';
import registrations from '../data/registrations.json';

const AnalyticsPage = () => {
  const registrationCounts = events.map((event) => ({
    ...event,
    registered: registrations.filter((reg) => reg.eventId === event._id).length
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Total Events</h2>
          <p className="text-3xl font-bold">{events.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Total Registrations</h2>
          <p className="text-3xl font-bold">{registrations.length}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Event Registration Counts</h2>
        <ul className="space-y-2">
          {registrationCounts.map((item) => (
            <li key={item._id} className="flex justify-between items-center border-b pb-2">
              <span>{item.title}</span>
              <span className="font-semibold">{item.registered}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalyticsPage;
