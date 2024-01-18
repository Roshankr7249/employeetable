import React, { useState } from "react";
import { useAuth } from "../Context/context";
import Dashboard from "./Dashboard";

export default function Login() {
  const { login, isAuth, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div>
      {isAuth ? (
        <div>
          <Dashboard />
        </div>
      ) : (
        <form onSubmit={handleLogin} data-testid="auth_form">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input type="submit" value="Login" />
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
}
