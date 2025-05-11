import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export async function getUserFavorites(username) {
  const response = await axios.get(`${API_BASE}/favorites/user/${username}`);
<<<<<<< HEAD
  console.log('response.data', response.data);
=======
>>>>>>> parent of be6c1ec (Merge branch 'main' of https://github.com/MohanedAtef238/Web_Project)
  return response.data;
}

export async function addToFavorites(username, bookId) {
  const response = await axios.post(`${API_BASE}/favorites/user/${username}`, {
    bookId
  });
  return response.data;
}

export async function removeFromFavorites(username, bookId) {
  const response = await axios.delete(`${API_BASE}/favorites/user/${username}/${bookId}`);
  return response.data;
} 