import { useEffect, useReducer, useState } from "react";
import { baseUrl } from "../constants/api";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";



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
    case "loadData":
        return{
            ...state,  title:action.payload.title,
                    description:action.payload.description,
                    category:action.payload.category,
                    location:action.payload.location,
                    date:action.payload.date,
                    capacity:action.payload.capacity,
                    price:action.payload.price,
                    
        }
    default:
      return state
  }
}


const UpdateEventById = () => {
  const [state,dispatch] = useReducer(reducer,initialState)
  const [loading,setLoading] = useState(false)
  const [data,setData] = useState([])
  console.log(state)
  const{user} = useAuth()
  console.log(user)
  const{eid} = useParams()
  const navigate = useNavigate()
  console.log(eid)
  useEffect(()=>{
    axios.get(baseUrl+"/events/"+eid)
    // .then(res=>console.log("=======",res.data.data.data))
    .then(res=>{dispatch({type:"loadData",payload:res.data.data.data}),setData(res.data.data.data)})
    .catch(err=>console.log(err))
  },[])
// console.log(data)
//   const createEvent =async(e)=>{
//     try {
//       e.preventDefault();
//       setLoading(true)
//       console.log('btn')
//       const res = await axios.post(baseUrl+"/events/createEvent",state,{headers:{Authorization:"Bearer "+user.token,"Content-Type":"multipart/form-data"}})
//       // console.log("event created====>",res)
//       toast.success(res.data.message)
  
    

//     } catch (error) {
//       console.log(error)
//       if(error.response.status === 400){
//         // console.log(error)
//         toast.warning(error.response.data.message)
//         error.response.data.error.details.map((val)=>toast.warning(val.msg))
//       }
//       else{
//         toast.error("something went wrong")
//       }
//     }
//     finally{
//       setLoading(false)
//     }
//   }

const updateEvent = async()=>{
//  console.log("event updated")
try {
    setLoading(true)
    console.log("clicked on update event")
    const res = await axios.put(baseUrl+"/events/"+eid,state,{headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer "+user.token}})
    // console.log("event updated successfully",res)
    toast.success(res.data.data.message)
    navigate("/organizer/manage-events")
    // console.log("==clicked")
} catch (error) {
    console.log(error)
    toast.warning(JSON.stringify(error.response.data))
}
finally{
setLoading(false)
}
}
  return (
    <div className="container mx-auto px-4 py-8">
        {Object.keys(data).length > 0 ?  <>    
        <h1 className="text-3xl font-bold mb-6">Update Event</h1>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl">
        <form className="space-y-4" >
          <div>
            <label htmlFor="title" className="block text-sm font-semibold">Title</label>
            <input id="title" type="text" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="Event title" onChange={(e)=>dispatch({type:"title",payload:e.target.value})} value={state.title} />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold">Description</label>
            <textarea id="description" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="Write event details" rows="4" onChange={(e)=>dispatch({type:"description",payload:e.target.value})} value={state.description}></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-semibold">Category</label>
              <input id="category" type="text" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="Technology" onChange={(e)=>dispatch({type:"category",payload:e.target.value})} value={state.category}/>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-semibold">Location</label>
              <input id="location" type="text" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="Hyderabad, India" onChange={(e)=>dispatch({type:"location",payload:e.target.value})} value={state.location}/>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-semibold">Date</label>
              <input id="date" type="datetime-local" className="mt-1 w-full border px-3 py-2 rounded-md" onChange={(e)=>dispatch({type:"date",payload:e.target.value})} value={state.date}/>
            </div>
            <div>
              <label htmlFor="capacity" className="block text-sm font-semibold">Capacity</label>
              <input id="capacity" type="number" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="100" onChange={(e)=>dispatch({type:"capacity",payload:e.target.value})} value={state.capacity}/>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-semibold">Price</label>
              <input id="price" type="number" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="0" onChange={(e)=>dispatch({type:"price",payload:e.target.value})} value={state.price}/>
            </div>
          </div>
          <div>
            <label htmlFor="poster" className="block text-sm font-semibold">Poster</label>
            <input id="posterImage" type="file" className="mt-1 w-full border px-3 py-2 rounded-md" placeholder="https://..." onChange={(e)=>dispatch({type:"poster",payload:e.target.files[0]})} />
          </div>
          <button type="button" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700" onClick={updateEvent} disabled={loading}>Update event</button>
        </form>
      </div></>:<p className="text-center">Loading....</p>}

    </div>
  );
};

export default UpdateEventById;
