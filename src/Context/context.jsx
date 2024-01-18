import React, {createContext, useContext, useState} from "react";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuth: false,
    loading: false,
    error: null,
    token: '',
  });


  const login = async (email, password) => {
    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });




      if (response.ok) {
        setAuthState({
          isAuth: true,
          loading: false,
          error: null,

        });
      }
       else {
        setAuthState({
          isAuth: false,
          loading: false,
          error: 'Authentication failed. Please check your credentials.',
 
        });
      }
    } 
    catch (error) {
      setAuthState({
        isAuth: false,
        loading: false,
        error: 'An error occurred while authenticating.',
        
      });
    }
  };

  const logout = () => {
    setAuthState({
      isAuth: false,
      loading: false,
      error: null,
      
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
