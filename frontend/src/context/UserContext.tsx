import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';
import { UserRole } from '../axios/UserAPI';

// Interface representing user data
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole; // User role defined in UserRole enum from UserAPI
}

// Interface representing the context value
interface UserContextType {
  user: UserData | null; // User data or null if not authenticated
  setUser: Dispatch<SetStateAction<UserData | null>>; // Function to set user data
}

// Creating a context with initial value of undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to access the user context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

// Provider component to wrap the application and provide the user context
const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null); // State to hold user data
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };

export default UserProvider; // Exporting the UserProvider component
