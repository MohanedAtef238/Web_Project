import axios from 'axios';

const API_BASE = 'http://localhost:3001';

export async function getReviews(bookId) {
    console.log('API: sending to controller now book id: ',bookId,' :D');
    const response = await axios.post(`${API_BASE}/review/bookreviews`, { bookId });
    return response.data;
  }  

export async function addReview({user, book, message}) {
  console.log('api: sending review with details: ', user, book, message);
  const response = await axios.post(`${API_BASE}/review/add`, {
    user, book, message
  });
  console.log('api: done yay');
  return response.data;
}