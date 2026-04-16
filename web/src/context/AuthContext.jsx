import { createContext, useContext, useEffect, useState } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user"))||null);
  console.log(user)
  useEffect(()=>{
    sessionStorage.setItem("user",JSON.stringify(user))
  },[user])

  
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
