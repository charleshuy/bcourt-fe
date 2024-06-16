import axios from "axios";

const API_URL = "http://localhost:8080/roles";

export async function saveRole(role) {
  return await axios.post(API_URL, role);
}

export async function getRoles(page = 0, size = 10) {
  return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getRole(roleId) {
  return await axios.get(`${API_URL}/${roleId}`);
}

export async function updateRole(role) {
  return await axios.post(API_URL, role);
}

export async function deleteRole(roleId) {
  return await axios.delete(`${API_URL}/${roleId}`);
}
