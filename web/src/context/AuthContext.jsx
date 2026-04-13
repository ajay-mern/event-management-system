import { createContext, useContext, useState } from 'react';

const dummyCredentials = [
  {
    name: 'sharath',
    email: 'sharath@gmail.com',
    password: 'Sharath@123',
    role: 'participant'
  },
  {
    name: 'tony',
    email: 'tony@gmail.com',
    password: 'Tony@123',
    role: 'organizer'
  },
  {
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'Admin@123',
    role: 'admin'
  }
];

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = ({ email, password }) => {
    const matchedUser = dummyCredentials.find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      setUser({ name: matchedUser.name, email: matchedUser.email, role: matchedUser.role });
      return { success: true, role: matchedUser.role };
    }

    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
