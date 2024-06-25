import axios from "axios";

const API_URL = "http://localhost:8080/courts";

export async function saveCourt(court) {
  return await axios.post(API_URL, court);
}

export async function getCourts(page = 0, size = 10, courtName = "") {
  const url = `${API_URL}/search?courtName=${courtName}&page=${page}&size=${size}`;
  return await axios.get(url);
}

export async function getCourt(courtId) {
  return await axios.get(`${API_URL}/${courtId}`);
}

export async function updateCourt(court) {
  return await axios.put(API_URL, court);
}

export async function deleteCourt(courtId) {
  return await axios.delete(`${API_URL}/${courtId}`);
}
