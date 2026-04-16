const Footer = () => {
  return (
<footer className="bg-gray-900 text-gray-300 py-10">
  <div className="container mx-auto px-4">
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      
      <div>
        <h3 className="text-lg md:text-xl font-bold text-white mb-4 leading-tight break-words">
          Event Management System
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          Connect with people over shared interests.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Events</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="text-gray-400">Find Events</a></li>
          <li><a href="#" className="text-gray-400">Create Event</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Community</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="text-gray-400">Groups</a></li>
          <li><a href="#" className="text-gray-400">Organizers</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="text-gray-400">Help</a></li>
          <li><a href="#" className="text-gray-400">Contact</a></li>
        </ul>
      </div>

    </div>

    <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
      <p>&copy; 2026 Event Management System. All rights reserved.</p>
    </div>

  </div>
</footer>
  );
};

export default Footer;