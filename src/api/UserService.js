import axios from "axios";

const API_URL = "http://localhost:8080/users";

export async function saveUser(user) {
  return await axios.post(API_URL, user);
}

export async function getUsers(page = 0, size = 10, userName = "") {
  const url = `${API_URL}/search?userName=${userName}&page=${page}&size=${size}`;
  return await axios.get(url);
}

export async function getUser(userId) {
  return await axios.get(`${API_URL}/${userId}`);
}

export async function updateUser(user) {
  return await axios.post(API_URL, user);
}

export async function deleteUser(userId) {
  return await axios.delete(`${API_URL}/${userId}`);
}
