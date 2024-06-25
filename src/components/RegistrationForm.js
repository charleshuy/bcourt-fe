import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Paper } from "@mui/material";
import { register } from "../api/AuthService";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(name, email, password, phone, address);
      console.log("Registration response:", response);
      // Optionally, handle successful registration (e.g., show success message, redirect user)
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration error (e.g., display error message)
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: "32px" }}>
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={3}>
        <Typography
          variant="h6"
          align="center"
          style={{ marginBottom: "16px" }}
        >
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={10}>
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                label="Phone"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                label="Address"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={10}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </Grid>
            {error && (
              <Grid item xs={10}>
                <Typography
                  variant="body2"
                  color="error"
                  align="center"
                  style={{ marginTop: "8px" }}
                >
                  {error}
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default RegistrationForm;
