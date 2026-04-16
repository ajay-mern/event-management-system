import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import axios from "axios"
import { baseUrl } from '../constants/api';
import { toast, ToastContainer } from 'react-toastify';


const LoginPage = () => {
  const [loading,setLoading] = useState(false)
  // console.log(useAuth())
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true)
        const res = await axios.post(`${baseUrl}/auth/login`,{email:form.email,password:form.password})
        // console.log(res.data.data.data.role,"res from DB")
        setLoading(false)
        toast.success(res.data.message)
        setUser({userinfo:res.data.data.data,token:res.data.data.token})
        console.log(res.data.data.data.data)

        if(res?.data?.data?.data?.role ==="participant"){
          navigate("/dashboard")
        }
        else if(res?.data?.data?.data?.role ==="organizer"){
          // // console.log(res.data.data.data.role)
          // setUser(res.data)
          navigate("/organizer/dashboard")
        }
        else if(res?.data?.data?.data?.role ==="admin"){
          navigate("/admin/dashboard")
        }
        else{
          toast.error("something went wrong")
        }

    } catch (error) {
      console.log(error.response)
      setLoading(false)
      if(error.response.status == 404){
        toast.error(error.response.data.message)
      }
      else if(error.response.status == 400){
        toast.error(error.response.data.message)
      }
      else{
        toast.error(JSON.stringify(error.response.data))
      }
    }finally{
      setLoading(false)
    }

    // console.log(res)
    // toast(res.data.message)
    // res.status == 200 ? toast(res.data.message):toast.error(res.data.message)

    // const result = login(form);
    // if (result.success) {
    //   if (result.role === 'organizer') {
    //     navigate('/organizer/dashboard');
    //   } else if (result.role === 'admin') {
    //     navigate('/admin/dashboard');
    //   } else {
    //     navigate('/dashboard');
    //   }
    //   return;
    // }

    // setError(result.message || 'Invalid credentials.');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign in to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700" disabled={loading} style={{backgroundColor:loading?"#7997d4":"blue"}}>Log In</button>
        </form>
        <p className="mt-4 text-sm text-gray-600">Don’t have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
