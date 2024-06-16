import axios from "axios";

const API_URL = "http://localhost:8080/auth"; // Replace with your backend API URL

export async function login(email, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    // Optionally, you can handle the response if needed (e.g., store token in localStorage)
    console.log("Login Successful");
    return response.data; // You can return any data you need from the response
  } catch (error) {
    throw error; // Let the caller handle the error
  }
}
