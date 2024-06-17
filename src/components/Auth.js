import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { login } from "../api/AuthService"; // Import your AuthService methods

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the login function from AuthService
      const user = await login(email, password);

      // Check if user has the 'Admin' role
      if (user.role.roleName.includes("Admin")) {
        // Redirect to the admin page on successful login
        navigate("/users"); // Update to navigate to admin page
      } else {
        setError("You are not authorized to access this page.");
      }
    } catch (error) {
      // Handle error responses from the server
      console.error("Login Error:", error);
      setError("Invalid email or password. Please try again.");
    }
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
          {error && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Auth;
