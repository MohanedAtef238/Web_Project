import axios from 'axios';
import { API_BASE } from '../config/api';

export async function getReviews(bookId) {
  const response = await axios.get(`${API_BASE}/review/${bookId}`);
  return response.data;
}

export async function addReview({ user, book, message, rating }) {
  const response = await axios.post(`${API_BASE}/review/add`, {
    user, book, message, rating
  });
  return response.data;
}
