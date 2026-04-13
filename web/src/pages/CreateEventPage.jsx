const CreateEventPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl">
        <form className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold">Title</label>
            <input id="title" type="text" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="Event title" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold">Description</label>
            <textarea id="description" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="Write event details" rows="4"></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-semibold">Category</label>
              <input id="category" type="text" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="Technology" />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-semibold">Location</label>
              <input id="location" type="text" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="Hyderabad, India" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-semibold">Date</label>
              <input id="date" type="datetime-local" className="mt-1 w-full border px-3 py-2 rounded-md" />
            </div>
            <div>
              <label htmlFor="capacity" className="block text-sm font-semibold">Capacity</label>
              <input id="capacity" type="number" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="100" />
            </div>
          </div>
          <div>
            <label htmlFor="poster" className="block text-sm font-semibold">Poster URL</label>
            <input id="poster" type="text" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="https://..." />
          </div>
          <button type="button" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Create (static)</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
