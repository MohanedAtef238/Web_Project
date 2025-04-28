import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export async function getReviews(bookId) {
    const response = await axios.post(`${API_BASE}/review/bookreviews`, { bookId });
    return response.data;
  }  

export async function addReview({user, book, message}) {
  const response = await axios.post(`${API_BASE}/reviews/add`, {
    user, book, message
  });
  return response.data;
}