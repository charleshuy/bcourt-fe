import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/AuthService"; // Import your AuthService methods

const Auth = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the login function from AuthService
      await login(email, password);

      // Redirect to dashboard or user profile page on successful login
      history.push("/dashboard"); // Replace '/dashboard' with your desired route
    } catch (error) {
      // Handle error responses from the server
      console.error("Login Error:", error.response);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Auth;
