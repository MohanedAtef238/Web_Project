import axios from 'axios';
import { API_BASE } from '../config/api';

axios.defaults.baseURL = API_BASE;

export async function getReviews(bookId) {
  const response = await axios.get(`/review/${bookId}`);
  return response.data;
}

export async function addReview({ user, book, message, rating }) {
  const response = await axios.post('/review/add', {
    user, book, message, rating
  });
  return response.data;
}
