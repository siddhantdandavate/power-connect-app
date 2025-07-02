import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '@/types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoggedIn: false
});

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      isLoggedIn: !!user 
    }}>
      {children}
    </UserContext.Provider>
  );
};