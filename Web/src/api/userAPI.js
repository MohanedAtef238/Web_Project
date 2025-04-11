import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export async function createUser({ username, email, password }) {
  const response = await axios.post(`${API_BASE}/signup`, {
    username,
    email,
    password,
  });
  return response.data;
}