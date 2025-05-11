import axios from 'axios';

const API_BASE  = 'http://localhost:3000/recommendation';

export async function fetchRecommendations(userId) {
  try {
    const response = await axios.get(`${API_BASE}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

export async function addInteractions(userID, bookID, action) {
  try {
    const response = await axios.post(`${API_BASE}/interact`, { userID, bookID, action });
    return response.data;
  } catch (error) {
    console.error('Error adding interaction:', error);
    throw error;
  }
};
