import axios from 'axios';
import { API_BASE } from '../config/api';

export async function getUserPlaylists(username) {
  const response = await axios.get(`${API_BASE}/playlists/user/${username}`);
  return response.data;
}

export async function getPlaylistDetails(playlistId) {
  const response = await axios.get(`${API_BASE}/playlists/details/${playlistId}`);
  return response.data;
} 