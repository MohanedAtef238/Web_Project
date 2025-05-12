import axios from 'axios';
import { API_BASE } from '../config/api';

axios.defaults.baseURL = API_BASE;

export async function getUserPlaylists(username) {
  const response = await axios.get(`/playlists/user/${username}`);
  return response.data;
}

export async function getPlaylistDetails(playlistId) {
  const response = await axios.get(`/playlists/details/${playlistId}`);
  return response.data;
} 