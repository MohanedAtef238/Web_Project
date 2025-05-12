import axios from 'axios';
import { API_BASE } from '../config/api';

// Configure axios defaults
axios.defaults.baseURL = API_BASE;

export async function getAllFollowing(username) {
  try {
    const response = await axios.get(`/follow/${username}/following`);
    return response.data;
  } catch (error) {
    console.error('Error getting following:', error);
    throw error;
  }
}

export async function followUser(username, targetUsername) {
  try {
    const response = await axios.post(`/follow/${username}/follow`, {
      targetUsername
    });
    return response.data;
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
}

export async function unfollowUser(username, targetUsername) {
  try {
    const response = await axios.delete(`/follow/${username}/unfollow/${targetUsername}`);
    return response.data;
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
}

export async function getFollowerCount(username) {
  try {
    const response = await axios.get(`/follow/${username}/count`);
    return response.data;
  } catch (error) {
    console.error('Error getting follower count:', error);
    throw error;
  }
}

export async function getAllFollowers(username) {
  try {
    const response = await axios.get(`/follow/${username}/followers`);
    return response.data;
  } catch (error) {
    console.error('Error getting followers:', error);
    throw error;
  }
}
