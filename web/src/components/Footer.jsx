const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Plannex</h3>
            <p>Connect with people over shared interests.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Events</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-400">Find Events</a></li>
              <li><a href="#" className="hover:text-blue-400">Create Event</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-400">Groups</a></li>
              <li><a href="#" className="hover:text-blue-400">Organizers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-400">Help</a></li>
              <li><a href="#" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2026 Event Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;