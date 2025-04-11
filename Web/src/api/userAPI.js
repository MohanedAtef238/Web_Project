import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export async function createUser({ username, email, password }) {
  const response = await axios.post(`${API_BASE}/user/signup`, {
    username,
    email,
    password,
  });
  return response.data;
}

export async function getAllUsers() {
    const response = await axios.get(`${API_BASE}/user/admin`);
    return response.data;
}