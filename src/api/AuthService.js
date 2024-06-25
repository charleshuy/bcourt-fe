import axios from "axios";
import { axiosInstance } from "./axiosInstance";

const API_URL = "http://localhost:8080/auth";

export async function login(email, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem("token", response.data.token); // Store token
    console.log("Login successful");
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
}

export async function register(name, email, password, phone, address) {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      phone,
      address,
    });
    console.log("Registration successful:", response.data);
    return response.data; // Assuming backend returns some data upon successful registration
  } catch (error) {
    console.error("Registration failed", error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem("token"); // Remove token
  window.location.href = "/"; // Redirect to login page
}
