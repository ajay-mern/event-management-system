import axios from "axios";
import { useEffect } from "react";
import { baseUrl } from "../constants/api";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const EventParticipantsPage = () => {

  const [data,setData] = useState([])
  const {user} = useAuth()
  const fetchUsersRegistred = async()=>{
    
    const res = await axios.get(baseUrl+"/eventregister/participants/organizer",{headers:{Authorization:"Bearer "+user.token}})
    
    const ans = res.data.data.data
    setData(ans)
    console.log(ans)

  }
useEffect(()=>{
fetchUsersRegistred()
},[])
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Event Participants</h1>
      <div className="overflow-x-auto">
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
           {data.map((item, index) => (
               <tr key={index} className="even:bg-gray-50">
               <td className="px-4 py-2 border">{item.userId.name}</td>
                <td className="px-4 py-2 border">{item.eventId.title}</td>
                <td className="px-4 py-2 border">{item.registrationDate}</td>
                <td className="px-4 py-2 border capitalize">{item.status}</td>
              </tr>
                ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventParticipantsPage;
