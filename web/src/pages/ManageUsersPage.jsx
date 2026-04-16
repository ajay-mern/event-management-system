import { useEffect, useState } from 'react';
// import users from '../data/users.json';
import { baseUrl } from '../constants/api';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ManageUsersPage = () => {
  const {user} = useAuth()
  const [data,setData] =useState([])
  const fetchUsers = ()=>    
    axios.get(baseUrl+"/users",{headers:{Authorization:"Bearer "+user.token}})
    // .then(res=>console.log(res.data.data.data))
    .then(res=>setData(res.data.data.data))
    .catch(err=>console.log(err))
  useEffect(()=>{
    fetchUsers()
  },[])
  const deleteUser =(userId)=>{
      axios.delete(baseUrl+"/users/"+userId, {headers:{Authorization:"Bearer "+user.token}})
      .then(res=>{toast.success(res.data.message)
        fetchUsers()
      })
      
      .catch(err=>{console.log(err)})
  }
  return (
<div className="container mx-auto px-4 py-10 bg-gray-50 min-h-screen">
  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
    Manage Users
  </h1>

  <div className="bg-white rounded-2xl shadow-lg overflow-x-auto border border-gray-100">
    <table className="min-w-full text-sm">
      
      <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
        <tr>
          <th className="px-6 py-3 text-left">Name</th>
          <th className="px-6 py-3 text-left">Email</th>
          <th className="px-6 py-3 text-left">Role</th>
          <th className="px-6 py-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {data.map((user) => (
          <tr key={user._id} className="text-gray-700">
            
            <td className="px-6 py-4 font-medium">
              {user.name}
            </td>

            <td className="px-6 py-4 text-gray-600">
              {user.email}
            </td>

            <td className="px-6 py-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                  ${user.role === "admin" ? "bg-red-100 text-red-700" : ""}
                  ${user.role === "organizer" ? "bg-blue-100 text-blue-700" : ""}
                  ${user.role === "participant" ? "bg-green-100 text-green-700" : ""}
                `}
              >
                {user.role}
              </span>
            </td>

            <td className="px-6 py-4">
              <button className="text-indigo-600 mr-4 font-medium">
                View
              </button>
              <button
                className="text-red-600 font-medium"
                onClick={() => { deleteUser(user._id) }}
              >
                Delete
              </button>
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  </div>
</div>
  );
};

export default ManageUsersPage;
