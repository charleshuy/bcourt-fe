import React, { useState } from "react";
import { message } from "antd"; // Import message from antd for notifications
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import statement for jwt-decode
import { login, register } from "../api/AuthService"; // Import both AuthService methods
import RegistrationForm from "./RegistrationForm"; // Assuming the RegistrationForm component exists

const Login = () => {
  const navigate = useNavigate(); // React Router DOM hook for navigation
  const [email, setEmail] = useState(""); // State for storing email input
  const [password, setPassword] = useState(""); // State for storing password input
  const [error, setError] = useState(""); // State for error messages
  const [showRegistration, setShowRegistration] = useState(false); // State to toggle registration form display

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Attempting login:"); // Debugging log
      const response = await login(email, password);
      console.log("Login response:", response); // Debugging log

      // Assuming the response contains a token or user data
      localStorage.setItem("token", response.token); // Or whatever data you need to store
      const decodedToken = jwtDecode(response.token);
      console.log("Decoded Token:", decodedToken); // Debugging log

      if (decodedToken.roleName && decodedToken.roleName === "Admin") {
        navigate("users"); // Redirect to admin route if the user is an admin
      } else {
        navigate("courts"); // Redirect to a protected route
      }

      message.success("Login successful!");
    } catch (error) {
      console.error("Login failed:", error.response || error.message); // Debugging log
      message.error("Login failed. Please check your credentials.");
    }
  };

  const handleRegister = async (formData) => {
    try {
      const response = await register(formData);
      console.log("Registration response:", response);
      message.success("Registration successful!");
      toggleRegistrationForm(); // Hide registration form after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Failed to register. Please try again.");
    }
  };

  const toggleRegistrationForm = () => {
    setShowRegistration(!showRegistration); // Toggle the state to show/hide registration form
    // Reset registration form fields
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Login</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" style={{ marginTop: "32px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={toggleRegistrationForm}
            >
              {showRegistration ? "Hide Registration" : "Register"}
            </Button>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Grid>
          )}
          {showRegistration && (
            <Grid item xs={12}>
              <RegistrationForm onSubmit={handleRegister} />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Login;
