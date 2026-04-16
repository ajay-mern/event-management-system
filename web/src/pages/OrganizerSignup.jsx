import { useState } from "react";
import { baseUrl } from "../constants/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrganizerSignup = () => {
const[name,setName] = useState("")
const[email,setEmail] =useState("")
const[password,setPassword]=useState("")
const [isDisable,SetIsdisable] = useState(false)
const navigate = useNavigate()
const signup = async(e)=>{
  // console.log("submit")
  e.preventDefault();
  try {
    SetIsdisable(true)
    const res = await fetch(`${baseUrl}/auth/signupAsOrganizer`,{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name:name,email:email,password:password})
  })
  const data = await res.json()

//   toast.success(res.data.data.message)
//   navigate('/login')
//     console.log(data)
  if(res.status === 201){
    toast.success(data.message)
    navigate("/login")
  }else{
    toast.error(data.message)
  }
  } catch (error) {
    toast.error(error.data.message)
  }finally{
    SetIsdisable(false)
  }


}
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create your Event Organizer account in Event Management System account</h2>
        <form className="space-y-4" onSubmit={signup}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input id="name" name="name" type="text" onChange={(e)=>setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input id="email" name="email" type="email" onChange={(e)=>setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" name="password" type="password" onChange={(e)=>setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700" disabled={isDisable}>Sign Up</button>
        </form>
        <p className="mt-4 text-sm text-gray-600">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a></p>
      </div>
    </div>
  );
};

export default OrganizerSignup;
