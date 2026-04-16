// import registrations from '../data/registrations.json';
// import users from '../data/users.json';
// import events from '../data/events.json';

import axios from "axios";
import { useEffect } from "react";
import { baseUrl } from "../constants/api";
import { useAuth } from "../context/AuthContext";

const EventParticipantsPage = () => {
  // const entries = registrations.map((reg) => {
  //   const user = users.find((u) => u._id === reg.userId) || { name: 'Unknown' };
  //   const event = events.find((e) => e._id === reg.eventId) || { title: 'Unknown' };
  //   return { ...reg, userName: user.name, eventTitle: event.title };
  // });
  const {user} = useAuth()
  const fetchUsersRegistred = async()=>{
    
    const res = await axios.get(baseUrl+"/eventregister/participants/organizer",{headers:{Authorization:"Bearer "+user.token}})
    
    console.log("=====",res)
  }
useEffect(()=>{
fetchUsersRegistred()
},[])
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Event Participants</h1>
      {/* <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Participant</th>
              <th className="px-4 py-2 border">Event</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((item) => (
              <tr key={item._id} className="even:bg-gray-50">
                <td className="px-4 py-2 border">{item.userName}</td>
                <td className="px-4 py-2 border">{item.eventTitle}</td>
                <td className="px-4 py-2 border">{new Date(item.registrationDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 border capitalize">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default EventParticipantsPage;
