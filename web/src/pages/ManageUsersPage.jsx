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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">view</button>
                  <button className="text-red-600 hover:text-red-900" onClick={()=>{deleteUser(user._id)}}>Delete</button>
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
