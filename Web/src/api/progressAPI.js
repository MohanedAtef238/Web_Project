import axios from 'axios';
import { API_BASE } from '../config/api';

export async function getReadingProgress(userId) {
  try {
    console.log("mew mew progress api "+ userId);
    const response = await axios.get(`${API_BASE}/progress/${userId}`);
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