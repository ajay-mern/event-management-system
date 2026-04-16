import { useReducer, useState } from "react";
import { baseUrl } from "../constants/api";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";



const initialState = {
  title:"",
  description:"",
  category:"",
  location:"",
  date:"",
  capacity:"",
  price:"",
  poster:{}
}

const reducer = (state,action)=>{
  switch(action.type){
    case "title":
    return {
      ...state,title:action.payload
    }
    case "description":
      return{
        ...state,description:action.payload
      }
          case "category":
      return{
        ...state,category:action.payload
      }
      case "price":
        return {
          ...state,price:action.payload
        }
          case "location":
      return{
        ...state,location:action.payload
      }
          case "date":
      return{
        ...state,date:action.payload
      }
          case "capacity":
      return{
        ...state,capacity:action.payload
      }
          case "poster":
      return{
        ...state,poster:action.payload
      }
    
    default:
      return state
  }
}


const CreateEventPage = () => {
  const [state,dispatch] = useReducer(reducer,initialState)
  const [loading,setLoading] = useState(false)
  // console.log(state)
  const{user} = useAuth()
  console.log(user)

  const createEvent =async(e)=>{
    try {
      e.preventDefault();
      setLoading(true)
      console.log('btn')
      const res = await axios.post(baseUrl+"/events/createEvent",state,{headers:{Authorization:"Bearer "+user.token,"Content-Type":"multipart/form-data"}})
      // console.log("event created====>",res)
      toast.success(res.data.message)
  
    

    } catch (error) {
      console.log(error)
      if(error.response.status === 400){
        // console.log(error)
        toast.warning(error.response.data.message)
        error.response.data.error.details.map((val)=>toast.warning(val.msg))
      }
      else{
        toast.error("something went wrong")
      }
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl">
        <form className="space-y-4" >
          <div>
            <label htmlFor="title" className="block text-sm font-semibold">Title</label>
            <input id="title" type="text" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="Event title" onChange={(e)=>dispatch({type:"title",payload:e.target.value})} />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold">Description</label>
            <textarea id="description" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="Write event details" rows="4" onChange={(e)=>dispatch({type:"description",payload:e.target.value})} ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-semibold">Category</label>
              <input id="category" type="text" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="Technology" onChange={(e)=>dispatch({type:"category",payload:e.target.value})}/>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-semibold">Location</label>
              <input id="location" type="text" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="Hyderabad, India" onChange={(e)=>dispatch({type:"location",payload:e.target.value})}/>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-semibold">Date</label>
              <input id="date" type="datetime-local" className="mt-1 w-full border px-3 py-2 rounded-md" onChange={(e)=>dispatch({type:"date",payload:e.target.value})}/>
            </div>
            <div>
              <label htmlFor="capacity" className="block text-sm font-semibold">Capacity</label>
              <input id="capacity" type="number" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="100" onChange={(e)=>dispatch({type:"capacity",payload:e.target.value})} />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-semibold">Price</label>
              <input id="price" type="number" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="0" onChange={(e)=>dispatch({type:"price",payload:e.target.value})} />
            </div>
          </div>
          <div>
            <label htmlFor="poster" className="block text-sm font-semibold">Poster</label>
            <input id="posterImage" type="file" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="https://..." onChange={(e)=>dispatch({type:"poster",payload:e.target.files[0]})} />
          </div>
          <button type="button" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700" onClick={createEvent} disabled={loading}>Create event</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
