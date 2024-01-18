import React from "react";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import AuthContextProvider, { useAuth } from "./Context/context";

export default function App() {
  const { isAuth } = useAuth();
  return (
    <AuthContextProvider>
      {isAuth ? <Dashboard /> : <Login />}
    </AuthContextProvider>
  );
}
