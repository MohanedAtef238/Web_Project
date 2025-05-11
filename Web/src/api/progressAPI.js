import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export async function getReadingProgress(userId, bookId) {
  try {
    const response = await axios.get(`${API_BASE}/progress/${userId}/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reading progress:', error);
  }
}

export async function updateReadingProgress(userId, bookId, currentTime) {
  try {
    const response = await axios.post(`${API_BASE}/progress`, {
      userId,
      bookId,
      currentTime
    });
    return response.data;
  } catch (error) {
    console.error('Error updating reading progress:', error);
  }
}